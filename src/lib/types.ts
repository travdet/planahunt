export type AccessType = "general" | "quota";
export type SexFilter = "any" | "either" | "buck" | "doe";
export type Weapon = "archery" | "primitive" | "firearms" | "shotgun" | "muzzleloader";

export type DateRange = { start: string; end: string }; // yyyy-mm-dd

export interface SeasonRule {
  id: string;
  wma_id: string;
  species: string;
  weapon: string;
  start_date: string;
  end_date: string;
  quota_required: boolean;
  buck_only: boolean;
  tags: string[];
  notes_short: string;
}

export type WMA = {
  id: string;               // slug
  name: string;
  tract_name?: string;
  area_type?: string;       // "WMA"
  acreage?: number;
  phone?: string;
  counties: string[];
  region?: string;
  lat?: number | null;
  lng?: number | null;
  source_url?: string;
  tags?: string[];
};

export type FilterState = {
  query: string;
  date?: string | null;           // yyyy-mm-dd (single day)
  dateRange?: DateRange | null;   // for future range picker
  accessType: "any" | AccessType;
  sex: SexFilter;
  weapons: string[];              // chosen weapons
  species: string[];              // chosen species
  counties: string[];             // chosen counties
  regions: string[];              // chosen DNR regions
  tags: string[];                 // misc tags (archery-only area, MI hunts, bird range, etc)
  maxDistanceMi?: number | null;  // from home
};

export type HomeLoc = {
  address: string;
  lat: number | null;
  lng: number | null;
};
