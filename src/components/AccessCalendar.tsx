"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import type { SeasonWithMeta } from "@/lib/types";
import { fmtMDY, normalizeLabel, toISO, todayISO } from "@/lib/util";
import { isRuleActiveOnDate } from "@/lib/rules";
import { getWeaponColor } from "@/lib/palette";

type Props = {
  rules: SeasonWithMeta[];
  initialMonth?: string;
  selectedRuleIds?: string[];
  highlightedRuleIds?: string[];
};

type CalendarRuleStyle = {
  color: string;
  access: "general" | "quota";
  weaponLabel: string;
  weaponType: string;
};

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized.length === 3 ? normalized.repeat(2) : normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function badgeStyleFor(ruleStyle: CalendarRuleStyle, mode: "cell" | "legend", highlighted: boolean, dimmed: boolean): CSSProperties {
  const { color, access } = ruleStyle;
  const style: CSSProperties = {
    borderColor: color,
    backgroundClip: "padding-box"
  };

  if (access === "general") {
    style.backgroundColor = color;
    style.color = "#ffffff";
  } else {
    style.backgroundColor = hexToRgba(color, 0.18);
    style.backgroundImage = `repeating-linear-gradient(135deg, ${hexToRgba(color, 0.6)} 0 6px, rgba(255,255,255,0.7) 6px 12px)`;
    style.backgroundSize = "12px 12px";
    style.color = "#1f2937";
  }

  if (highlighted) {
    style.boxShadow = `0 0 0 ${mode === "legend" ? 1 : 2}px ${hexToRgba(color, 0.65)}`;
  }

  if (dimmed) {
    style.opacity = 0.35;
  }

  return style;
}

type ModalDay = {
  date: string;
  hunts: { rule: SeasonWithMeta; style: CalendarRuleStyle }[];
};

