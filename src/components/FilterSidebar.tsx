'use client';

import { useState } from 'react';
import { FilterState, LandType, State, UserLocation } from '@/lib/types';

const LAND_TYPE_OPTIONS: { id: LandType; label: string; icon: string }[] = [
  { id: 'WMA', label: 'Wildlife Mgmt Area', icon: '🦌' },
  { id: 'National Forest', label: 'National Forest', icon: '🌲' },
  { id: 'National Wildlife Refuge', label: 'Wildlife Refuge', icon: '🦅' },
  { id: 'State Forest', label: 'State Forest', icon: '🌳' },
  { id: 'Corps of Engineers', label: 'Corps of Engineers', icon: '💧' },
  { id: 'TVA', label: 'TVA Land', icon: '⚡' },
  { id: 'Military', label: 'Military Land', icon: '🎖️' },
  { id: 'State Park', label: 'State Park', icon: '⛺' },
  { id: 'National Park', label: 'National Park', icon: '🏔️' },
];

const SPECIES_OPTIONS = [
  'Deer', 'Turkey', 'Bear', 'Duck', 'Dove', 'Quail',
  'Feral Hog', 'Alligator', 'Bass', 'Trout', 'Catfish', 'Crappie',
  'Red Drum', 'Flounder',
];

const WEAPON_OPTIONS = [
  { id: 'Archery', label: 'Archery' },
  { id: 'Rifle', label: 'Rifle' },
  { id: 'Muzzleloader', label: 'Muzzleloader' },
  { id: 'Shotgun', label: 'Shotgun' },
];

const ACCESS_OPTIONS = [
  { id: 'General', label: 'General Access' },
  { id: 'Quota', label: 'Quota / Lottery' },
  { id: 'Youth', label: 'Youth Only' },
  { id: 'Mobility', label: 'Mobility-Impaired' },
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  availableStates: State[];
  userLocation: UserLocation | null;
  onSetLocation: (loc: UserLocation | null) => void;
  availableCounties: string[];
}

