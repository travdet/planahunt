"use client";

import type { FilterState, HomeLoc, SeasonRule, WMA } from "@/lib/types";
import { applyFilters } from "@/lib/filters";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";
import FilterBar from "@/components/FilterBar";
import HomeLocation from "@/components/HomeLocation";

// Import the new data files
import wmas from "@/data/wmas.json";
import rulesRaw from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import { resolveStatewide } from "@/lib/rules";

const Mapbox = dynamic(() => import("@/components/Mapbox"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Loading map...</p>
    </div>
  ),
});

export default function Page() {
  // initial filters
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    date: null,
    dateRange: null,
    accessType: "any",
    sex: "any",
    weapons: [],
    species: [],
    counties: [],
    regions: [],
    tags: [],
    maxDistanceMi: null
  });

  const [home, setHome] = useState<HomeLoc>({ address: "", lat: null, lng: null });

  // Modal state
  const [openId, setOpenId] = useState<string | null>(null);

  // Data joins
  const rows = useMemo(()=>{
    const byWma = new Map<string, WMA>();
    (wmas as WMA[]).forEach(w => byWma.set(w.wma_id, w));

    return (rulesRaw as SeasonRule[])
      .map(r => {
        const wma = byWma.get(r.wma_id);
        if (!wma) return null;
        
        const resolvedRule = resolveStatewide(r, wma, statewide);
        return { wma, rule: resolvedRule };
      })
      .filter((x): x is { wma: WMA; rule: SeasonRule } => x !== null);
  }, []);

  const allCounties = useMemo(()=>{
    const set = new Set<string>();
    (wmas as WMA[]).forEach(w => {
      if(w.counties) w.counties.forEach(c => set.add(c));
    });
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(()=>{
    return applyFilters(rows, filters, { lat: home.lat, lng: home.lng }, filters.maxDistanceMi || null);
  }, [rows, filters, home.lat, home.lng]);

  const grouped = useMemo(()=>{
    const m = new Map<string, { wma: WMA; rules: SeasonRule[] }>();
    filtered.forEach(({ wma, rule }) => {
      if (!m.has(wma.wma_id)) m.set(wma.wma_id, { wma, rules: [] });
      m.get(wma.wma_id)!.rules.push(rule);
    });
    return Array.from(m.values()).sort((a,b)=>a.wma.name.localeCompare(b.wma.name));
  }, [filtered]);

  const points = useMemo(() => {
    return grouped
      .map(({ wma, rules }) => {
        const coords = wma.map_points?.check_stations?.[0]?.coords;
        if (!coords) return null;
        return {
          id: wma.wma_id,
          name: wma.name,
          lat: coords[1],
          lng: coords[0],
          count: rules.length,
        };
      })
      .filter((p): p is {id:string; name:string; lat:number; lng:number; count:number} => p !== null);
  }, [grouped]);
  
  const openWmaData = useMemo(() => {
    if (!openId) return null;
    const wma = (wmas as WMA[]).find(w => w.wma_id === openId);
    if (!wma) return null;
    const rules = (rulesRaw as SeasonRule[])
      .filter(r => r.wma_id === openId)
      .map(r => resolveStatewide(r, wma, statewide));
    return { wma, rules };
  }, [openId]);

  return (
    <main className="container mx-auto px-4 py-8">
      {openWmaData && <WMAModal wma={openWmaData.wma} rules={openWmaData.rules} onClose={() => setOpenId(null)} />}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Plan A Hunt</h1>
        <p className="text-slate-600">
          Find hunting seasons for Georgia Wildlife Management Areas (WMAs).
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <FilterBar filters={filters} onChange={(f) => setFilters(prev => ({...prev, ...f}))} allCounties={allCounties} />
          <HomeLocation value={home} onChange={setHome} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Mapbox points={points} onPick={(id) => setOpenId(id)} />
          <div className="space-y-4">
            {grouped.map(({ wma, rules }) => (
              <WMACard key={wma.wma_id} wma={wma} rules={rules} home={home} onOpen={() => setOpenId(wma.wma_id)} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