export default function AccessCalendar({
  rules,
  initialMonth,
  selectedRuleIds,
  highlightedRuleIds
}: Props) {
  const initialDate = useMemo(() => {
    if (!initialMonth) return new Date();
    const [year, month] = initialMonth.split("-");
    if (!year || !month) return new Date();
    return new Date(Number(year), Number(month) - 1, 1);
  }, [initialMonth]);

  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date(initialDate);
  base.setDate(1);
  const view = new Date(base);
  view.setMonth(base.getMonth() + monthOffset);

  const selectionKey = selectedRuleIds && selectedRuleIds.length ? selectedRuleIds.join("|") : "__ALL__";
  const highlightKey = highlightedRuleIds && highlightedRuleIds.length ? highlightedRuleIds.join("|") : "__NONE__";

  const weaponMeta = useMemo(() => {
    const map = new Map<string, { weaponType: string; label: string; color: string }>();
    for (const rule of rules) {
      const weaponType = (rule.weaponKey || String(rule.weapon)).toLowerCase();
      if (!map.has(weaponType)) {
        map.set(weaponType, {
          weaponType,
          label: normalizeLabel(String(rule.weapon)),
          color: getWeaponColor(weaponType)
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [rules]);

  const [hasInteractedWithWeapons, setHasInteractedWithWeapons] = useState(false);
  const [activeWeapons, setActiveWeapons] = useState<string[]>(() => weaponMeta.map((meta) => meta.weaponType));
  // dev-note: keep manual weapon selections intact while trimming stale tokens when data changes.
  useEffect(() => {
    setActiveWeapons((previous) => {
      const defaults = weaponMeta.map((meta) => meta.weaponType);
      if (!defaults.length) return [];

      const filtered = previous.filter((token) => defaults.includes(token));
      if (filtered.length === previous.length) {
        if (filtered.length === 0 && !hasInteractedWithWeapons) {
          return defaults;
        }
        return filtered;
      }

      if (filtered.length === 0) {
        return hasInteractedWithWeapons ? [] : defaults;
      }

      return filtered;
    });
  }, [weaponMeta, hasInteractedWithWeapons]);

  const [modalDay, setModalDay] = useState<ModalDay | null>(null);

  const { styleMap, selectedRules, legend } = useMemo(() => {
    const computedStyles: Record<string, CalendarRuleStyle> = {};
    const allIds = rules.map((rule) => rule.id);
    const selectedIds = selectedRuleIds && selectedRuleIds.length ? new Set(selectedRuleIds) : new Set(allIds);
    const highlightedIds = highlightedRuleIds && highlightedRuleIds.length ? new Set(highlightedRuleIds) : new Set<string>();
    const weaponFilter = activeWeapons.length ? new Set(activeWeapons) : null;

    const selectedRules = rules.filter((rule) => {
      if (!selectedIds.has(rule.id)) return false;
      if (weaponFilter && !weaponFilter.has((rule.weaponKey || String(rule.weapon)).toLowerCase())) return false;
      return true;
    });

    for (const rule of rules) {
      const weaponToken = (rule.weaponKey || String(rule.weapon)).toLowerCase();
      computedStyles[rule.id] = {
        color: getWeaponColor(weaponToken),
        access: rule.access,
        weaponLabel: normalizeLabel(String(rule.weapon)),
        weaponType: weaponToken
      };
    }

    const legendMap = new Map<string, { weaponType: string; label: string; color: string; highlighted: boolean }>();
    for (const rule of selectedRules) {
      const style = computedStyles[rule.id];
      if (!legendMap.has(style.weaponType)) {
        legendMap.set(style.weaponType, {
          weaponType: style.weaponType,
          label: style.weaponLabel,
          color: style.color,
          highlighted: highlightedIds.has(rule.id)
        });
      } else if (highlightedIds.has(rule.id)) {
        const entry = legendMap.get(style.weaponType);
        if (entry) entry.highlighted = true;
      }
    }

    const legend = Array.from(legendMap.values()).sort((a, b) => a.label.localeCompare(b.label));

    return { styleMap: computedStyles, selectedRules, legend };
  }, [rules, selectionKey, highlightKey, selectedRuleIds, highlightedRuleIds, activeWeapons]);

  const highlightedSet = useMemo(() => new Set(highlightedRuleIds ?? []), [highlightKey, highlightedRuleIds]);
  const today = useMemo(() => todayISO(), []);

  const { label, cells } = useMemo(() => {
    const yyyy = view.getFullYear();
    const mm = view.getMonth();
    const firstOfMonth = new Date(yyyy, mm, 1);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday-first grid
    const daysInMonth = new Date(yyyy, mm + 1, 0).getDate();
    const label = view.toLocaleString(undefined, { month: "long", year: "numeric" });

    const cells = Array.from({ length: 42 }).map((_, index) => {
      const dayNumber = index - startWeekday + 1;
      const inMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
      const iso = inMonth ? toISO(new Date(yyyy, mm, dayNumber)) : "";
      const activeRules = iso ? selectedRules.filter((rule) => isRuleActiveOnDate(rule, iso)) : [];
      return { dayNumber: inMonth ? dayNumber : null, iso, inMonth, activeRules };
    });

    return { label, cells };
  }, [selectedRules, view]);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const nothingSelected = selectedRules.length === 0;

  function toggleWeapon(token: string) {
    setHasInteractedWithWeapons(true);
    setActiveWeapons((previous) =>
      previous.includes(token)
        ? previous.filter((entry) => entry !== token)
        : [...previous, token]
    );
  }

  function selectAllWeapons() {
    setHasInteractedWithWeapons(true);
    setActiveWeapons(weaponMeta.map((meta) => meta.weaponType));
  }

  function clearAllWeapons() {
    setHasInteractedWithWeapons(true);
    setActiveWeapons([]);
  }

  function handleCellClick(event: MouseEvent<HTMLButtonElement>, cell: typeof cells[number]) {
    if (!cell.iso) return;
    event.preventDefault();
    const hunts = cell.activeRules.map((rule) => ({ rule, style: styleMap[rule.id] }));
    setModalDay({ date: cell.iso, hunts });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-base font-semibold text-slate-800">{label}</h4>
        <div className="flex gap-2">
          <button className="rounded-md border border-slate-200 px-3 py-1 text-sm" onClick={() => setMonthOffset((prev) => prev - 1)}>
            Prev
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-1 text-sm" onClick={() => setMonthOffset(0)}>
            Today
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-1 text-sm" onClick={() => setMonthOffset((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </div>

      {nothingSelected ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
          Select one or more hunts to visualize their access windows on the calendar.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="sticky top-0 z-10 space-y-3 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
            <div className="flex flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded border"
                  style={badgeStyleFor(
                    { color: "#0FA47A", access: "general", weaponLabel: "General", weaponType: "__legend-general" },
                    "legend",
                    false,
                    false
                  )}
                  aria-hidden
                />
                <span className="font-medium text-slate-700">General access</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded border"
                  style={badgeStyleFor(
                    { color: "#F59E0B", access: "quota", weaponLabel: "Quota", weaponType: "__legend-quota" },
                    "legend",
                    false,
                    false
                  )}
                  aria-hidden
                />
                <span className="font-medium text-slate-700">Quota access</span>
              </div>
            </div>

            {legend.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {legend.map((entry) => (
                  <div key={entry.weaponType} className="flex items-center gap-2 text-xs text-slate-600">
                    <span
                      className={`inline-flex h-3 w-3 rounded-full ${
                        entry.highlighted ? "ring-2 ring-emerald-400 ring-offset-1 ring-offset-white" : ""
                      }`}
                      style={{ backgroundColor: entry.color }}
                      aria-hidden
                    />
                    <span className="font-medium text-slate-700">{entry.label}</span>
                  </div>
                ))}
              </div>
            )}

            {weaponMeta.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold uppercase tracking-wide text-slate-700">Weapon filters</span>
                <div className="flex flex-wrap gap-2">
                  {weaponMeta.map((meta) => {
                    const active = activeWeapons.includes(meta.weaponType);
                    return (
                      <button
                        key={meta.weaponType}
                        type="button"
                        onClick={() => toggleWeapon(meta.weaponType)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium transition ${
                          active
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                            : "border-slate-300 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                        }`}
                        aria-pressed={active}
                      >
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        {meta.label}
                      </button>
                    );
                  })}
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    onClick={selectAllWeapons}
                    className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
                  >
                    Select all
                  </button>
                  <button
                    type="button"
                    onClick={clearAllWeapons}
                    className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs sm:text-[13px]">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold uppercase tracking-wide text-slate-500">
                {day}
              </div>
            ))}
            {cells.map((cell, index) => {
              const isActive = cell.activeRules.length > 0;
              const hasGeneral = cell.activeRules.some((rule) => rule.access === "general");
              const hasQuota = cell.activeRules.some((rule) => rule.access === "quota");
              const anyHighlighted = cell.activeRules.some((rule) => highlightedSet.has(rule.id));
              const tooltip =
                cell.iso && cell.activeRules.length
                  ? `${fmtMDY(cell.iso)} • ${cell.activeRules
                      .map((rule) => {
                        const style = styleMap[rule.id];
                        return `${rule.species} — ${style.weaponLabel} (${rule.access === "general" ? "General" : "Quota"})`;
                      })
                      .join(", ")}`
                  : undefined;

              const baseColor = hasGeneral && !hasQuota ? "bg-emerald-50 border-emerald-200" : hasQuota && !hasGeneral ? "bg-amber-50 border-amber-200" : hasGeneral && hasQuota ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-slate-200";
              const todayRing = cell.iso && cell.iso === today ? "ring-2 ring-emerald-500" : "";
              const highlightRing = anyHighlighted ? "ring-2 ring-offset-1 ring-emerald-400" : "";

              const uniqueWeaponTypes = Array.from(
                new Set(cell.activeRules.map((rule) => styleMap[rule.id].weaponType))
              ).slice(0, 4);

              const resolveDotColor = (weaponType: string) => {
                const match = cell.activeRules.find(
                  (rule) => styleMap[rule.id].weaponType === weaponType
                );
                return match ? styleMap[match.id].color : "#cbd5f5";
              };

              return (
                <button
                  key={`${index}-${cell.iso}`}
                  type="button"
                  onClick={(event) => handleCellClick(event, cell)}
                  disabled={!cell.iso}
                  className={`min-h-[92px] rounded-xl border p-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    baseColor
                  } ${cell.inMonth ? "" : "opacity-40"} ${todayRing} ${highlightRing} ${
                    isActive ? "cursor-pointer hover:border-emerald-400" : "cursor-default"
                  }`}
                  title={tooltip}
                  aria-label={tooltip}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-semibold text-slate-700">{cell.dayNumber ?? ""}</span>
                    {hasGeneral && (
                      <span className="text-[10px] font-semibold uppercase text-emerald-600">General</span>
                    )}
                    {!hasGeneral && hasQuota && (
                      <span className="text-[10px] font-semibold uppercase text-amber-600">Quota</span>
                    )}
                  </div>

                  {cell.activeRules.length === 0 ? (
                    <span className="mt-4 block text-[11px] text-slate-400">Closed</span>
                  ) : cell.activeRules.length <= 3 ? (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {cell.activeRules.map((rule) => {
                        const style = styleMap[rule.id];
                        const isHighlighted = highlightedSet.has(rule.id);
                        const dimmed = highlightedSet.size > 0 && !isHighlighted;
                        const badgeStyle = badgeStyleFor(style, "cell", isHighlighted, dimmed);
                        return (
                          <span
                            key={rule.id}
                            className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-tight"
                            style={badgeStyle}
                          >
                            {style.weaponLabel}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-1">
                      {uniqueWeaponTypes.map((weaponType) => (
                        <span
                          key={weaponType}
                          className="inline-flex h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: resolveDotColor(weaponType) }}
                        />
                      ))}
                      <span className="text-[11px] text-slate-600">+{cell.activeRules.length}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <DayDetailModal day={modalDay} onClose={() => setModalDay(null)} />
    </div>
  );
}

function DayDetailModal({ day, onClose }: { day: ModalDay | null; onClose: () => void }) {
  useEffect(() => {
    if (!day) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [day, onClose]);

  if (!day) return null;

  const prettyDate = new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const sortedHunts = [...day.hunts].sort((a, b) => {
    const speciesCompare = a.rule.species.localeCompare(b.rule.species);
    if (speciesCompare !== 0) return speciesCompare;
    return a.style.weaponLabel.localeCompare(b.style.weaponLabel);
  });

  const overlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Hunt opportunities for ${prettyDate}`}
      onClick={overlayClick}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Daily outlook</p>
            <h3 className="text-xl font-bold text-slate-800">{prettyDate}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
          >
            Close
          </button>
        </div>

        {sortedHunts.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            No hunting opportunities scheduled for this day.
          </p>
        ) : (
          <ul className="space-y-3 text-sm text-slate-700">
            {sortedHunts.map(({ rule, style }) => {
              const badgeStyle = badgeStyleFor(style, "cell", false, false);
              return (
                <li key={rule.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {rule.species} · {style.weaponLabel}
                      </p>
                      <p className="text-xs text-slate-500">
                        {rule.access === "general" ? "General access" : "Quota access"}
                      </p>
                    </div>
                    <span
                      className="rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-tight"
                      style={badgeStyle}
                    >
                      {style.weaponLabel}
                    </span>
                  </div>

                  {rule.application_deadline && rule.access === "quota" && (
                    <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                      Apply by {fmtMDY(rule.application_deadline)}
                      {rule.application_url ? (
                        <>
                          {" · "}
                          <a
                            href={rule.application_url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                          >
                            Apply online
                          </a>
                        </>
                      ) : null}
                    </p>
                  )}

                  {rule.quota_details && (
                    <p className="mt-2 text-xs text-slate-600">{rule.quota_details}</p>
                  )}
                  {rule.notes_short && (
                    <p className="mt-1 text-xs text-slate-600">{rule.notes_short}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
