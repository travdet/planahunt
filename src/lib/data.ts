import wmasData from "@/data/wmas.json";
import seasonsData from "@/data/seasons.json";
import statewideData from "@/data/statewide.json";
import type {
  FilterState,
  SeasonRule,
  SeasonWithMeta,
  WMA,
  WMAWithRules
} from "./types";
import { FALLBACK_MAPBOX_TOKEN } from "./constants";
import { normalizeLabel } from "./util";

const statewideMap = statewideData as Record<string, { start_date: string; end_date: string }>;

function expandStatewide(rule: SeasonRule): SeasonRule[] {
  if (!rule.follows_statewide) return [rule];
  const keyCandidates = [
    `${rule.species} ${String(rule.weapon ?? "").trim()}`.trim(),
    rule.species.trim()
  ];
  for (const key of keyCandidates) {
    const hit = statewideMap[key];
    if (hit) {
      return [
        {
          ...rule,
          start_date: hit.start_date,
          end_date: hit.end_date,
          follows_statewide: false,
          notes_short: rule.notes_short || "Follows statewide season"
        }
      ];
    }
  }
  return [rule];
}

function normalizeWeekdays(value: SeasonRule["weekdays"]): number[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    if (value.length === 0) return undefined;
    return value
      .map((entry) => {
        if (typeof entry === "number" && entry >= 0 && entry <= 6) return entry;
        if (typeof entry === "string") {
          const lower = entry.toLowerCase();
          const labels: Record<string, number> = {
            sun: 0,
            sunday: 0,
            mon: 1,
            monday: 1,
            tue: 2,
            tuesday: 2,
            wed: 3,
            wednesday: 3,
            thu: 4,
            thursday: 4,
            fri: 5,
            friday: 5,
            sat: 6,
            saturday: 6
          };
          return labels[lower];
        }
        return undefined;
      })
      .filter((v): v is number => typeof v === "number");
  }
  return undefined;
}

function resolveSex(rule: SeasonRule): "either" | "buck" | "doe" {
  if (rule.doe_only) return "doe";
  if (rule.buck_only === true || rule.buck_only === "yes") return "buck";
  return "either";
}

export const WMA_LIST: WMA[] = (wmasData as WMA[]).map((w) => ({
  ...w,
  tags: w.tags ?? [],
  lat: w.lat ?? null,
  lng: w.lng ?? null
}));

export const SEASON_LIST: SeasonWithMeta[] = (seasonsData as SeasonRule[])
  .flatMap(expandStatewide)
  .map((rule) => {
    const speciesKey = rule.species.toLowerCase();
    const weaponKey = String(rule.weapon).toLowerCase();
    return {
      ...rule,
      tags: rule.tags ?? [],
      quota_required: !!rule.quota_required,
      access: rule.quota_required ? "quota" : "general",
      speciesKey,
      weaponKey,
      sexRule: resolveSex(rule),
      weekdaysNormalized: normalizeWeekdays(rule.weekdays)
    } as SeasonWithMeta;
  })
  .sort((a, b) => a.start_date.localeCompare(b.start_date));

const rulesByWma = new Map<string, SeasonWithMeta[]>();
for (const rule of SEASON_LIST) {
  if (!rulesByWma.has(rule.wma_id)) {
    rulesByWma.set(rule.wma_id, []);
  }
  rulesByWma.get(rule.wma_id)!.push(rule);
}

export const AREAS_WITH_RULES: WMAWithRules[] = WMA_LIST.map((wma) => ({
  wma,
  rules: (rulesByWma.get(wma.id) ?? []).slice()
}));

function sortUnique(values: string[]): string[] {
  return Array.from(new Set(values)).filter(Boolean).sort((a, b) => a.localeCompare(b));
}

export const FILTER_OPTIONS = {
  species: sortUnique(SEASON_LIST.map((r) => normalizeLabel(r.species))).map((label) => ({
    label,
    value: label.toLowerCase()
  })),
  weapons: sortUnique(SEASON_LIST.map((r) => normalizeLabel(String(r.weapon)))).map((label) => ({
    label,
    value: label.toLowerCase()
  })),
  counties: sortUnique(WMA_LIST.flatMap((w) => w.counties)),
  regions: sortUnique(WMA_LIST.map((w) => w.region || "")),
  tags: sortUnique([
    ...WMA_LIST.flatMap((w) => w.tags ?? []),
    ...SEASON_LIST.flatMap((r) => r.tags ?? [])
  ]).map(normalizeLabel)
};

export function hasActiveFilters(filters: FilterState): boolean {
  return [
    filters.query,
    filters.date,
    filters.dateRange?.start,
    filters.dateRange?.end,
    filters.maxDistanceMi,
    filters.species.length,
    filters.weapons.length,
    filters.counties.length,
    filters.regions.length,
    filters.tags.length,
    filters.accessType !== "any",
    filters.sex !== "any"
  ].some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return !!value;
  });
}

export function mapboxTokenOrFallback() {
  return process.env.NEXT_PUBLIC_MAPBOX_TOKEN || FALLBACK_MAPBOX_TOKEN;
}
