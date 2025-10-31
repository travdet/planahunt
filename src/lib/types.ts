export type Weapon = "Archery" | "Firearms" | "Primitive" | "Shotgun" | "Small Game" | "Waterfowl" | "Dove" | "Quail" | "Turkey" | "Bear" | "Coyote" | string;

export type SeasonRule = {
  id: string;
  wma_id: string;
  species: string;
  weapon: string;
  start_date: string;  // YYYY-MM-DD
  end_date: string;    // YYYY-MM-DD
  quota_required: boolean;
  buck_only?: boolean;
  tags?: string[];
  notes_short?: string;
  follows_statewide?: boolean;
};

export type WMA = {
  id: string;
  name: string;
  tract_name?: string;
  area_type: "WMA" | "PFA" | "Hatchery" | "Tract" | "Unit" | "Other";
  acreage?: number;
  phone?: string;
  counties: string[];
  region: string;
  lat?: number;
  lng?: number;
  source_url?: string;
  tags?: string[];
};

export type FilterState = {
  query: string;
  species: string[];
  weapons: string[];
  quota: "any" | "quota" | "non-quota";
  buckOnly: "any" | "yes" | "no";
  regions: string[];
  counties: string[];
  tags: string[];
  openOn?: string | null;          // YYYY-MM-DD
  distanceMi?: number | null;
  home?: { lat: number; lng: number } | null;
};
