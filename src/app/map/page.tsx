"use client";
import { useMemo, useState } from "react";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { applyFilters, type Row } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import Filters from "@/components/Filters";
import Mapbox from "@/components/Mapbox";
import WMAModal from "@/components/WMAModal";

export default function MapPage(){
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

  const rows: Row[] = useMemo(()=>{
    const byId = new Map((wmas as WMA[]).map(w=>[w.id, w]));
    return (rulesData as SeasonRule[])
      .map(r => {
        const wma = byId.get(r.wma_id);
        if (!wma) return null;
        const resolved = resolveStatewide(r, statewide);
        return { wma, rule: resolved };
      })
      .filter((x): x is Row => x !== null);
  }, []);

  const filtered = useMemo(()=> applyFilters(rows, filters), [rows, filters]);

  const points = useMemo(()=>{
    const m = new Map<string, {wma:WMA, count:number}>();
    for (const row of filtered) {
      const id = row.wma.id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id)!.count += 1;
    }
    return Array.from(m.values())
      .filter(({wma}) => wma.lat != null && wma.lng != null)
      .map(({wma, count}) => ({...wma, count, lat: wma.lat!, lng: wma.lng!}));
  }, [filtered]);

  const pick = (id: string) => {
    const w = (wmas as WMA[]).find(x=>x.id===id) || null;
    setOpen(w);
  };

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
