'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FilterSidebar from '@/components/FilterSidebar';
import LandCard from '@/components/LandCard';
import DetailPanel from '@/components/DetailPanel';
import { FilterState, PublicLand, UserLocation } from '@/lib/types';
import LayerToggle from '@/components/LayerToggle';
import { LayerCategory } from '@/lib/mapLayers';
import {
  PUBLIC_LANDS,
  HUNTING_SEASONS,
  QUOTA_HUNTS,
  FISHING_REGULATIONS,
  STATES,
} from '@/data/sample';

// Dynamic import to avoid SSR issues with mapbox-gl
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const DEFAULT_FILTERS: FilterState = {
  states: [],
  landTypes: [],
  species: [],
  weaponTypes: [],
  dateRange: undefined,
  accessTypes: [],
  searchQuery: '',
  showFavoritesOnly: false,
  activityType: 'all',
  maxDistance: undefined,
  counties: [],
  buckDoe: 'any',
};

/** Haversine distance in miles between two lat/lng points */
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function filterLands(
  lands: PublicLand[],
  filters: FilterState,
  favorites: Set<string>,
  distanceMap: Map<string, number> | null,
): PublicLand[] {
  return lands.filter((land) => {
    // State filter
    if (filters.states.length > 0 && !filters.states.includes(land.state)) return false;

    // Land type filter
    if (filters.landTypes.length > 0 && !filters.landTypes.includes(land.type)) return false;

    // Activity type filter
    if (filters.activityType === 'hunting' && land.hunting_allowed === false) return false;
    if (filters.activityType === 'fishing' && land.fishing_allowed === false) return false;

    // Favorites filter
    if (filters.showFavoritesOnly && !favorites.has(land.id)) return false;

    // Search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const haystack = [land.name, land.type, land.state, ...land.counties, ...(land.tags ?? [])].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    // Max distance filter
    if (filters.maxDistance != null && distanceMap) {
      const dist = distanceMap.get(land.id);
      if (dist == null || dist > filters.maxDistance) return false;
    }

    // County filter
    if (filters.counties.length > 0) {
      const hasCounty = filters.counties.some((c) => land.counties.includes(c));
      if (!hasCounty) return false;
    }

    // Buck/Doe filter
    if (filters.buckDoe !== 'any') {
      const landSeasons = HUNTING_SEASONS.filter((s) => s.land_id === land.id);
      if (filters.buckDoe === 'buck_only') {
        const hasBuckOnly = landSeasons.some((s) => s.buck_only === true);
        if (!hasBuckOnly) return false;
      } else if (filters.buckDoe === 'either_sex') {
        const hasEitherSex = landSeasons.some((s) => s.buck_only === false);
        if (!hasEitherSex) return false;
      }
    }

    // Species filter — check if any seasons match
    if (filters.species.length > 0) {
      const landSeasons = HUNTING_SEASONS.filter((s) => s.land_id === land.id);
      const hasSpecies = filters.species.some((sp) => landSeasons.some((s) => s.species === sp));
      if (!hasSpecies) return false;
    }

    // Weapon type filter
    if (filters.weaponTypes.length > 0) {
      const landSeasons = HUNTING_SEASONS.filter((s) => s.land_id === land.id);
      const hasWeapon = filters.weaponTypes.some((w) => landSeasons.some((s) => s.weapon_type === w));
      if (!hasWeapon) return false;
    }

    // Access type
    if (filters.accessTypes.length > 0) {
      if (filters.accessTypes.includes('Quota')) {
        const hasQuota = QUOTA_HUNTS.some((q) => q.land_id === land.id);
        if (!hasQuota) return false;
      }
    }

    // Date range
    if (filters.dateRange?.start && filters.dateRange?.end) {
      const filterStart = new Date(filters.dateRange.start);
      const filterEnd = new Date(filters.dateRange.end);
      const landSeasons = HUNTING_SEASONS.filter((s) => s.land_id === land.id);
      const hasOverlap = landSeasons.some((s) => {
        const seasonStart = new Date(s.start_date);
        const seasonEnd = new Date(s.end_date);
        return seasonStart <= filterEnd && seasonEnd >= filterStart;
      });
      if (!hasOverlap) return false;
    }

    return true;
  });
}

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLandId, setSelectedLandId] = useState<string | null>(null);
  const [enabledLayers, setEnabledLayers] = useState<Record<LayerCategory, boolean>>({
    boundaries: true,
    'boat-ramps': false,
    trails: false,
    campgrounds: false,
    'fish-attractors': false,
    lakes: false,
    entrances: false,
    'dove-fields': false,
    ranges: false,
    other: false,
  });
  const toggleLayer = useCallback((cat: LayerCategory) => {
    setEnabledLayers((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }, []);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem('planahunt-favorites');
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });
  const [listView, setListView] = useState<'list' | 'map'>('list');

  // User location — persisted to localStorage
  const [userLocation, setUserLocation] = useState<UserLocation | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('planahunt-user-location');
      return stored ? (JSON.parse(stored) as UserLocation) : null;
    } catch {
      return null;
    }
  });

  const handleSetLocation = useCallback((loc: UserLocation | null) => {
    setUserLocation(loc);
    try {
      if (loc) {
        localStorage.setItem('planahunt-user-location', JSON.stringify(loc));
      } else {
        localStorage.removeItem('planahunt-user-location');
      }
    } catch {}
  }, []);

  // Available counties derived from data
  const availableCounties = useMemo(
    () =>
      [...new Set(PUBLIC_LANDS.flatMap((l) => l.counties))]
        .filter(Boolean)
        .sort(),
    []
  );

  // Distance map: land.id -> miles from userLocation
  const distanceMap = useMemo(() => {
    if (!userLocation) return null;
    const map = new Map<string, number>();
    for (const land of PUBLIC_LANDS) {
      if (land.lat != null && land.lng != null) {
        map.set(
          land.id,
          haversineDistance(userLocation.lat, userLocation.lng, land.lat, land.lng)
        );
      }
    }
    return map;
  }, [userLocation]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem('planahunt-favorites', JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const filteredLands = useMemo(() => {
    const results = filterLands(PUBLIC_LANDS, filters, favorites, distanceMap);
    // Sort by distance when userLocation is set
    if (distanceMap) {
      results.sort((a, b) => {
        const da = distanceMap.get(a.id) ?? Infinity;
        const db = distanceMap.get(b.id) ?? Infinity;
        return da - db;
      });
    }
    return results;
  }, [filters, favorites, distanceMap]);

  const selectedLand = selectedLandId ? PUBLIC_LANDS.find((l) => l.id === selectedLandId) : null;
  const selectedSeasons = selectedLandId ? HUNTING_SEASONS.filter((s) => s.land_id === selectedLandId) : [];
  const selectedQuotas = selectedLandId ? QUOTA_HUNTS.filter((q) => q.land_id === selectedLandId) : [];
  const selectedFishing = selectedLandId ? FISHING_REGULATIONS.filter((f) => f.state === selectedLand?.state) : [];

  const todayHuntable = useMemo(() => {
    const today = new Date();
    return PUBLIC_LANDS.filter((land) =>
      HUNTING_SEASONS.some((s) => {
        if (s.land_id !== land.id) return false;
        const start = new Date(s.start_date);
        const end = new Date(s.end_date);
        return today >= start && today <= end;
      })
    );
  }, []);

  const handleTodayButton = () => {
    setFilters({
      ...DEFAULT_FILTERS,
      dateRange: {
        start: new Date().toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10),
      },
      counties: [],
      buckDoe: 'any',
    });
  };

  const currentState = STATES.find((s) => filters.states.length === 1 && s.code === filters.states[0]);

  // Derive available states from data (auto-updates as we add states)
  const availableStates = useMemo(() => {
    const codes = [...new Set(PUBLIC_LANDS.map((l) => l.state))].sort();
    return codes.map((code) => STATES.find((s) => s.code === code)).filter(Boolean) as typeof STATES;
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#1a1f16' }}>
      {/* Top navbar */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 z-20"
        style={{ background: '#161b12', borderBottom: '1px solid #2d342a' }}
      >
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ background: '#252b21', color: '#a8a490' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#3d6b35' }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: '#e8e4d4' }}>
              Plan<span style={{ color: '#5fad52' }}>A</span>Hunt
            </span>
          </div>
        </div>

        {/* Center: State selector */}
        <div className="hidden md:flex items-center gap-2">
          <select
            value={filters.states[0] ?? ''}
            onChange={(e) =>
              setFilters({ ...filters, states: e.target.value ? [e.target.value] : [] })
            }
            className="text-sm px-3 py-2 rounded-lg outline-none cursor-pointer appearance-none"
            style={{
              background: '#252b21',
              border: '1px solid #333830',
              color: filters.states.length ? '#e8e4d4' : '#6e6b5e',
            }}
          >
            <option value="">All States</option>
            {availableStates.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Today CTA + view toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTodayButton}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95"
            style={{ background: '#3d6b35', color: '#e8e4d4' }}
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Hunt Today?
          </button>

          {/* Map / List toggle */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #333830' }}>
            <button
              onClick={() => setListView('list')}
              className="px-3 py-2 text-xs font-medium transition-colors"
              style={{
                background: listView === 'list' ? '#3d6b35' : 'transparent',
                color: listView === 'list' ? '#e8e4d4' : '#6e6b5e',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setListView('map')}
              className="px-3 py-2 text-xs font-medium transition-colors"
              style={{
                background: listView === 'map' ? '#3d6b35' : 'transparent',
                color: listView === 'map' ? '#e8e4d4' : '#6e6b5e',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Filter sidebar */}
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          resultCount={filteredLands.length}
          availableStates={availableStates}
          userLocation={userLocation}
          onSetLocation={handleSetLocation}
          availableCounties={availableCounties}
        />

        {/* Map + content area */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* Mobile: stacked layout — map on top, cards below */}
          {/* Desktop: map takes full width, cards float over it */}

          {/* Map (always rendered so Mapbox initializes at full size) */}
          <div
            className={`
              absolute inset-0
              ${listView === 'map' ? 'z-0' : 'z-[-1] pointer-events-none lg:z-0 lg:pointer-events-auto'}
            `}
          >
            <MapView
              lands={filteredLands}
              selectedLandId={selectedLandId}
              onSelectLand={(id) => {
                setSelectedLandId(id);
                setListView('map');
              }}
              enabledLayers={enabledLayers}
            />
            {/* Layer toggle — top-left of map */}
            <div className="absolute top-3 left-3 z-10">
              <LayerToggle enabledLayers={enabledLayers} onToggle={toggleLayer} />
            </div>
          </div>

          {/* List results panel — floats over map on desktop, full-width on mobile */}
          {listView === 'list' && (
            <div
              className="
                absolute inset-0 lg:relative lg:inset-auto
                lg:w-[360px] lg:flex-shrink-0
                flex flex-col overflow-hidden
              "
              style={{ background: '#1a1f16', borderRight: '1px solid #2d342a' }}
            >
              {/* Results header */}
              <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid #2d342a' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>
                      {filteredLands.length} Location{filteredLands.length !== 1 ? 's' : ''}
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: '#6e6b5e' }}>
                      {currentState ? currentState.name : 'All states'} · {filters.activityType === 'all' ? 'Hunting & Fishing' : filters.activityType}
                    </p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: '#252b21', color: '#a8a490', border: '1px solid #333830' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </button>
                </div>

                {/* "Open Today" callout */}
                {todayHuntable.length > 0 && !filters.dateRange && (
                  <button
                    onClick={handleTodayButton}
                    className="mt-2 w-full flex items-center gap-2 text-xs px-3 py-2 rounded-lg text-left transition-colors"
                    style={{ background: 'rgba(61,107,53,0.12)', border: '1px solid rgba(61,107,53,0.25)', color: '#5fad52' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span>
                      <span className="font-semibold">{todayHuntable.length} location{todayHuntable.length !== 1 ? 's' : ''}</span> have open seasons today — tap to filter
                    </span>
                  </button>
                )}
              </div>

              {/* Card list */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredLands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
                    <svg className="w-10 h-10 mb-3" style={{ color: '#333830' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-sm font-medium" style={{ color: '#4a5046' }}>No locations found</p>
                    <p className="text-xs mt-1" style={{ color: '#3a3f36' }}>Try adjusting your filters</p>
                  </div>
                ) : (
                  filteredLands.map((land) => (
                    <LandCard
                      key={land.id}
                      land={land}
                      seasons={HUNTING_SEASONS.filter((s) => s.land_id === land.id)}
                      quotaHunts={QUOTA_HUNTS.filter((q) => q.land_id === land.id)}
                      isFavorite={favorites.has(land.id)}
                      onToggleFavorite={toggleFavorite}
                      onClick={() => setSelectedLandId(selectedLandId === land.id ? null : land.id)}
                      isSelected={selectedLandId === land.id}
                      distance={distanceMap?.get(land.id)}
                    />
                  ))
                )}
              </div>
            </div>
          )}


          {/* Detail Panel — right side of map */}
          {selectedLand && (
            <div
              className="absolute top-0 right-0 bottom-0 z-20 w-full sm:w-[380px]"
            >
              <DetailPanel
                land={selectedLand}
                seasons={selectedSeasons}
                quotaHunts={selectedQuotas}
                fishingRegs={selectedFishing}
                isFavorite={favorites.has(selectedLand.id)}
                onToggleFavorite={toggleFavorite}
                onClose={() => setSelectedLandId(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
