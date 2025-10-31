"use client";

import { useMemo, type KeyboardEvent } from "react";
import { MapPin } from "lucide-react";

import FavoriteButton from "@/components/FavoriteButton";
import SeasonBadge from "@/components/SeasonBadge";
import type { SeasonWithMeta, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import { dayStatus, getUpcomingWindows, isRuleActiveOnDate } from "@/lib/rules";
import { getAreaCategoryStyle } from "@/lib/palette";

type Props = {
  wma: WMA;
  matchingRules: SeasonWithMeta[];
  allRules: SeasonWithMeta[];
  selectedDate?: string | null;
  distanceMi: number | null;
  driveMinutes: number | null;
  onOpen: () => void;
  compact?: boolean;
};

export default function WMACard({
  wma,
  matchingRules,
  allRules,
  selectedDate,
  distanceMi,
  driveMinutes,
  onOpen,
  compact = false
}: Props) {
  const openSummary = useMemo(() => {
    if (!selectedDate) return null;
    const active = matchingRules.filter((rule) => isRuleActiveOnDate(rule, selectedDate));
    if (!active.length) return null;
    const access = dayStatus(matchingRules, selectedDate);
    const species = Array.from(new Set(active.map((rule) => rule.species))).join(", ");
    const weapons = Array.from(new Set(active.map((rule) => String(rule.weapon)))).join(", ");
    return { access, species, weapons };
  }, [matchingRules, selectedDate]);

  const upcoming = useMemo(() => getUpcomingWindows(allRules, 3), [allRules]);
  const categoryStyle = getAreaCategoryStyle(wma.area_category || "WMA");
  const amenityChips = [
    { icon: "🏕️", label: "Camping", allowed: !!wma.camping_allowed },
    { icon: "🏍️", label: "ATVs", allowed: !!wma.atv_allowed }
  ];

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  }

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKey}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: categoryStyle.bgColor, color: categoryStyle.textColor }}
            >
              <span aria-hidden className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: categoryStyle.color }} />
              {categoryStyle.label}
            </span>
            <SeasonBadge rules={allRules} />
          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            {wma.name}
            {wma.tract_name ? ` — ${wma.tract_name}` : ""}
          </h3>
          <p className="text-sm text-slate-600">
            {wma.counties.join(", ")}
            {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
            {wma.region ? ` • ${wma.region}` : ""}
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            {amenityChips
              .filter((chip) => chip.allowed)
              .map((chip) => (
                <span key={chip.label} className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                  <span aria-hidden>{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            {wma.tags &&
              wma.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#E6DFC8] px-2 py-1 text-slate-700">
                  {tag}
                </span>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-sm text-slate-700">
          <FavoriteButton wmaId={wma.id} />
          {distanceMi != null && (
            <span className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="h-4 w-4 text-emerald-700" />
              {distanceMi} mi
              {driveMinutes != null ? ` • ~${driveMinutes} min` : ""}
            </span>
          )}
          <button
            className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
          >
            Details
          </button>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 rounded-xl bg-[#F7F5EC] p-4 text-sm text-slate-700">
          {openSummary ? (
            <div className="space-y-1">
              <div>
                <span className="rounded-full bg-[#0FA47A] px-2 py-0.5 text-xs font-medium text-white">
                  Open on {fmtMDY(selectedDate!)}
                </span>
                <span className="ml-2 font-medium text-slate-800">
                  {openSummary.access === "general" ? "General access" : "Quota only"}
                </span>
              </div>
              <p>Species: {openSummary.species || "Multiple"}</p>
              <p>Weapons: {openSummary.weapons || "Varies"}</p>
            </div>
          ) : (
            <div>
              {selectedDate ? (
                <>No seasons match {fmtMDY(selectedDate)}.</>
              ) : (
                <>Select a date to see day-specific availability.</>
              )}
            </div>
          )}
        </div>
      )}

      {!compact && (
        <div className="mt-4 text-xs text-slate-600">
          <p className="font-semibold text-slate-700">Upcoming windows</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {upcoming.length > 0 ? (
              upcoming.map((window) => (
                <span
                  key={window.id}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] shadow-sm"
                >
                  <span className={window.access === "general" ? "text-emerald-700" : "text-amber-700"}>
                    {window.access === "general" ? "General" : "Quota"}
                  </span>{" "}
                  {window.species} ({window.weapon}) • {fmtMDY(window.start)} – {fmtMDY(window.end)}
                </span>
              ))
            ) : (
              <span>No upcoming seasons posted.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
