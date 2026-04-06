import { HuntingSeason } from "@/lib/types";

// NC Land-Specific Hunting Seasons 2025-2026
// Organized by deer zone

export const NC_LAND_SEASONS: HuntingSeason[] = [

  // ============================================================
  // WESTERN ZONE - Mountain Counties
  // Deer: Archery Sep 13–Nov 14 | ML Nov 15–28 | Rifle Nov 29–Jan 1
  // Bear: Mountain Unit Oct 4–Nov 22 + Dec 13–Jan 1
  // ============================================================

  // --- nc-gl-pisgah ---
  { id: "nc-gl-pisgah-deer-archery", state: "NC", land_id: "nc-gl-pisgah", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "archery", "western-zone"] },
  { id: "nc-gl-pisgah-deer-muzzleloader", state: "NC", land_id: "nc-gl-pisgah", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "muzzleloader", "western-zone"] },
  { id: "nc-gl-pisgah-deer-rifle", state: "NC", land_id: "nc-gl-pisgah", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "rifle", "western-zone"] },
  { id: "nc-gl-pisgah-turkey-spring", state: "NC", land_id: "nc-gl-pisgah", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-pisgah-turkey-youth", state: "NC", land_id: "nc-gl-pisgah", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth only (under 16 with licensed adult)", tags: ["turkey", "spring", "youth"] },
  { id: "nc-gl-pisgah-bear-mountain", state: "NC", land_id: "nc-gl-pisgah", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: true, notes: "Quota hunt required - apply through NCWRC (Q: nc-qh-bear-pisgah); Mountain Bear Unit", tags: ["bear", "quota", "mountain-unit"] },
  { id: "nc-gl-pisgah-bear-mountain-late", state: "NC", land_id: "nc-gl-pisgah", species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: true, notes: "Late season quota hunt - apply through NCWRC; Mountain Bear Unit", tags: ["bear", "quota", "mountain-unit"] },

  // --- nc-gl-nantahala ---
  { id: "nc-gl-nantahala-deer-archery", state: "NC", land_id: "nc-gl-nantahala", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "archery", "western-zone"] },
  { id: "nc-gl-nantahala-deer-muzzleloader", state: "NC", land_id: "nc-gl-nantahala", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "muzzleloader", "western-zone"] },
  { id: "nc-gl-nantahala-deer-rifle", state: "NC", land_id: "nc-gl-nantahala", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "rifle", "western-zone"] },
  { id: "nc-gl-nantahala-turkey-spring", state: "NC", land_id: "nc-gl-nantahala", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-nantahala-turkey-youth", state: "NC", land_id: "nc-gl-nantahala", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth only (under 16 with licensed adult)", tags: ["turkey", "spring", "youth"] },
  { id: "nc-gl-nantahala-bear-mountain", state: "NC", land_id: "nc-gl-nantahala", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: true, notes: "Quota hunt required - apply through NCWRC (Q: nc-qh-bear-pisgah); Mountain Bear Unit", tags: ["bear", "quota", "mountain-unit"] },
  { id: "nc-gl-nantahala-bear-mountain-late", state: "NC", land_id: "nc-gl-nantahala", species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: true, notes: "Late season quota hunt; Mountain Bear Unit", tags: ["bear", "quota", "mountain-unit"] },

  // --- nc-gl-cold-mountain ---
  { id: "nc-gl-cold-mountain-deer-archery", state: "NC", land_id: "nc-gl-cold-mountain", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, tags: ["deer", "archery", "western-zone"] },
  { id: "nc-gl-cold-mountain-deer-muzzleloader", state: "NC", land_id: "nc-gl-cold-mountain", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, tags: ["deer", "muzzleloader", "western-zone"] },
  { id: "nc-gl-cold-mountain-deer-rifle", state: "NC", land_id: "nc-gl-cold-mountain", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "western-zone"] },
  { id: "nc-gl-cold-mountain-turkey-spring", state: "NC", land_id: "nc-gl-cold-mountain", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-cold-mountain-bear-mountain", state: "NC", land_id: "nc-gl-cold-mountain", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: false, notes: "Mountain Bear Unit", tags: ["bear", "mountain-unit"] },
  { id: "nc-gl-cold-mountain-bear-mountain-late", state: "NC", land_id: "nc-gl-cold-mountain", species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: false, notes: "Mountain Bear Unit late season", tags: ["bear", "mountain-unit"] },

  // --- nc-gl-dupont-state-forest ---
  { id: "nc-gl-dupont-deer-archery", state: "NC", land_id: "nc-gl-dupont-state-forest", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, notes: "Lower zones only; check NCWRC for restricted areas", tags: ["deer", "archery", "western-zone"] },
  { id: "nc-gl-dupont-deer-muzzleloader", state: "NC", land_id: "nc-gl-dupont-state-forest", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, notes: "Lower zones only", tags: ["deer", "muzzleloader", "western-zone"] },
  { id: "nc-gl-dupont-deer-rifle", state: "NC", land_id: "nc-gl-dupont-state-forest", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, notes: "Lower zones only", tags: ["deer", "rifle", "western-zone"] },
  { id: "nc-gl-dupont-turkey-spring", state: "NC", land_id: "nc-gl-dupont-state-forest", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },

  // --- nc-gl-south-mountains ---
  { id: "nc-gl-south-mountains-deer-archery", state: "NC", land_id: "nc-gl-south-mountains", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, tags: ["deer", "archery", "western-zone"] },
  { id: "nc-gl-south-mountains-deer-muzzleloader", state: "NC", land_id: "nc-gl-south-mountains", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, tags: ["deer", "muzzleloader", "western-zone"] },
  { id: "nc-gl-south-mountains-deer-rifle", state: "NC", land_id: "nc-gl-south-mountains", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "western-zone"] },
  { id: "nc-gl-south-mountains-turkey-spring", state: "NC", land_id: "nc-gl-south-mountains", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-south-mountains-bear-mountain", state: "NC", land_id: "nc-gl-south-mountains", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: false, notes: "Mountain Bear Unit", tags: ["bear", "mountain-unit"] },
  { id: "nc-gl-south-mountains-bear-mountain-late", state: "NC", land_id: "nc-gl-south-mountains", species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: false, notes: "Mountain Bear Unit late season", tags: ["bear", "mountain-unit"] },

  // --- Western Zone remaining game lands: sandy-mush, buffalo-cove, needmore, green-river, thurmond-chatham, toxaway, headwaters-state-forest, mitchell-river, william-h-silver, johns-river, kings-creek ---
  ...["nc-gl-sandy-mush","nc-gl-buffalo-cove","nc-gl-needmore","nc-gl-green-river","nc-gl-thurmond-chatham","nc-gl-toxaway","nc-gl-headwaters-state-forest","nc-gl-mitchell-river","nc-gl-william-h-silver","nc-gl-johns-river","nc-gl-kings-creek"].flatMap(id => [
    { id: `${id}-deer-archery`, state: "NC", land_id: id, species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "archery", "western-zone"] },
    { id: `${id}-deer-muzzleloader`, state: "NC", land_id: id, species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "muzzleloader", "western-zone"] },
    { id: `${id}-deer-rifle`, state: "NC", land_id: id, species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "rifle", "western-zone"] },
    { id: `${id}-turkey-spring`, state: "NC", land_id: id, species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
    { id: `${id}-bear-mountain`, state: "NC", land_id: id, species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: false, notes: "Mountain Bear Unit", tags: ["bear", "mountain-unit"] },
    { id: `${id}-bear-mountain-late`, state: "NC", land_id: id, species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: false, notes: "Mountain Bear Unit late season", tags: ["bear", "mountain-unit"] },
  ] as HuntingSeason[]),

  // --- nc-nf-pisgah (same as game land, western zone) ---
  { id: "nc-nf-pisgah-deer-archery", state: "NC", land_id: "nc-nf-pisgah", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, notes: "Pisgah NF follows Western Zone dates", tags: ["deer", "archery", "western-zone", "national-forest"] },
  { id: "nc-nf-pisgah-deer-muzzleloader", state: "NC", land_id: "nc-nf-pisgah", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, tags: ["deer", "muzzleloader", "western-zone", "national-forest"] },
  { id: "nc-nf-pisgah-deer-rifle", state: "NC", land_id: "nc-nf-pisgah", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "western-zone", "national-forest"] },
  { id: "nc-nf-pisgah-turkey-spring", state: "NC", land_id: "nc-nf-pisgah", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring", "national-forest"] },
  { id: "nc-nf-pisgah-bear-mountain", state: "NC", land_id: "nc-nf-pisgah", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: false, notes: "Mountain Bear Unit", tags: ["bear", "mountain-unit", "national-forest"] },
  { id: "nc-nf-pisgah-bear-mountain-late", state: "NC", land_id: "nc-nf-pisgah", species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: false, notes: "Mountain Bear Unit late season", tags: ["bear", "mountain-unit", "national-forest"] },

  // --- nc-nf-nantahala ---
  { id: "nc-nf-nantahala-deer-archery", state: "NC", land_id: "nc-nf-nantahala", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-14", quota_required: false, notes: "Nantahala NF follows Western Zone dates", tags: ["deer", "archery", "western-zone", "national-forest"] },
  { id: "nc-nf-nantahala-deer-muzzleloader", state: "NC", land_id: "nc-nf-nantahala", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-15", end_date: "2025-11-28", quota_required: false, tags: ["deer", "muzzleloader", "western-zone", "national-forest"] },
  { id: "nc-nf-nantahala-deer-rifle", state: "NC", land_id: "nc-nf-nantahala", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-29", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "western-zone", "national-forest"] },
  { id: "nc-nf-nantahala-turkey-spring", state: "NC", land_id: "nc-nf-nantahala", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring", "national-forest"] },
  { id: "nc-nf-nantahala-bear-mountain", state: "NC", land_id: "nc-nf-nantahala", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-04", end_date: "2025-11-22", quota_required: false, notes: "Mountain Bear Unit", tags: ["bear", "mountain-unit", "national-forest"] },
  { id: "nc-nf-nantahala-bear-mountain-late", state: "NC", land_id: "nc-nf-nantahala", species: "Bear", weapon_type: "Rifle", start_date: "2025-12-13", end_date: "2026-01-01", quota_required: false, notes: "Mountain Bear Unit late season", tags: ["bear", "mountain-unit", "national-forest"] },

  // ============================================================
  // NW ZONE - Alleghany, Ashe, Surry, Wilkes counties
  // Deer: Archery Sep 13–Nov 7 | ML Nov 8–21 | Rifle Nov 22–Jan 1
  // ============================================================

  ...["nc-gl-three-top-mountain","nc-gl-pond-mountain","nc-gl-elk-knob","nc-gl-little-fork-state-forest","nc-gl-kerr-scott","nc-gl-hill-farm","nc-gl-perkins","nc-gl-buckhorn","nc-gl-embro","nc-gl-lower-fishing-creek"].flatMap(id => [
    { id: `${id}-deer-archery`, state: "NC", land_id: id, species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-07", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "archery", "nw-zone"] },
    { id: `${id}-deer-muzzleloader`, state: "NC", land_id: id, species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-21", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "muzzleloader", "nw-zone"] },
    { id: `${id}-deer-rifle`, state: "NC", land_id: id, species: "Deer", weapon_type: "Rifle", start_date: "2025-11-22", end_date: "2026-01-01", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "rifle", "nw-zone"] },
    { id: `${id}-turkey-spring`, state: "NC", land_id: id, species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  ] as HuntingSeason[]),


  // ============================================================
  // CENTRAL ZONE - Piedmont
  // Deer: Archery Sep 13–Oct 31 | ML Nov 1–14 | Rifle Nov 15–Jan 1
  // Bear: Piedmont Unit Oct 18–Jan 1
  // ============================================================

  // --- nc-gl-uwharrie (special) ---
  { id: "nc-gl-uwharrie-deer-archery", state: "NC", land_id: "nc-gl-uwharrie", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: false, tags: ["deer", "archery", "central-zone"] },
  { id: "nc-gl-uwharrie-deer-muzzleloader", state: "NC", land_id: "nc-gl-uwharrie", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "central-zone"] },
  { id: "nc-gl-uwharrie-deer-rifle", state: "NC", land_id: "nc-gl-uwharrie", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "central-zone"] },
  { id: "nc-gl-uwharrie-turkey-spring", state: "NC", land_id: "nc-gl-uwharrie", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-uwharrie-turkey-youth", state: "NC", land_id: "nc-gl-uwharrie", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth only (under 16 with licensed adult)", tags: ["turkey", "spring", "youth"] },
  { id: "nc-gl-uwharrie-bear-piedmont", state: "NC", land_id: "nc-gl-uwharrie", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, notes: "Piedmont Bear Unit", tags: ["bear", "piedmont-unit"] },

  // --- nc-gl-sandhills (quota deer) ---
  { id: "nc-gl-sandhills-deer-archery", state: "NC", land_id: "nc-gl-sandhills", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: true, notes: "Quota deer hunt - apply through NCWRC; archery-only during portions; fox squirrel habitat (protected)", tags: ["deer", "archery", "central-zone", "quota"] },
  { id: "nc-gl-sandhills-deer-muzzleloader", state: "NC", land_id: "nc-gl-sandhills", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: true, notes: "Quota hunt required - apply through NCWRC", tags: ["deer", "muzzleloader", "central-zone", "quota"] },
  { id: "nc-gl-sandhills-deer-rifle", state: "NC", land_id: "nc-gl-sandhills", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt required - apply through NCWRC; no fox squirrel take", tags: ["deer", "rifle", "central-zone", "quota"] },
  { id: "nc-gl-sandhills-turkey-spring", state: "NC", land_id: "nc-gl-sandhills", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },

  // --- Central Zone: remaining game lands ---
  ...["nc-gl-r-wayne-bailey-caswell","nc-gl-jordan","nc-gl-butner-falls-of-neuse","nc-gl-hyco","nc-gl-mayo","nc-gl-harris","nc-gl-pee-dee-river","nc-gl-yadkin-river","nc-gl-dan-river","nc-gl-chatham","nc-gl-tillery","nc-gl-linwood","nc-gl-second-creek","nc-gl-sandy-creek","nc-gl-shocco-creek","nc-gl-lee","nc-gl-tar-river","nc-gl-brinkleyville","nc-gl-cape-fear-river-wetlands","nc-gl-rocky-run","nc-gl-suggs-mill-pond","nc-gl-voice-of-america"].flatMap(id => [
    { id: `${id}-deer-archery`, state: "NC", land_id: id, species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "archery", "central-zone"] },
    { id: `${id}-deer-muzzleloader`, state: "NC", land_id: id, species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "muzzleloader", "central-zone"] },
    { id: `${id}-deer-rifle`, state: "NC", land_id: id, species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "rifle", "central-zone"] },
    { id: `${id}-turkey-spring`, state: "NC", land_id: id, species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  ] as HuntingSeason[]),

  // Bear on r-wayne-bailey-caswell (Piedmont unit)
  { id: "nc-gl-r-wayne-bailey-caswell-bear-piedmont", state: "NC", land_id: "nc-gl-r-wayne-bailey-caswell", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, notes: "Piedmont Bear Unit", tags: ["bear", "piedmont-unit"] },

  // --- nc-nf-uwharrie ---
  { id: "nc-nf-uwharrie-deer-archery", state: "NC", land_id: "nc-nf-uwharrie", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: false, notes: "Uwharrie NF follows Central Zone dates", tags: ["deer", "archery", "central-zone", "national-forest"] },
  { id: "nc-nf-uwharrie-deer-muzzleloader", state: "NC", land_id: "nc-nf-uwharrie", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "central-zone", "national-forest"] },
  { id: "nc-nf-uwharrie-deer-rifle", state: "NC", land_id: "nc-nf-uwharrie", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "central-zone", "national-forest"] },
  { id: "nc-nf-uwharrie-turkey-spring", state: "NC", land_id: "nc-nf-uwharrie", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring", "national-forest"] },
  { id: "nc-nf-uwharrie-bear-piedmont", state: "NC", land_id: "nc-nf-uwharrie", species: "Bear", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, notes: "Piedmont Bear Unit", tags: ["bear", "piedmont-unit", "national-forest"] },

  // --- COE lands (Central Zone) ---
  // nc-coe-jordan-lake: hunting on designated areas; no hunting within 300ft of campgrounds
  { id: "nc-coe-jordan-lake-deer-archery", state: "NC", land_id: "nc-coe-jordan-lake", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: false, notes: "Hunting on designated areas only; no hunting within 300 feet of campgrounds", tags: ["deer", "archery", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-jordan-lake-deer-muzzleloader", state: "NC", land_id: "nc-coe-jordan-lake", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Hunting on designated areas only", tags: ["deer", "muzzleloader", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-jordan-lake-deer-rifle", state: "NC", land_id: "nc-coe-jordan-lake", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: false, notes: "Hunting on designated areas only", tags: ["deer", "rifle", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-jordan-lake-turkey-spring", state: "NC", land_id: "nc-coe-jordan-lake", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; designated areas only", tags: ["turkey", "spring", "corps-of-engineers"] },

  // nc-coe-falls-lake
  { id: "nc-coe-falls-lake-deer-archery", state: "NC", land_id: "nc-coe-falls-lake", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: false, notes: "Hunting on designated areas only", tags: ["deer", "archery", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-falls-lake-deer-muzzleloader", state: "NC", land_id: "nc-coe-falls-lake", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-falls-lake-deer-rifle", state: "NC", land_id: "nc-coe-falls-lake", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-falls-lake-turkey-spring", state: "NC", land_id: "nc-coe-falls-lake", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only", tags: ["turkey", "spring", "corps-of-engineers"] },

  // nc-coe-kerr-lake (Central/NW border - use central zone)
  { id: "nc-coe-kerr-lake-deer-archery", state: "NC", land_id: "nc-coe-kerr-lake", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-31", quota_required: false, tags: ["deer", "archery", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-kerr-lake-deer-muzzleloader", state: "NC", land_id: "nc-coe-kerr-lake", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-kerr-lake-deer-rifle", state: "NC", land_id: "nc-coe-kerr-lake", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "central-zone", "corps-of-engineers"] },
  { id: "nc-coe-kerr-lake-turkey-spring", state: "NC", land_id: "nc-coe-kerr-lake", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only", tags: ["turkey", "spring", "corps-of-engineers"] },

  // nc-coe-w-kerr-scott (NW Zone)
  { id: "nc-coe-w-kerr-scott-deer-archery", state: "NC", land_id: "nc-coe-w-kerr-scott", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-11-07", quota_required: false, tags: ["deer", "archery", "nw-zone", "corps-of-engineers"] },
  { id: "nc-coe-w-kerr-scott-deer-muzzleloader", state: "NC", land_id: "nc-coe-w-kerr-scott", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-21", quota_required: false, tags: ["deer", "muzzleloader", "nw-zone", "corps-of-engineers"] },
  { id: "nc-coe-w-kerr-scott-deer-rifle", state: "NC", land_id: "nc-coe-w-kerr-scott", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-22", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "nw-zone", "corps-of-engineers"] },
  { id: "nc-coe-w-kerr-scott-turkey-spring", state: "NC", land_id: "nc-coe-w-kerr-scott", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only", tags: ["turkey", "spring", "corps-of-engineers"] },


  // ============================================================
  // NE/SE ZONE - Coastal/Eastern Counties
  // Deer: Archery Sep 13–Oct 3 | ML Oct 4–17 | Rifle Oct 18–Jan 1
  // Bear: Coastal Unit Nov 8–Jan 1
  // ============================================================

  // --- nc-gl-holly-shelter (special rules) ---
  { id: "nc-gl-holly-shelter-deer-archery", state: "NC", land_id: "nc-gl-holly-shelter", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: false, tags: ["deer", "archery", "ne-se-zone"] },
  { id: "nc-gl-holly-shelter-deer-muzzleloader", state: "NC", land_id: "nc-gl-holly-shelter", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: false, tags: ["deer", "muzzleloader", "ne-se-zone"] },
  { id: "nc-gl-holly-shelter-deer-rifle", state: "NC", land_id: "nc-gl-holly-shelter", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, notes: "Dog deer hunts allowed Fridays/Saturdays during firearms season; key waterfowl area", tags: ["deer", "rifle", "ne-se-zone", "dogs-allowed"] },
  { id: "nc-gl-holly-shelter-turkey-spring", state: "NC", land_id: "nc-gl-holly-shelter", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-holly-shelter-turkey-youth", state: "NC", land_id: "nc-gl-holly-shelter", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth only (under 16 with licensed adult)", tags: ["turkey", "spring", "youth"] },
  { id: "nc-gl-holly-shelter-bear-coastal", state: "NC", land_id: "nc-gl-holly-shelter", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit", tags: ["bear", "coastal-unit"] },

  // --- nc-gl-dare (special regulations) ---
  { id: "nc-gl-dare-deer-archery", state: "NC", land_id: "nc-gl-dare", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: false, notes: "No dogs for deer; limited access areas; check special regulations before visiting", tags: ["deer", "archery", "ne-se-zone", "no-dogs"] },
  { id: "nc-gl-dare-deer-muzzleloader", state: "NC", land_id: "nc-gl-dare", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: false, notes: "No dogs for deer; special regulations required", tags: ["deer", "muzzleloader", "ne-se-zone", "no-dogs"] },
  { id: "nc-gl-dare-deer-rifle", state: "NC", land_id: "nc-gl-dare", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, notes: "No dogs for deer; limited access areas; check NCWRC for current access restrictions", tags: ["deer", "rifle", "ne-se-zone", "no-dogs"] },
  { id: "nc-gl-dare-turkey-spring", state: "NC", land_id: "nc-gl-dare", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; check special access regulations", tags: ["turkey", "spring"] },
  { id: "nc-gl-dare-bear-coastal", state: "NC", land_id: "nc-gl-dare", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit; check access restrictions", tags: ["bear", "coastal-unit"] },

  // --- nc-gl-alligator-river (quota hunts) ---
  { id: "nc-gl-alligator-river-deer-archery", state: "NC", land_id: "nc-gl-alligator-river", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "Quota hunts for deer; apply through NCWRC", tags: ["deer", "archery", "ne-se-zone", "quota"] },
  { id: "nc-gl-alligator-river-deer-muzzleloader", state: "NC", land_id: "nc-gl-alligator-river", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: true, notes: "Quota hunts for deer; apply through NCWRC", tags: ["deer", "muzzleloader", "ne-se-zone", "quota"] },
  { id: "nc-gl-alligator-river-deer-rifle", state: "NC", land_id: "nc-gl-alligator-river", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunts for deer; apply through NCWRC", tags: ["deer", "rifle", "ne-se-zone", "quota"] },
  { id: "nc-gl-alligator-river-turkey-spring", state: "NC", land_id: "nc-gl-alligator-river", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; NWR managed dates", tags: ["turkey", "spring"] },
  { id: "nc-gl-alligator-river-bear-coastal", state: "NC", land_id: "nc-gl-alligator-river", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit", tags: ["bear", "coastal-unit"] },

  // --- NE/SE Zone bulk game lands ---
  ...["nc-gl-angola-bay","nc-gl-chowan-swamp","nc-gl-roanoke-river-wetlands","nc-gl-green-swamp","nc-gl-gull-rock","nc-gl-bachelor-bay","nc-gl-goose-creek","nc-gl-new-lake","nc-gl-lantern-acres","nc-gl-columbia-county","nc-gl-robeson","nc-gl-stones-creek","nc-gl-holly-shelter-arm","nc-gl-currituck-banks","nc-gl-bladen-lakes","nc-gl-buckridge","nc-gl-north-river","nc-gl-van-swamp","nc-gl-sutton-lake","nc-gl-bertie-county","nc-gl-carteret-county","nc-gl-dover-bay","nc-gl-j-morgan-futch","nc-gl-juniper-creek","nc-gl-light-ground-pocosin","nc-gl-neuse-river","nc-gl-nicholson-creek","nc-gl-north-bend","nc-gl-pungo-river","nc-gl-rhodes-pond","nc-gl-roanoke-island-marshes","nc-gl-rockfish-creek","nc-gl-texas-plantation","nc-gl-white-oak-river","nc-gl-whitehall-plantation","nc-gl-bullard-branch"].flatMap(id => [
    { id: `${id}-deer-archery`, state: "NC", land_id: id, species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "archery", "ne-se-zone"] },
    { id: `${id}-deer-muzzleloader`, state: "NC", land_id: id, species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "muzzleloader", "ne-se-zone"] },
    { id: `${id}-deer-rifle`, state: "NC", land_id: id, species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, bag_limit: "6/season statewide", tags: ["deer", "rifle", "ne-se-zone"] },
    { id: `${id}-turkey-spring`, state: "NC", land_id: id, species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  ] as HuntingSeason[]),

  // Bear on coastal NE/SE game lands
  ...["nc-gl-angola-bay","nc-gl-green-swamp","nc-gl-chowan-swamp","nc-gl-roanoke-river-wetlands","nc-gl-gull-rock","nc-gl-bachelor-bay","nc-gl-new-lake","nc-gl-pungo-river","nc-gl-light-ground-pocosin","nc-gl-buckridge","nc-gl-pocosin-lakes"].map(id => ({
    id: `${id}-bear-coastal`, state: "NC", land_id: id, species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit", tags: ["bear", "coastal-unit"],
  } as HuntingSeason)),

  // --- nc-gl-croatan ---
  { id: "nc-gl-croatan-deer-archery", state: "NC", land_id: "nc-gl-croatan", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: false, notes: "NE/SE Zone dates", tags: ["deer", "archery", "ne-se-zone"] },
  { id: "nc-gl-croatan-deer-muzzleloader", state: "NC", land_id: "nc-gl-croatan", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: false, tags: ["deer", "muzzleloader", "ne-se-zone"] },
  { id: "nc-gl-croatan-deer-rifle", state: "NC", land_id: "nc-gl-croatan", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "ne-se-zone"] },
  { id: "nc-gl-croatan-turkey-spring", state: "NC", land_id: "nc-gl-croatan", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring"] },
  { id: "nc-gl-croatan-bear-coastal", state: "NC", land_id: "nc-gl-croatan", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit; black bear hunting in coastal unit", tags: ["bear", "coastal-unit"] },

  // --- nc-nf-croatan ---
  { id: "nc-nf-croatan-deer-archery", state: "NC", land_id: "nc-nf-croatan", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: false, notes: "NF lands follow NC statewide NE/SE zone dates", tags: ["deer", "archery", "ne-se-zone", "national-forest"] },
  { id: "nc-nf-croatan-deer-muzzleloader", state: "NC", land_id: "nc-nf-croatan", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: false, tags: ["deer", "muzzleloader", "ne-se-zone", "national-forest"] },
  { id: "nc-nf-croatan-deer-rifle", state: "NC", land_id: "nc-nf-croatan", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: false, tags: ["deer", "rifle", "ne-se-zone", "national-forest"] },
  { id: "nc-nf-croatan-turkey-spring", state: "NC", land_id: "nc-nf-croatan", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; harvest report card required", tags: ["turkey", "spring", "national-forest"] },
  { id: "nc-nf-croatan-bear-coastal", state: "NC", land_id: "nc-nf-croatan", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit", tags: ["bear", "coastal-unit", "national-forest"] },

  // ============================================================
  // NWR LANDS - NE/SE Zone
  // ============================================================

  // --- nc-nwr-alligator-river ---
  { id: "nc-nwr-alligator-river-deer-archery", state: "NC", land_id: "nc-nwr-alligator-river", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed; quota hunts for deer; turkey season on NWR dates; apply through NCWRC", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-alligator-river-deer-muzzleloader", state: "NC", land_id: "nc-nwr-alligator-river", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: true, notes: "Quota hunt; apply through NCWRC", tags: ["deer", "muzzleloader", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-alligator-river-deer-rifle", state: "NC", land_id: "nc-nwr-alligator-river", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; apply through NCWRC", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-alligator-river-turkey-spring", state: "NC", land_id: "nc-nwr-alligator-river", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; NWR dates apply", tags: ["turkey", "spring", "nwr"] },
  { id: "nc-nwr-alligator-river-bear-coastal", state: "NC", land_id: "nc-nwr-alligator-river", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit", tags: ["bear", "coastal-unit", "nwr"] },

  // --- nc-nwr-pocosin-lakes ---
  { id: "nc-nwr-pocosin-lakes-deer-archery", state: "NC", land_id: "nc-nwr-pocosin-lakes", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed; check USFWS for specific quota hunt schedules", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-pocosin-lakes-deer-muzzleloader", state: "NC", land_id: "nc-nwr-pocosin-lakes", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-10-04", end_date: "2025-10-17", quota_required: true, notes: "Quota hunt; check USFWS schedule", tags: ["deer", "muzzleloader", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-pocosin-lakes-deer-rifle", state: "NC", land_id: "nc-nwr-pocosin-lakes", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; check USFWS schedule", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-pocosin-lakes-turkey-spring", state: "NC", land_id: "nc-nwr-pocosin-lakes", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only; check USFWS regulations", tags: ["turkey", "spring", "nwr"] },
  { id: "nc-nwr-pocosin-lakes-bear-coastal", state: "NC", land_id: "nc-nwr-pocosin-lakes", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-08", end_date: "2026-01-01", quota_required: false, notes: "Coastal Bear Unit", tags: ["bear", "coastal-unit", "nwr"] },

  // --- nc-nwr-mattamuskeet (waterfowl quota, no walk-in; swan special permit) ---
  { id: "nc-nwr-mattamuskeet-deer-archery", state: "NC", land_id: "nc-nwr-mattamuskeet", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "Quota hunt required; waterfowl quota hunt required (no walk-in); swan season requires special permit; check USFWS", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-mattamuskeet-deer-rifle", state: "NC", land_id: "nc-nwr-mattamuskeet", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt required; check USFWS for schedules", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-mattamuskeet-waterfowl", state: "NC", land_id: "nc-nwr-mattamuskeet", species: "Duck", weapon_type: "Shotgun", start_date: "2025-11-01", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt required - no walk-in hunting; apply through USFWS; swan season requires separate special permit", tags: ["duck", "waterfowl", "quota", "nwr", "swan"] },
  { id: "nc-nwr-mattamuskeet-swan", state: "NC", land_id: "nc-nwr-mattamuskeet", species: "Swan", weapon_type: "Shotgun", start_date: "2025-11-01", end_date: "2026-01-31", quota_required: true, notes: "Special swan permit required; very limited quota; apply separately through NCWRC", tags: ["swan", "quota", "nwr", "special-permit"] },

  // --- nc-nwr-swanquarter ---
  { id: "nc-nwr-swanquarter-deer-archery", state: "NC", land_id: "nc-nwr-swanquarter", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed; quota hunts; check USFWS for current schedules", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-swanquarter-deer-rifle", state: "NC", land_id: "nc-nwr-swanquarter", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; check USFWS", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-swanquarter-waterfowl", state: "NC", land_id: "nc-nwr-swanquarter", species: "Duck", weapon_type: "Shotgun", start_date: "2025-11-01", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt; check USFWS for dates and application", tags: ["duck", "waterfowl", "quota", "nwr"] },

  // --- nc-nwr-roanoke-river ---
  { id: "nc-nwr-roanoke-river-deer-archery", state: "NC", land_id: "nc-nwr-roanoke-river", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed quota hunts; apply through USFWS or NCWRC", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-roanoke-river-deer-rifle", state: "NC", land_id: "nc-nwr-roanoke-river", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; check USFWS schedule", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-roanoke-river-turkey-spring", state: "NC", land_id: "nc-nwr-roanoke-river", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-09", quota_required: false, notes: "Males or bearded only", tags: ["turkey", "spring", "nwr"] },

  // --- nc-nwr-cedar-island ---
  { id: "nc-nwr-cedar-island-deer-archery", state: "NC", land_id: "nc-nwr-cedar-island", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed; check USFWS for hunt schedules and quota requirements", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-cedar-island-deer-rifle", state: "NC", land_id: "nc-nwr-cedar-island", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; check USFWS", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-cedar-island-waterfowl", state: "NC", land_id: "nc-nwr-cedar-island", species: "Duck", weapon_type: "Shotgun", start_date: "2025-11-01", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt; check USFWS for dates", tags: ["duck", "waterfowl", "quota", "nwr"] },

  // --- nc-nwr-mackay-island ---
  { id: "nc-nwr-mackay-island-deer-archery", state: "NC", land_id: "nc-nwr-mackay-island", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed quota hunt; check USFWS", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-mackay-island-deer-rifle", state: "NC", land_id: "nc-nwr-mackay-island", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; check USFWS schedule", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-mackay-island-waterfowl", state: "NC", land_id: "nc-nwr-mackay-island", species: "Duck", weapon_type: "Shotgun", start_date: "2025-11-01", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt; check USFWS for dates and application", tags: ["duck", "waterfowl", "quota", "nwr"] },

  // --- nc-nwr-currituck ---
  { id: "nc-nwr-currituck-deer-archery", state: "NC", land_id: "nc-nwr-currituck", species: "Deer", weapon_type: "Archery", start_date: "2025-09-13", end_date: "2025-10-03", quota_required: true, notes: "NWR managed; quota hunt required; apply through USFWS or NCWRC", tags: ["deer", "archery", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-currituck-deer-rifle", state: "NC", land_id: "nc-nwr-currituck", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Quota hunt; check USFWS", tags: ["deer", "rifle", "ne-se-zone", "quota", "nwr"] },
  { id: "nc-nwr-currituck-waterfowl", state: "NC", land_id: "nc-nwr-currituck", species: "Duck", weapon_type: "Shotgun", start_date: "2025-11-01", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt; apply through USFWS", tags: ["duck", "waterfowl", "quota", "nwr"] },

  // ============================================================
  // NO-HUNTING LANDS (informational entries)
  // ============================================================
  { id: "nc-nwr-pea-island-no-hunting", state: "NC", land_id: "nc-nwr-pea-island", species: "Deer", weapon_type: "Rifle", start_date: "2025-09-01", end_date: "2026-01-01", quota_required: false, notes: "NO HUNTING PERMITTED - Pea Island NWR is a wildlife refuge with no hunting of any kind allowed", tags: ["no-hunting", "nwr"] },
  { id: "nc-np-great-smoky-no-hunting", state: "NC", land_id: "nc-np-great-smoky-nc", species: "Deer", weapon_type: "Rifle", start_date: "2025-09-01", end_date: "2026-01-01", quota_required: false, notes: "NO HUNTING PERMITTED - Great Smoky Mountains National Park prohibits all hunting", tags: ["no-hunting", "national-park"] },
  { id: "nc-np-blue-ridge-pkwy-no-hunting", state: "NC", land_id: "nc-np-blue-ridge-parkway", species: "Deer", weapon_type: "Rifle", start_date: "2025-09-01", end_date: "2026-01-01", quota_required: false, notes: "NO HUNTING PERMITTED - Blue Ridge Parkway (National Parkway) prohibits all hunting", tags: ["no-hunting", "national-park"] },
  { id: "nc-ns-cape-hatteras-limited-hunting", state: "NC", land_id: "nc-ns-cape-hatteras", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-18", end_date: "2026-01-01", quota_required: true, notes: "Very limited hunting only; must check current NPS rules and obtain NPS permit; most areas closed to hunting", tags: ["deer", "nps", "special-permit", "limited-access"] },

];
