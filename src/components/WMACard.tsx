"use client";
// 1. IMPORT THE CORRECTED FUNCTION NAME
import { fmtMmmDd, haversineMi, minutesAt } from "@/lib/util";
import type { SeasonRule, WMA, HomeLocation } from "@/lib/types";
import { useMemo } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import { isOpenOn } from "@/lib/rules";
import clsx from "clsx";

// Helper component for the pills
const Pill = ({ text, className = "" }: { text: string, className?: string }) => (
  <span
    className={clsx(
      "rounded-full px-2 py-0.5 text-xs font-medium",
      className || "bg-slate-100 text-slate-700"
    )}
  >
    {text}
  </span>
);

// NEW: Helper to format date ranges into "Sep 13 - Oct 1"
function formatHuntRange(start: string, end: string) {
  // 2. USE THE CORRECTED FUNCTION NAME
  const startDate = fmtMmmDd(start);
  const endDate = fmtMmmDd(end);
  if (startDate === endDate) return startDate; // Single day hunt
  return `${startDate} – ${endDate}`;
}

export default function WMACard({
  wma,
  rules,
  date,
  home,
  onOpen,
}: {
  wma: WMA;
  rules: SeasonRule[];
  date?: string | null; // This is a 'YYYY-MM-DD' string or null
  home?: HomeLocation | null;
  onOpen: () => void;
}) {
  const today = date || null;

  const summary = useMemo(() => {
    let openNow: null | { access: "general" | "quota"; weapons: string[] } = null;
    
    // Check for multi-county rules
    const notes = rules.map(r => r.notes_short);
    const hasMultipleRuleSources = 
        notes.some(n => n?.includes("Statewide Season")) &&
        new Set(notes).size > 1;

    // --- NEW: Grouping Logic ---
    // Group rules by "Species-Weapon"
    const groups = new Map<string, {
      species: string;
      weapon: string;
      windows: { start: string; end: string; }[];
      tags: Set<string>;
      isQuota: boolean;
    }>();

    rules.forEach((r) => {
      // Check if open 'today'
      if (today && isOpenOn(r, today)) {
        const access = r.quota_required ? "quota" : "general";
        if (!openNow) {
          openNow = { access, weapons: [String(r.weapon)] };
        } else {
          openNow.weapons.push(String(r.weapon));
        }
      }

      // Add to group
      const key = `${r.species}-${r.weapon}`;
      if (!groups.has(key)) {
        groups.set(key, {
          species: r.species,
          weapon: r.weapon,
          windows: [],
          tags: new Set(),
          isQuota: false,
        });
      }
      
      const group = groups.get(key)!;
      group.windows.push({ start: r.start_date, end: r.end_date });
      if (r.quota_required) group.isQuota = true;
      r.tags?.forEach(tag => group.tags.add(tag));
    });
    // --- End Grouping Logic ---

    if (openNow) {
      openNow.weapons = Array.from(new Set(openNow.weapons));
    }
    
    const huntGroups = Array.from(groups.values());
    
    return { openNow, huntGroups, hasMultipleRuleSources };
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
    <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
      {/* --- HEADER --- */}
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

      {/* --- DISTANCE --- */}
      {dist && (
        <p className="flex items-center gap-2 text-sm text-slate-700">
          <MapPin className="h-4 w-4" />
          ~{dist.miles} mi{dist.mins ? ` • ~${dist.mins} min` : ""}
        </p>
      )}

      {/* --- MULTI-COUNTY WARNING --- */}
      {summary.hasMultipleRuleSources && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p>
            This WMA spans multiple counties with different rules. Details may vary by location.
          </all-files>
        </div>
      )}

      {/* --- OPEN/CLOSED STATUS BOX --- */}
      <div className="rounded-lg bg-slate-50 p-3 text-sm">
        {summary.openNow ? (
          <div className="space-y-1">
            <div>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                {/* 3. USE THE CORRECTED FUNCTION NAME */}
                Open {today ? fmtMmmDd(today) : ""}
              </span>
              <span className="ml-2 text-slate-700">
                {summary.openNow.access === "general"
                  ? "General access"
                  : "Quota only"}
              </span>
            </div>
            <div className="text-slate-700">
              Weapons: {summary.openNow.weapons.join(", ")}
            </div>
          </div>
        ) : today ? (
          <div className="text-slate-700">
            {/* 3. USE THE CORRECTED FUNCTION NAME */}
            Not open on selected date: {fmtMmmDd(today)}
          </div>
        ) : (
          <div className="text-slate-700">
            Showing all hunt windows. Select a date to check openings.
          </div>
        )}
      </div>

      {/* --- "AT A GLANCE" WMA TAGS --- */}
      {wma.tags && wma.tags.length > 0 && (
        <div className="pt-1">
          <h4 className="text-xs font-medium uppercase text-slate-500 mb-2">WMA Tags</h4>
          <div className="flex flex-wrap gap-2">
            {wma.tags.map(tag => (
              <Pill 
                key={tag} 
                text={tag} 
                className={clsx(
                  tag === "Quota" && "bg-amber-100 text-amber-800",
                  tag === "Bonus" && "bg-blue-100 text-blue-800",
                  (tag.includes("Archery") || tag.includes("Primitive")) && "bg-red-100 text-red-800"
                )} 
              />
            ))}
          </div>
        </div>
      )}

      {/* --- NEW "COMPRESSED" HUNT GROUPS --- */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-medium uppercase text-slate-500">
          {today ? "Matching Hunt Groups" : "Available Hunt Groups"}
        </h4>
        {summary.huntGroups.map((group) => (
          <div key={`${group.species}-${group.weapon}`} className="rounded-lg border bg-white p-3 shadow-sm">
            {/* Header: Species, Weapon, Pills */}
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="font-semibold text-sm capitalize">{group.species}</span>
              <span className="text-sm capitalize text-slate-600">({group.weapon})</span>
              <Pill 
                text={group.isQuota ? "Quota" : "General"} 
                className={clsx(
                  group.isQuota
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                )}
              />
              {Array.from(group.tags).map(tag => (
                <Pill key={tag} text={tag} />
              ))}
            </div>
            
            {/* List of dates */}
            <div className="space-y-1">
              {group.windows.map((w, i) => (
                <div key={i} className="text-sm text-slate-800 font-medium">
                  {formatHuntRange(w.start, w.end)}
                </div>
              ))}
            </div>
          </div>
        ))}
        {rules.length > summary.huntGroups.length && (
          <button onClick={onOpen} className="text-sm text-emerald-700 hover:underline">
            ...see all details in modal
          </button>
        )}
      </div>
    </div>
  );
}
