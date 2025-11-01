import type { AccessProfile, SeasonWithMeta } from "./types";
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
    applicationDeadline?: string | null;
    resultsNotificationDate?: string | null;
    spotsAvailable?: number | null;
    estimatedApplicants?: number | null;
    applicationUrl?: string | null;
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
      notes: rule.notes_short || undefined,
      applicationDeadline: rule.application_deadline || null,
      resultsNotificationDate: rule.results_notification_date || null,
      spotsAvailable: rule.spots_available ?? null,
      estimatedApplicants: rule.estimated_applicants ?? null,
      applicationUrl: rule.application_url ?? null
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

/**
 * Summarise the overall access feel for a set of rules so that the UI can
 * quickly highlight whether a property is truly walk-on, lottery-only or a
 * mixture. This is reused across cards, map markers and hover tooltips so we
 * centralise it here for future developers.
 */
export function summarizeAccessProfile(rules: SeasonWithMeta[]): AccessProfile {
  if (!rules.length) return "none";
  const hasGeneral = rules.some((rule) => rule.access === "general");
  const hasQuota = rules.some((rule) => rule.access === "quota");

  if (hasGeneral && hasQuota) return "mixed";
  if (hasGeneral) return "general";
  if (hasQuota) return "quota";
  return "none";
}
