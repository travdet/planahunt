"use client";
import { useMemo, useState, useEffect } from "react";
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
  loading: () => <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-50">
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
  const [open, setOpen] = useState<WMA|null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rows: Row[] = useMemo(()=>{
    if (!mounted) return [];
    const byId = new Map((wmas as WMA[]).map(w=>[w.id, w]));
    return (rulesData as SeasonRule[])
      .map(r => {
        const wma = byId.get(r.wma_id);
        if (!wma) return null;
        const resolved = resolveStatewide(r, statewide);
        return { wma, rule: resolved };
      })
      .filter((x): x is Row => x !== null);
  }, [mounted]);

  const filtered = useMemo(()=> {
    if (!mounted) return [];
    return applyFilters(rows, filters);
  }, [mounted, rows, filters]);

  const points = useMemo(()=>{
    if (!mounted) return [];
    const m = new Map<string, {wma:WMA, count:number}>();
    for (const row of filtered) {
      const id = row.wma.id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id)!.count += 1;
    }
    return Array.from(m.values())
      .filter(({wma}) => wma.lat != null && wma.lng != null)
      .map(({wma, count}) => ({...wma, count, lat: wma.lat!, lng: wma.lng!}));
  }, [mounted, filtered]);

  const pick = (id: string) => {
    const w = (wmas as WMA[]).find(x=>x.id===id) || null;
    setOpen(w);
  };

  if (!mounted) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-[340px,1fr]">
      <Filters value={filters} onChange={setFilters} wmas={wmas as WMA[]} rules={rulesData as SeasonRule[]}/>
      <div>
        <Mapbox points={points} onPick={pick}/>
      </div>
      <WMAModal wma={open} rules={open? (rulesData as SeasonRule[]).filter(r => r.wma_id===open.id) : []} onClose={()=>setOpen(null)}/>
    </div>
  );
}
