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
  dateRange: null, // Use new dateRange property
  maxDistanceMi: null,
  tags: [],
};

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  // Add home state (required for applyFilters)
  const [home, setHome] = useState<HomeLocation | null>(null);
  const [openWma, setOpenWma] = useState<WMA | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // WMA Rules for Modal
  const openWmaRules = useMemo(() => {
    if (!openWma) return [];
    // Must re-resolve all rules for the selected WMA
    // Use flatMap to handle array-based logic
    return (rulesData as SeasonRule[])
      .filter((r) => r.wma_id === openWma.wma_id)
      .flatMap((rule) => resolveStatewide(rule, openWma, statewide));
  }, [openWma]);

  // Data for the map points
  const mapPoints = useMemo(() => {
    if (!mounted) return [];

    const byId = new Map((wmas as WMA[]).map((w) => [w.wma_id, w]));
    
    // Use flatMap to handle resolveStatewide returning an array
    const rows: Row[] = (rulesData as SeasonRule[]).flatMap((rule) => {
      const wma = byId.get(rule.wma_id);
      if (!wma) return []; // Return empty array to be filtered out

      const resolvedRules = resolveStatewide(rule, wma, statewide);
      return resolvedRules.map((resolvedRule) => ({
        wma,
        rule: resolvedRule,
      }));
    });
    
    // Pass 'home' to applyFilters
    const filtered = applyFilters(rows, filters, home);
    
    // Group by WMA
    const m = new Map<string, { wma: WMA; count: number }>();
    for (const row of filtered) {
      const id = row.wma.wma_id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id)!.count += 1;
    }

    return Array.from(m.values())
      .map(({ wma, count }) => {
        // UPDATED: Use wma.lat and wma.lng for more reliable coordinates
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
  }, [mounted, filters, home]);

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
        <WMAModal
          wma={openWma}
          rules={openWmaRules}
          onClose={() => setOpenWma(null)}
        />
      )}
      <aside className="w-[350px] bg-slate-50 p-4 overflow-y-auto">
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
