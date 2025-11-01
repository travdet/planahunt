export type AccessType = "general" | "quota";
export type SexFilter = "any" | "either" | "buck" | "doe";
export type QuotaFilter = "any" | "quota" | "non-quota";
export type BuckFilter = "any" | "yes" | "no";
export type Weapon = string;

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
  follows_statewide?: boolean | null;
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
  lat: number | null;
  lng: number | null;
  source_url?: string | null;
  tags?: string[];
};

export type Coordinates = {
  lat: number | null;
  lng: number | null;
};

export type FilterState = {
  query: string;
  date: string | null;           // yyyy-mm-dd (single day)
  dateRange: DateRange | null;   // for future range picker
  accessType: "any" | AccessType;
  sex: SexFilter;
  weapons: string[];              // chosen weapons
  species: string[];              // chosen species
  counties: string[];             // chosen counties
  regions: string[];              // chosen DNR regions
  tags: string[];                 // misc tags (archery-only area, MI hunts, bird range, etc)
  quota: QuotaFilter;
  buckOnly: BuckFilter;
  maxDistanceMi: number | null;   // from home
  home: Coordinates | null;
  homeAddress?: string | null;
  homeLat?: number | null;
  homeLng?: number | null;
};

export type HomeLoc = {
  address: string;
  lat: number | null;
  lng: number | null;
};
