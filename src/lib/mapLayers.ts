// Layer registry for all GIS data files
// Maps each GeoJSON file to its category, geometry type, and styling

export type LayerCategory =
  | 'boundaries'
  | 'boat-ramps'
  | 'trails'
  | 'campgrounds'
  | 'fish-attractors'
  | 'lakes'
  | 'entrances'
  | 'dove-fields'
  | 'ranges'
  | 'other';

export interface GeoJSONLayerDef {
  file: string;
  state: string;
  category: LayerCategory;
  geometryType: 'point' | 'line' | 'polygon';
  nameProperty: string;
}

export interface CategoryStyle {
  label: string;
  color: string;
  icon: string;
  minzoom: number;
  clusterAt?: number; // cluster if feature count exceeds this
}

export const CATEGORY_STYLES: Record<LayerCategory, CategoryStyle> = {
  boundaries:       { label: 'Boundaries',       color: '#5fad52', icon: '🗺️', minzoom: 7 },
  'boat-ramps':     { label: 'Boat Ramps',       color: '#4a90d9', icon: '⚓', minzoom: 8, clusterAt: 500 },
  trails:           { label: 'Trails',            color: '#d4a24a', icon: '🥾', minzoom: 9 },
  campgrounds:      { label: 'Campgrounds',       color: '#e07c3a', icon: '⛺', minzoom: 8, clusterAt: 500 },
  'fish-attractors':{ label: 'Fish Attractors',   color: '#3abfe0', icon: '🎣', minzoom: 9, clusterAt: 500 },
  lakes:            { label: 'Lakes & Water',     color: '#2d6fa8', icon: '💧', minzoom: 8 },
  entrances:        { label: 'Access Points',     color: '#8b7ec8', icon: '📍', minzoom: 9, clusterAt: 500 },
  'dove-fields':    { label: 'Dove Fields',       color: '#8b6b3a', icon: '🕊️', minzoom: 9 },
  ranges:           { label: 'Shooting Ranges',   color: '#c45a5a', icon: '🎯', minzoom: 8 },
  other:            { label: 'Other Features',    color: '#6e6b5e', icon: '📌', minzoom: 9, clusterAt: 500 },
};

