"use client";
import { useMemo } from "react";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import BlackoutHeatmap from "./BlackoutHeatmap";

export default function WMACard({ wma, rules, onOpen }:{ wma: WMA, rules: SeasonRule[], onOpen: (wma: WMA)=>void }){
  const grouped = useMemo(()=>{
    const map = new Map<string, SeasonRule[]>();
    for (const r of rules) {
      const key = `${r.species}|${r.weapon}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    return Array.from(map.entries()).map(([k,arr])=>({ key:k, rows: arr.sort((a,b)=> a.start_date.localeCompare(b.start_date)) }));
  }, [rules]);

  return (
    <div className="hcard p-4">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="text-lg font-semibold">{wma.name}</div>
          <div className="text-sm text-slate-600">{wma.region} • {wma.counties.join(", ")}{wma.acreage?` • ${wma.acreage.toLocaleString()} acres`:""}</div>
          <div className="mt-1 flex gap-1 flex-wrap">{(wma.tags||[]).map(t => <span key={t} className="badge">{t}</span>)}</div>
        </div>
        <button onClick={()=>onOpen(wma)} className="pill">View details</button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm table">
          <thead>
            <tr>
              <th>Species / Weapon</th>
              <th>Dates</th>
              <th>Access</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map(g => (
              <tr key={g.key} className="border-t">
                <td className="align-top py-2">{g.key.replace("|"," • ")}</td>
                <td className="align-top py-2">
                  <div className="space-x-2 space-y-1">
                    {g.rows.map(r => (
                      <span key={r.id} className="inline-block">{fmtMDY(r.start_date)} – {fmtMDY(r.end_date)}</span>
                    ))}
                  </div>
                </td>
                <td className="align-top py-2">
                  <div className="flex flex-wrap gap-1">
                    {g.rows.some(r=>!r.quota_required) && <span className="badge">General</span>}
                    {g.rows.some(r=> r.quota_required) && <span className="badge">Quota</span>}
                    {g.rows.some(r=> r.buck_only) && <span className="badge">Buck-only</span>}
                    {g.rows.flatMap(r=>r.tags||[]).slice(0,3).map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                </td>
                <td className="align-top py-2 max-w-[360px]">
                  <div className="text-slate-700">{g.rows.find(r=>r.notes_short)?.notes_short || ""}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <BlackoutHeatmap rules={rules}/>
      </div>
    </div>
  );
}