export default function FilterSidebar({
  filters,
  onChange,
  isOpen,
  onClose,
  resultCount,
  availableStates,
  userLocation,
  onSetLocation,
  availableCounties,
}: FilterSidebarProps) {
  const [countySearch, setCountySearch] = useState('');
  const [countyDropdownOpen, setCountyDropdownOpen] = useState(false);

  const filteredCounties = availableCounties.filter(
    (c) =>
      c.toLowerCase().includes(countySearch.toLowerCase()) &&
      !filters.counties.includes(c)
  );
  const update = (partial: Partial<FilterState>) => {
    onChange({ ...filters, ...partial });
  };

  const toggleArray = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const clearAll = () => {
    onChange({
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
    });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSetLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        });
      },
      () => {
        // Permission denied or error — do nothing
      }
    );
  };

  const hasActiveFilters =
    filters.states.length > 0 ||
    (filters.landTypes?.length ?? 0) > 0 ||
    filters.species.length > 0 ||
    filters.weaponTypes.length > 0 ||
    filters.accessTypes.length > 0 ||
    filters.searchQuery !== '' ||
    filters.showFavoritesOnly ||
    filters.activityType !== 'all' ||
    filters.maxDistance != null ||
    filters.counties.length > 0 ||
    filters.buckDoe !== 'any';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          w-[300px] transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:h-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: '#1e2419', borderRight: '1px solid #2d342a' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: '1px solid #2d342a' }}>
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase" style={{ color: '#a8a490' }}>
              Filters
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#6e6b5e' }}>
              {resultCount} location{resultCount !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs px-2 py-1 rounded transition-colors"
                style={{ color: '#c4923a', background: 'rgba(196,146,58,0.1)' }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded transition-colors"
              style={{ color: '#a8a490' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

          {/* Search */}
          <div>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#6e6b5e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search lands, species..."
                value={filters.searchQuery}
                onChange={(e) => update({ searchQuery: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-colors"
                style={{
                  background: '#252b21',
                  border: '1px solid #333830',
                  color: '#e8e4d4',
                }}
              />
            </div>
          </div>

          {/* Your Location */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Your Location
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUseMyLocation}
                className="flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg transition-colors"
                style={{
                  background: userLocation ? '#3d6b35' : '#252b21',
                  color: userLocation ? '#e8e4d4' : '#a8a490',
                  border: `1px solid ${userLocation ? '#3d6b35' : '#333830'}`,
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Use My Location
              </button>
              {userLocation && (
                <button
                  onClick={() => onSetLocation(null)}
                  className="p-1.5 rounded transition-colors"
                  style={{ color: '#6e6b5e' }}
                  title="Clear location"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-xs mt-1.5" style={{ color: '#6e6b5e' }}>
              {userLocation ? (userLocation.label ?? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`) : 'Not set'}
            </p>
          </div>

          {/* Max Distance (only when location set) */}
          {userLocation && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
                Max Distance
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="e.g. 60"
                  value={filters.maxDistance ?? ''}
                  onChange={(e) =>
                    update({
                      maxDistance: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 text-sm rounded-lg outline-none"
                  style={{
                    background: '#252b21',
                    border: '1px solid #333830',
                    color: '#e8e4d4',
                  }}
                  min={0}
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                  style={{ color: '#6e6b5e' }}
                >
                  mi
                </span>
              </div>
            </div>
          )}

          {/* Counties */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Counties
            </label>
            {/* Selected county chips */}
            {filters.counties.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {filters.counties.map((county) => (
                  <span
                    key={county}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                    style={{ background: 'rgba(196,146,58,0.2)', color: '#c4923a', border: '1px solid #c4923a' }}
                  >
                    {county}
                    <button
                      onClick={() =>
                        update({ counties: filters.counties.filter((c) => c !== county) })
                      }
                      className="ml-0.5 hover:opacity-70"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
            {/* County search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search counties..."
                value={countySearch}
                onChange={(e) => {
                  setCountySearch(e.target.value);
                  setCountyDropdownOpen(true);
                }}
                onFocus={() => setCountyDropdownOpen(true)}
                onBlur={() => {
                  // Delay to allow click on dropdown item
                  setTimeout(() => setCountyDropdownOpen(false), 200);
                }}
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{
                  background: '#252b21',
                  border: '1px solid #333830',
                  color: '#e8e4d4',
                }}
              />
              {countyDropdownOpen && countySearch && filteredCounties.length > 0 && (
                <div
                  className="absolute z-50 left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-lg"
                  style={{ background: '#252b21', border: '1px solid #333830' }}
                >
                  {filteredCounties.slice(0, 20).map((county) => (
                    <button
                      key={county}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        update({ counties: [...filters.counties, county] });
                        setCountySearch('');
                        setCountyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs transition-colors hover:bg-[#333830]"
                      style={{ color: '#a8a490' }}
                    >
                      {county}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buck/Doe */}
          {filters.activityType !== 'fishing' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
                Buck/Doe
              </label>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #333830' }}>
                {([
                  { value: 'any' as const, label: 'Any' },
                  { value: 'either_sex' as const, label: 'Either Sex' },
                  { value: 'buck_only' as const, label: 'Buck Only' },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ buckDoe: opt.value })}
                    className="flex-1 py-2 text-xs font-medium transition-colors"
                    style={{
                      background: filters.buckDoe === opt.value ? '#3d6b35' : 'transparent',
                      color: filters.buckDoe === opt.value ? '#e8e4d4' : '#a8a490',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Activity type toggle */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Activity
            </label>
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #333830' }}>
              {(['all', 'hunting', 'fishing'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => update({ activityType: type })}
                  className="flex-1 py-2 text-xs font-medium capitalize transition-colors"
                  style={{
                    background: filters.activityType === type ? '#3d6b35' : 'transparent',
                    color: filters.activityType === type ? '#e8e4d4' : '#a8a490',
                  }}
                >
                  {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* States */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              States
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availableStates.map((state) => {
                const active = filters.states.includes(state.code);
                return (
                  <button
                    key={state.code}
                    onClick={() => update({ states: toggleArray(filters.states, state.code) })}
                    className="px-2.5 py-1 text-xs rounded-full transition-colors"
                    title={state.name}
                    style={{
                      background: active ? '#3d6b35' : '#252b21',
                      color: active ? '#e8e4d4' : '#a8a490',
                      border: `1px solid ${active ? '#3d6b35' : '#333830'}`,
                    }}
                  >
                    {state.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Land Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Land Type
            </label>
            <div className="space-y-1">
              {LAND_TYPE_OPTIONS.map((opt) => {
                const active = (filters.landTypes ?? []).includes(opt.id);
                return (
                  <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: active ? '#3d6b35' : 'transparent',
                        border: `1.5px solid ${active ? '#3d6b35' : '#4a5046'}`,
                      }}
                      onClick={() => update({ landTypes: toggleArray(filters.landTypes ?? [], opt.id) })}
                    >
                      {active && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-sm transition-colors flex items-center gap-1.5"
                      style={{ color: active ? '#e8e4d4' : '#a8a490' }}
                      onClick={() => update({ landTypes: toggleArray(filters.landTypes ?? [], opt.id) })}
                    >
                      <span className="text-xs">{opt.icon}</span>
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Weapon Types */}
          {filters.activityType !== 'fishing' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
                Weapon Type
              </label>
              <div className="space-y-1.5">
                {WEAPON_OPTIONS.map((weapon) => {
                  const active = filters.weaponTypes.includes(weapon.id);
                  return (
                    <label
                      key={weapon.id}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          background: active ? '#3d6b35' : 'transparent',
                          border: `1.5px solid ${active ? '#3d6b35' : '#4a5046'}`,
                        }}
                        onClick={() => update({ weaponTypes: toggleArray(filters.weaponTypes, weapon.id) })}
                      >
                        {active && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="text-sm transition-colors"
                        style={{ color: active ? '#e8e4d4' : '#a8a490' }}
                        onClick={() => update({ weaponTypes: toggleArray(filters.weaponTypes, weapon.id) })}
                      >
                        {weapon.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Species */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Species
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SPECIES_OPTIONS.filter((s) => {
                if (filters.activityType === 'hunting') {
                  return !['Bass', 'Trout', 'Catfish', 'Crappie', 'Red Drum', 'Flounder'].includes(s);
                }
                if (filters.activityType === 'fishing') {
                  return ['Bass', 'Trout', 'Catfish', 'Crappie', 'Red Drum', 'Flounder'].includes(s);
                }
                return true;
              }).map((sp) => {
                const active = filters.species.includes(sp);
                return (
                  <button
                    key={sp}
                    onClick={() => update({ species: toggleArray(filters.species, sp) })}
                    className="px-2.5 py-1 text-xs rounded-full transition-colors"
                    style={{
                      background: active ? 'rgba(196,146,58,0.2)' : '#252b21',
                      color: active ? '#c4923a' : '#a8a490',
                      border: `1px solid ${active ? '#c4923a' : '#333830'}`,
                    }}
                  >
                    {sp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Access Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Access Type
            </label>
            <div className="space-y-1.5">
              {ACCESS_OPTIONS.map((opt) => {
                const active = filters.accessTypes.includes(opt.id);
                return (
                  <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        background: active ? '#3d6b35' : 'transparent',
                        border: `1.5px solid ${active ? '#3d6b35' : '#4a5046'}`,
                      }}
                      onClick={() => update({ accessTypes: toggleArray(filters.accessTypes, opt.id) })}
                    >
                      {active && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-sm transition-colors"
                      style={{ color: active ? '#e8e4d4' : '#a8a490' }}
                      onClick={() => update({ accessTypes: toggleArray(filters.accessTypes, opt.id) })}
                    >
                      {opt.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Date range */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Date Range
            </label>
            <div className="space-y-2">
              <div>
                <p className="text-xs mb-1" style={{ color: '#6e6b5e' }}>From</p>
                <input
                  type="date"
                  value={filters.dateRange?.start ?? ''}
                  onChange={(e) =>
                    update({
                      dateRange: {
                        start: e.target.value,
                        end: filters.dateRange?.end ?? '',
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: '#252b21',
                    border: '1px solid #333830',
                    color: '#e8e4d4',
                    colorScheme: 'dark',
                  }}
                />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: '#6e6b5e' }}>To</p>
                <input
                  type="date"
                  value={filters.dateRange?.end ?? ''}
                  onChange={(e) =>
                    update({
                      dateRange: {
                        start: filters.dateRange?.start ?? '',
                        end: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: '#252b21',
                    border: '1px solid #333830',
                    color: '#e8e4d4',
                    colorScheme: 'dark',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Favorites toggle */}
          <div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm" style={{ color: '#a8a490' }}>Favorites only</span>
              <div
                className="w-9 h-5 rounded-full transition-colors relative"
                style={{ background: filters.showFavoritesOnly ? '#3d6b35' : '#333830' }}
                onClick={() => update({ showFavoritesOnly: !filters.showFavoritesOnly })}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full transition-transform"
                  style={{
                    background: '#e8e4d4',
                    left: filters.showFavoritesOnly ? '18px' : '2px',
                    transition: 'left 0.2s ease',
                  }}
                />
              </div>
            </label>
          </div>
        </div>
      </aside>
    </>
  );
}
