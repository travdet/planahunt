import type { FilterState, SeasonWithMeta, WMAWithRules } from "./types";
import { overlap, isDateWithin, haversineMi } from "./util";
import { AVERAGE_DRIVE_SPEED_MPH } from "./constants";

export type FilteredArea = {
  wma: WMAWithRules["wma"];
  matchingRules: SeasonWithMeta[];
  allRules: SeasonWithMeta[];
  distanceMi: number | null;
  driveMinutes: number | null;
};

function isRuleActiveOnDay(rule: SeasonWithMeta, target: string) {
  if (!isDateWithin(target, rule.start_date, rule.end_date)) return false;
  if (rule.weekdaysNormalized?.length) {
    const day = new Date(`${target}T00:00:00`).getDay();
    if (!rule.weekdaysNormalized.includes(day)) return false;
  }
  return true;
}

function ruleMatches(rule: SeasonWithMeta, filters: FilterState) {
  if (filters.species.length && !filters.species.includes(rule.speciesKey)) return false;
  if (filters.weapons.length && !filters.weapons.includes(rule.weaponKey)) return false;
  if (filters.accessType !== "any" && rule.access !== filters.accessType) return false;
  if (filters.sex !== "any" && rule.sexRule !== filters.sex) return false;

  const explicitDates: string[] = [];
  if (filters.date) explicitDates.push(filters.date);
  if (filters.dates?.length) explicitDates.push(...filters.dates);

  if (explicitDates.length) {
    const match = explicitDates.some((value) => isRuleActiveOnDay(rule, value));
    if (!match) return false;
  }

  if (filters.dateRange?.start && filters.dateRange?.end) {
    if (!overlap(rule.start_date, rule.end_date, filters.dateRange.start, filters.dateRange.end)) {
      return false;
    }
  }

  return true;
}

function wmaMatchesFilters(area: WMAWithRules, filters: FilterState, matchingRules: SeasonWithMeta[]) {
  const { wma } = area;
  if (filters.counties.length && !wma.counties.some((c) => filters.counties.includes(c))) {
    return false;
  }
  if (filters.regions.length) {
    const regionValue = wma.region ?? "";
    if (!filters.regions.includes(regionValue)) {
      return false;
    }
  }

  if (filters.tags.length) {
    const available = new Set<string>();
    (wma.tags || []).forEach((tag) => available.add(tag.toLowerCase()));
    matchingRules.forEach((rule) => (rule.tags || []).forEach((tag) => available.add(tag.toLowerCase())));
    const needs = filters.tags.map((t) => t.toLowerCase());
    if (!needs.every((tag) => available.has(tag))) {
      return false;
    }
  }

  if (filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    const textParts = [
      wma.name,
      wma.tract_name || "",
      wma.counties.join(" "),
      wma.region || "",
      ...(wma.tags || [])
    ];
    matchingRules.forEach((rule) => {
      textParts.push(rule.species);
      textParts.push(String(rule.weapon));
      (rule.tags || []).forEach((tag) => textParts.push(tag));
    });
    const haystack = textParts.join(" ").toLowerCase();
    if (!haystack.includes(q)) return false;
  }

  return true;
}

function computeDistance(
  wma: WMAWithRules["wma"],
  home?: { lat: number | null; lng: number | null },
  maxDistanceMi?: number | null
) {
  if (!home?.lat || !home?.lng) return { miles: null, minutes: null };
  const lat = wma.lat;
  const lng = wma.lng;
  if (typeof lat !== "number" || typeof lng !== "number") {
    return { miles: null, minutes: null };
  }
  const miles = haversineMi({ lat: home.lat, lng: home.lng }, { lat, lng });
  if (maxDistanceMi != null && miles > maxDistanceMi) {
    return { miles: Infinity, minutes: null };
  }
  const minutes = Math.round((miles / AVERAGE_DRIVE_SPEED_MPH) * 60);
  return { miles, minutes };
}

export function filterAreas(
  areas: WMAWithRules[],
  filters: FilterState,
  home?: { lat: number | null; lng: number | null },
  maxDistanceMi?: number | null
): FilteredArea[] {
  const results: FilteredArea[] = [];

  for (const area of areas) {
    const matchingRules = area.rules.filter((rule) => ruleMatches(rule, filters));
    if (!matchingRules.length) continue;
    if (!wmaMatchesFilters(area, filters, matchingRules)) continue;

    const { miles, minutes } = computeDistance(area.wma, home, maxDistanceMi ?? undefined);
    if (miles === Infinity) continue; // outside radius

    results.push({
      wma: area.wma,
      matchingRules,
      allRules: area.rules,
      distanceMi: miles === null ? null : Number(miles.toFixed(1)),
      driveMinutes: minutes
    });
  }

  results.sort((a, b) => {
    if (a.distanceMi != null && b.distanceMi != null) {
      if (a.distanceMi !== b.distanceMi) return a.distanceMi - b.distanceMi;
      return a.wma.name.localeCompare(b.wma.name);
    }
    if (a.distanceMi != null) return -1;
    if (b.distanceMi != null) return 1;
    return a.wma.name.localeCompare(b.wma.name);
  });

  return results;
}
