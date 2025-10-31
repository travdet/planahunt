"use client";
import type { SeasonRule } from "@/lib/types";

export default function BlackoutHeatmap({ rules }:{ rules: SeasonRule[] }){
  const days = 90;
  const today = new Date(); today.setHours(0,0,0,0);
  const boxes = Array.from({length:days}, (_,i)=>{
    const d = new Date(+today + i*86400000);
    const iso = d.toISOString().slice(0,10);
    const open = rules.filter(r => r.start_date <= iso && iso <= r.end_date);
    let color = "bg-shut"; let label="Closed";
    if (open.length>0){
      const anyGeneral = open.some(r=>!r.quota_required);
      color = anyGeneral ? "bg-ok" : "bg-warn";
      label = anyGeneral ? "Open (general)" : "Quota-only";
    }
    return { iso, color, label };
  });
  return (
    <div className="mt-2">
      <div className="label mb-1">Next 90 days</div>
      <div className="grid grid-cols-30 gap-[2px]">
        {boxes.map((d,i)=>(
          <div key={i} className={`h-3 ${d.color}`} title={`${d.iso} — ${d.label}`}/>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1"><span className="h-3 w-3 bg-ok inline-block"></span> General</div>
        <div className="flex items-center gap-1"><span className="h-3 w-3 bg-warn inline-block"></span> Quota-only</div>
        <div className="flex items-center gap-1"><span className="h-3 w-3 bg-shut inline-block"></span> Closed</div>
      </div>
    </div>
  );
}
