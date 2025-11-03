"use client";
import { fmtMmmDd, haversineMi, minutesAt } from "@/lib/util";
import type { SeasonRule, WMA, HomeLocation } from "@/lib/types";
import { useMemo, useState } from "react"; // 1. IMPORT useState
import { MapPin, AlertTriangle, Navigation } from "lucide-react"; // 2. IMPORT Navigation icon
import { isOpenOn } from "@/lib/rules";
import clsx from "clsx";
import { drivingStats } from "@/lib/map"; // 3. IMPORT drivingStats

// ... (Pill and formatHuntRange helpers are the same) ...
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

function formatHuntRange(start: string, end: string) {
  const startDate = fmtMmmDd(start);
  const endDate = fmtMmmDd(end);
  if (startDate === endDate) return startDate;
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
  date?: string | null;
  home?: HomeLocation | null;
  onOpen: () => void;
}) {
  const today = date || null;
  
  // 4. NEW: State for driving directions
  const [driving, setDriving] = useState<{ miles: number; minutes: number } | null>(null);
  const [drivingLoading, setDrivingLoading] = useState(false);

  const summary = useMemo(() => {
    // ... (this logic is all the same) ...
    let openNow: null | { access: "general" | "quota"; weapons: string[] } = null;
    const notes = rules.map(r => r.notes_short);
    const hasMultipleRuleSources = 
        notes.some(n => n?.includes("Statewide Season")) &&
        new Set(notes).size > 1;

    const groups = new Map<string, {
      species: string;
      weapon: string;
      windows: { start: string; end: string; }[];
      tags: Set<string>;
      isQuota: boolean;
      notes: Set<string>;
    }>();

    rules.forEach((r) => {
      if (today && isOpenOn(r, today)) {
        const access = r.quota_required ? "quota" : "general";
        if (!openNow) {
          openNow = { access, weapons: [String(r.weapon)] };
        } else {
          openNow.weapons.push(String(r.weapon));
        }
      }
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
      group.windows.push({ start: r.start_date, end: r.end_date });
      if (r.quota_required) group.isQuota = true;
      r.tags?.forEach(tag => group.tags.add(tag));
      if (r.notes_short && !r.notes_short.includes("State seasons")) {
        group.notes.add(r.notes_short);
      }
    });

    if (openNow) {
      openNow.weapons = Array.from(new Set(openNow.weapons));
    }
    const huntGroups = Array.from(groups.values());
    return { openNow, huntGroups, hasMultipleRuleSources };
  }, [rules, today]);

  // This is the "as-the-crow-flies" distance
  const crowFliesDist = useMemo(() => {
    if (!home?.lat || !home?.lng || !wma.lat || !wma.lng) return null;
    const miles = haversineMi(
      { lat: home.lat, lng: home.lng },
      { lat: wma.lat, lng: wma.lng }
    );
    const mins = minutesAt(43, miles);
    return { miles: Math.round(miles * 10) / 10, mins };
  }, [home, wma.lat, wma.lng]);
  
  // 5. NEW: Function to fetch driving directions
  async function getDrivingDirections() {
    if (!home?.lat || !home?.lng || !wma.lat || !wma.lng) return;
    setDrivingLoading(true);
    try {
      const stats = await drivingStats(
        { lat: home.lat, lng: home.lng },
        { lat: wma.lat, lng: wma.lng }
      );
      if (stats) {
        setDriving(stats);
      }
    } catch (e) {
      console.error(e);
      alert("Could not get driving directions.");
    } finally {
      setDrivingLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
      {/* ... (Header is the same) ... */}
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

      {/* 6. UPDATED: Distance & Directions Section */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {crowFliesDist && (
          <p className="flex items-center gap-2 text-sm text-slate-700" title="As-the-crow-flies distance">
            <MapPin className="h-4 w-4" />
            ~{crowFliesDist.miles} mi
          </p>
        )}
        
        {/* Driving directions button/info */}
        {home?.lat && wma.lat && (
          <div className="text-sm">
            {driving ? (
              <p className="flex items-center gap-2 text-emerald-700 font-medium">
                <Navigation className="h-4 w-4" />
                {driving.miles} driving miles • ~{driving.minutes} min
              </p>
            ) : (
              <button
                onClick={getDrivingDirections}
                disabled={drivingLoading}
                className="flex items-center gap-1 text-emerald-700 hover:underline disabled:opacity-50"
              >
                <Navigation className="h-4 w-4" />
                {drivingLoading ? "Loading..." : "Get driving directions"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ... (Rest of the card is the same: Warning, Status Box, Tags, Hunt Groups) ... */}
      {summary.hasMultipleRuleSources && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p>
            This WMA spans multiple counties with different rules. Details may vary by location.
          </p>
        </div>
      )}

      <div className="rounded-lg bg-slate-50 p-3 text-sm">
        {summary.openNow ? (
          <div className="space-y-1">
            <div>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
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
            Not open on selected date: {fmtMmmDd(today)}
          </div>
        ) : (
          <div className="text-slate-700">
            Showing all hunt windows. Select a date to check openings.
          </div>
        )}
      </div>

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

      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-medium uppercase text-slate-500">
          {today ? "Matching Hunt Groups" : "Available Hunt Groups"}
        </h4>
        {summary.huntGroups.map((group) => (
          <div key={`${group.species}-${group.weapon}`} className="rounded-lg border bg-white p-3 shadow-sm">
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
