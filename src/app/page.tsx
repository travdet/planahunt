"use client";

import { useEffect, useMemo, useState } from "react";
import type { FilterState, HomeLoc } from "@/lib/types";
import { AREAS_WITH_RULES, FILTER_OPTIONS, hasActiveFilters } from "@/lib/data";
import { filterAreas, type FilteredArea } from "@/lib/filters";
import { geocodeFirst } from "@/lib/map";
import { STORAGE_KEYS } from "@/lib/constants";
import FilterBar from "@/components/FilterBar";
import HomeLocation from "@/components/HomeLocation";
import QuickFilters, { resetQuickFilters, type QuickFilterState } from "@/components/QuickFilters";
import FavoritesSection from "@/components/FavoritesSection";
import Mapbox from "@/components/Mapbox";
import SortDropdown, { type SortOption } from "@/components/SortDropdown";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";
import { fmtMDY, todayISO } from "@/lib/util";
import { getUpcomingWindows, isRuleActiveOnDate, summarizeAccessProfile } from "@/lib/rules";
import { getAccessBadgeStyle } from "@/lib/palette";
import { useFavorites } from "@/hooks/useFavorites";

const INITIAL_FILTERS: FilterState = {
  query: "",
  date: null,
  dateRange: null,
  dates: [],
  accessType: "general",
  sex: "any",
  weapons: [],
  species: [],
  counties: [],
  regions: [],
  tags: [],
  areaCategories: [],
  weaponSubcategories: [],
  activityTypes: [],
  campingAllowed: null,
  atvAllowed: null,
  maxDistanceMi: null
};

