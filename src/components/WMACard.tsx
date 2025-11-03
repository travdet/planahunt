"use client";
import { fmtMDY, haversineMi, minutesAt } from "@/lib/util";
import type { SeasonRule, WMA, HomeLocation } from "@/lib/types";
import { useMemo } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import { isOpenOn } from "@/lib/rules"; // Import our helper
import clsx from "clsx";

export default function WMACard({
  wma,
  rules,
  date,
  home,
  onOpen,
}: {
  wma: WMA;
  rules: SeasonRule[];
  date?: string | null; // This is now a 'YYYY-MM-DD' string or null
  home?: HomeLocation | null;
  onOpen: () => void;
}) {
  const today = date || null;

  const summary = useMemo(() => {
    let openNow: null | { access: "general" | "quota"; weapons: string[]; species: string[] } = null;
    const windows: {
      access: "general" | "quota";
      start: string;
      end: string;
      weapon: string;
      species: string;
      tags: string[]; // <-- NEW: Added tags
    }[] = [];

    // Check for multi-county rules
    const notes = rules.map(r => r.notes_short);
    const hasMultipleRuleSources = 
        notes.some(n => n?.includes("Statewide Season")) && // Is a statewide rule
        new Set(notes).size > 1; // Has more than one unique note

    rules.forEach((r) => {
      const access = r.quota_required ? "quota" : "general";
      // NEW: Add the rule's tags to the window object
      windows.push({
        access,
        start: r.start_date,
        end: r.end_date,
        weapon: String(r.weapon),
        species: r.species,
        tags: r.tags || [], // Pass the tags
      });
      
      if (today && isOpenOn(r, today)) {
        if (!openNow) {
          openNow = {
            access,
            weapons: [String(r.weapon)],
            species: [r.species],
          };
        } else {
          openNow.weapons.push(String(r.weapon));
          openNow.species.push(r.species);
        }
      }
    });

    if (openNow) {
      openNow.weapons = Array.from(new Set(openNow.weapons));
      openNow.species = Array.from(new Set(openNow.species));
    }
    return { openNow, windows, hasMultipleRuleSources };
  }, [rules, today]);

  const dist = useMemo(() => {
    if (!home?.lat || !home?.lng || !wma.lat || !wma.lng) return null;
    const miles = haversineMi(
      { lat: home.lat, lng: home.lng },
      { lat: wma.lat, lng: wma.lng }
    );
    const mins = minutesAt(43, miles);
    return { miles: Math.round(miles * 10) / 10, mins };
  }, [home, wma.lat, wma.lng]);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">
            {wma.name}
            {wma.tract_name ? ` — ${wma.tract_name}` : ""}
          </h3>
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

      {summary.hasMultipleRuleSources && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p>
            This WMA spans multiple counties with different rules. Details may vary by location.
          </p>
        </div>
      )}

      {/* --- UPDATED: "Open today" / "Upcoming" status box --- */}
      <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
        {summary.openNow ? (
          // CASE 1: A date is selected AND hunts are open
          <div className="space-y-1">
            <div>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                Open {today ? fmtMDY(today) : ""}
              </span>
              <span className="ml-2 text-slate-700">
                {summary.openNow.access === "general"
                  ? "General access"
                  : "Quota only"}
              </span>
            </div>
            <div className="text-slate-700">
              Weapons: {summary.openNow.weapons.join(", ")} • Species:{" "}
              {summary.openNow.species.join(", ")}
            </div>
          </div>
        ) : today ? (
          // CASE 2: A date is selected AND no hunts are open
          <div className="text-slate-700">
            Not open on selected date: {fmtMDY(today)}
          </div>
        ) : (
          // CASE 3: No date is selected
          <div className="text-slate-700">
            Showing upcoming seasons. Select a date to check openings.
          </div>
        )}
      </div>
      
      {/* --- NEW: "Upcoming Windows" list with pills --- */}
      <div className="mt-4 space-y-2">
        <h4 className="text-xs font-medium uppercase text-slate-500">
          {today ? "Matching Windows" : "Upcoming Windows"}
        </h4>
        {summary.windows.slice(0, 3).map((w, i) => (
          <div key={i} className="rounded-lg border bg-white p-3 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm capitalize">{w.species}</span>
              <span className="text-sm capitalize text-slate-600">{w.weapon}</span>
            </div>
            <div className="text-sm mb-3 font-medium">
              {fmtMDY(w.start)} – {fmtMDY(w.end)}
            </div>
            {/* Pill section */}
            <div className="flex flex-wrap gap-2">
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  w.access === "quota"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                )}
              >
                {w.access === "quota" ? "Quota" : "General"}
              </span>
            {/* Special tags pills */}
            {w.tags.map(tag => (
              <span key={tag} className="rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700">
                {tag}
              </span>
            ))}
            </div>
          </div>
        ))}
        {rules.length > 3 && (
          <button onClick={onOpen} className="text-sm text-emerald-700 hover:underline">
            ...and {rules.length - 3} more
          </button>
        )}
      </div>
    </div>
  );
}
