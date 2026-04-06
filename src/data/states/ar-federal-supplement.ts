/**
 * Arkansas Federal Lands Supplement — 2025-2026 Season
 *
 * Missing federal lands not in ar.ts:
 *   - Overflow National Wildlife Refuge
 *
 * Sources:
 *   USFWS South Arkansas Refuges Complex: https://www.fws.gov/refuge/overflow
 *   AGFC Regulations: https://www.agfc.com/hunting/regulations/
 */

import { PublicLand } from '@/lib/types';

export const AR_FEDERAL_SUPPLEMENT: PublicLand[] = [
  {
    id: 'ar-nwr-overflow',
    state: 'AR',
    name: 'Overflow National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 13000,
    counties: ['Ashley'],
    region: 'Southeast Arkansas',
    lat: 33.1700,
    lng: -91.6400,
    phone: '(870) 473-2869',
    website: 'https://www.fws.gov/refuge/overflow',
    managing_agency: 'U.S. Fish and Wildlife Service — South Arkansas Refuges Complex',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'squirrel', 'rabbit', 'waterfowl', 'dove', 'woodcock', 'raccoon', 'archery', 'rifle', 'muzzleloader'],
    special_rules: 'Free refuge permit required. Part of South Arkansas Refuges Complex with Felsenthal NWR. Bottomland hardwoods along Overflow Creek. Excellent waterfowl hunting — flooded timber. Deer hunting on designated units. Fishing in Overflow Creek and backwater sloughs. No ATV use.',
  },
];
