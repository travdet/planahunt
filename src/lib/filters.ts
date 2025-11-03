import type { FilterState, WMA, SeasonRule, HomeLocation } from "./types";
import { overlap, isDateWithin, toISO, haversineMi } from "./util";

// Export the Row type that map/page.tsx needs
export type Row = { wma: WMA; rule: SeasonRule };

// Determines if a rule matches filter selections
function ruleMatchesFilters(rule: SeasonRule, f: FilterState) {
  if (f.species.length && !f.species.includes(rule.species.toLowerCase()))
    return false;
  if (f.weapons.length && !f.weapons.includes(String(rule.weapon).toLowerCase()))
    return false;
  if (f.accessType !== "any") {
    const isQuota = !!rule.quota_required;
    if (f.accessType === "quota" && !isQuota) return false;
    if (f.accessType === "general" && isQuota) return false;
  }
  if (f.sex !== "any") {
    if (f.sex === "buck" && rule.buck_only !== true) return false;
    if (f.sex === "either" && rule.buck_only === true) return false;
    // (doe-only rarely exists; would be represented by notes or tag)
  }
  
  // UPDATED: This now uses the new single dateRange object
  if (f.dateRange) {
    // Convert Date objects to 'YYYY-MM-DD' strings for comparison
    const rangeStart = toISO(f.dateRange.start);
    const rangeEnd = toISO(f.dateRange.end);
    if (!overlap(rule.start_date, rule.end_date, rangeStart, rangeEnd))
      return false;
  }
  return true;
}

export function applyFilters(
  rows: Row[],
  f: FilterState,
  // UPDATED: This now uses the HomeLocation type and maxDistanceMi from 'f'
  home: HomeLocation | null 
) {
  let filtered = rows.filter(({ rule }) => ruleMatchesFilters(rule, f));

  if (f.counties.length) {
    filtered = filtered.filter(({ wma }) =>
      wma.counties.some((c) => f.counties.includes(c))
    );
  }
  if (f.regions.length) {
    filtered = filtered.filter(
      ({ wma }) => wma.region && f.regions.includes(wma.region)
    );
  }
  if (f.tags.length) {
    filtered = filtered.filter(({ wma, rule }) => {
      const wTags = new Set(
        [...(wma.tags || []), ...(rule.tags || [])].map((t) => t.toLowerCase())
      );
      return f.tags.every((t) => wTags.has(t.toLowerCase()));
    });
  }
  if (f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    filtered = filtered.filter(
      ({ wma, rule }) =>
        (
          wma.name +
          " " +
          (wma.tract_name || "") +
          " " +
          rule.species +
          " " +
          rule.weapon
        )
          .toLowerCase()
          .includes(q)
    );
  }

  // UPDATED: This now uses the real haversine distance filter
  const maxDistance = f.maxDistanceMi;
  if (home?.lat && home?.lng && maxDistance) {
    const homeCoords = { lat: home.lat, lng: home.lng };
    filtered = filtered.filter(({ wma }) => {
      if (wma.lat == null || wma.lng == null) return false;
      const wmaCoords = { lat: wma.lat, lng: wma.lng };
      
      const distance = haversineMi(homeCoords, wmaCoords);
      return distance <= maxDistance;
    });
  }

  return filtered;
}