export const LAYER_REGISTRY: GeoJSONLayerDef[] = [
  // ── Boundaries ──
  { file: 'al-wma-boundaries.geojson',            state: 'AL', category: 'boundaries', geometryType: 'polygon', nameProperty: 'Name' },
  { file: 'ar-wma-boundaries.geojson',            state: 'AR', category: 'boundaries', geometryType: 'polygon', nameProperty: 'fname' },
  { file: 'fl-wma-boundaries.geojson',            state: 'FL', category: 'boundaries', geometryType: 'polygon', nameProperty: 'NAME' },
  { file: 'ga-wma-boundaries.geojson',            state: 'GA', category: 'boundaries', geometryType: 'polygon', nameProperty: 'name' },
  { file: 'ky-wma-boundaries.geojson',            state: 'KY', category: 'boundaries', geometryType: 'polygon', nameProperty: 'WMA' },
  { file: 'la-wma-boundaries.geojson',            state: 'LA', category: 'boundaries', geometryType: 'polygon', nameProperty: 'NAME' },
  { file: 'ms-wma-boundaries.geojson',            state: 'MS', category: 'boundaries', geometryType: 'polygon', nameProperty: 'Name' },
  { file: 'nc-gamelands-boundaries.geojson',      state: 'NC', category: 'boundaries', geometryType: 'polygon', nameProperty: 'GML_HAB' },
  { file: 'sc-public-lands-boundaries.geojson',   state: 'SC', category: 'boundaries', geometryType: 'polygon', nameProperty: 'PropertyName' },
  { file: 'tn-hunting-lands-boundaries.geojson',  state: 'TN', category: 'boundaries', geometryType: 'polygon', nameProperty: 'NAME' },
  { file: 'va-wma-boundaries.geojson',            state: 'VA', category: 'boundaries', geometryType: 'polygon', nameProperty: 'WMA_NAME' },

  // ── Boat Ramps / Water Access ──
  { file: 'al-boat-ramps.geojson',       state: 'AL', category: 'boat-ramps', geometryType: 'point', nameProperty: 'Access_Are' },
  { file: 'fl-boat-ramps.geojson',       state: 'FL', category: 'boat-ramps', geometryType: 'point', nameProperty: 'RampName' },
  { file: 'ga-boat-ramps.geojson',       state: 'GA', category: 'boat-ramps', geometryType: 'point', nameProperty: 'Name' },
  { file: 'ky-fishing-access.geojson',   state: 'KY', category: 'boat-ramps', geometryType: 'point', nameProperty: 'SiteName' },
  { file: 'ms-boat-ramps.geojson',       state: 'MS', category: 'boat-ramps', geometryType: 'point', nameProperty: 'FACILITY_NAME' },
  { file: 'nc-boating-access.geojson',   state: 'NC', category: 'boat-ramps', geometryType: 'point', nameProperty: 'BAA_Name' },
  { file: 'sc-water-access.geojson',     state: 'SC', category: 'boat-ramps', geometryType: 'point', nameProperty: 'WaterAccessName' },
  { file: 'tn-access-sites.geojson',     state: 'TN', category: 'boat-ramps', geometryType: 'point', nameProperty: 'Name' },
  { file: 'va-boating-access.geojson',   state: 'VA', category: 'boat-ramps', geometryType: 'point', nameProperty: 'SITENAME' },

  // ── Trails ──
  { file: 'al-trails.geojson',            state: 'AL', category: 'trails', geometryType: 'line', nameProperty: 'TrailName' },
  { file: 'ga-trails.geojson',            state: 'GA', category: 'trails', geometryType: 'line', nameProperty: 'Prime_Use' },
  { file: 'ky-trails.geojson',            state: 'KY', category: 'trails', geometryType: 'line', nameProperty: 'TRAIL_NAME' },
  { file: 'ms-wma-roads-trails.geojson',  state: 'MS', category: 'trails', geometryType: 'line', nameProperty: 'NAME' },
  { file: 'nc-gamelands-trails.geojson',  state: 'NC', category: 'trails', geometryType: 'line', nameProperty: 'Name' },
  { file: 'va-wma-roads-trails.geojson',  state: 'VA', category: 'trails', geometryType: 'line', nameProperty: 'Name' },

  // ── Campgrounds ──
  { file: 'ga-campgrounds.geojson',  state: 'GA', category: 'campgrounds', geometryType: 'point', nameProperty: 'Name' },
  { file: 'ky-campsites.geojson',    state: 'KY', category: 'campgrounds', geometryType: 'point', nameProperty: 'PARK_NAME' },
  { file: 'tn-campgrounds.geojson',  state: 'TN', category: 'campgrounds', geometryType: 'point', nameProperty: 'CampName' },

  // ── Fish Attractors ──
  { file: 'al-fish-attractors.geojson',  state: 'AL', category: 'fish-attractors', geometryType: 'point', nameProperty: 'Waterbody' },
  { file: 'ga-fish-attractors.geojson',  state: 'GA', category: 'fish-attractors', geometryType: 'point', nameProperty: 'waterbody' },
  { file: 'nc-fish-attractors.geojson',  state: 'NC', category: 'fish-attractors', geometryType: 'point', nameProperty: 'Waterbody' },
  { file: 'sc-fish-attractors.geojson',  state: 'SC', category: 'fish-attractors', geometryType: 'point', nameProperty: 'FishAttractorName' },
  { file: 'tn-fish-attractors.geojson',  state: 'TN', category: 'fish-attractors', geometryType: 'point', nameProperty: 'WaterBody' },

  // ── Lakes / Waterbodies ──
  { file: 'al-public-fishing-lakes.geojson', state: 'AL', category: 'lakes', geometryType: 'point', nameProperty: 'Name' },
  { file: 'ga-waterbodies.geojson',          state: 'GA', category: 'lakes', geometryType: 'polygon', nameProperty: 'Name' },
  { file: 'ky-lakes.geojson',                state: 'KY', category: 'lakes', geometryType: 'polygon', nameProperty: 'NAME' },
  { file: 'ms-state-lakes.geojson',          state: 'MS', category: 'lakes', geometryType: 'polygon', nameProperty: 'LAKE_NAME' },
  { file: 'nc-public-fishing-areas.geojson', state: 'NC', category: 'lakes', geometryType: 'point', nameProperty: 'PFA_Name' },
  { file: 'va-public-fishing-lakes.geojson', state: 'VA', category: 'lakes', geometryType: 'polygon', nameProperty: 'NAME' },
  { file: 'va-stocked-trout.geojson',        state: 'VA', category: 'lakes', geometryType: 'point', nameProperty: 'Waterbody' },

  // ── Entrances / Access Points ──
  { file: 'al-access-points.geojson',     state: 'AL', category: 'entrances', geometryType: 'point', nameProperty: 'Name' },
  { file: 'fl-wma-entrances.geojson',     state: 'FL', category: 'entrances', geometryType: 'point', nameProperty: 'NAME_WMA' },
  { file: 'fl-wma-amenities.geojson',     state: 'FL', category: 'entrances', geometryType: 'point', nameProperty: 'NAME_WMA' },
  { file: 'ga-wma-infrastructure.geojson', state: 'GA', category: 'entrances', geometryType: 'point', nameProperty: 'Type' },
  { file: 'ky-hunting-entrances.geojson', state: 'KY', category: 'entrances', geometryType: 'point', nameProperty: 'AREANAME' },
  { file: 'ky-trailheads.geojson',        state: 'KY', category: 'entrances', geometryType: 'point', nameProperty: 'NAME' },
  { file: 'ms-trailheads.geojson',        state: 'MS', category: 'entrances', geometryType: 'point', nameProperty: 'Park_Site' },
  { file: 'ms-wma-points.geojson',        state: 'MS', category: 'entrances', geometryType: 'point', nameProperty: 'NAME' },
  { file: 'tn-wma-entrances.geojson',     state: 'TN', category: 'entrances', geometryType: 'point', nameProperty: 'WMA' },
  { file: 'va-wma-entrances.geojson',     state: 'VA', category: 'entrances', geometryType: 'point', nameProperty: 'SITE_NAME' },
  { file: 'va-wma-features.geojson',      state: 'VA', category: 'entrances', geometryType: 'point', nameProperty: 'WMA' },

  // ── Dove Fields ──
  { file: 'ga-dove-fields.geojson',  state: 'GA', category: 'dove-fields', geometryType: 'polygon', nameProperty: 'Name' },
  { file: 'ms-dove-fields.geojson',  state: 'MS', category: 'dove-fields', geometryType: 'polygon', nameProperty: 'WMA' },
  { file: 'nc-dove-fields.geojson',  state: 'NC', category: 'dove-fields', geometryType: 'polygon', nameProperty: 'Field_Name' },

  // ── Shooting Ranges ──
  { file: 'al-shooting-ranges.geojson', state: 'AL', category: 'ranges', geometryType: 'point', nameProperty: 'Name' },
  { file: 'ga-shooting-ranges.geojson', state: 'GA', category: 'ranges', geometryType: 'point', nameProperty: 'Range' },

  // ── Other ──
  { file: 'al-check-stations.geojson',     state: 'AL', category: 'other', geometryType: 'point', nameProperty: 'Tract' },
  { file: 'ga-designated-areas.geojson',    state: 'GA', category: 'other', geometryType: 'polygon', nameProperty: 'Name' },
  { file: 'ga-parking.geojson',             state: 'GA', category: 'other', geometryType: 'point', nameProperty: 'Name' },
  { file: 'ms-lake-points.geojson',         state: 'MS', category: 'other', geometryType: 'point', nameProperty: 'LAKE_NAME' },
  { file: 'tn-waterfowl-blinds.geojson',    state: 'TN', category: 'other', geometryType: 'point', nameProperty: 'WMA' },
];

