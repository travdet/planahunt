"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { SeasonWithMeta, WMA } from "@/lib/types";
import { fmtMDY, normalizeLabel } from "@/lib/util";
import AccessCalendar from "./AccessCalendar";
import { getUpcomingWindows } from "@/lib/rules";
import { getSpeciesIcon, getWeaponColor } from "@/lib/palette";

type Props = {
  wma: WMA;
  rules: SeasonWithMeta[];
  onClose: () => void;
};

type WeaponOption = {
  key: string;
  weaponLabel: string;
  weaponType: string;
  species: string;
  color: string;
  ruleIds: string[];
  generalRules: SeasonWithMeta[];
  quotaRules: SeasonWithMeta[];
  generalSummary: string | null;
  quotaSummary: string | null;
};

type SpeciesGroup = {
  species: string;
  icon: string;
  weapons: WeaponOption[];
};

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "short" });

function formatShortRange(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return `${start} – ${end}`;
  }
  const startLabel = `${monthFormatter.format(startDate)} ${startDate.getDate()}`;
  const endLabel = `${monthFormatter.format(endDate)} ${endDate.getDate()}`;
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    return `${monthFormatter.format(startDate)} ${startDate.getDate()}-${endDate.getDate()}`;
  }
  return `${startLabel}-${endLabel}`;
}

function summarizeRanges(list: SeasonWithMeta[]) {
  if (!list.length) return null;
  const sorted = [...list].sort((a, b) => {
    if (a.start_date === b.start_date) {
      if (a.end_date === b.end_date) return a.id.localeCompare(b.id);
      return a.end_date < b.end_date ? -1 : 1;
    }
    return a.start_date < b.start_date ? -1 : 1;
  });
  return sorted.map((rule) => formatShortRange(rule.start_date, rule.end_date)).join(", ");
}

function buildGroups(rules: SeasonWithMeta[]) {
  const speciesMap = new Map<string, { species: string; icon: string; weaponsMap: Map<string, WeaponOption> }>();
  const weaponMeta: Record<string, WeaponOption> = {};

  for (const rule of rules) {
    const speciesName = rule.species;
    const speciesKey = speciesName.toLowerCase();
    if (!speciesMap.has(speciesKey)) {
      speciesMap.set(speciesKey, {
        species: speciesName,
        icon: getSpeciesIcon(speciesName),
        weaponsMap: new Map<string, WeaponOption>()
      });
    }

    const speciesEntry = speciesMap.get(speciesKey)!;
    const weaponToken = (rule.weaponKey || String(rule.weapon)).toLowerCase();
    const weaponType = weaponToken.replace(/[^a-z0-9]+/g, "-") || "other";
    const weaponKey = `${speciesKey}::${weaponType}`;

    if (!speciesEntry.weaponsMap.has(weaponKey)) {
      const option: WeaponOption = {
        key: weaponKey,
        weaponLabel: normalizeLabel(String(rule.weapon)) || String(rule.weapon),
        weaponType,
        species: speciesName,
        color: getWeaponColor(weaponToken),
        ruleIds: [],
        generalRules: [],
        quotaRules: [],
        generalSummary: null,
        quotaSummary: null
      };
      speciesEntry.weaponsMap.set(weaponKey, option);
      weaponMeta[weaponKey] = option;
    }

    const option = speciesEntry.weaponsMap.get(weaponKey)!;
    option.ruleIds.push(rule.id);
    if (rule.access === "general") {
      option.generalRules.push(rule);
    } else {
      option.quotaRules.push(rule);
    }
  }

  const speciesGroups: SpeciesGroup[] = Array.from(speciesMap.values()).map(({ species, icon, weaponsMap }) => {
    const weapons = Array.from(weaponsMap.values()).map((option) => {
      const enriched: WeaponOption = {
        ...option,
        generalSummary: summarizeRanges(option.generalRules),
        quotaSummary: summarizeRanges(option.quotaRules)
      };
      weaponMeta[option.key] = enriched;
      return enriched;
    });
    weapons.sort((a, b) => a.weaponLabel.localeCompare(b.weaponLabel));
    return { species, icon, weapons };
  });

  speciesGroups.sort((a, b) => a.species.localeCompare(b.species));

  const allWeaponKeys = speciesGroups.flatMap((group) => group.weapons.map((weapon) => weapon.key));

  return { speciesGroups, weaponMeta, allWeaponKeys };
}

