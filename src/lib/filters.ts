import type { FilterState, WMA, SeasonRule, Coordinates } from "./types";
import { overlap, isDateWithin, haversineMi } from "./util";
import { isOpenOn } from "./rules";

export type Row = { wma: WMA; rule: SeasonRule };

// Determines if a rule matches filter selections
function ruleMatchesFilters(rule: SeasonRule, f: FilterState) {
  const speciesFilters = f.species.map(s => s.toLowerCase());
  if (speciesFilters.length && !speciesFilters.includes(rule.species.toLowerCase())) return false;

  const weaponFilters = f.weapons.map(w => w.toLowerCase());
  if (weaponFilters.length && !weaponFilters.includes(String(rule.weapon).toLowerCase())) return false;

  if (f.quota === "quota" && !rule.quota_required) return false;
  if (f.quota === "non-quota" && rule.quota_required) return false;
  if (f.accessType !== "any") {
    const isQuota = !!rule.quota_required;
    if (f.accessType === "quota" && !isQuota) return false;
    if (f.accessType === "general" && isQuota) return false;
  }
  if (f.sex !== "any") {
    if (f.sex === "buck" && !rule.buck_only) return false;
    if (f.sex === "either" && rule.buck_only) return false;
    if (f.sex === "doe" && rule.buck_only) return false;
    // (doe-only rarely exists; would be represented by notes or tag)
  }
  if (f.buckOnly === "yes" && !rule.buck_only) return false;
  if (f.buckOnly === "no" && rule.buck_only) return false;
  if (f.date) {
    if (!isDateWithin(f.date, rule.start_date, rule.end_date)) return false;
  }
  if (f.dateRange) {
    const { start, end } = f.dateRange;
    if (!overlap(rule.start_date, rule.end_date, start, end)) return false;
  }
  if (f.date && !isOpenOn(rule, f.date)) return false;
  return true;
}

export function applyFilters(
  rows: Row[],
  f: FilterState,
  home?: Coordinates | null,
  maxDistanceMi?: number | null
) {
  let filtered = rows.filter(({ rule }) => ruleMatchesFilters(rule, f));

  if (f.counties.length) {
    filtered = filtered.filter(({ wma }) => wma.counties.some(c => f.counties.includes(c)));
  }
  if (f.regions.length) {
    filtered = filtered.filter(({ wma }) => (wma.region && f.regions.includes(wma.region)));
  }
  if (f.tags.length) {
    filtered = filtered.filter(({ wma, rule }) => {
      const wTags = new Set([...(wma.tags||[]), ...(rule.tags||[])].map(t => t.toLowerCase()));
      return f.tags.every(t => wTags.has(t.toLowerCase()));
    });
  }
  if (f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    filtered = filtered.filter(({ wma, rule }) => {
      const wmaName = wma?.name ?? "";
      const tract = wma?.tract_name ?? "";
      return (
        `${wmaName} ${tract} ${rule.species} ${rule.weapon}`
          .toLowerCase()
          .includes(q)
      );
    });
  }

  const effectiveHome: Coordinates | null = (() => {
    if (home) return home;
    if (f.home) return f.home;
    if (f.homeLat != null && f.homeLng != null) {
      return { lat: f.homeLat, lng: f.homeLng };
    }
    return null;
  })();

  const effectiveMaxDistance = maxDistanceMi ?? f.maxDistanceMi ?? null;

  if (
    effectiveHome &&
    effectiveHome.lat != null &&
    effectiveHome.lng != null &&
    effectiveMaxDistance != null
  ) {
    filtered = filtered.filter(({ wma }) => {
      if (wma.lat == null || wma.lng == null) return false;
      const distance = haversineMi(
        { lat: effectiveHome.lat, lng: effectiveHome.lng },
        { lat: wma.lat, lng: wma.lng }
      );
      return distance <= effectiveMaxDistance;
    });
  }

  return filtered;
}
