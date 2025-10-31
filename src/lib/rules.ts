import type { SeasonWithMeta } from "./types";
import { compareISO, fmtMDY, isDateWithin, todayISO } from "./util";

export type DayStatus = "general" | "quota" | "closed";

export function isRuleActiveOnDate(rule: SeasonWithMeta, iso: string) {
  if (!isDateWithin(iso, rule.start_date, rule.end_date)) return false;
  if (rule.weekdaysNormalized?.length) {
    const dow = new Date(iso + "T00:00:00").getDay();
    if (!rule.weekdaysNormalized.includes(dow)) return false;
  }
  return true;
}

export function dayStatus(rules: SeasonWithMeta[], iso: string): DayStatus {
  const active = rules.filter((rule) => isRuleActiveOnDate(rule, iso));
  if (!active.length) return "closed";
  return active.some((rule) => rule.access === "general") ? "general" : "quota";
}

export function getUpcomingWindows(
  rules: SeasonWithMeta[],
  limit = 6,
  fromDate: string = todayISO()
) {
  const windows = [] as {
    id: string;
    species: string;
    weapon: string;
    access: "general" | "quota";
    start: string;
    end: string;
    notes?: string;
  }[];

  const sorted = [...rules].sort((a, b) => {
    const startCompare = compareISO(a.start_date, b.start_date);
    if (startCompare !== 0) return startCompare;
    return compareISO(a.end_date, b.end_date);
  });

  for (const rule of sorted) {
    if (rule.end_date < fromDate) continue;
    windows.push({
      id: rule.id,
      species: rule.species,
      weapon: String(rule.weapon),
      access: rule.access,
      start: rule.start_date,
      end: rule.end_date,
      notes: rule.notes_short || undefined
    });
    if (windows.length >= limit) break;
  }

  return windows;
}

export function groupBySpecies(rules: SeasonWithMeta[]) {
  const map = new Map<string, SeasonWithMeta[]>();
  for (const rule of rules) {
    if (!map.has(rule.species)) {
      map.set(rule.species, []);
    }
    map.get(rule.species)!.push(rule);
  }
  return Array.from(map.entries()).map(([species, entries]) => ({
    species,
    entries: entries.sort((a, b) => compareISO(a.start_date, b.start_date))
  }));
}

export function formatWindowSummary(window: {
  access: "general" | "quota";
  start: string;
  end: string;
}) {
  const label = window.access === "general" ? "General" : "Quota";
  return `${label}: ${fmtMDY(window.start)} – ${fmtMDY(window.end)}`;
}