// Approximate bounding boxes [west, south, east, north] for viewport checks
export const STATE_BBOXES: Record<string, [number, number, number, number]> = {
  AL: [-88.5, 30.2, -84.9, 35.0],
  AR: [-94.6, 33.0, -89.6, 36.5],
  FL: [-87.6, 24.5, -80.0, 31.0],
  GA: [-85.6, 30.4, -80.8, 35.0],
  KY: [-89.6, 36.5, -82.0, 39.1],
  LA: [-94.0, 29.0, -89.0, 33.0],
  MS: [-91.7, 30.2, -88.1, 35.0],
  NC: [-84.3, 33.8, -75.5, 36.6],
  SC: [-83.4, 32.0, -78.5, 35.2],
  TN: [-90.3, 35.0, -81.6, 36.7],
  VA: [-83.7, 36.5, -75.2, 39.5],
};

// Get files for a category filtered by visible states
export function getLayerFiles(category: LayerCategory, visibleStates?: string[]): GeoJSONLayerDef[] {
  return LAYER_REGISTRY.filter(
    (l) => l.category === category && (!visibleStates || visibleStates.includes(l.state))
  );
}

// Check which states overlap a map viewport
export function getVisibleStates(bounds: { west: number; south: number; east: number; north: number }): string[] {
  return Object.entries(STATE_BBOXES)
    .filter(([, [w, s, e, n]]) =>
      bounds.west < e && bounds.east > w && bounds.south < n && bounds.north > s
    )
    .map(([state]) => state);
}
