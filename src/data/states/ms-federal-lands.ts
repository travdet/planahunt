/**
 * Mississippi Federal Lands — 2025-2026 Season
 *
 * Missing federal lands not in ms.ts:
 *   - Homochitto National Forest
 *   - Tombigbee National Forest
 *   - Noxubee National Wildlife Refuge
 *   - Bienville National Forest (existing WMA entry covers WMA, this covers NF)
 *
 * Sources:
 *   USFS National Forests in Mississippi: https://www.fs.usda.gov/r08/mississippi
 *   USFWS Noxubee NWR: https://www.fws.gov/refuge/noxubee
 *   MDWFP Regulations: https://www.mdwfp.com/hunting/regulations/
 */

import { PublicLand } from '@/lib/types';

export const MS_FEDERAL_LANDS: PublicLand[] = [
  // ─────────────────────────────────────────────
  // HOMOCHITTO NATIONAL FOREST
  // ─────────────────────────────────────────────
  {
    id: 'ms-nf-homochitto',
    state: 'MS',
    name: 'Homochitto National Forest',
    type: 'National Forest',
    acreage: 192000,
    counties: ['Amite', 'Franklin', 'Lincoln', 'Pike', 'Wilkinson'],
    region: 'Southwest Mississippi',
    lat: 31.3200,
    lng: -90.8700,
    phone: '(601) 384-5876',
    website: 'https://www.fs.usda.gov/r08/mississippi',
    managing_agency: 'USDA Forest Service — National Forests in Mississippi',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small game', 'squirrel', 'rabbit', 'quail', 'dove', 'hog', 'archery', 'rifle', 'muzzleloader'],
    special_rules: 'State license + WMA User Permit required ($15/yr ages 16-64). Southwest Zone deer regulations. Managed longleaf pine ecosystem. Excellent turkey hunting. Okhissa Lake offers fishing. Clear Springs Recreation Area. No hunting in developed recreation areas.',
  },

  // ─────────────────────────────────────────────
  // TOMBIGBEE NATIONAL FOREST
  // ─────────────────────────────────────────────
  {
    id: 'ms-nf-tombigbee',
    state: 'MS',
    name: 'Tombigbee National Forest',
    type: 'National Forest',
    acreage: 67000,
    counties: ['Chickasaw', 'Pontotoc', 'Winston'],
    region: 'Northeast Mississippi',
    lat: 33.8500,
    lng: -89.0000,
    phone: '(662) 285-3264',
    website: 'https://www.fs.usda.gov/r08/mississippi',
    managing_agency: 'USDA Forest Service — National Forests in Mississippi',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small game', 'squirrel', 'rabbit', 'dove', 'archery', 'rifle', 'muzzleloader'],
    special_rules: 'State license + WMA User Permit required ($15/yr ages 16-64). Hills Zone deer regulations. Antler restriction: 10" inside spread or 13" main beam. Choctaw Lake and Davis Lake offer fishing. Owl Creek Mounds historic site on forest.',
  },

  // ─────────────────────────────────────────────
  // BIENVILLE NATIONAL FOREST
  // ─────────────────────────────────────────────
  {
    id: 'ms-nf-bienville',
    state: 'MS',
    name: 'Bienville National Forest',
    type: 'National Forest',
    acreage: 180000,
    counties: ['Jasper', 'Newton', 'Scott', 'Smith'],
    region: 'Central Mississippi',
    lat: 32.1800,
    lng: -89.5500,
    phone: '(601) 469-3811',
    website: 'https://www.fs.usda.gov/r08/mississippi',
    managing_agency: 'USDA Forest Service — National Forests in Mississippi',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small game', 'squirrel', 'rabbit', 'quail', 'hog', 'archery', 'rifle', 'muzzleloader'],
    special_rules: 'State license + WMA User Permit required ($15/yr ages 16-64). Hills Zone deer regulations. Antler restriction: 10" inside spread or 13" main beam. Overlaps Bienville WMA. Bienville Pines Scenic Area. Marathon Lake and Shongelo Lake fishing.',
  },

  // ─────────────────────────────────────────────
  // NOXUBEE NATIONAL WILDLIFE REFUGE
  // ─────────────────────────────────────────────
  {
    id: 'ms-nwr-noxubee',
    state: 'MS',
    name: 'Sam D. Hamilton Noxubee National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 48000,
    counties: ['Noxubee', 'Oktibbeha', 'Winston'],
    region: 'East-Central Mississippi',
    lat: 33.2700,
    lng: -88.8000,
    phone: '(662) 323-5548',
    website: 'https://www.fws.gov/refuge/noxubee',
    managing_agency: 'U.S. Fish and Wildlife Service',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'squirrel', 'rabbit', 'waterfowl', 'dove', 'woodcock', 'archery', 'rifle', 'muzzleloader'],
    special_rules: 'Free refuge permit required. Hunting allowed on designated units only. Bottomland hardwoods and pine forests. Bluff Lake (400 acres) open for fishing. One of MS\'s oldest refuges. Red-cockaded woodpecker habitat — stay on designated trails. No dogs except for waterfowl retrieval.',
  },
];
