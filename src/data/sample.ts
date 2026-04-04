/**
 * Aggregated sample data — combines all state-level data that uses
 * the canonical typed format from @/lib/types.
 */

import type { PublicLand, HuntingSeason, QuotaHunt, FishingRegulation, State } from '@/lib/types';

import { GA_STATE, GA_LANDS, GA_SEASONS, GA_QUOTA_HUNTS, GA_FISHING } from './states/ga';
import { GA_NEW_LANDS } from './ga-new-lands';
import { SC_STATE, SC_LANDS, SC_LANDS_BATCH2, SC_SEASONS, SC_QUOTA_HUNTS, SC_FISHING } from './states/sc';
import { FL_STATE, FL_LANDS, FL_SEASONS, FL_QUOTA_HUNTS, FL_FISHING } from './states/fl';
import { FL_NEW_LANDS } from './states/fl-new-lands';
import { AR_STATE, AR_LANDS, AR_SEASONS, AR_QUOTA_HUNTS, AR_FISHING } from './states/ar';
import { LA_STATE, LA_LANDS, LA_SEASONS, LA_QUOTA_HUNTS, LA_FISHING } from './states/la';
import { MS_STATE, MS_LANDS, MS_SEASONS, MS_QUOTA_HUNTS, MS_FISHING } from './states/ms';
import { AL_STATE, AL_LANDS, AL_SEASONS, AL_QUOTA_HUNTS, AL_FISHING } from './states/al';
import { AL_NEW_LANDS } from './states/al-new-lands';
import { TN_STATE, TN_LANDS, TN_FEDERAL_LANDS, TN_SEASONS, TN_QUOTA_HUNTS, TN_FISHING } from './states/tn';
import { TN_ADDITIONAL_LANDS } from './states/tn-additional';
import { NC_STATE, NC_LANDS, NC_SEASONS, NC_QUOTA_HUNTS, NC_FISHING } from './states/nc';
import { VA_STATE, VA_LANDS, VA_SEASONS, VA_QUOTA_HUNTS, VA_FISHING } from './states/va';
import { KY_STATE, KY_LANDS, KY_SEASONS, KY_QUOTA_HUNTS, KY_FISHING } from './states/ky';

export const STATES: State[] = [
  GA_STATE, SC_STATE, FL_STATE, AR_STATE, LA_STATE, MS_STATE,
  AL_STATE, TN_STATE, NC_STATE, VA_STATE, KY_STATE,
];

export const PUBLIC_LANDS: PublicLand[] = [
  ...GA_LANDS,
  ...GA_NEW_LANDS,
  ...SC_LANDS,
  ...SC_LANDS_BATCH2,
  ...FL_LANDS,
  ...FL_NEW_LANDS,
  ...AR_LANDS,
  ...LA_LANDS,
  ...MS_LANDS,
  ...AL_LANDS,
  ...AL_NEW_LANDS,
  ...TN_LANDS,
  ...TN_FEDERAL_LANDS,
  ...TN_ADDITIONAL_LANDS,
  ...NC_LANDS,
  ...VA_LANDS,
  ...KY_LANDS,
];

export const HUNTING_SEASONS: HuntingSeason[] = [
  ...GA_SEASONS,
  ...SC_SEASONS,
  ...FL_SEASONS,
  ...AR_SEASONS,
  ...LA_SEASONS,
  ...MS_SEASONS,
  ...AL_SEASONS,
  ...TN_SEASONS,
  ...NC_SEASONS,
  ...VA_SEASONS,
  ...KY_SEASONS,
];

export const QUOTA_HUNTS: QuotaHunt[] = [
  ...GA_QUOTA_HUNTS,
  ...SC_QUOTA_HUNTS,
  ...FL_QUOTA_HUNTS,
  ...AR_QUOTA_HUNTS,
  ...LA_QUOTA_HUNTS,
  ...MS_QUOTA_HUNTS,
  ...AL_QUOTA_HUNTS,
  ...TN_QUOTA_HUNTS,
  ...NC_QUOTA_HUNTS,
  ...VA_QUOTA_HUNTS,
  ...KY_QUOTA_HUNTS,
];

export const FISHING_REGULATIONS: FishingRegulation[] = [
  ...GA_FISHING,
  ...SC_FISHING,
  ...FL_FISHING,
  ...AR_FISHING,
  ...LA_FISHING,
  ...MS_FISHING,
  ...AL_FISHING,
  ...TN_FISHING,
  ...NC_FISHING,
  ...VA_FISHING,
  ...KY_FISHING,
];
