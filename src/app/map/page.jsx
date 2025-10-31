"use client";
import { useMemo, useState } from "react";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import { applyFilters } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import Filters from "@/components/Filters";
import Mapbox from "@/components/Mapbox";
import WMAModal from "@/components/WMAModal";

export default function MapPage(){
  const [filters, setFilters] = useState({
    query: "",
    accessType: "any",
    sex: "any",
    species: [],
    weapons: [],
    quota: "any",
    buckOnly: "any",
    regions: [],
    counties: [],
    openOn: null,
    distanceMi: null,
    home: null,
    tags: []
  });
  const [open, setOpen] = useState(null);

  const rows = useMemo(()=>{
    const byId = new Map(wmas.map((w)=>[w.id, w]));
    return rulesData.reduce((acc, r) => {
      const wma = byId.get(r.wma_id);
      if (!wma) return acc;
      const resolved = resolveStatewide(r, statewide);
      acc.push({ wma, rule: resolved });
      return acc;
    }, []);
  }, []);

  const filtered = useMemo(()=> applyFilters(rows, filters), [rows, filters]);

  const points = useMemo(()=>{
    const m = new Map();
    for (const row of filtered) {
      const id = row.wma.id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id).count += 1;
    }
    return Array.from(m.values())
      .filter(({ wma }) => typeof wma.lat === "number" && typeof wma.lng === "number")
      .map(({ wma, count }) => ({
        id: wma.id,
        name: wma.name,
        lat: wma.lat,
        lng: wma.lng,
        count
      }));
  }, [filtered]);

  const pick = (id) => {
    const w = wmas.find((x)=>x.id===id) || null;
    setOpen(w);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[340px,1fr]">
      <Filters value={filters} onChange={setFilters} wmas={wmas} rules={rulesData}/>
      <div>
        <Mapbox points={points} onPick={pick}/>
      </div>
      {open && (
        <WMAModal
          wma={open}
          rules={rulesData.filter((r) => r.wma_id === open.id)}
          onClose={()=>setOpen(null)}
        />
      )}
    </div>
  );
}
