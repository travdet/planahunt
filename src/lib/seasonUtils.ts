import { HuntingSeason, FishingRegulation, PublicLand } from '@/lib/types';

// Format "2025-09-13" -> "Sep 13"
export function fmtShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Format "2025-09-13" -> "Sep 13, 2025"
export function fmtFull(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function isSeasonOpen(season: HuntingSeason): boolean {
  const today = new Date();
  return today >= new Date(season.start_date) && today <= new Date(season.end_date);
}

export const WEAPON_COLORS: Record<string, string> = {
  Archery: '#5a8e2d',
  Rifle: '#8e2d2d',
  Muzzleloader: '#8e6b2d',
  Shotgun: '#2d5a8e',
  Firearms: '#8e2d2d',
};

export const SPECIES_ICONS: Record<string, string> = {
  Deer: '🦌', Turkey: '🦃', Bear: '🐻', Duck: '🦆', Dove: '🕊️',
  Quail: '🐦', 'Feral Hog': '🐗', Alligator: '🐊', Coyote: '🐺',
};

/** Group seasons by species, then by weapon_type within each species */
export interface SeasonGroup {
  species: string;
  weapons: {
    weapon: string;
    segments: HuntingSeason[];
    isOpen: boolean;
  }[];
  isOpen: boolean;
}

export function groupSeasons(seasons: HuntingSeason[]): SeasonGroup[] {
  const speciesMap = new Map<string, Map<string, HuntingSeason[]>>();

  for (const s of seasons) {
    if (!speciesMap.has(s.species)) speciesMap.set(s.species, new Map());
    const weaponMap = speciesMap.get(s.species)!;
    if (!weaponMap.has(s.weapon_type)) weaponMap.set(s.weapon_type, []);
    weaponMap.get(s.weapon_type)!.push(s);
  }

  const groups: SeasonGroup[] = [];
  for (const [species, weaponMap] of speciesMap) {
    const weapons: SeasonGroup['weapons'] = [];
    for (const [weapon, segments] of weaponMap) {
      // Sort segments by start date
      segments.sort((a, b) => a.start_date.localeCompare(b.start_date));
      weapons.push({
        weapon,
        segments,
        isOpen: segments.some(isSeasonOpen),
      });
    }
    groups.push({
      species,
      weapons,
      isOpen: weapons.some(w => w.isOpen),
    });
  }

  // Sort: open species first, then alphabetical
  groups.sort((a, b) => {
    if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1;
    return a.species.localeCompare(b.species);
  });

  return groups;
}

/** Build a matrix: rows = species, columns = weapon types, cells = condensed date ranges */
export interface MatrixCell {
  weapon: string;
  dateRange: string; // e.g. "Sep 13 – Jan 1"
  segmentCount: number;
  isOpen: boolean;
  hasQuota: boolean;
}

export interface MatrixRow {
  species: string;
  cells: MatrixCell[];
  isOpen: boolean;
}

export function buildSeasonMatrix(seasons: HuntingSeason[]): { rows: MatrixRow[]; weapons: string[] } {
  const groups = groupSeasons(seasons);

  // Collect all weapon types in a consistent order
  const weaponOrder = ['Archery', 'Muzzleloader', 'Rifle', 'Shotgun', 'Firearms'];
  const allWeapons = new Set<string>();
  for (const g of groups) {
    for (const w of g.weapons) allWeapons.add(w.weapon);
  }
  const weapons = weaponOrder.filter(w => allWeapons.has(w));
  // Add any remaining weapons not in the predefined order
  for (const w of allWeapons) {
    if (!weapons.includes(w)) weapons.push(w);
  }

  const rows: MatrixRow[] = groups.map(g => {
    const cells: MatrixCell[] = weapons.map(weapon => {
      const weaponGroup = g.weapons.find(w => w.weapon === weapon);
      if (!weaponGroup) {
        return { weapon, dateRange: '—', segmentCount: 0, isOpen: false, hasQuota: false };
      }
      const segs = weaponGroup.segments;
      const first = segs[0];
      const last = segs[segs.length - 1];
      const dateRange = segs.length === 1
        ? `${fmtShort(first.start_date)} – ${fmtShort(first.end_date)}`
        : `${fmtShort(first.start_date)} – ${fmtShort(last.end_date)}`;
      return {
        weapon,
        dateRange,
        segmentCount: segs.length,
        isOpen: weaponGroup.isOpen,
        hasQuota: segs.some(s => s.quota_required),
      };
    });
    return { species: g.species, cells, isOpen: g.isOpen };
  });

  return { rows, weapons };
}

/**
 * Filter fishing regs relevant to a specific property.
 * Saltwater regs only shown for coastal properties (within ~50mi of coast).
 * Uses a simple longitude/latitude check per state's coastline.
 */
export function filterFishingRegs(regs: FishingRegulation[], land: PublicLand): FishingRegulation[] {
  const stateRegs = regs.filter((r) => r.state === land.state);
  if (!stateRegs.some((r) => r.water_type === 'saltwater')) return stateRegs;

  // Check if this land is likely coastal
  const isCoastal = checkCoastal(land);
  if (isCoastal) return stateRegs;

  // Inland property — only show freshwater
  return stateRegs.filter((r) => r.water_type !== 'saltwater');
}

function checkCoastal(land: PublicLand): boolean {
  if (!land.lat || !land.lng) return false;

  // Rough coastal checks by state — is the property east/south enough to be near saltwater?
  // These are generous boundaries (~50mi inland from coast)
  const coastalChecks: Record<string, (lat: number, lng: number) => boolean> = {
    GA: (lat, lng) => lng > -81.8 && lat < 32.2,        // GA coast is east of -81.8, south of 32.2
    FL: (lat, lng) => lat < 28.0 || lng > -81.5 || lng < -86.5, // FL is mostly coastal
    SC: (lat, lng) => lng > -80.5 && lat < 33.8,
    NC: (lat, lng) => lng > -77.5 && lat < 35.5,
    AL: (lat, lng) => lat < 31.0 && lng > -88.3,        // Mobile Bay area
    LA: (lat, lng) => lat < 30.5,                         // Southern LA
    MS: (lat, lng) => lat < 30.8 && lng > -89.5,         // Gulf coast
  };

  const check = coastalChecks[land.state];
  return check ? check(land.lat, land.lng) : false;
}

export function parseSemanticTags(season: HuntingSeason): string[] {
  const tags: string[] = [];
  if (season.quota_required) tags.push('Quota');
  if (season.buck_only === true) tags.push('Buck Only');
  if (season.buck_only === false) tags.push('Either Sex');
  const notes = (season.notes ?? '').toLowerCase();
  if (notes.includes('bonus')) tags.push('Bonus');
  if (notes.includes('youth')) tags.push('Youth');
  if (notes.includes('mobility') || notes.includes('impaired')) tags.push('Mobility-Impaired');
  return tags;
}
