"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA, HomeLocation } from "@/lib/types";
import { applyFilters, type Row } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import WMAModal from "@/components/WMAModal";
import AddressField from "@/components/AddressField";
import { toISO } from "@/lib/util";

const Filters = dynamic(() => import("@/components/Filters"), { ssr: false });
const Mapbox = dynamic(() => import("@/components/Mapbox"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Loading map...</p>
    </div>
  ),
});

const defaultFilters: FilterState = {
  query: "",
  species: [],
  weapons: [],
  accessType: "any",
  sex: "any",
  regions: [],
  counties: [],
  dateRange: null,
  maxDistanceMi: null,
  tags: [],
  showFavorites: false, // Added this missing property
};

// 1. ADDED FAVORITES KEY
const FAVORITES_KEY = "planahunt_favorites";

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [home, setHome] = useState<HomeLocation | null>(null);
  const [openWma, setOpenWma] = useState<WMA | null>(null);

  // 2. ADDED FAVORITES STATE & LOGIC
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) { console.error("Could not load favorites", e); }
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
      } catch (e) { console.error("Could not save favorites", e); }
      return favArray;
    });
  };

  const handleApplyFilter = (newFilters: Partial<FilterState>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
      setOpenWma(null); 
  }
  // --- END FAVORITES LOGIC ---
  
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openWmaRules = useMemo(() => {
    if (!openWma) return [];
    return (rulesData as SeasonRule[])
      .filter((r) => r.wma_id === openWma.wma_id)
      .flatMap((rule) => resolveStatewide(rule, openWma, statewide));
  }, [openWma]);

  const mapPoints = useMemo(() => {
    if (!mounted) return [];

    const byId = new Map((wmas as WMA[]).map((w) => [w.wma_id, w]));
    
    const rows: Row[] = (rulesData as SeasonRule[]).flatMap((rule) => {
      const wma = byId.get(rule.wma_id);
      if (!wma) return [];

      const resolvedRules = resolveStatewide(rule, wma, statewide);
      return resolvedRules.map((resolvedRule) => ({
        wma,
        rule: resolvedRule,
      }));
    });
    
    // 3. PASS 'favorites' TO applyFilters
    const filtered = applyFilters(rows, filters, home, favorites); 
    
    const m = new Map<string, { wma: WMA; count: number }>();
    for (const row of filtered) {
      const id = row.wma.wma_id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id)!.count += 1;
    }

    return Array.from(m.values())
      .map(({ wma, count }) => {
        if (wma.lat == null || wma.lng == null) {
          return null;
        }
        return {
          id: wma.wma_id,
          name: wma.name,
          count,
          lat: wma.lat,
          lng: wma.lng,
        };
      })
      .filter((p): p is any => p !== null);
  }, [mounted, filters, home, favorites]);

  const pick = (id: string) => {
    const w = (wmas as WMA[]).find((x) => x.wma_id === id) || null;
    setOpenWma(w);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex h-screen max-h-screen">
      {openWma && (
        // 4. ADDED ALL REQUIRED PROPS TO THE MODAL
        <WMAModal
          wma={openWma}
          rules={openWmaRules}
          onClose={() => setOpenWma(null)}
          onToggleFavorite={() => toggleFavorite(openWma.wma_id)}
          isFavorite={favoriteSet.has(openWma.wma_id)}
          onApplyFilter={handleApplyFilter}
        />
      )}
      <aside className="w-[350px] bg-slate-50 p-4 overflow-y-auto">
        {/* We'll add the AddressField to the map page later if you want it */}
        {/* <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
            <AddressField
              value={home || { address: "", lat: null, lng: null }}
              onChange={setHome}
            />
          </div> */}
        <Filters
          value={filters}
          onChange={setFilters}
          wmas={wmas as WMA[]}
          rules={rulesData as SeasonRule[]}
        />
      </aside>
      <section className="flex-1">
        <Mapbox points={mapPoints} onPick={pick} />
      </section>
    </main>
  );
}
