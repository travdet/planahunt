import type { SeasonRule, WMA } from "./types";
import { isDateWithin } from "./util";

/**
 * Checks if a given ISO date string is within a rule's start and end date.
 */
export function isOpenOn(rule: SeasonRule, dateISO: string) {
  if (!rule.start_date || !rule.end_date) return false;
  return isDateWithin(dateISO, rule.start_date, rule.end_date);
}

/**
 * Resolves a "Statewide Season" rule into one or more specific rules
 * based on the WMA's counties and the rules in statewide.json.
 *
 * This function returns an ARRAY of rules to handle per-county accuracy
 * (e.g., different bear zones, extended deer seasons).
 */
export function resolveStatewide(
  rule: SeasonRule,
  wma: WMA | undefined,
  statewide: any
): SeasonRule[] {
  // If it's not a statewide rule or we don't have WMA data,
  // return the original rule wrapped in an array.
  if (!wma || !rule.notes_short?.includes("State seasons")) {
    return [rule];
  }

  const derivedRules: SeasonRule[] = [];
  const species = rule.species.toLowerCase();
  const weapon = rule.weapon.toLowerCase().replace(/ /g, "_"); // e.g., "primitive_weapons"

  // Loop over every county this WMA is in
  wma.counties.forEach((county) => {
    // --- DEER LOGIC ---
    if (species.includes("deer")) {
      const baseDates = statewide.deer?.[weapon];
      if (!baseDates) return; // No statewide dates for this weapon

      // Check for firearms prohibitions
      if (
        weapon === "firearms" &&
        statewide.deer.firearms_prohibited_counties.includes(county)
      ) {
        return; // Do not create a firearms rule for this prohibited county
      }

      let endDate = baseDates.end;
      // Check for extended season
      if (
        weapon === "firearms" &&
        statewide.deer.extended_firearms_counties.includes(county)
      ) {
        endDate = statewide.deer.extended_end;
      }

      derivedRules.push({
        ...rule,
        start_date: baseDates.start,
        end_date: endDate,
        id: `${rule.id}-${county}`, // Make ID unique
        notes_short: `Statewide Season (${county})`,
      });
    }

    // --- BEAR LOGIC ---
    else if (species.includes("bear")) {
      const zones = statewide.bear.county_to_bear_zone;
      let bearZone: "North" | "Central" | "South" | null = null;

      if (zones.North.includes(county)) bearZone = "North";
      else if (zones.Central.includes(county)) bearZone = "Central";
      // The "South" zone is just a string description, so we assume
      // any other county is in the South. This may need refinement.
      else bearZone = "South"; 
      // A more robust check would be needed if counties can be in no zone.

      if (bearZone === "North") {
        const baseDates = statewide.bear.northern_zone?.[weapon];
        if (!baseDates) return;
        derivedRules.push({
          ...rule,
          start_date: baseDates.start,
          end_date: baseDates.end,
          id: `${rule.id}-${county}`,
          notes_short: `Statewide Season (Northern Zone / ${county})`,
        });
      } else if (bearZone === "Central") {
        const huntDates: string[] = statewide.bear.central_zone?.[weapon];
        if (!huntDates) return;
        huntDates.forEach((date, i) => {
          derivedRules.push({
            ...rule,
            start_date: date,
            end_date: date, // Central zone hunts are single days
            id: `${rule.id}-${county}-${i}`,
            notes_short: `Statewide Season (Central Zone / ${county})`,
          });
        });
      } else if (bearZone === "South") {
        const huntRanges: { start: string; end: string }[] =
          statewide.bear.southern_zone?.[`${weapon}_hunts`];
        if (!huntRanges) return;
        huntRanges.forEach((range, i) => {
          derivedRules.push({
            ...rule,
            start_date: range.start,
            end_date: range.end,
            id: `${rule.id}-${county}-${i}`,
            notes_short: `Statewide Season (Southern Zone / ${county})`,
          });
        });
      }
    }

    // --- TURKEY LOGIC ---
    else if (species.includes("turkey")) {
      const baseDates = statewide.turkey.public_land;
      if (!baseDates) return;
      derivedRules.push({
        ...rule,
        start_date: baseDates.start,
        end_date: baseDates.end,
        id: `${rule.id}-${county}`,
        notes_short: `Statewide Season (${county})`,
      });
    }
  });

  return derivedRules;
}
