import type { HuntingSeason } from '@/lib/types';

/**
 * Mississippi WMA/NWR/NF land-specific hunting seasons — 2025-2026
 * Source: MDWFP Hunting Seasons & Bag Limits, eRegulations.com
 *
 * Public Land Rule: Legal bucks ONLY during gun seasons on WMAs and National Forests.
 * Antlerless harvest requires designated antlerless-only days or private land.
 * WMA User Permit required: $15 residents / $30 non-residents
 *
 * Units:
 *   Delta  — Legal buck: 12" inside spread OR 15" main beam (most WMAs west of I-55/US-61)
 *   Hills  — Legal buck: 10" inside spread OR 13" main beam (central MS)
 *   NC     — Any hardened antler (Alcorn, Benton, DeSoto, Marshall, Tate, Tippah counties)
 *   SE     — Legal buck: 10" inside spread OR 13" main beam (south of US-84, east of MS-35)
 *
 * Season dates (all units same framework except SE archery opener + late archery):
 *   Archery:          Oct 1 – Nov 21 (SE: Oct 15 – Nov 21)
 *   Youth/Veterans:   Nov 8 – Jan 31 (SE: Feb 15)
 *   Gun w/Dogs:       Nov 22 – Dec 1 + Dec 24 – Jan 21
 *   Primitive Weapon: Dec 2 – Dec 15
 *   Gun w/o Dogs:     Dec 16 – Dec 23
 *   Late Archery:     Jan 22 – Jan 31 (SE: Jan 22 – Feb 15)
 *   Turkey Spring:    Mar 14 – May 1, 2026 (Youth: Mar 7–13)
 *   Non-res public land turkey: Cannot hunt before Apr 1 without draw permit
 *
 * Do NOT duplicate: ms-mahannah, ms-tallahala, ms-leaf-river, ms-divide-section (in ms.ts)
 */

// ─── Helper season blocks ────────────────────────────────────────────────────

type SeasonEntry = Omit<HuntingSeason, 'id'> & { id: string };

function deltaWMA(landId: string, name: string): SeasonEntry[] {
  return [
    {
      id: `${landId}-deer-archery`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Archery',
      start_date: '2025-10-01', end_date: '2025-11-21',
      quota_required: false, buck_only: false,
      bag_limit: 'Delta unit limits',
      notes: `${name}. Legal buck: 12" inside spread OR 15" main beam. Either-sex archery.`,
      tags: ['deer', 'archery', 'delta-unit'],
    },
    {
      id: `${landId}-deer-gun-dogs`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Rifle',
      start_date: '2025-11-22', end_date: '2026-01-21',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Gun with dogs: Nov 22–Dec 1 + Dec 24–Jan 21. Legal bucks ONLY on public WMA land.',
      tags: ['deer', 'rifle', 'delta-unit', 'dogs-allowed'],
    },
    {
      id: `${landId}-deer-primitive`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Muzzleloader',
      start_date: '2025-12-02', end_date: '2025-12-15',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Primitive weapon season.',
      tags: ['deer', 'muzzleloader', 'delta-unit'],
    },
    {
      id: `${landId}-deer-gun-nodogs`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Rifle',
      start_date: '2025-12-16', end_date: '2025-12-23',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Gun without dogs season.',
      tags: ['deer', 'rifle', 'delta-unit'],
    },
    {
      id: `${landId}-turkey`,
      state: 'MS', land_id: landId, species: 'Turkey', weapon_type: 'Shotgun',
      start_date: '2026-03-14', end_date: '2026-05-01',
      quota_required: false,
      bag_limit: '1 gobbler/day, 3/season; 6" beard min',
      notes: 'Spring general season. Non-residents cannot hunt public land before Apr 1 without draw permit.',
      tags: ['turkey', 'spring', 'delta-unit'],
    },
  ];
}

