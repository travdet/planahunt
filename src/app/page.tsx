"use client";

import { useEffect, useMemo, useState } from "react";
import type { FilterState, HomeLoc } from "@/lib/types";
import { AREAS_WITH_RULES, FILTER_OPTIONS, hasActiveFilters } from "@/lib/data";
import { filterAreas } from "@/lib/filters";
import { geocodeFirst } from "@/lib/map";
import { STORAGE_KEYS } from "@/lib/constants";
import FilterBar from "@/components/FilterBar";
import HomeLocation from "@/components/HomeLocation";
import Mapbox from "@/components/Mapbox";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";
import { fmtMDY } from "@/lib/util";
import { getUpcomingWindows } from "@/lib/rules";

const INITIAL_FILTERS: FilterState = {
  query: "",
  date: null,
  dateRange: null,
  dates: [],
  accessType: "any",
  sex: "any",
  weapons: [],
  species: [],
  counties: [],
  regions: [],
  tags: [],
  maxDistanceMi: null
};

export default function Page() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [home, setHome] = useState<HomeLoc>({ address: "", lat: null, lng: null });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [coordOverrides, setCoordOverrides] = useState<Record<string, { lat: number; lng: number }>>({});

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

  const filterOptions = useMemo(
    () => ({
      species: FILTER_OPTIONS.species,
      weapons: FILTER_OPTIONS.weapons,
      counties: FILTER_OPTIONS.counties,
      regions: FILTER_OPTIONS.regions,
      tags: FILTER_OPTIONS.tags
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
        tags: filters.tags.map((value) => value.toLowerCase())
      },
      { lat: home.lat, lng: home.lng },
      filters.maxDistanceMi ?? null
    );
  }, [areasWithCoords, filters, home.lat, home.lng]);

  const mapPoints = useMemo(() => {
    return filtered
      .filter((item) => typeof item.wma.lat === "number" && typeof item.wma.lng === "number")
      .map((item) => {
        const upcoming = getUpcomingWindows(item.allRules, 1)[0];
        const upcomingLabel = upcoming
          ? `${upcoming.species} (${upcoming.weapon}) • ${fmtMDY(upcoming.start)} – ${fmtMDY(upcoming.end)}`
          : null;

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
            : null
        };
      });
  }, [filtered]);

  const selectedArea = useMemo(() => {
    if (!selectedId) return null;
    const area = areasWithCoords.find((entry) => entry.wma.id === selectedId);
    if (!area) return null;
    const match = filtered.find((entry) => entry.wma.id === selectedId);
    return {
      ...area,
      distanceMi: match?.distanceMi ?? null
    };
  }, [selectedId, areasWithCoords, filtered]);

  const resultCount = filtered.length;
  const anyFilters = hasActiveFilters(filters);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 rounded-2xl bg-emerald-700 px-6 py-4 text-white">
        <h1 className="text-2xl font-semibold">Plan-A-Hunt · Georgia WMAs</h1>
        <p className="text-sm opacity-90">
          Discover Wildlife Management Areas, compare access rules, and plan a season in minutes.
        </p>
      </div>

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
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
              <div className="text-xs text-slate-500">
                {anyFilters ? "Filters applied" : "All WMAs shown"}
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

          <div className="space-y-4">
            {filtered.map((item) => (
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
            {filtered.length === 0 && (
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
