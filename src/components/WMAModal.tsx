"use client";
import type { SeasonRule, WMA, FilterState } from "@/lib/types";
import { fmtMmmDd } from "@/lib/util";
import InteractiveCalendar from "./InteractiveCalendar";
import { AlertTriangle, Star } from "lucide-react";
import { useMemo } from "react";
import clsx from "clsx";
import statewide from "@/data/statewide.json";
import regulations from "@/data/regulations.json";

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

// Helper to format date ranges into "Sep 13 - Oct 1"
function formatHuntRange(start: string, end: string) {
  const startDate = fmtMmmDd(start);
  const endDate = fmtMmmDd(end);
  if (startDate === endDate) return startDate; // Single day hunt
  return `${startDate} – ${endDate}`;
}

// Helper to find legal equipment definitions
function findEquipmentInfo(weapon: string): string | null {
  const w = weapon.toLowerCase();
  if (w.includes("archery")) return regulations.legal_equipment.archery;
  if (w.includes("primitive")) return regulations.legal_equipment.primitive_weapons;
  if (w.includes("firearms")) return regulations.legal_equipment.firearms.deer_and_bear.join(" ");
  if (w.includes("turkey")) return regulations.legal_equipment.firearms.turkey;
  return null;
}

// NEW: Helper to find Zone info (since WMAs can span counties)
function getZoneInfo(wma: WMA) {
  // --- THIS IS THE FIX ---
  // We explicitly tell TypeScript this is a Set of strings.
  const deerZones = new Set<string>();
  // --- END THE FIX ---
  
  let bearZone: string | undefined;

  wma.counties.forEach(county => {
    const zoneNum = statewide.deer.county_to_deer_zone[county as keyof typeof statewide.deer.county_to_deer_zone];
    if (zoneNum) deerZones.add(`Zone ${zoneNum}`);
    
    // Simple check for bear zone (since logic is complex in rules.ts)
    if (statewide.bear.county_to_bear_zone.North.includes(county)) {
      bearZone = "Northern";
    } else if (statewide.bear.county_to_bear_zone.Central.includes(county)) {
      bearZone = "Central";
    }
  });

  const zoneTags = Array.from(deerZones).map(z => ({ text: z, type: 'deer' }));
  if (bearZone) zoneTags.push({ text: `Bear: ${bearZone}`, type: 'bear' });

  return { zoneTags };
}

