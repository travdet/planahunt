/**
 * STATE_NAME WMA Hunting & Fishing Data — 2025-2026 Season
 *
 * Sources:
 *   [Official regulation PDF URL]
 *   [Agency website]
 *
 * IMPORTANT: Verify against official sources each season — regulations change annually.
 * Quota/permit applications: [state portal URL]
 */

import { PublicLand, HuntingSeason, QuotaHunt, FishingRegulation, State } from '@/lib/types';

export const XX_STATE: State = {
  code: 'XX',
  name: 'State Name',
  agency: 'State Wildlife Agency Full Name',
  website: 'https://agency.example.gov',
};

export const XX_LANDS: PublicLand[] = [
  {
    id: 'xx-wma-example',
    state: 'XX',
    name: 'Example WMA',
    type: 'WMA',
    acreage: 0,
    counties: [],
    region: '',
    lat: 0,
    lng: 0,
    phone: '',
    managing_agency: '',
    tags: [],
    special_rules: '',
  },
];

export const XX_SEASONS: HuntingSeason[] = [];

export const XX_QUOTA_HUNTS: QuotaHunt[] = [];

export const XX_FISHING: FishingRegulation[] = [];
