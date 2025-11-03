import type { SeasonRule, WMA } from "./types";

export function isOpenOn(rule: SeasonRule, dateISO: string) {
  if (!rule.start_date || !rule.end_date) return false;
  const s = new Date(rule.start_date + "T00:00:00").getTime();
  const e = new Date(rule.end_date + "T23:59:59").getTime();
  const t = new Date(dateISO + "T12:00:00").getTime();
  return s <= t && t <= e;
}

// Updated to be more defensive against null/undefined data
export function resolveStatewide(rule: SeasonRule, wma: WMA | undefined, statewide: any): SeasonRule {
  // If we don't have a WMA object, we can't resolve anything. Return original rule.
  if (!wma) {
    return rule;
  }

  // We only resolve if the dates are explicitly "Statewide Season"
  if (rule.dates !== "Statewide Season" || !rule.species) {
    return rule;
  }
  
  const species = rule.species.toLowerCase();
  const weapon = rule.hunt_type.toLowerCase().replace(/ /g, "_"); // e.g., "primitive_weapons"
  let seasonDates: { start: string, end: string } | undefined;

  if (species.includes("deer")) {
    // Safely access nested properties
    if (statewide?.deer?.[weapon]) {
      seasonDates = statewide.deer[weapon];
    }
  } else if (species.includes("turkey")) {
    seasonDates = statewide?.turkey?.public_land;
  } else if (species.includes("bear")) {
    // This is more complex due to bear zones.
    // We can refine this if a `bear_zone` field is added to wmas.json
    if (statewide?.bear?.northern_zone?.[weapon]) {
      seasonDates = statewide.bear.northern_zone[weapon];
    }
  }

  if (seasonDates?.start && seasonDates?.end) {
    return { ...rule, start_date: seasonDates.start, end_date: seasonDates.end };
  }
  
  // If we can't find a match, return the rule unresolved but mark it so we know
  return { ...rule, dates: "Statewide (Unresolved)" };
}
