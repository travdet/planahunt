"use client";
import { useMemo, useState } from "react";
import { fmtMDY, toISO, isDateWithin } from "@/lib/util";

/** colors:
 * green = general (open, not quota_required)
 * yellow = quota only (rule.quota_required)
 * gray = closed
 */
export default function AccessCalendar({ rules }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date(); base.setDate(1);
  const view = new Date(base); view.setMonth(base.getMonth()+monthOffset);

  const yyyy = view.getFullYear();
  const mm = view.getMonth();

  const { cells, label } = useMemo(()=>{
    const first = new Date(yyyy, mm, 1);
    const startWeekday = first.getDay(); // 0 Sun
    const daysInMonth = new Date(yyyy, mm+1, 0).getDate();
    const label = view.toLocaleString(undefined, { month:"long", year:"numeric" });

    const rulesForMonth = rules;

    const cells = Array.from({length:42}).map((_,i)=>{
      const dayNum = i - ((startWeekday+6)%7) + 1; // start Mon grid
      const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
      const iso = inMonth ? toISO(new Date(yyyy, mm, dayNum)) : "";
      let status = "closed";
      if (iso) {
        const matches = rulesForMonth.filter(r => isDateWithin(iso, r.start_date, r.end_date));
        if (matches.length) {
          const anyQuota = matches.some(r => r.quota_required);
          status = anyQuota ? "quota" : "general";
        }
      }
      return { inMonth, dayNum: inMonth ? dayNum : null, iso, status };
    });

    return { cells, label };
  }, [yyyy, mm, rules, view]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{label}</h4>
        <div className="flex gap-2">
          <button className="rounded-md border px-2 py-1" onClick={()=>setMonthOffset(m=>m-1)}>Prev</button>
          <button className="rounded-md border px-2 py-1" onClick={()=>setMonthOffset(0)}>Today</button>
          <button className="rounded-md border px-2 py-1" onClick={()=>setMonthOffset(m=>m+1)}>Next</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>(
          <div key={d} className="text-center font-medium">{d}</div>
        ))}
        {cells.map((c, i)=>(
          <div
            key={i}
            className={
              "h-10 rounded-md border text-center flex items-center justify-center " +
              (!c.inMonth ? "opacity-20 " : "") +
              (c.status==="general" ? "bg-emerald-600 text-white border-emerald-700"
                : c.status==="quota" ? "bg-amber-300 text-amber-950 border-amber-400"
                : "bg-slate-100 text-slate-500 border-slate-200")
            }
            title={c.iso ? fmtMDY(c.iso) : ""}
          >
            {c.dayNum}
          </div>
        ))}
      </div>

      <div className="flex gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-emerald-600" /> General</div>
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-amber-300" /> Quota</div>
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded bg-slate-200" /> Closed</div>
      </div>
    </div>
  );
}
