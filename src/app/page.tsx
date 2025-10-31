"use client";
import { useMemo, useState } from "react";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { applyFilters, type Row } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
import Filters from "@/components/Filters";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";

function toCSV(rows: Row[]){
  const head = ["WMA","Region","Counties","Species","Weapon","Start","End","Quota","BuckOnly","Tags"];
  const lines = rows.map(({wma,rule}) => [
    wma.name,wma.region,wma.counties.join("/"),rule.species,rule.weapon,rule.start_date,rule.end_date,
    rule.quota_required?"Yes":"No", rule.buck_only?"Yes":"No", (rule.tags||[]).join("|")
  ].map(v => JSON.stringify(v??"")).join(","));
  return head.join(",") + "\n" + lines.join("\n");
}

export default function HomePage(){
  const [filters, setFilters] = useState<FilterState>({
    query: "", species: [], weapons: [], quota: "any", buckOnly: "any",
    regions: [], counties: [], openOn: null, distanceMi: null, home: null, tags: []
  });
  const [open, setOpen] = useState<WMA|null>(null);

  const rows: Row[] = useMemo(()=>{
    const byId = new Map((wmas as WMA[]).map(w=>[w.id, w]));
    return (rulesData as SeasonRule[]).map(r => {
      const resolved = resolveStatewide(r, statewide);
      return { wma: byId.get(r.wma_id)!, rule: resolved };
    }).filter(x=>!!x.wma);
  }, []);

  const filtered = useMemo(()=> applyFilters(rows, filters), [rows, filters]);

  // group by WMA id
  const grouped = useMemo(()=>{
    const m = new Map<string, {wma:WMA, rules:SeasonRule[]}>();
    for (const row of filtered) {
      const k = row.wma.id;
      if (!m.has(k)) m.set(k, { wma: row.wma, rules: [] });
      m.get(k)!.rules.push(row.rule);
    }
    return Array.from(m.values()).sort((a,b)=> a.wma.name.localeCompare(b.wma.name));
  }, [filtered]);

  const exportCSV = () => {
    const blob = new Blob([toCSV(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plan-a-hunt.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[340px,1fr]">
      <Filters value={filters} onChange={setFilters} wmas={wmas as WMA[]} rules={rulesData as SeasonRule[]}/>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">{filtered.length} season windows • {grouped.length} WMAs</div>
          <button className="pill" onClick={exportCSV}>Export CSV</button>
        </div>
        {grouped.map(g => (
          <WMACard key={g.wma.id} wma={g.wma} rules={g.rules} onOpen={setOpen}/>
        ))}
        {grouped.length===0 && <div className="text-sm text-slate-600">No results. Try adjusting filters.</div>}
      </div>
      <WMAModal wma={open} rules={open? (rulesData as SeasonRule[]).filter(r => r.wma_id===open.id) : []} onClose={()=>setOpen(null)}/>
    </div>
  );
}
