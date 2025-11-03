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
  area_type?: string;
  counties: string[];
  region: string;
  acreage: number;
  phone?: string;
  map_points?: {
    check_stations?: CheckStation[];
    boat_ramps?: any[];
    other_access?: any[];
  };
  map_lines?: {
    roads?: Road[];
    trails?: any[];
    boundaries?: any[];
  };
  lat?: number | null;
  lng?: number | null;
  source_url?: string | null;
  tags?: string[];
}
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

export type DateRange = {
  start: Date;
  end: Date;
} | null;

export interface FilterState {
  query: string;
  dateRange: DateRange;
  accessType: "any" | "quota" | "general";
  sex: "any" | "either" | "buck";
  weapons: string[];
  species: string[];
  counties: string[];
  regions: string[];
  tags: string[];
  maxDistanceMi: number | null;
  showFavorites: boolean; // <-- ADD THIS LINE
}

export interface HomeLocation {
  address: string;
  lat: number | null;
  lng: number | null;
}
