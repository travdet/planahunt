export type AccessType = "general" | "quota";
export type SexFilter = "any" | "either" | "buck" | "doe";
export type Weapon = "archery" | "primitive" | "firearms" | "shotgun" | "muzzleloader";

export type DateRange = { start: string; end: string }; // yyyy-mm-dd

export type SeasonRule = {
  id: string;
  wma_id: string;
  species: string;          // "Deer" | "Turkey" | "Dove" | etc
  weapon: Weapon | string;  // keep string to tolerate raw data
  start_date: string;       // yyyy-mm-dd
  end_date: string;         // yyyy-mm-dd
  follows_statewide?: boolean;
  quota_required?: boolean;
  notes_short?: string;
  buck_only?: "yes" | "no" | boolean;
  either_sex_last_day?: boolean;
  last_two_days_either_sex?: boolean;
  tags?: string[];
  // optional future fields
};

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
  homeAddress?: string | null;
  homeLat?: number | null;
  homeLng?: number | null;
  // Legacy field names (for compatibility)
  quota?: string;
  buckOnly?: string;
  openOn?: string | null;
  distanceMi?: number | null;
  home?: { lat: number | null; lng: number | null } | null;
};

export type HomeLoc = {
  address: string;
  lat: number | null;
  lng: number | null;
};
