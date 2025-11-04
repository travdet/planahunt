"use client";
import { fmtMmmDd, haversineMi, minutesAt } from "@/lib/util";
import { getSunriseSunset } from "@/lib/sun";
import type { SeasonRule, WMA, HomeLocation, SpeciesGroup } from "@/lib/types";
import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, AlertTriangle, Navigation, Sunrise, Sunset, Star } from "lucide-react";
import { isOpenOn } from "@/lib/rules";
import clsx from "clsx";
import { drivingStats } from "@/lib/map";

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

// Helper for the species icons
const SpeciesIcon = ({ species }: { species: string }) => {
  if (species.includes("Deer")) return <span>🦌</span>;
  if (species.includes("Turkey")) return <span>🦃</span>;
  if (species.includes("Bear")) return <span>🐻</span>;
  if (species.includes("Dove")) return <span>🕊️</span>;
  return null;
};

export default function WMACard({
  wma,
  speciesGroups,
  filteredRules,
  date,
  home,
  isFavorite,
  onToggleFavorite,
}: {
  wma: WMA;
  speciesGroups: SpeciesGroup[];
  filteredRules: SeasonRule[];
  date?: string | null;
  home?: HomeLocation | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const today = date || null;
  const [driving, setDriving] = useState<{ miles: number; minutes: number } | null>(null);
  const [drivingLoading, setDrivingLoading] = useState(false);

  const { openNow, hasMultipleRuleSources } = useMemo(() => {
    let openNow: null | { access: "general" | "quota"; weapons: string[] } = null;
    let hasMultipleRuleSources = false;

    // Check for open status and multi-county rules
    filteredRules.forEach((r) => {
      if (r.notes_short?.includes("Statewide Season")) {
        hasMultipleRuleSources = true; // Simplified check
      }
      if (today && isOpenOn(r, today)) {
        const access = r.quota_required ? "quota" : "general";
        if (!openNow) {
          openNow = { access, weapons: [String(r.weapon)] };
        } else {
          openNow.weapons.push(String(r.weapon));
        }
      }
    });

    if (openNow) {
      openNow.weapons = Array.from(new Set(openNow.weapons));
    }
    return { openNow, hasMultipleRuleSources };
  }, [filteredRules, today]);

  // "as-the-crow-flies" distance
  const crowFliesDist = useMemo(() => {
    if (!home?.lat || !home?.lng || !wma.lat || !wma.lng) return null;
    const miles = haversineMi(
      { lat: home.lat, lng: home.lng },
      { lat: wma.lat, lng: wma.lng }
    );
    return { miles: Math.round(miles * 10) / 10 };
  }, [home, wma.lat, wma.lng]);

  // Sunrise/Sunset logic
  const sunTimes = useMemo(() => {
    if (!wma.lat || !wma.lng || !date) return null;
    const dateObj = new Date(date + "T12:00:00");
    return getSunriseSunset(wma.lat, wma.lng, dateObj);
  }, [wma.lat, wma.lng, date]);

  // Driving directions logic
  async function getDrivingDirections(e: React.MouseEvent) {
    e.preventDefault(); // Stop the card link from navigating
    e.stopPropagation();
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

  // Favorite button logic
  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault(); // Stop the card link from navigating
    e.stopPropagation();
    onToggleFavorite();
  }

  return (
    // The entire card is now a link to the detail page
    <Link
      href={`/hunt/${wma.wma_id}`}
      className="block rounded-2xl border bg-white p-4 shadow-sm space-y-3 transition-all duration-150 hover:shadow-md hover:border-emerald-500"
    >
      {/* --- HEADER --- */}
      <div className="flex items-start justify-between gap-3">
        {/* Left Side: Title, Tags, Info */}
        <div className="flex-grow space-y-2">
          {/* Line 1: Name + Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-emerald-800">
              {wma.name}
              {wma.tract_name ? ` — ${wma.tract_name}` : ""}
            </h3>
            {wma.tags && wma.tags.map(tag => (
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
          {/* Line 2: County + Acreage */}
          <p className="text-sm text-slate-600">
            {wma.counties.join(", ")}
            {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
          </p>
        </div>

        {/* Right Side: Favorite Button (No "Details" needed) */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={clsx(
              "rounded-md border p-2",
              isFavorite
                ? "border-amber-400 bg-amber-50 text-amber-500"
                : "border-slate-300 bg-white text-slate-400 hover:bg-slate-50"
            )}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star
              size={20}
              className={clsx(isFavorite && "fill-amber-400")}
            />
          </button>
        </div>
      </div>

      {/* --- DISTANCE & DIRECTIONS --- */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {crowFliesDist && (
          <p className="flex items-center gap-2 text-sm text-slate-700" title="As-the-crow-flies distance">
            <MapPin className="h-4 w-4" />
            ~{crowFliesDist.miles} mi
          </p>
        )}
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

      {/* --- MULTI-COUNTY WARNING --- */}
      {hasMultipleRuleSources && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p>
            This WMA spans multiple counties with different rules. Details may vary by location.
          </p>
        </div>
      )}

      {/* --- OPEN/CLOSED STATUS BOX --- */}
      <div className="rounded-lg bg-slate-50 p-3 text-sm">
        {openNow ? (
          <div className="space-y-1">
            <div>
              <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                Open {today ? fmtMmmDd(today) : ""}
              </span>
              <span className="ml-2 text-slate-700">
                {openNow.access === "general"
                  ? "General access"
                  : "Quota only"}
              </span>
            </div>
            <div className="text-slate-700">
              Weapons: {openNow.weapons.join(", ")}
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
        
        {/* SUNRISE/SUNSET INFO */}
        {sunTimes && (
          <div className="mt-2 pt-2 border-t border-slate-200 space-y-1">
            <div className="flex justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1"><Sunrise size={14} /> Sunrise: {sunTimes.sunrise}</span>
              <span className="flex items-center gap-1"><Sunset size={14} /> Sunset: {sunTimes.sunset}</span>
            </div>
            <div className="text-center text-xs text-emerald-800 font-medium">
              Legal Hours: {sunTimes.legalStart} – {sunTimes.legalEnd}
            </div>
          </div>
        )}
      </div>

      {/* --- NEW "AT A GLANCE" SPECIES SUMMARY --- */}
      <div className="pt-2">
        <h4 className="text-xs font-medium uppercase text-slate-500 mb-2">
          At a Glance
        </h4>
        <div className="space-y-2">
          {speciesGroups.map((group) => (
            <div key={group.species} className="flex items-center gap-2">
              <span className="w-20 font-medium text-sm flex items-center gap-1">
                <SpeciesIcon species={group.species} />
                {group.species}
              </span>
              <div className="flex flex-wrap gap-1">
                {Array.from(group.tags).map(tag => (
                  <Pill 
                    key={tag} 
                    text={tag}
                    className={clsx(
                      tag === "General" && "bg-emerald-100 text-emerald-800",
                      tag === "Quota" && "bg-amber-100 text-amber-800",
                      tag === "Bonus" && "bg-blue-100 text-blue-800"
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
