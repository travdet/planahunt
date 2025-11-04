import type { FilterState, WMA, SeasonRule, HomeLocation, SpeciesGroup } from "./types";
import { overlap, toISO, haversineMi } from "./util";

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
  }
  
  if (f.dateRange) {
    const rangeStart = toISO(f.dateRange.start);
    const rangeEnd = toISO(f.dateRange.end);
    if (!overlap(rule.start_date, rule.end_date, rangeStart, rangeEnd))
      return false;
  }
  return true;
}

// This function takes all hunts and filters them down
export function applyFilters(
  rows: Row[],
  f: FilterState,
  home: HomeLocation | null,
  favorites: string[]
) {
  let filtered = rows;

  // --- FAVORITES FILTER ---
  if (f.showFavorites) {
    const favSet = new Set(favorites);
    filtered = filtered.filter(({ wma }) => favSet.has(wma.wma_id));
  }
  // --- END NEW ---

  // Run the rest of the filters on the (potentially) reduced list
  filtered = filtered.filter(({ rule }) => ruleMatchesFilters(rule, f));

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

// NEW FUNCTION for the "Species-Centric" card
// This takes a WMA's *already filtered* rules and summarizes them.
export function groupRulesBySpecies(rules: SeasonRule[]): SpeciesGroup[] {
  const groups = new Map<string, SpeciesGroup>();

  for (const rule of rules) {
    const species = rule.species;
    if (!groups.has(species)) {
      groups.set(species, { species, tags: new Set() });
    }
    const group = groups.get(species)!;

    // Add tags
    if (rule.quota_required) {
      group.tags.add("Quota");
    } else {
      group.tags.add("General");
    }
    rule.tags.forEach(tag => group.tags.add(tag));
  }

  return Array.from(groups.values());
}
