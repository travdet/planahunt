export interface State {
  code: string; // e.g. "GA"
  name: string;
  agency: string;
  website: string;
}

export type LandType =
  | 'WMA'               // Wildlife Management Area (state)
  | 'National Forest'   // USDA Forest Service — hunting follows state regs
  | 'National Wildlife Refuge' // USFWS — hunting allowed on designated units
  | 'State Forest'      // State Forestry Commission lands
  | 'State Park'        // State parks — often fishing only; note if hunting allowed
  | 'National Park'     // NPS — usually fishing only; note exceptions
  | 'Corps of Engineers' // USACE reservoirs / surrounding lands
  | 'Military'          // Active military bases with public hunting programs
  | 'TVA'               // Tennessee Valley Authority lands
  | 'Other';

export interface PublicLand {
  id: string;
  state: string;
  name: string;
  type: LandType;
  acreage?: number;
  counties: string[];
  region?: string;
  lat?: number;
  lng?: number;
  phone?: string;
  website?: string;
  managing_agency?: string;
  /** Whether hunting is permitted on this land */
  hunting_allowed?: boolean;
  /** Whether fishing is permitted on this land */
  fishing_allowed?: boolean;
  tags: string[]; // species, methods, special features
  special_rules?: string;
}

export interface HuntingSeason {
  id: string;
  state: string;
  land_id?: string;
  species: string;
  weapon_type: string;
  start_date: string;
  end_date: string;
  quota_required: boolean;
  buck_only?: boolean;
  bag_limit?: string;
  notes?: string;
  tags: string[];
}

export interface QuotaHunt {
  id: string;
  state: string;
  land_id?: string;
  species: string;
  hunt_type: string;
  weapon_type?: string;
  dates?: string;
  quota_size?: number;
  application_deadline?: string;
  application_url?: string;
  notes?: string;
}

export interface FishingRegulation {
  id: string;
  state: string;
  species: string;
  water_type: string; // "freshwater" | "saltwater"
  bag_limit?: string;
  size_limit?: string;
  season?: string;
  special_areas?: string[];
  notes?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  label?: string;
}

export interface FilterState {
  states: string[];
  landTypes: string[];
  species: string[];
  weaponTypes: string[];
  dateRange?: { start: string; end: string };
  accessTypes: string[];
  searchQuery: string;
  showFavoritesOnly: boolean;
  activityType: 'hunting' | 'fishing' | 'all';
  maxDistance?: number;
  counties: string[];
  buckDoe: 'any' | 'either_sex' | 'buck_only';
}
