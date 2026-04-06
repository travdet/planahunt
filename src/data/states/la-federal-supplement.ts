/**
 * Louisiana Federal Lands Supplement — 2025-2026 Season
 *
 * Missing federal lands not in la.ts:
 *   - Atchafalaya National Wildlife Refuge
 *
 * Sources:
 *   USFWS Atchafalaya NWR: https://www.fws.gov/refuge/atchafalaya
 *   LDWF Regulations: https://www.wlf.louisiana.gov/page/hunting-seasons-and-regulations
 */

import { PublicLand } from '@/lib/types';

export const LA_FEDERAL_SUPPLEMENT: PublicLand[] = [
  {
    id: 'la-nwr-atchafalaya',
    state: 'LA',
    name: 'Atchafalaya National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 15000,
    counties: ['St. Martin', 'Iberville'],
    region: 'Atchafalaya Basin',
    lat: 30.3400,
    lng: -91.7200,
    phone: '(337) 923-7241',
    website: 'https://www.fws.gov/refuge/atchafalaya',
    managing_agency: 'U.S. Fish and Wildlife Service',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'squirrel', 'rabbit', 'waterfowl', 'woodcock', 'hog', 'archery', 'rifle', 'muzzleloader'],
    special_rules: 'Free refuge permit required. Located within the Atchafalaya Basin Floodway. Bottomland hardwoods and cypress-tupelo swamp. Area 7 deer regulations. Excellent waterfowl habitat — flooded timber. Boat access required for most hunting areas. May close during high water events. Alligator hunting by lottery.',
  },
];
