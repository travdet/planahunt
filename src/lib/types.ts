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

export interface WMA {
  id: string; // slug
  name: string;
  tract_name: string | null;
  area_type: string | null;
  acreage: number | null;
  phone: string | null;
  counties: string[];
  region: string | null;
  lat: number | null;
  lng: number | null;
  source_url: string | null;
  tags: string[];
}

export interface FilterState {
  query: string;
  date: string | null;
  dateRange: DateRange | null;
  accessType: "any" | AccessType;
  sex: SexFilter;
  weapons: string[];
  species: string[];
  counties: string[];
  regions: string[];
  tags: string[];
  maxDistanceMi: number | null;
  home?: {
    lat: number | null;
    lng: number | null;
  } | null;
}

export type HomeLoc = {
  address: string;
  lat: number | null;
  lng: number | null;
};