export default function Page() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [home, setHome] = useState<HomeLoc>({ address: "", lat: null, lng: null });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [coordOverrides, setCoordOverrides] = useState<Record<string, { lat: number; lng: number }>>({});
  const { favorites } = useFavorites();
  const [quickFilters, setQuickFilters] = useState<QuickFilterState>(() => resetQuickFilters());
  const [sortBy, setSortBy] = useState<SortOption>("name");

  // load stored home location
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEYS.home);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      setHome({
        address: parsed.address ?? "",
        lat: parsed.lat ?? null,
        lng: parsed.lng ?? null
      });
    } catch (error) {
      console.warn("Failed to load stored home location", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.home, JSON.stringify(home));
  }, [home]);

  // load stored WMA coordinates
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEYS.wmaCoords);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      setCoordOverrides(parsed ?? {});
    } catch (error) {
      console.warn("Failed to load cached WMA coordinates", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.wmaCoords, JSON.stringify(coordOverrides));
  }, [coordOverrides]);

  // geocode WMAs missing coordinates
  useEffect(() => {
    if (typeof window === "undefined") return;
    const missing = AREAS_WITH_RULES.map((area) => area.wma)
      .filter((wma) => (wma.lat == null || wma.lng == null) && !coordOverrides[wma.id]);
    if (!missing.length) return;

    let cancelled = false;

    async function run() {
      for (const wma of missing) {
        try {
          const query = `${wma.name} ${wma.counties[0] ?? ""} GA`;
          const hit = await geocodeFirst(query);
          if (!hit || cancelled) continue;
          setCoordOverrides((prev) => {
            if (prev[wma.id]) return prev;
            return { ...prev, [wma.id]: { lat: hit.lat, lng: hit.lng } };
          });
          await new Promise((resolve) => setTimeout(resolve, 250));
        } catch (error) {
          console.warn("Failed to geocode WMA", wma.name, error);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [coordOverrides]);

  const areasWithCoords = useMemo(() => {
    return AREAS_WITH_RULES.map((area) => {
      const override = coordOverrides[area.wma.id];
      return {
        wma: override ? { ...area.wma, lat: override.lat, lng: override.lng } : area.wma,
        rules: area.rules
      };
    });
  }, [coordOverrides]);

  const openTodaySummary = useMemo(() => {
    const today = todayISO();
    const ids = new Set<string>();
    let huntCount = 0;
    for (const area of areasWithCoords) {
      const openRules = area.rules.filter((rule) => isRuleActiveOnDate(rule, today));
      if (openRules.length) {
        ids.add(area.wma.id);
        huntCount += openRules.length;
      }
    }
    return { wmaCount: ids.size, huntCount };
  }, [areasWithCoords]);

  const filterOptions = useMemo(
    () => ({
      species: FILTER_OPTIONS.species,
      weapons: FILTER_OPTIONS.weapons,
      counties: FILTER_OPTIONS.counties,
      regions: FILTER_OPTIONS.regions,
      tags: FILTER_OPTIONS.tags,
      areaCategories: FILTER_OPTIONS.areaCategories,
      weaponSubcategories: FILTER_OPTIONS.weaponSubcategories,
      activityTypes: FILTER_OPTIONS.activityTypes
    }),
    []
  );

  const filtered = useMemo(() => {
    return filterAreas(
      areasWithCoords,
      {
        ...filters,
        species: filters.species.map((value) => value.toLowerCase()),
        weapons: filters.weapons.map((value) => value.toLowerCase()),
        tags: filters.tags.map((value) => value.toLowerCase()),
        areaCategories: filters.areaCategories.map((value) => value.toLowerCase()),
        weaponSubcategories: filters.weaponSubcategories.map((value) => value.toLowerCase()),
        activityTypes: filters.activityTypes.map((value) => value.toLowerCase())
      },
      { lat: home.lat, lng: home.lng },
      filters.maxDistanceMi ?? null
    );
  }, [areasWithCoords, filters, home.lat, home.lng]);

  const quickFiltered = useMemo(
    () => applyQuickFilters(filtered, quickFilters, favorites),
    [filtered, quickFilters, favorites]
  );

  const sorted = useMemo(() => sortAreas(quickFiltered, sortBy), [quickFiltered, sortBy]);

  const quickFiltersActive = useMemo(
    () => Object.values(quickFilters).some(Boolean),
    [quickFilters]
  );

  const mapPoints = useMemo(() => {
    return sorted
      .filter((item) => typeof item.wma.lat === "number" && typeof item.wma.lng === "number")
      .map((item) => {
        const upcoming = getUpcomingWindows(item.allRules, 1)[0];
        const upcomingLabel = upcoming
          ? `${upcoming.species} (${upcoming.weapon}) • ${fmtMDY(upcoming.start)} – ${fmtMDY(upcoming.end)}`
          : null;
        const accessProfile = summarizeAccessProfile(item.allRules);
        const accessBadge = getAccessBadgeStyle(accessProfile);

        return {
          id: item.wma.id,
          name: item.wma.name,
          lat: item.wma.lat as number,
          lng: item.wma.lng as number,
          counties: item.wma.counties,
          region: item.wma.region ?? null,
          acreage: item.wma.acreage ?? null,
          distanceMi: item.distanceMi,
          driveMinutes: item.driveMinutes,
          upcoming: upcomingLabel
            ? {
                label: upcomingLabel,
                access: upcoming.access === "general" ? "General access" : "Quota access"
              }
            : null,
          areaCategory: item.wma.area_category ?? "WMA",
          campingAllowed: !!item.wma.camping_allowed,
          atvAllowed: !!item.wma.atv_allowed,
          accessProfile,
          accessLabel: accessBadge.label,
          accessIcon: accessBadge.icon
        };
      });
  }, [sorted]);

  const selectedArea = useMemo(() => {
    if (!selectedId) return null;
    const area = areasWithCoords.find((entry) => entry.wma.id === selectedId);
    if (!area) return null;
    const match =
      sorted.find((entry) => entry.wma.id === selectedId) ??
      filtered.find((entry) => entry.wma.id === selectedId);
    return {
      ...area,
      distanceMi: match?.distanceMi ?? null
    };
  }, [selectedId, areasWithCoords, sorted, filtered]);

  const resultCount = sorted.length;
  const anyFilters = hasActiveFilters(filters) || quickFiltersActive;

  const handleOpenToday = () => {
    setQuickFilters((current) => ({ ...current, openNow: true }));
    if (typeof document !== "undefined") {
      document.getElementById("wma-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 rounded-2xl bg-emerald-700 px-6 py-4 text-white">
        <h1 className="text-2xl font-semibold">Plan-A-Hunt · Georgia WMAs</h1>
        <p className="text-sm opacity-90">
          Discover Wildlife Management Areas, compare access rules, and plan a season in minutes.
        </p>
      </div>

      <div className="mb-8">
        <button
          type="button"
          onClick={handleOpenToday}
          className="w-full rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-emerald-700 hover:shadow-xl md:w-auto md:px-8"
        >
          <span className="mr-3 text-2xl" aria-hidden>
            🎯
          </span>
          What&apos;s open today?
          <span className="ml-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-bold text-emerald-600">
            {openTodaySummary.wmaCount}
          </span>
        </button>
        <p className="mt-2 text-center text-sm text-slate-600 md:text-left">
          {openTodaySummary.huntCount} hunting {openTodaySummary.huntCount === 1 ? "opportunity" : "opportunities"} available today
          across {openTodaySummary.wmaCount} {openTodaySummary.wmaCount === 1 ? "area" : "areas"}
        </p>
      </div>

      <FavoritesSection wmas={areasWithCoords} onOpen={(id) => setSelectedId(id)} />

      <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <div className="space-y-6">
          <HomeLocation
            value={home}
            onChange={setHome}
            maxDistance={filters.maxDistanceMi ?? null}
            onDistanceChange={(miles) =>
              setFilters((prev) => ({
                ...prev,
                maxDistanceMi: miles
              }))
            }
          />
          <FilterBar
            filters={filters}
            options={filterOptions}
            onChange={(partial) => setFilters((prev) => ({ ...prev, ...partial }))}
            onReset={() => setFilters(INITIAL_FILTERS)}
          />
        </div>

        <div className="space-y-5">
          <QuickFilters
            value={quickFilters}
            onChange={setQuickFilters}
            favoritesCount={favorites.length}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">{resultCount} WMAs match</p>
                {filters.date && (
                  <p className="text-xs text-slate-500">
                    Showing seasons active on <span className="font-medium">{fmtMDY(filters.date)}</span>
                  </p>
                )}
                {!filters.date && filters.dateRange?.start && filters.dateRange?.end && (
                  <p className="text-xs text-slate-500">
                    Matching seasons overlapping {fmtMDY(filters.dateRange.start)} – {fmtMDY(filters.dateRange.end)}
                  </p>
                )}
                {!filters.date && !filters.dateRange?.start && !filters.dateRange?.end && filters.dates && filters.dates.length > 0 && (
                  <p className="text-xs text-slate-500">
                    Matching seasons on {filters.dates.slice(0, 3).map((value) => fmtMDY(value)).join(", ")}
                    {filters.dates.length > 3 ? ` +${filters.dates.length - 3} more` : ""}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                <SortDropdown value={sortBy} onChange={setSortBy} />
                <span className="text-xs text-slate-500">
                  {anyFilters ? "Filters applied" : "All WMAs shown"}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Mapbox
                points={mapPoints}
                onPick={(id) => setSelectedId(id)}
                home={home.lat != null && home.lng != null ? { lat: home.lat, lng: home.lng } : null}
              />
            </div>
          </div>

          <div id="wma-list" className="space-y-4">
            {sorted.map((item) => (
              <WMACard
                key={item.wma.id}
                wma={item.wma}
                matchingRules={item.matchingRules}
                allRules={item.allRules}
                selectedDate={filters.date ?? null}
                distanceMi={item.distanceMi}
                driveMinutes={item.driveMinutes}
                onOpen={() => setSelectedId(item.wma.id)}
              />
            ))}
            {sorted.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
                No WMAs match those filters. Try widening your date range or clearing filters.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedArea && (
        <WMAModal wma={selectedArea.wma} rules={selectedArea.rules} onClose={() => setSelectedId(null)} />
      )}
    </main>
  );
}

function applyQuickFilters(
  list: FilteredArea[],
  quick: QuickFilterState,
  favorites: string[]
): FilteredArea[] {
  if (!list.length) return list;
  const favoritesSet = new Set(favorites);
  const today = todayISO();

  return list.filter((entry) => {
    const category = (entry.wma.area_category || "WMA").toLowerCase().trim();
    const accessProfile = summarizeAccessProfile(entry.allRules);
    const hasGeneral = accessProfile === "general" || accessProfile === "mixed";
    const hasArchery = entry.allRules.some((rule) => {
      const weapon = String(rule.weapon).toLowerCase();
      return rule.weaponKey.includes("archery") || weapon.includes("archery");
    });
    const hasDeer = entry.allRules.some((rule) => rule.speciesKey === "deer");
    const hasTurkey = entry.allRules.some((rule) => rule.speciesKey === "turkey");
    const isOpenToday = entry.allRules.some((rule) => isRuleActiveOnDate(rule, today));

    if (quick.favoritesOnly && !favoritesSet.has(entry.wma.id)) return false;
    if (quick.openNow && !isOpenToday) return false;
    if (quick.camping && !entry.wma.camping_allowed) return false;
    if (quick.generalAccess && !hasGeneral) return false;
    if (quick.archery && !hasArchery) return false;
    if (quick.federal && category !== "federal") return false;
    if (quick.stateParks && category !== "state park") return false;
    if (quick.deer && !hasDeer) return false;
    if (quick.turkey && !hasTurkey) return false;

    return true;
  });
}

function sortAreas(list: FilteredArea[], sortBy: SortOption): FilteredArea[] {
  const arr = [...list];

  if (sortBy === "acreage") {
    arr.sort((a, b) => {
      const aSize = a.wma.acreage ?? 0;
      const bSize = b.wma.acreage ?? 0;
      if (bSize !== aSize) return bSize - aSize;
      return a.wma.name.localeCompare(b.wma.name);
    });
    return arr;
  }

  if (sortBy === "opening-soon") {
    const today = todayISO();
    arr.sort((a, b) => {
      const aOpen = a.allRules.some((rule) => isRuleActiveOnDate(rule, today));
      const bOpen = b.allRules.some((rule) => isRuleActiveOnDate(rule, today));
      if (aOpen !== bOpen) return aOpen ? -1 : 1;
      const aNext = getUpcomingWindows(a.allRules, 1, today)[0]?.start ?? "9999-12-31";
      const bNext = getUpcomingWindows(b.allRules, 1, today)[0]?.start ?? "9999-12-31";
      if (aNext !== bNext) return aNext.localeCompare(bNext);
      return a.wma.name.localeCompare(b.wma.name);
    });
    return arr;
  }

  arr.sort((a, b) => a.wma.name.localeCompare(b.wma.name));
  return arr;
}
