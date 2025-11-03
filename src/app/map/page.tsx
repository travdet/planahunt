"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from 'next/dynamic';
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { applyFilters, type Row } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import WMAModal from "@/components/WMAModal";
const Filters = dynamic(() => import('@/components/Filters'), { ssr: false });
const Mapbox = dynamic(() => import('@/components/Mapbox'), { 
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center bg-slate-50">
    <p className="text-slate-500">Loading map...</p>
  </div>
});
export default function MapPage(){
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    species: [],
    weapons: [],
    accessType: "any",
    sex: "any",
    regions: [],
    counties: [],
    date: null,
    dateRange: null,
    maxDistanceMi: null,
    tags: []
  });
  const [openWma, setOpenWma] = useState<WMA | null>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const allCounties = useMemo(()=>{
    const set = new Set<string>();
    (wmas as WMA[]).forEach(w => {
      if(w.counties) w.counties.forEach(c => set.add(c))
    });
    return Array.from(set).sort();
  }, []);
  
  const openWmaRules = useMemo(() => {
    if (!openWma) return [];
    return (rulesData as SeasonRule[])
      .filter(r => r.wma_id === openWma.wma_id)
      .map(r => resolveStatewide(r, openWma, statewide));
  }, [openWma]);
  
  const points = useMemo(() => {
    if (!mounted) return [];
    
    const byId = new Map((wmas as WMA[]).map(w => [w.wma_id, w]));
    const rows: Row[] = (rulesData as SeasonRule[])
      .map(r => {
        const wma = byId.get(r.wma_id);
        if (!wma) return null;
        const resolved = resolveStatewide(r, wma, statewide);
        return { wma, rule: resolved };
      })
      .filter((x): x is Row => x !== null);
    const filtered = applyFilters(rows, filters);
    const m = new Map<string, {wma:WMA, count:number}>();
    for (const row of filtered) {
      const id = row.wma.wma_id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id)!.count += 1;
    }
    
    return Array.from(m.values())
      .map(({wma, count}) => {
        const coords = wma.map_points?.check_stations?.[0]?.coords;
        if (!coords) return null;
        return { id: wma.wma_id, name: wma.name, count, lat: coords[1], lng: coords[0] };
      })
      .filter((p): p is any => p !== null);
  }, [mounted, filters]);
  
  const pick = (id: string) => {
    const w = (wmas as WMA[]).find(x => x.wma_id === id) || null;
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
      {openWma && <WMAModal wma={openWma} rules={openWmaRules} onClose={()=>setOpenWma(null)} />}
      <aside className="w-[350px] bg-slate-50 p-4 overflow-y-auto">
        <Filters filters={filters} setFilters={setFilters} counties={allCounties} />
      </aside>
      <section className="flex-1">
        <Mapbox points={points} onMarkerClick={pick} />
      </section>
    </main>
  )
}
