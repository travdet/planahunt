"use client";
import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { WMA, SeasonRule, FilterState, HomeLocation } from "@/lib/types";
import { resolveStatewide } from "@/lib/rules";
import { applyFilters, type Row } from "@/lib/filters";
import { toISO } from "@/lib/util";
import WMACard from "@/components/WMACard";
import FilterBar from "@/components/FilterBar";
import AddressField from "@/components/AddressField";
import WMAModal from "@/components/WMAModal";

const Mapbox = dynamic(() => import("@/components/Mapbox"), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-slate-50 rounded-xl border"><p className="text-slate-500">Loading map...</p></div>
});

const defaultFilters: FilterState = {
  query: "",
  accessType: "any",
  sex: "any",
  weapons: [],
  species: [],
  counties: [],
  regions: [],
  tags: [],
  maxDistanceMi: null,
  dateRange: null, 
  showFavorites: false, // Initial state for the new filter
};

const FAVORITES_KEY = "planahunt_favorites";

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [home, setHome] = useState<HomeLocation | null>(null);
  const [openWma, setOpenWma] = useState<WMA | null>(null);
  
  // FAVORITES STATE & STORAGE
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    // Load favorites from local storage on mount
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load favorites", e);
    }
  }, []);

  const toggleFavorite = (wma_id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(wma_id)) {
        newFavorites.delete(wma_id);
      } else {
        newFavorites.add(wma_id);
      }
      const favArray = Array.from(newFavorites);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favArray));
      } catch (e) {
        console.error("Could not save favorites", e);
      }
      return favArray;
    });
  };
  // END FAVORITES LOGIC

  const rows: Row[] = useMemo(() => {
    const byId = new Map((wmas as WMA[]).map((w) => [w.wma_id, w]));
    return (rulesData as SeasonRule[]).flatMap((rule) => {
      const wma = byId.get(rule.wma_id);
      if (!wma) return []; 
      const resolvedRules = resolveStatewide(rule, wma, statewide);
      return resolvedRules.map((resolvedRule) => ({
        wma,
        rule: resolvedRule,
      }));
    });
  }, []); 

  const allCounties = useMemo(
    () => Array.from(new Set((wmas as WMA[]).flatMap((w) => w.counties))).sort(),
    []
  );
  const allSpecies = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.rule.species.toLowerCase()))).sort(),
    [rows]
  );
  const allWeapons = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.rule.weapon.toLowerCase()))).sort(),
    [rows]
  );
  const allTags = useMemo(
    () =>
      Array.from(
        new Set(
          rows.flatMap((r) => [
            ...(r.wma.tags || []),
            ...(r.rule.tags || []),
          ])
        )
      ).sort(),
    [rows]
  );

  // PASS FAVORITES TO FILTER FUNCTION
  const filteredRows = useMemo(() => {
    return applyFilters(rows, filters, home, favorites);
  }, [rows, filters, home, favorites]);

  const groupedByWma = useMemo(() => {
    const map = new Map<string, { wma: WMA; rules: SeasonRule[] }>();
    for (const { wma, rule } of filteredRows) {
      if (!map.has(wma.wma_id)) {
        map.set(wma.wma_id, { wma, rules: [] });
      }
      map.get(wma.wma_id)!.rules.push(rule);
    }
    return Array.from(map.values());
  }, [filteredRows]);
  
  const mapPoints = useMemo(() => {
    return groupedByWma
      .map(({ wma }) => {
        if (wma.lat == null || wma.lng == null) return null;
        return {
          id: wma.wma_id,
          name: wma.name,
          lat: wma.lat,
          lng: wma.lng,
        };
      })
      .filter((p): p is { id: string; name: string; lat: number; lng: number } => p !== null);
  }, [groupedByWma]);

  const openWmaRules = useMemo(() => {
    if (!openWma) return [];
    return (rulesData as SeasonRule[])
      .filter((r) => r.wma_id === openWma.wma_id)
      .flatMap((rule) => resolveStatewide(rule, openWma, statewide));
  }, [openWma]);
  
  const selectedDate = useMemo(() => {
    return filters.dateRange ? toISO(filters.dateRange.start) : null;
  }, [filters.dateRange]);
  
  const pickWma = (id: string) => {
    const w = (wmas as WMA[]).find((x) => x.wma_id === id) || null;
    setOpenWma(w);
  };
  
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  return (
    <>
      {openWma && (
        <WMAModal
          wma={openWma}
          rules={openWmaRules}
          onClose={() => setOpenWma(null)}
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <aside className="h-fit md:sticky md:top-6 md:col-span-4 lg:col-span-3">
          <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
            <AddressField
              value={home || { address: "", lat: null, lng: null }}
              onChange={setHome}
            />
          </div>
          <FilterBar
            filters={filters}
            onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
            allCounties={allCounties}
            allSpecies={allSpecies}
            allWeapons={allWeapons}
            allTags={allTags}
          />
        </aside>

        <section className="md:col-span-8 lg:col-span-9 space-y-4">
          <div className="h-[400px] w-full rounded-xl border shadow-sm overflow-hidden">
            <Mapbox points={mapPoints} onPick={pickWma} />
          </div>

          <div className="mb-4 text-sm text-slate-600">
            Showing **{groupedByWma.length}** WMAs matching filters.
          </div>
          <div className="space-y-4">
            {groupedByWma.map(({ wma, rules }) => (
              <WMACard
                key={wma.wma_id}
                wma={wma}
                rules={rules}
                date={selectedDate} 
                home={home}
                onOpen={() => setOpenWma(wma)}
                isFavorite={favoriteSet.has(wma.wma_id)} // Pass favorite status
                onToggleFavorite={() => toggleFavorite(wma.wma_id)} // Pass toggle function
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
