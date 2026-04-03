/**
 * PlanAHunt — Aggregated public land hunting & fishing data
 *
 * Data is organized by state in src/data/states/.
 * Add a new state by creating states/XX.ts and importing below.
 *
 * All data sourced from official state wildlife agency publications.
 * Verify with your state agency before hunting — regulations change annually.
 */

import { PublicLand, HuntingSeason, QuotaHunt, FishingRegulation, State } from '@/lib/types';

import { GA_STATE, GA_LANDS, GA_SEASONS, GA_QUOTA_HUNTS, GA_FISHING } from './states/ga';
import { FL_STATE, FL_LANDS, FL_SEASONS, FL_QUOTA_HUNTS, FL_FISHING } from './states/fl';
import { SC_STATE, SC_LANDS, SC_SEASONS, SC_QUOTA_HUNTS, SC_FISHING } from './states/sc';
import { MS_STATE, MS_LANDS, MS_SEASONS, MS_QUOTA_HUNTS, MS_FISHING } from './states/ms';
import { LA_STATE, LA_LANDS, LA_SEASONS, LA_QUOTA_HUNTS, LA_FISHING } from './states/la';
import { AR_STATE, AR_LANDS, AR_SEASONS, AR_QUOTA_HUNTS, AR_FISHING } from './states/ar';
import { NC_STATE, NC_LANDS, NC_SEASONS, NC_QUOTA_HUNTS, NC_FISHING } from './states/nc';
import { AL_STATE, AL_LANDS } from './states/al';
import { TN_STATE, TN_LANDS, TN_FEDERAL_LANDS } from './states/tn';
import { VA_STATE, VA_LANDS } from './states/va';
import { KY_STATE, KY_LANDS } from './states/ky';

export const STATES: State[] = [
  GA_STATE, FL_STATE, SC_STATE, MS_STATE, LA_STATE, AR_STATE,
  NC_STATE, AL_STATE, TN_STATE, VA_STATE, KY_STATE,
];

export const PUBLIC_LANDS: PublicLand[] = [
  ...GA_LANDS, ...FL_LANDS, ...SC_LANDS, ...MS_LANDS, ...LA_LANDS, ...AR_LANDS,
  ...NC_LANDS, ...AL_LANDS, ...TN_LANDS, ...TN_FEDERAL_LANDS, ...VA_LANDS, ...KY_LANDS,
];

export const HUNTING_SEASONS: HuntingSeason[] = [
  ...GA_SEASONS, ...FL_SEASONS, ...SC_SEASONS, ...MS_SEASONS, ...LA_SEASONS, ...AR_SEASONS,
  ...NC_SEASONS,
];

export const QUOTA_HUNTS: QuotaHunt[] = [
  ...GA_QUOTA_HUNTS, ...FL_QUOTA_HUNTS, ...SC_QUOTA_HUNTS, ...MS_QUOTA_HUNTS, ...LA_QUOTA_HUNTS, ...AR_QUOTA_HUNTS,
  ...NC_QUOTA_HUNTS,
];

export const FISHING_REGULATIONS: FishingRegulation[] = [
  ...GA_FISHING, ...FL_FISHING, ...SC_FISHING, ...MS_FISHING, ...LA_FISHING, ...AR_FISHING,
  ...NC_FISHING,
];