function hillsWMA(landId: string, name: string): SeasonEntry[] {
  return [
    {
      id: `${landId}-deer-archery`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Archery',
      start_date: '2025-10-01', end_date: '2025-11-21',
      quota_required: false, buck_only: false,
      bag_limit: 'Hills unit limits',
      notes: `${name}. Legal buck: 10" inside spread OR 13" main beam. Either-sex archery.`,
      tags: ['deer', 'archery', 'hills-unit'],
    },
    {
      id: `${landId}-deer-gun-dogs`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Rifle',
      start_date: '2025-11-22', end_date: '2026-01-21',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Gun with dogs: Nov 22–Dec 1 + Dec 24–Jan 21.',
      tags: ['deer', 'rifle', 'hills-unit', 'dogs-allowed'],
    },
    {
      id: `${landId}-deer-primitive`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Muzzleloader',
      start_date: '2025-12-02', end_date: '2025-12-15',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Primitive weapon season.',
      tags: ['deer', 'muzzleloader', 'hills-unit'],
    },
    {
      id: `${landId}-turkey`,
      state: 'MS', land_id: landId, species: 'Turkey', weapon_type: 'Shotgun',
      start_date: '2026-03-14', end_date: '2026-05-01',
      quota_required: false,
      bag_limit: '1 gobbler/day, 3/season; 6" beard min',
      notes: 'Spring general season.',
      tags: ['turkey', 'spring', 'hills-unit'],
    },
  ];
}

function seWMA(landId: string, name: string): SeasonEntry[] {
  return [
    {
      id: `${landId}-deer-archery`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Archery',
      start_date: '2025-10-15', end_date: '2025-11-21',
      quota_required: false, buck_only: false,
      bag_limit: 'Southeast unit limits',
      notes: `${name}. Legal buck: 10" inside OR 13" main beam. SE unit — archery opens Oct 15.`,
      tags: ['deer', 'archery', 'se-unit'],
    },
    {
      id: `${landId}-deer-gun-dogs`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Rifle',
      start_date: '2025-11-22', end_date: '2026-01-21',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Gun with dogs: Nov 22–Dec 1 + Dec 24–Jan 21.',
      tags: ['deer', 'rifle', 'se-unit', 'dogs-allowed'],
    },
    {
      id: `${landId}-deer-primitive`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Muzzleloader',
      start_date: '2025-12-02', end_date: '2025-12-15',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'Primitive weapon season.',
      tags: ['deer', 'muzzleloader', 'se-unit'],
    },
    {
      id: `${landId}-deer-late-archery`,
      state: 'MS', land_id: landId, species: 'Deer', weapon_type: 'Archery',
      start_date: '2026-01-22', end_date: '2026-02-15',
      quota_required: false, buck_only: true,
      bag_limit: 'Legal bucks only (public land)',
      notes: 'SE unit late archery extends to Feb 15.',
      tags: ['deer', 'archery', 'late', 'se-unit'],
    },
    {
      id: `${landId}-turkey`,
      state: 'MS', land_id: landId, species: 'Turkey', weapon_type: 'Shotgun',
      start_date: '2026-03-14', end_date: '2026-05-01',
      quota_required: false,
      bag_limit: '1 gobbler/day, 3/season; 6" beard min',
      notes: 'Spring general. Non-residents cannot hunt public land before Apr 1 without draw permit.',
      tags: ['turkey', 'spring', 'se-unit'],
    },
  ];
}

// ─── DELTA UNIT WMAs ─────────────────────────────────────────────────────────

