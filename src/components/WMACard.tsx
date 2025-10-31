"use client";
import { fmtMDY, haversineMi, minutesAt } from "@/lib/util";
import type { SeasonRule, WMA } from "@/lib/types";
import { useMemo } from "react";
import { MapPin } from "lucide-react";

export default function WMACard({
  wma, rules, date, home, onOpen
}: {
  wma: WMA;
  rules: SeasonRule[];
  date?: string | null;
  home?: { lat: number|null, lng: number|null } | null;
  onOpen: ()=>void;
}) {
  const today = date || null;

  const summary = useMemo(()=>{
    // fold rules into “today open?” & next/active windows
    let openNow: null | { access: "general"|"quota"; weapons: string[]; species: string[] } = null;
    const windows: { access:"general"|"quota"; start:string; end:string; weapon:string; species:string }[] = [];

    rules.forEach(r => {
      const access = r.quota_required ? "quota" : "general";
      windows.push({ access, start: r.start_date, end: r.end_date, weapon: String(r.weapon), species: r.species });
      if (today && today >= r.start_date && today <= r.end_date) {
        if (!openNow) openNow = { access, weapons:[String(r.weapon)], species:[r.species] };
        else {
          openNow.weapons.push(String(r.weapon));
          openNow.species.push(r.species);
        }
      }
    });

    // dedupe lists
    if (openNow) {
      openNow.weapons = Array.from(new Set(openNow.weapons));
      openNow.species = Array.from(new Set(openNow.species));
    }
    return { openNow, windows };
  }, [rules, today]);

  const dist = useMemo(()=>{
    if (!home?.lat || !home?.lng || !wma.lat || !wma.lng) return null;
    const miles = haversineMi({lat: home.lat, lng: home.lng}, {lat: wma.lat, lng: wma.lng});
    const mins = minutesAt(43, miles); // rough GA avg MPH for rural trip
    return { miles: Math.round(miles*10)/10, mins };
  }, [home, wma.lat, wma.lng]);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{wma.name}{wma.tract_name ? ` — ${wma.tract_name}` : ""}</h3>
          <p className="text-sm text-slate-600">
            {wma.counties.join(", ")}
            {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
          </p>
        </div>
        <button
          className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
          onClick={onOpen}
        >
          Details
        </button>
      </div>

      {dist && (
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-700">
          <MapPin className="h-4 w-4" />
          ~{dist.miles} mi{dist.mins ? ` • ~${dist.mins} min` : ""}
        </p>
      )}

      <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
        {summary.openNow ? (
          <div className="space-y-1">
            <div>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">Open today</span>
              <span className="ml-2 text-slate-700">
                {summary.openNow.access === "general" ? "General access" : "Quota only"}
              </span>
            </div>
            <div className="text-slate-700">
              Weapons: {summary.openNow.weapons.join(", ")} • Species: {summary.openNow.species.join(", ")}
            </div>
          </div>
        ) : (
          <div className="text-slate-700">Not open on selected date.</div>
        )}
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Next windows:{" "}
        {summary.windows.slice(0,3).map((w,i)=>(
          <span key={i} className="mr-2">
            <span className={w.access==="general" ? "text-emerald-700" : "text-amber-700"}>
              {w.access === "general" ? "General" : "Quota"}
            </span>{" "}
            {fmtMDY(w.start)}–{fmtMDY(w.end)} ({w.weapon})
          </span>
        ))}
      </div>
    </div>
  );
}
