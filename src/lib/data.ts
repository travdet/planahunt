import {
  PUBLIC_LANDS,
  HUNTING_SEASONS,
  QUOTA_HUNTS,
  FISHING_REGULATIONS,
} from '@/data/sample';
import type {
  PublicLand,
  HuntingSeason,
  QuotaHunt,
  FishingRegulation,
} from '@/lib/types';

/**
 * Look up a public land by its slug (which is the land's id).
 */
export function getLandBySlug(slug: string): PublicLand | undefined {
  return PUBLIC_LANDS.find((l) => l.id === slug);
}

/**
 * All hunting seasons associated with a given land id.
 */
export function getSeasonsForLand(landId: string): HuntingSeason[] {
  return HUNTING_SEASONS.filter((s) => s.land_id === landId);
}

/**
 * All quota hunts associated with a given land id.
 */
export function getQuotaHuntsForLand(landId: string): QuotaHunt[] {
  return QUOTA_HUNTS.filter((q) => q.land_id === landId);
}

/**
 * All fishing regulations for a given state code (e.g. "GA").
 */
export function getFishingForState(state: string): FishingRegulation[] {
  return FISHING_REGULATIONS.filter((f) => f.state === state);
}

/**
 * Groups seasons by a "species (weapon_type)" key.
 */
export function getHuntGroups(
  seasons: HuntingSeason[],
): Record<string, HuntingSeason[]> {
  const groups: Record<string, HuntingSeason[]> = {};
  for (const season of seasons) {
    const key = `${season.species} (${season.weapon_type})`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(season);
  }
  return groups;
}

/**
 * Unique sorted list of all counties across every public land.
 */
export function getAllCounties(): string[] {
  const set = new Set<string>();
  for (const land of PUBLIC_LANDS) {
    for (const county of land.counties) {
      set.add(county);
    }
  }
  return [...set].sort();
}

const TAG_PATTERNS: Array<{ pattern: RegExp; tag: string }> = [
  { pattern: /\bbonus\b/i, tag: 'Bonus' },
  { pattern: /\bspecialty\b/i, tag: 'Specialty' },
  { pattern: /\byouth\b/i, tag: 'Youth' },
  { pattern: /\bmobility[- ]impaired\b/i, tag: 'Mobility-Impaired' },
  { pattern: /\bhunt\s*&\s*learn\b/i, tag: 'Hunt & Learn' },
];

/**
 * Extracts semantic tags from a hunting season:
 * - 'Quota' if quota_required
 * - 'Buck Only' / 'Either Sex' based on buck_only
 * - Parses notes for Bonus, Specialty, Youth, Mobility-Impaired, Hunt & Learn
 */
export function getSeasonTags(season: HuntingSeason): string[] {
  const tags: string[] = [];

  if (season.quota_required) tags.push('Quota');
  if (season.buck_only === true) tags.push('Buck Only');
  if (season.buck_only === false) tags.push('Either Sex');

  if (season.notes) {
    for (const { pattern, tag } of TAG_PATTERNS) {
      if (pattern.test(season.notes)) {
        tags.push(tag);
      }
    }
  }

  return tags;
}
