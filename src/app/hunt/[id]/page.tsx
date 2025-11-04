"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import wmas from "@/data/wmas.json";
import rulesRaw from "@/data/seasons.json";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMmmDd, haversineMi } from "@/lib/util";
import statewide from "@/data/statewide.json";
import regulations from "@/data/regulations.json";
import { resolveStatewide } from "@/lib/rules";
import { AlertTriangle, Star, MapPin, Phone } from "lucide-react";
import clsx from "clsx";

// Dynamically import maps
const InteractiveCalendar = dynamic(() => import("@/components/InteractiveCalendar"), { ssr: false });
const Mapbox = dynamic(() => import("@/components/Mapbox"), { ssr: false });

// --- HELPER COMPONENTS ---
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

function findEquipmentInfo(weapon: string): string | null {
  const w = weapon.toLowerCase();
  if (w.includes("archery")) return regulations.legal_equipment.archery;
  if (w.includes("primitive")) return regulations.legal_equipment.primitive_weapons;
  if (w.includes("firearms")) return regulations.legal_equipment.firearms.deer_and_bear.join(" ");
  if (w.includes("turkey")) return regulations.legal_equipment.firearms.turkey;
  return null;
}

function getZoneInfo(wma: WMA) {
  const deerZones = new Set<string>();
  let bearZone: string | undefined;
  wma.counties.forEach(county => {
    const zoneNum = statewide.deer.county_to_deer_zone[county as keyof typeof statewide.deer.county_to_deer_zone];
    if (zoneNum) deerZones.add(`Zone ${zoneNum}`);
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

// NEW: Helper to get nearby WMAs
function getNearbyWmas(currentWma: WMA) {
  if (!currentWma.lat || !currentWma.lng) return [];
  const currentCoords = { lat: currentWma.lat, lng: currentWma.lng };
  
  return (wmas as WMA[])
    .filter(w => w.wma_id !== currentWma.wma_id && w.lat && w.lng)
    .map(wma => {
      const dist = haversineMi(currentCoords, { lat: wma.lat!, lng: wma.lng! });
      return { wma, dist };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 5); // Get top 5
}
// --- END HELPER COMPONENTS ---

const FAVORITES_KEY = "planahunt_favorites";

export default function HuntDetail({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const wma = (wmas as WMA[]).find((w) => w.wma_id === id);

  // --- ADDED FAVORITES STATE ---
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) { console.error("Could not load favorites", e); }
  }, []);

  const toggleFavorite = (wma_id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(wma_id)) {
        newFavorites.delete(wma_id);
      } else {
        newFavorites.add(wma_id);
      }
      const favArray = Array.from(newFavorites);
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favArray));
      } catch (e) { console.error("Could not save favorites", e); }
      return favArray;
    });
  };
  const isFavorite = useMemo(() => new Set(favorites).has(id), [favorites, id]);
  // --- END FAVORITES STATE ---

  // --- NEW: TAB STATE ---
  const [activeTab, setActiveTab] = useState<'info' | 'map'>('info');

  const { rules, summary, nearby } = useMemo(() => {
    if (!wma) return { rules: [], summary: null, nearby: [] };

    const resolvedRules = (rulesRaw as SeasonRule[])
      .filter((r) => r.wma_id === id)
      .flatMap((r) => resolveStatewide(r, wma, statewide));

    const notes = resolvedRules.map((r) => r.notes_short);
    const hasMultipleRuleSources =
      notes.some((n) => n?.includes("Statewide Season")) &&
      new Set(notes).size > 1;

    const groups = new Map<string, {
      species: string;
      weapon: string;
      windows: { start: string; end: string; }[];
      tags: Set<string>;
      isQuota: boolean;
      notes: Set<string>;
    }>();

    resolvedRules.forEach((r) => {
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
    
    const huntGroups = Array.from(groups.values());
    const { zoneTags } = getZoneInfo(wma);
    const antlerRules = statewide.deer.season_limits.antler_quality;
    const nearby = getNearbyWmas(wma); // Get nearby WMAs

    return { 
      rules: resolvedRules, 
      summary: { huntGroups, hasMultipleRuleSources, zoneTags, antlerRules },
      nearby,
    };
  }, [id, wma]);
  
  // NEW: Get map points for the Area Map
  const areaMapPoints = useMemo(() => {
    if (!wma) return [];
    const points = [];
    if (wma.map_points?.check_stations) {
      points.push(...wma.map_points.check_stations.map(p => ({
        id: p.name, name: p.name, lat: p.coords[1], lng: p.coords[0]
      })));
    }
    // Add other map points like boat_ramps here if needed
    return points;
  }, [wma]);

  if (!wma || !summary) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="p-6 text-center">WMA not found.</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      {/* --- HEADER --- */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-grow pr-4">
          <h1 className="text-2xl font-semibold">{wma.name}</h1>
          <p className="text-sm text-slate-600">
            {wma.counties?.join(", ")}
            {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
            {/* NEW: Clickable Phone Number */}
            {wma.phone && (
              <a href={`tel:${wma.phone}`} className="ml-2 inline-flex items-center gap-1 text-emerald-700 hover:underline">
                <Phone size={14} />
                {wma.phone}
              </a>
            )}
          </p>
          {/* WMA TAGS */}
          {(wma.tags && wma.tags.length > 0) || summary.zoneTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {wma.tags?.map(tag => (
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
              {/* ZONE TAGS */}
              {summary.zoneTags.map(tag => (
                <Pill 
                  key={tag.text} 
                  text={tag.text} 
                  className={tag.type === 'deer' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                />
              ))}
            </div>
          ) : null}
        </div>
        {/* FAVORITE BUTTON */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => toggleFavorite(wma.wma_id)}
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

      {/* --- NEW: TABS --- */}
      <div className="mt-6 border-b">
        <button 
          className={clsx("py-2 px-4 text-sm font-medium", activeTab === 'info' ? "border-b-2 border-emerald-600 text-emerald-600" : "text-slate-500 hover:text-slate-800")}
          onClick={() => setActiveTab('info')}
        >
          Hunt Info & Calendar
        </button>
        <button 
          className={clsx("py-2 px-4 text-sm font-medium", activeTab === 'map' ? "border-b-2 border-emerald-600 text-emerald-600" : "text-slate-500 hover:text-slate-800")}
          onClick={() => setActiveTab('map')}
        >
          Area Map
        </button>
      </div>

      {/* --- TAB CONTENT: INFO --- */}
      {activeTab === 'info' && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* --- "COMPRESSED" HUNT GROUPS --- */}
          <div className="space-y-2 pt-2">
            <h4 className="text-lg font-semibold mb-2">Available Hunt Groups</h4>
            <div className="space-y-2 max-h-[60vh] overflow-auto pr-2">
              {summary.huntGroups.map((group) => {
                const equipmentInfo = findEquipmentInfo(group.weapon);
                return (
                  <div key={`${group.species}-${group.weapon}`} className="rounded-lg border bg-slate-50 p-3 shadow-sm">
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

                    {group.notes.size > 0 && (
                      <div className="mt-2 border-t pt-2">
                        <h5 className="text-xs font-semibold text-slate-600">Notes:</h5>
                        {Array.from(group.notes).map(note => (
                          <p key={note} className="text-xs text-slate-600">{note}</p>
                        ))}
                      </div>
                    )}
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

          {/* --- CALENDAR & RULES --- */}
          <div className="space-y-4">
            <h4 className="mb-2 text-lg font-semibold">Calendar</h4>
            <InteractiveCalendar rules={rules} />

            <div className="space-y-2 pt-4">
              <h4 className="text-lg font-semibold mb-2">Rules & Info</h4>
              <div className="rounded-lg border bg-slate-50 p-3 shadow-sm">
                <h5 className="font-semibold text-sm mb-1">Statewide Antler Rules (Deer)</h5>
                <ul className="list-disc pl-5 text-sm text-slate-700">
                  <li>{summary.antlerRules.points_requirement}</li>
                  <li>{summary.antlerRules.alternative_spread}</li>
                </ul>
              </div>

              {/* NEW: NEARBY WMAs */}
              {nearby.length > 0 && (
                <div className="rounded-lg border bg-slate-50 p-3 shadow-sm">
                  <h5 className="font-semibold text-sm mb-2">Other WMAs Nearby</h5>
                  <div className="space-y-2">
                    {nearby.map(n => (
                      <Link href={`/hunt/${n.wma.wma_id}`} key={n.wma.wma_id} className="block hover:bg-slate-100 p-2 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium text-sm text-emerald-700">{n.wma.name}</span>
                          <span className="text-sm text-slate-500">{n.dist.toFixed(1)} mi</span>
                        </div>
                        <span className="text-xs text-slate-500">{n.wma.counties.join(', ')}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: AREA MAP --- */}
      {activeTab === 'map' && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Area Map</h4>
          <div className="h-[60vh] w-full rounded-lg border overflow-hidden">
            <Mapbox points={areaMapPoints} />
            {/* Note: We'll need to update Mapbox.tsx to draw lines/polygons later */}
          </div>
          <div className="mt-2 space-y-2">
            <h5 className="font-semibold">Map Key</h5>
            {areaMapPoints.length > 0 ? (
              areaMapPoints.map(p => (
                <div key={p.id} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm">{p.name} (Check Station)</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No map points available for this WMA.</p>
            )}
            {/* Add keys for roads, trails, etc. here */}
          </div>
        </div>
      )}
    </main>
  );
}
