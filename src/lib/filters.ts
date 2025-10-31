import type { FilterState, SeasonRule, WMA } from "./types";
import { isOpenOn } from "./rules";
import { haversineMi } from "./util";

export type Row = { wma: WMA, rule: SeasonRule };

export function applyFilters(rows: Row[], filters: FilterState){
  const q = (filters.query||"").trim().toLowerCase();
  const speciesSet  = new Set(filters.species||[]);
  const weaponsSet  = new Set(filters.weapons||[]);
  const tagsSet     = new Set(filters.tags||[]);
  const countiesSet = new Set(filters.counties||[]);
  const regionsSet  = new Set(filters.regions||[]);

  return rows.filter(({wma, rule}) => {
    // query
    if (q) {
      const hay = `${wma.name} ${wma.counties.join(" ")} ${wma.region} ${rule.species} ${rule.weapon}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (speciesSet.size && !speciesSet.has(rule.species)) return false;
    if (weaponsSet.size && !weaponsSet.has(rule.weapon)) return false;
    if (filters.quota !== "any") {
      const needs = (filters.quota === "quota");
      if (!!rule.quota_required !== needs) return false;
    }
    if (filters.buckOnly !== "any") {
      const needs = (filters.buckOnly === "yes");
      if (!!rule.buck_only !== needs) return false;
    }
    if (regionsSet.size && !regionsSet.has(wma.region)) return false;
    if (countiesSet.size) {
      const has = wma.counties.some(c => countiesSet.has(c));
      if (!has) return false;
    }
    if (tagsSet.size) {
      const has = (wma.tags||[]).some(t => tagsSet.has(t)) || (rule.tags||[]).some(t => tagsSet.has(t));
      if (!has) return false;
    }
    if (filters.openOn) {
      if (!isOpenOn(rule, filters.openOn)) return false;
    }
    if (filters.home && filters.distanceMi && wma.lat && wma.lng) {
      const d = haversineMi(filters.home, {lat:wma.lat, lng:wma.lng});
      if (d > (filters.distanceMi||0)) return false;
    }
    return true;
  });
}
