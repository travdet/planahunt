"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { SeasonWithMeta } from "@/lib/types";
import { fmtMDY, normalizeLabel, toISO } from "@/lib/util";
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

  const { styleMap, selectedRules, legend } = useMemo(() => {
    const computedStyles: Record<string, CalendarRuleStyle> = {};
    const allIds = rules.map((rule) => rule.id);
    const selectedIds = selectedRuleIds && selectedRuleIds.length ? new Set(selectedRuleIds) : new Set(allIds);
    const highlightedIds = highlightedRuleIds && highlightedRuleIds.length ? new Set(highlightedRuleIds) : new Set<string>();

    const selectedRules = rules.filter((rule) => selectedIds.has(rule.id));

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
  }, [rules, selectionKey, highlightKey, selectedRuleIds, highlightedRuleIds]);

  const highlightedSet = useMemo(() => new Set(highlightedRuleIds ?? []), [highlightKey, highlightedRuleIds]);

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
        <div className="grid grid-cols-7 gap-2 text-xs sm:text-[13px]">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-semibold uppercase tracking-wide text-slate-500">
              {day}
            </div>
          ))}
          {cells.map((cell, index) => {
            const isActive = cell.activeRules.length > 0;
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

            return (
              <div
                key={`${index}-${cell.iso}`}
                className={`min-h-[88px] rounded-xl border p-2 transition ${
                  isActive ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
                } ${cell.inMonth ? "" : "opacity-40"} ${anyHighlighted ? "ring-2 ring-emerald-400" : ""}`}
                title={tooltip}
              >
                <div className="text-sm font-semibold text-slate-700">{cell.dayNumber}</div>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
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
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-3 text-xs text-slate-600">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded border"
              style={badgeStyleFor(
                { color: "#0FA47A", access: "general", weaponLabel: "General", weaponType: "__legend-general" },
                "legend",
                false,
                false
              )}
            />
            <span>General access</span>
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
            />
            <span>Quota access</span>
          </div>
        </div>

        {legend.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {legend.map((entry) => (
              <div key={entry.weaponType} className="flex items-center gap-2">
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
      </div>
    </div>
  );
}
