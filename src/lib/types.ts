// src/lib/types.ts

export type WMA = {
  id: string;
  name: string;
  tract_name?: string;
  area_type?: string;
  acreage?: number;
  phone?: string | null;
  counties: string[];
  region: string;
  lat?: number | null;
  lng?: number | null;
  source_url?: string;
  tags?: string[];
};

export type SeasonWindow = {
  id?: string;
  start_date: string;   // yyyy-mm-dd
  end_date: string;     // yyyy-mm-dd
  quota_required?: boolean;
  notes_short?: string;
};

export type SeasonRule = {
  id: string;
  wma_id: string;
  species: string;       // e.g. "Deer"
  weapon: string;        // "Archery" | "Firearms" | "Primitive" | etc.
  follows_statewide?: boolean;
  includes?: SeasonWindow[];
  excludes?: SeasonWindow[];
  buck_only?: boolean;   // true = buck-only window
};

export type AccessType = "any" | "general" | "quota";
export type SexFilter = "any" | "either" | "buck" | "doe";

export type FilterState = {
  query: string;
  species: string[];         // none selected = all
  weapons: string[];         // none selected = all
  accessType: AccessType;    // replaces "quota"
  sex: SexFilter;            // replaces "buckOnly"
  regions: string[];
  counties: string[];
  tags: string[];

  // Hunt Dates (range). If end is empty, treat as single day.
  huntStart?: string; // yyyy-mm-dd
  huntEnd?: string;   // yyyy-mm-dd

  // Home (address + coords)
  homeAddress?: string;
  homeLat?: number;
  homeLng?: number;
};