export default function WMAModal({ wma, rules, onClose }: Props) {
  const upcoming = getUpcomingWindows(rules, 8);
  const initialMonth = rules.length ? rules[0].start_date.slice(0, 7) : undefined;

  const { speciesGroups, weaponMeta, allWeaponKeys } = useMemo(() => buildGroups(rules), [rules]);
  const [selectedWeapons, setSelectedWeapons] = useState<Set<string>>(() => new Set(allWeaponKeys));
  const [expandedWeapons, setExpandedWeapons] = useState<Set<string>>(() => new Set());
  const [hoveredWeapon, setHoveredWeapon] = useState<string | null>(null);

  const weaponKeysSignature = useMemo(() => allWeaponKeys.join("|"), [allWeaponKeys]);

  useEffect(() => {
    setSelectedWeapons(new Set(allWeaponKeys));
    setExpandedWeapons(new Set());
    setHoveredWeapon(null);
  }, [wma.id, weaponKeysSignature, allWeaponKeys]);

  const selectedRuleIds = useMemo(() => {
    const ids: string[] = [];
    selectedWeapons.forEach((key) => {
      const meta = weaponMeta[key];
      if (meta) ids.push(...meta.ruleIds);
    });
    return ids.sort();
  }, [selectedWeapons, weaponMeta]);

  const highlightedRuleIds = useMemo(() => {
    if (!hoveredWeapon) return [] as string[];
    return weaponMeta[hoveredWeapon]?.ruleIds ?? [];
  }, [hoveredWeapon, weaponMeta]);

  const toggleWeapon = (key: string) => {
    setSelectedWeapons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleExpanded = (key: string) => {
    setExpandedWeapons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const clearAll = () => setSelectedWeapons(new Set());
  const selectAll = () => setSelectedWeapons(new Set(allWeaponKeys));

  const totalHunts = allWeaponKeys.length;
  const selectedHunts = selectedWeapons.size;

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="mt-10 w-full max-w-5xl rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wma-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 id="wma-modal-title" className="text-xl font-semibold text-slate-900">
              {wma.name}
              {wma.tract_name ? ` — ${wma.tract_name}` : ""}
            </h3>
            <p className="text-sm text-slate-600">
              {wma.counties.join(", ")}
              {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
              {wma.phone ? ` • ${wma.phone}` : ""}
            </p>
            {wma.tags && wma.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                {wma.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#E6DFC8] px-2 py-1 text-xs text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 text-sm text-slate-600">
            <Link
              href={`/hunt/${encodeURIComponent(wma.id)}`}
              className="rounded-md border border-emerald-600 px-3 py-2 text-emerald-700 transition hover:bg-emerald-50"
            >
              Open full details
            </Link>
            <button className="rounded-md border border-slate-300 px-3 py-2 transition hover:bg-slate-50" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[360px,1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Hunt filters</h4>
                <div className="flex gap-2 text-xs font-semibold text-emerald-700">
                  <button
                    type="button"
                    className="rounded-md border border-emerald-600 px-2 py-1 transition hover:bg-emerald-50 disabled:opacity-40"
                    onClick={selectAll}
                    disabled={selectedHunts === totalHunts}
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-slate-300 px-2 py-1 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                    onClick={clearAll}
                    disabled={selectedHunts === 0}
                  >
                    Clear all
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Showing {selectedHunts} of {totalHunts} hunt types.
              </p>
            </div>

            {speciesGroups.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                No hunts are currently configured for this property.
              </div>
            ) : (
              speciesGroups.map((group) => (
                <div key={group.species} className="rounded-2xl border border-slate-200 bg-white/70 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                    <span className="text-xl" aria-hidden>
                      {group.icon}
                    </span>
                    <div>
                      <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{group.species}</h5>
                      <p className="text-xs text-slate-500">{group.weapons.length} weapon option{group.weapons.length === 1 ? "" : "s"}</p>
                    </div>
                  </div>
                  <div className="space-y-3 px-4 py-4">
                    {group.weapons.map((weapon) => {
                      const isSelected = selectedWeapons.has(weapon.key);
                      const isExpanded = expandedWeapons.has(weapon.key);
                      const isHovered = hoveredWeapon === weapon.key;
                      const hasGeneral = weapon.generalSummary && weapon.generalSummary.length > 0;
                      const hasQuota = weapon.quotaSummary && weapon.quotaSummary.length > 0;
                      const checkboxId = `${weapon.key}-checkbox`;

                      return (
                        <div
                          key={weapon.key}
                          className={`rounded-xl border px-3 py-3 transition ${
                            isSelected ? "border-emerald-400 bg-emerald-50/60" : "border-slate-200 bg-white"
                          } ${isHovered ? "ring-2 ring-emerald-300" : ""}`}
                          onMouseEnter={() => setHoveredWeapon(weapon.key)}
                          onMouseLeave={() => setHoveredWeapon((current) => (current === weapon.key ? null : current))}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              id={checkboxId}
                              type="checkbox"
                              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                              checked={isSelected}
                              onChange={() => toggleWeapon(weapon.key)}
                            />
                            <div className="flex-1">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <label htmlFor={checkboxId} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                                  <span
                                    className="inline-flex h-3 w-3 rounded-full"
                                    style={{ backgroundColor: weapon.color }}
                                    aria-hidden
                                  />
                                  <span className="text-sm font-semibold text-slate-800">{weapon.weaponLabel}</span>
                                  <span className="text-xs text-slate-500">
                                    {[hasGeneral ? "General" : null, hasQuota ? "Quota" : null]
                                      .filter(Boolean)
                                      .join(" • ") || "No active seasons"}
                                  </span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => toggleExpanded(weapon.key)}
                                  className="text-xs font-semibold text-emerald-700 transition hover:text-emerald-600"
                                >
                                  {isExpanded ? "Hide dates" : "Show dates"}
                                </button>
                              </div>
                              {isExpanded && (
                                <div className="mt-3 space-y-1 text-xs text-slate-600">
                                  {hasGeneral && (
                                    <div>
                                      <span className="font-semibold text-slate-700">General:</span> {weapon.generalSummary}
                                    </div>
                                  )}
                                  {hasQuota && (
                                    <div>
                                      <span className="font-semibold text-slate-700">Quota:</span> {weapon.quotaSummary}
                                    </div>
                                  )}
                                  {!hasGeneral && !hasQuota && <div>No posted dates yet.</div>}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}

            <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Upcoming windows</h4>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                {upcoming.length ? (
                  upcoming.map((window) => (
                    <div key={window.id} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                        <span>{window.species}</span>
                        <span className={window.access === "general" ? "text-emerald-600" : "text-amber-600"}>
                          {window.access === "general" ? "General" : "Quota"}
                        </span>
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-800">{window.weapon}</div>
                      <div className="text-xs text-slate-500">{fmtMDY(window.start)} – {fmtMDY(window.end)}</div>
                      {window.notes ? <div className="mt-1 text-xs text-slate-500">{window.notes}</div> : null}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No upcoming seasons posted.</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Calendar</h4>
            <AccessCalendar
              rules={rules}
              initialMonth={initialMonth}
              selectedRuleIds={selectedRuleIds}
              highlightedRuleIds={highlightedRuleIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
