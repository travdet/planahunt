"use client";
import { useMemo, useState } from "react";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { applyFilters, type JoinedRow } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import Filters from "@/components/Filters";
import Mapbox from "@/components/Mapbox";
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
    maxDistanceMi: null,
    home: null,
  });
  const [open, setOpen] = useState<WMA|null>(null);

  const rows: JoinedRow[] = useMemo(()=>{
    const byId = new Map((wmas as WMA[]).map(w=>[w.id, w]));
    return (rulesData as SeasonRule[])
      .map(r => {
        const resolved = resolveStatewide(r, statewide);
        const wma = byId.get(r.wma_id) ?? null;
        return wma ? { wma, rule: resolved } : null;
      })
      .filter((entry): entry is JoinedRow => !!entry);
  }, []);

  const filtered = useMemo(
    () => applyFilters(rows, filters, filters.home ?? undefined, filters.maxDistanceMi),
    [rows, filters]
  );

  const points = useMemo(()=>{
    const m = new Map<string, {wma:WMA, count:number}>();
    for (const row of filtered) {
      const wma = row.wma;
      if (wma.lat == null || wma.lng == null) continue;
      const id = wma.id;
      if (!m.has(id)) m.set(id, { wma, count: 0 });
      const record = m.get(id);
      if (record) record.count += 1;
    }
    return Array.from(m.values()).map(({wma, count}) => ({
      id: wma.id,
      name: wma?.name ?? "Unknown WMA",
      tract_name: wma.tract_name,
      area_type: wma.area_type ?? undefined,
      acreage: wma.acreage ?? undefined,
      phone: wma.phone ?? undefined,
      counties: wma.counties,
      region: wma.region ?? undefined,
      lat: wma.lat!,
      lng: wma.lng!,
      source_url: wma.source_url ?? undefined,
      tags: wma.tags,
      count,
    }));
  }, [filtered]);

  const pick = (id: string) => {
    const w = (wmas as WMA[]).find(x=>x.id===id) || null;
    setOpen(w ?? null);
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
          rules={(rulesData as SeasonRule[]).filter(r => r.wma_id === open.id)}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