export const MS_LAND_SEASONS: HuntingSeason[] = [
  ...deltaWMA('ms-phil-bryant', 'Phil Bryant WMA (Leflore/Humphreys Co)'),
  ...deltaWMA('ms-malmaison', 'Malmaison WMA (Carroll Co)'),
  ...deltaWMA('ms-sunflower', 'Sunflower WMA (Sunflower Co)'),
  ...deltaWMA('ms-lake-george', 'Lake George WMA (Washington Co)'),
  ...deltaWMA('ms-howard-miller', 'Howard Miller WMA (Leflore Co)'),
  ...deltaWMA('ms-shipland', 'Shipland WMA (Bolivar Co)'),
  ...deltaWMA('ms-sky-lake', 'Sky Lake WMA (Humphreys Co)'),
  ...deltaWMA('ms-twin-oaks', 'Twin Oaks WMA (Panola Co)'),
  ...deltaWMA('ms-leroy-percy', 'Leroy Percy WMA (Washington Co)'),
  ...deltaWMA('ms-charlie-capps', 'Charlie Capps WMA (Delta area)'),
  ...deltaWMA('ms-o-keefe', "O'Keefe WMA (Delta/Hwy 61 corridor)"),
  ...deltaWMA('ms-sardis-waterfowl', 'Sardis Waterfowl Area (Panola Co)'),
  ...deltaWMA('ms-graham-lake-waterfowl', 'Graham Lake Waterfowl Area (N MS)'),

  // Delta National Forest (Delta Unit — public land antlerless restriction)
  ...deltaWMA('ms-delta-national-forest', 'Delta National Forest (Sharkey/Humphreys Co)'),

  // NWRs — Delta Unit (waterfowl primary; deer hunting limited/quota)
  {
    id: 'ms-yazoo-nwr-waterfowl',
    state: 'MS', land_id: 'ms-yazoo-nwr',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-28', end_date: '2026-01-31',
    quota_required: true,
    bag_limit: 'Federal limits',
    notes: 'Yazoo NWR (Humphreys/Holmes Co). Waterfowl quota hunt on managed impoundments. USFWS permit required.',
    tags: ['waterfowl', 'duck', 'quota', 'nwr'],
  },
  {
    id: 'ms-yazoo-nwr-deer-archery',
    state: 'MS', land_id: 'ms-yazoo-nwr',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-01', end_date: '2025-11-21',
    quota_required: true, buck_only: false,
    bag_limit: 'Delta unit limits',
    notes: 'Limited deer archery on designated areas. USFWS permit required. Verify current hunt plan at USFWS.',
    tags: ['deer', 'archery', 'quota', 'nwr', 'delta-unit'],
  },
  {
    id: 'ms-hillside-nwr-waterfowl',
    state: 'MS', land_id: 'ms-hillside-nwr',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-28', end_date: '2026-01-31',
    quota_required: true,
    bag_limit: 'Federal limits',
    notes: 'Hillside NWR (Carroll/Montgomery Co). Waterfowl quota hunt. USFWS permit required.',
    tags: ['waterfowl', 'duck', 'quota', 'nwr'],
  },
  {
    id: 'ms-panther-swamp-nwr-waterfowl',
    state: 'MS', land_id: 'ms-panther-swamp-nwr',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-28', end_date: '2026-01-31',
    quota_required: true,
    bag_limit: 'Federal limits',
    notes: 'Panther Swamp NWR (Yazoo Co). Waterfowl quota hunt. USFWS permit required.',
    tags: ['waterfowl', 'duck', 'quota', 'nwr'],
  },
  {
    id: 'ms-panther-swamp-nwr-deer-archery',
    state: 'MS', land_id: 'ms-panther-swamp-nwr',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-01', end_date: '2025-11-21',
    quota_required: true, buck_only: false,
    bag_limit: 'Delta unit limits',
    notes: 'Archery deer on designated portions. USFWS permit required.',
    tags: ['deer', 'archery', 'quota', 'nwr', 'delta-unit'],
  },
  {
    id: 'ms-morgan-brake-nwr-waterfowl',
    state: 'MS', land_id: 'ms-morgan-brake-nwr',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-28', end_date: '2026-01-31',
    quota_required: true,
    bag_limit: 'Federal limits',
    notes: 'Morgan Brake NWR (Leflore Co). Waterfowl quota hunt. USFWS permit required.',
    tags: ['waterfowl', 'duck', 'quota', 'nwr'],
  },
  {
    id: 'ms-tallahatchie-nwr-waterfowl',
    state: 'MS', land_id: 'ms-tallahatchie-nwr',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-28', end_date: '2026-01-31',
    quota_required: true,
    bag_limit: 'Federal limits',
    notes: 'Tallahatchie NWR (Tallahatchie Co). Limited hunting. USFWS permit required.',
    tags: ['waterfowl', 'duck', 'quota', 'nwr'],
  },

  // ─── HILLS UNIT WMAs ────────────────────────────────────────────────────────
  ...hillsWMA('ms-caston-creek', 'Caston Creek WMA (Choctaw/Webster Co — National Forest)'),
  ...hillsWMA('ms-sandy-creek', 'Sandy Creek WMA (Pontotoc/Union Co — National Forest)'),
  ...hillsWMA('ms-bienville', 'Bienville WMA (Scott/Newton/Jasper Co — National Forest)'),
  ...hillsWMA('ms-caney-creek', 'Caney Creek WMA (National Forest, central MS)'),
  ...hillsWMA('ms-marion-county', 'Marion County WMA (Marion Co)'),
  ...hillsWMA('ms-canemount', 'Canemount WMA (Claiborne/Jefferson Co)'),
  ...hillsWMA('ms-pearl-river-wma', 'Pearl River WMA (Rankin/Madison Co)'),
  ...hillsWMA('ms-chickasaw', 'Chickasaw WMA (Chickasaw Co — National Forest)'),
  ...hillsWMA('ms-tuscumbia', 'Tuscumbia WMA (Montgomery Co)'),
  ...hillsWMA('ms-upper-sardis', 'Upper Sardis WMA (Marshall/Lafayette Co)'),
  ...hillsWMA('ms-calhoun-county', 'Calhoun County WMA (Calhoun Co)'),
  ...hillsWMA('ms-choctaw', 'Choctaw WMA (Choctaw/Webster Co — National Forest)'),
  ...hillsWMA('ms-nanih-waiya', 'Nanih Waiya WMA (Winston/Neshoba Co)'),
  ...hillsWMA('ms-john-w-starr', 'John W. Starr WMA (Neshoba Co)'),
  ...hillsWMA('ms-okatibbee', 'Okatibbee WMA (Lauderdale Co)'),
  ...hillsWMA('ms-black-prairie', 'Black Prairie WMA (Noxubee/Kemper Co)'),
  ...hillsWMA('ms-yockanookany', 'Yockanookany WMA (Holmes/Carroll Co)'),
  ...hillsWMA('ms-copiah-county', 'Copiah County WMA (Copiah Co)'),

  // ─── SOUTHEAST UNIT WMAs ────────────────────────────────────────────────────
  ...seWMA('ms-chickasawhay', 'Chickasawhay WMA (Jasper/Wayne Co)'),
  ...seWMA('ms-pascagoula-river', 'Pascagoula River WMA (Jackson/George/Greene Co)'),
  ...seWMA('ms-red-creek', 'Red Creek WMA (Stone/Perry Co)'),
  ...seWMA('ms-mason-creek', 'Mason Creek WMA (Jones/Wayne Co)'),
  ...seWMA('ms-little-biloxi', 'Little Biloxi WMA (Harrison/Stone Co)'),
  ...seWMA('ms-ward-bayou', 'Ward Bayou WMA (Forrest/Perry Co)'),
  ...seWMA('ms-old-river', 'Old River WMA (Pearl River Co)'),
  ...seWMA('ms-wolf-river', 'Wolf River WMA (Harrison/Stone Co)'),
  ...seWMA('ms-canal-section', 'Canal Section WMA (Pearl River Co)'),

  // DeSoto National Forest — SE Unit (largest public hunting area in MS)
  ...seWMA('ms-desoto-national-forest', 'DeSoto National Forest (Forrest/Jones/Perry/Stone/George/Harrison/Hancock Co)'),
];
