export type AccessType = "general" | "quota";
export type SexFilter = "any" | "either" | "buck" | "doe";
export type Weapon = "archery" | "primitive" | "firearms" | "shotgun" | "muzzleloader" | string;

export type DateRange = { start: string | null; end: string | null }; // yyyy-mm-dd

export type SeasonRule = {
  id: string;
  wma_id: string;
  species: string;          // "Deer" | "Turkey" | "Dove" | etc
  weapon: Weapon;            // keep string to tolerate raw data
  start_date: string;       // yyyy-mm-dd
  end_date: string;         // yyyy-mm-dd
  follows_statewide?: boolean;
  quota_required?: boolean;
  notes_short?: string;
  buck_only?: boolean | "yes" | "no";
  doe_only?: boolean;
  either_sex_last_day?: boolean;
  last_two_days_either_sex?: boolean;
  tags?: string[];
  weekdays?: number[] | string[]; // optional restricted weekdays (0=Sun)
  // optional future fields
  weapon_subcategory: string | null;
  antler_restrictions: string | null;
  bag_limit: string | null;
  quota_details: string | null;
  shooting_hours_restriction: string | null;
  sign_in_required: boolean;
  important_notes: string[];
  activity_type: "Hunting" | "Dog Training" | "Shooting Range" | "Archery Range" | string;
};

export type SeasonWithMeta = SeasonRule & {
  access: AccessType;
  speciesKey: string;
  weaponKey: string;
  sexRule: "either" | "buck" | "doe";
  weekdaysNormalized?: number[];
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
  directions: string;
  area_notes: string;
  camping_allowed: boolean;
  atv_allowed: boolean;
  area_category: "WMA" | "Federal" | "State Park" | "VPA" | string;
  managing_agency: string;
};

export type WMAWithRules = {
  wma: WMA;
  rules: SeasonWithMeta[];
};

export type FilterState = {
  query: string;
  date?: string | null;           // yyyy-mm-dd (single day)
  dateRange?: DateRange | null;   // for future range picker
  dates?: string[];               // explicit multiple dates
  accessType: "any" | AccessType;
  sex: SexFilter;
  weapons: string[];              // chosen weapons
  species: string[];              // chosen species
  counties: string[];             // chosen counties
  regions: string[];              // chosen DNR regions
  tags: string[];                 // misc tags (archery-only area, MI hunts, bird range, etc)
  areaCategories: string[];       // WMA, Federal, State Park, VPA
  weaponSubcategories: string[];  // shotgun-only, etc
  activityTypes: string[];        // hunting, dog training, etc
  campingAllowed: boolean | null;
  atvAllowed: boolean | null;
  maxDistanceMi?: number | null;  // from home
};

export type HomeLoc = {
  address: string;
  lat: number | null;
  lng: number | null;
};