export default function WMAModal({
  wma,
  rules,
  onClose,
  onToggleFavorite,
  isFavorite,
  onApplyFilter, // <-- NEW: Add onApplyFilter prop
}: {
  wma: WMA;
  rules: SeasonRule[];
  onClose: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  onApplyFilter: (f: Partial<FilterState>) => void; // <-- NEW: Add onApplyFilter prop
}) {

  const summary = useMemo(() => {
    const notes = rules.map((r) => r.notes_short);
    const hasMultipleRuleSources =
      notes.some((n) => n?.includes("Statewide Season")) &&
      new Set(notes).size > 1;

    // --- Grouping Logic ---
    const groups = new Map<string, {
      species: string;
      weapon: string;
      windows: { start: string; end: string; ruleId: string }[]; // Added ruleId for tracking
      tags: Set<string>;
      isQuota: boolean;
      notes: Set<string>; 
    }>();

    rules.forEach((r) => {
      const key = `${r.species}-${r.weapon}`;
      if (!groups.has(key)) {
        groups.set(key, {
          species: r.species,
          weapon: r.weapon,
          windows: [],
          tags: new Set(),
          isQuota: false,
          notes: new Set(), 
        });
      }
      
      const group = groups.get(key)!;
      group.windows.push({ start: r.start_date, end: r.end_date, ruleId: r.id }); // Use r.id
      if (r.quota_required) group.isQuota = true;
      r.tags?.forEach(tag => group.tags.add(tag));
      if (r.notes_short && !r.notes_short.includes("State seasons")) {
        group.notes.add(r.notes_short);
      }
    });
    // --- End Grouping Logic ---
    
    const huntGroups = Array.from(groups.values());
    const { zoneTags } = getZoneInfo(wma); // Get zone info

    return { huntGroups, hasMultipleRuleSources, zoneTags };
  }, [rules, wma]);

  const antlerRules = statewide.deer.season_limits.antler_quality;

  // NEW: Function to close and apply a filter (e.g. from clicking a tag)
  const closeAndFilter = (key: keyof FilterState, value: string) => {
    onClose();
    if (key === 'tags') {
      onApplyFilter({ tags: [value] });
    } else if (key === 'species') {
      onApplyFilter({ species: [value] });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-auto">
      <div className="mt-10 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl mb-10">
        <div className="flex items-start justify-between">
          {/* --- HEADER SECTION --- */}
          <div className="space-y-3 flex-grow pr-4">
            <h3 className="text-xl font-semibold">
              {wma.name}
              {wma.tract_name ? ` — ${wma.tract_name}` : ""}
            </h3>
            <p className="text-sm text-slate-600">
              {wma.counties.join(", ")}
              {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
              {wma.phone ? ` • ${wma.phone}` : ""}
            </p>
            
            {/* WMA TAGS & ZONES (Clickable) */}
            <div className="flex flex-wrap gap-2">
              {wma.tags && wma.tags.length > 0 && wma.tags.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => closeAndFilter('tags', tag)} // Make tag clickable
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-xs font-medium transition hover:bg-slate-200",
                    tag === "Quota" && "bg-amber-100 text-amber-800",
                    tag === "Bonus" && "bg-blue-100 text-blue-800",
                    (tag.includes("Archery") || tag.includes("Primitive")) && "bg-red-100 text-red-800"
                  )} 
                >
                  {tag}
                </button>
              ))}
              {/* ZONE TAGS */}
              {summary.zoneTags.map(tag => (
                <Pill 
                  key={tag.text} 
                  text={tag.text} 
                  className={tag.type === 'deer' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                />
              ))}
            </div>
          </div>
          
          {/* FAVORITE BUTTON & CLOSE BUTTON */}
          <div className="flex flex-shrink-0 gap-2">
            <button
              type="button"
              onClick={onToggleFavorite}
              className={clsx(
                "rounded-md border p-2 h-10 w-10",
                isFavorite
                  ? "border-amber-400 bg-amber-50 text-amber-500"
                  : "border-slate-300 bg-white text-slate-400 hover:bg-slate-50"
              )}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star size={20} className={clsx(isFavorite && "fill-amber-400")} />
            </button>
            <button className="rounded-md border px-3 py-1 h-10" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        {/* --- MULTI-COUNTY WARNING --- */}
        {summary.hasMultipleRuleSources && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <p>
              **Rule Warning:** This WMA spans multiple counties with
              different rules (e.g., extended seasons, bear zones). The
              list below shows all possible rules; check county before hunting.
            </p>
          </div>
        )}

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {/* --- "COMPRESSED" HUNT GROUPS --- */}
          <div className="space-y-2 pt-2">
            <h4 className="text-lg font-semibold mb-2">Available Hunt Groups</h4>
            <div className="space-y-2 max-h-[60vh] overflow-auto pr-2">
              {summary.huntGroups.map((group) => {
                const equipmentInfo = findEquipmentInfo(group.weapon);
                return (
                  <div key={`${group.species}-${group.weapon}`} className="rounded-lg border bg-slate-50 p-3 shadow-sm">
                    {/* Header: Species, Weapon, Pills (Species is clickable) */}
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <button 
                          onClick={() => closeAndFilter('species', group.species)} // Make species clickable
                          className="font-semibold text-sm capitalize hover:text-emerald-700"
                        >
                          {group.species}
                        </button>
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
                        <button 
                          key={tag} 
                          onClick={() => closeAndFilter('tags', tag)} // Make tag clickable
                          className="rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                          {tag}
                        </button>
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

                    {/* Show hunt-specific notes */}
                    {group.notes.size > 0 && (
                      <div className="mt-2 border-t pt-2">
                        <h5 className="text-xs font-semibold text-slate-600">Notes:</h5>
                        {Array.from(group.notes).map(note => (
                          <p key={note} className="text-xs text-slate-600">{note}</p>
                        ))}
                      </div>
                    )}

                    {/* Show equipment info */}
                    {equipmentInfo && (
                      <div className="mt-2 border-t pt-2">
                        <h5 className="text-xs font-semibold text-slate-600">Legal Equipment:</h5>
                        <p className="text-xs text-slate-600">{equipmentInfo}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="mb-2 text-lg font-semibold">Calendar</h4>
            <InteractiveCalendar rules={rules} />

            {/* "RULES & INFO" SECTION */}
            <div className="space-y-2 pt-4">
              <h4 className="text-lg font-semibold mb-2">Rules & Info</h4>
              <div className="rounded-lg border bg-slate-50 p-3 shadow-sm">
                <h5 className="font-semibold text-sm mb-1">Statewide Antler Rules (Deer)</h5>
                <ul className="list-disc pl-5 text-sm text-slate-700">
                  <li>{antlerRules.points_requirement}</li>
                  <li>{antlerRules.alternative_spread}</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
