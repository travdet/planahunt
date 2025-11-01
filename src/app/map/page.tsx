"use client";
import { useMemo, useState } from "react";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { applyFilters, type Row } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import Filters from "@/components/Filters";
import Mapbox, { type MapPoint } from "@/components/Mapbox";
import WMAModal from "@/components/WMAModal";

export default function MapPage(){
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
    quota: "any",
    buckOnly: "any",
    maxDistanceMi: null,
    home: null,
    homeAddress: null,
    homeLat: null,
    homeLng: null
  });
  const [open, setOpen] = useState<WMA|null>(null);

  const rows: Row[] = useMemo(()=>{
    const byId = new Map((wmas as WMA[]).map(w=>[w.id, w]));
    return (rulesData as SeasonRule[])
      .map((rule) => {
        const wma = byId.get(rule.wma_id) || null;
        if (!wma) return null;
        const resolved = resolveStatewide(rule, statewide);
        return { wma, rule: resolved } as Row;
      })
      .filter((entry): entry is Row => entry !== null);
  }, []);

  const filtered = useMemo(
    () => applyFilters(rows, filters, filters.home ?? null, filters.maxDistanceMi),
    [rows, filters]
  );

  const points: MapPoint[] = useMemo(()=>{
    const m = new Map<string, {wma:WMA, count:number}>();
    for (const row of filtered) {
      const wma = row?.wma;
      if (!wma) continue;
      const id = wma.id;
      if (!m.has(id)) m.set(id, { wma, count: 0 });
      m.get(id)!.count += 1;
    }
    return Array.from(m.values())
      .filter(({ wma }) => typeof wma?.lat === "number" && typeof wma?.lng === "number")
      .map(({ wma }) => ({
        id: wma.id,
        name: wma.name ?? "Unknown WMA",
        lat: wma.lat as number,
        lng: wma.lng as number
      }));
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
      {open && (
        <WMAModal
          wma={open}
          rules={(rulesData as SeasonRule[]).filter(r => r.wma_id===open.id)}
          onClose={()=>setOpen(null)}
        />
      )}
    </div>
  );
}
