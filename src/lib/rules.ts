import type { SeasonRule } from "./types";

export function isOpenOn(rule: SeasonRule, dateISO: string){
  const s = new Date(rule.start_date+"T00:00:00").getTime();
  const e = new Date(rule.end_date+"T23:59:59").getTime();
  const t = new Date(dateISO+"T12:00:00").getTime();
  return s <= t && t <= e;
}

// Placeholder statewide resolver (extend with real per-species windows if needed)
export function resolveStatewide(rule: SeasonRule, statewide: any){
  const followsStatewide = (rule as { follows_statewide?: boolean }).follows_statewide;
  if (!followsStatewide) return rule;
  const key = rule.species.toLowerCase().includes("turkey") ? "Turkey" : "Deer Archery";
  const sw = statewide[key];
  if (!sw) return rule;
  return { ...rule, start_date: sw.start_date, end_date: sw.end_date };
}
