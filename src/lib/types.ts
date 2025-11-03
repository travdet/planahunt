export type WMACoords = [number, number];

export interface CheckStation {
  name: string;
  coords: WMACoords;
}

export interface Road {
  name: string;
  type: "improved" | "unimproved";
  path: WMACoords[];
}

export interface WMA {
  wma_id: string;
  name: string;
  tract_name?: string;
  county: string;
  region: string;
  acreage: number;
  phone?: string;
  map_points?: {
    check_stations?: CheckStation[];
    boat_ramps?: any[]; // Define if needed
    other_access?: any[]; // Define if needed
  };
  map_lines?: {
    roads?: Road[];
    trails?: any[]; // Define if needed
    boundaries?: any[]; // Define if needed
  };
  lat?: number;
  lng?: number;
}

export interface SeasonRule {
  wma_id: string;
  species: string;
  hunt_type: string;
  dates: string;
  start_date?: string;
  end_date?: string;
  special_rules?: string | null;
  quota_details?: string | null;
  antler_restriction?: string | null;
  buck_only?: boolean | null;
  either_sex?: boolean | null;
  youth_hunt?: boolean | null;
  disability_hunt?: boolean | null;
  source_page?: number;
}

export interface FilterState {
  query: string;
  date: Date | null;
  dateRange: [Date, Date] | null;
  accessType: "any" | "quota" | "general";
  sex: "any" | "either" | "buck";
  weapons: string[];
  species: string[];
  counties: string[];
  regions: string[];
  tags: string[];
  maxDistanceMi: number | null;
}

export interface HomeLoc {
  address: string;
  lat: number | null;
  lng: number | null;
}
