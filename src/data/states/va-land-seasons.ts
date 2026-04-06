/**
 * Virginia WMA Land-Specific Hunting Seasons — 2025-2026
 *
 * Sources:
 *   Virginia DWR Hunting & Trapping in Virginia 2025-2026 Digest
 *   https://dwr.virginia.gov/hunting/regulations/
 *
 * IMPORTANT: Verify against official VDWR sources each season — regulations change annually.
 * Quota hunt applications: https://dwr.virginia.gov/hunting/quota-hunts/
 *
 * Zone definitions:
 *   East of Blue Ridge — General Firearms: Nov 15, 2025 – Jan 3, 2026
 *   West of Blue Ridge — General Firearms: Nov 15 – Dec 13, 2025 (standard)
 *                        Extended counties:  Nov 15, 2025 – Jan 3, 2026
 *   Extended western counties: Amherst (W of Rt. 29), Bedford, Carroll, Floyd, Franklin,
 *     Montgomery, Nelson (W of Rt. 151), Page, Pulaski, Roanoke, Rockingham (E of Rts. 613/731),
 *     Shenandoah, Warren, Wythe
 *
 * Coastal exception (Chesapeake, Suffolk, VA Beach): General Firearms Oct 1 – Nov 30, 2025
 * National Forest (GW/Jefferson): $23 NF Hunting Permit required; 1 deer/day limit on NF lands west
 */

import type { HuntingSeason } from '@/lib/types';

export const VA_LAND_SEASONS: HuntingSeason[] = [

  // ============================================================
  // EAST OF BLUE RIDGE WMAs
  // Deer zones: Early Archery Oct 4–Nov 14 | Early ML Nov 8–14
  //             General Firearms Nov 15–Jan 3 | Late Archery Dec 14–Jan 3
  //             Late ML Dec 13–Jan 3
  // Turkey Spring: Youth Apr 4–5 | Phase 1 Apr 11–26 | Phase 2 Apr 27–May 16, 2026
  // ============================================================

  // --- va-wma-amelia (Amelia Co., Piedmont, East) ---
  // Note: Expanded either-sex firearms days; quota spring turkey #402
  { id: "va-wma-amelia-deer-archery-early", state: "VA", land_id: "va-wma-amelia", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east of Blue Ridge zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-amelia-deer-muzzleloader-early", state: "VA", land_id: "va-wma-amelia", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east of Blue Ridge", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-amelia-deer-firearms", state: "VA", land_id: "va-wma-amelia", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; expanded either-sex days apply; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-amelia-deer-archery-late", state: "VA", land_id: "va-wma-amelia", species: "Deer", weapon_type: "Archery", start_date: "2025-12-14", end_date: "2026-01-03", quota_required: false, notes: "Late archery season; east zone", tags: ["deer", "archery", "late", "east-zone"] },
  { id: "va-wma-amelia-deer-muzzleloader-late", state: "VA", land_id: "va-wma-amelia", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-amelia-turkey-youth", state: "VA", land_id: "va-wma-amelia", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth/Apprentice only", tags: ["turkey", "spring", "youth"] },
  { id: "va-wma-amelia-turkey-spring-quota", state: "VA", land_id: "va-wma-amelia", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: true, notes: "Quota hunt #402; bearded only; Phase 1 (Apr 11–26) sunrise–noon, Phase 2 (Apr 27–May 16) sunrise–sunset; annual limit 1 spring bearded (3 total)", tags: ["turkey", "spring", "quota"] },

  // --- va-wma-big-woods (East zone) ---
  { id: "va-wma-big-woods-deer-archery-early", state: "VA", land_id: "va-wma-big-woods", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east of Blue Ridge zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-big-woods-deer-muzzleloader-early", state: "VA", land_id: "va-wma-big-woods", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east zone", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-big-woods-deer-firearms", state: "VA", land_id: "va-wma-big-woods", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-big-woods-deer-muzzleloader-late", state: "VA", land_id: "va-wma-big-woods", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-big-woods-turkey-spring", state: "VA", land_id: "va-wma-big-woods", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 (Apr 11–26) sunrise–noon; Phase 2 (Apr 27–May 16) sunrise–sunset; bearded only", tags: ["turkey", "spring"] },
  { id: "va-wma-big-woods-small-game", state: "VA", land_id: "va-wma-big-woods", species: "Squirrel", weapon_type: "Rifle/Shotgun", start_date: "2025-09-06", end_date: "2026-02-28", quota_required: false, notes: "Small game season; rabbit Nov 1–Feb 28", tags: ["small-game", "squirrel", "rabbit"] },

  // --- va-wma-briery-creek (East zone) ---
  { id: "va-wma-briery-creek-deer-archery-early", state: "VA", land_id: "va-wma-briery-creek", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-briery-creek-deer-muzzleloader-early", state: "VA", land_id: "va-wma-briery-creek", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-briery-creek-deer-firearms", state: "VA", land_id: "va-wma-briery-creek", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-briery-creek-turkey-spring", state: "VA", land_id: "va-wma-briery-creek", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-cf-phelps (East zone) ---
  { id: "va-wma-cf-phelps-deer-archery-early", state: "VA", land_id: "va-wma-cf-phelps", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-cf-phelps-deer-muzzleloader-early", state: "VA", land_id: "va-wma-cf-phelps", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-cf-phelps-deer-firearms", state: "VA", land_id: "va-wma-cf-phelps", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-cf-phelps-turkey-spring", state: "VA", land_id: "va-wma-cf-phelps", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-cavalier (East zone) ---
  { id: "va-wma-cavalier-deer-archery-early", state: "VA", land_id: "va-wma-cavalier", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-cavalier-deer-muzzleloader-early", state: "VA", land_id: "va-wma-cavalier", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-cavalier-deer-firearms", state: "VA", land_id: "va-wma-cavalier", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-cavalier-turkey-spring", state: "VA", land_id: "va-wma-cavalier", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-chickahominy (East zone — quota antlerless deer #220) ---
  { id: "va-wma-chickahominy-deer-archery-early", state: "VA", land_id: "va-wma-chickahominy", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-chickahominy-deer-muzzleloader-early", state: "VA", land_id: "va-wma-chickahominy", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-chickahominy-deer-firearms", state: "VA", land_id: "va-wma-chickahominy", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-chickahominy-deer-antlerless-quota", state: "VA", land_id: "va-wma-chickahominy", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: true, notes: "Quota antlerless deer hunt #220; apply through VDWR quota hunt portal", tags: ["deer", "rifle", "quota", "antlerless", "east-zone"] },
  { id: "va-wma-chickahominy-turkey-spring", state: "VA", land_id: "va-wma-chickahominy", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },
  { id: "va-wma-chickahominy-waterfowl-ducks", state: "VA", land_id: "va-wma-chickahominy", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-10-11", end_date: "2026-01-31", quota_required: false, notes: "Teal/early Oct 11–14; main season Nov 15–30, Dec 13–Jan 31; check WMA-specific day restrictions", tags: ["waterfowl", "ducks", "east-zone"] },

  // --- va-wma-dick-cross (West zone — waterfowl quota #106) ---
  { id: "va-wma-dick-cross-deer-archery-early", state: "VA", land_id: "va-wma-dick-cross", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-dick-cross-deer-muzzleloader-early", state: "VA", land_id: "va-wma-dick-cross", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone (Nov 1–14)", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-dick-cross-deer-firearms", state: "VA", land_id: "va-wma-dick-cross", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-dick-cross-deer-muzzleloader-late", state: "VA", land_id: "va-wma-dick-cross", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-dick-cross-turkey-spring", state: "VA", land_id: "va-wma-dick-cross", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },
  { id: "va-wma-dick-cross-waterfowl-quota", state: "VA", land_id: "va-wma-dick-cross", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt #106; apply through VDWR; main season Nov 15–30, Dec 13–Jan 31", tags: ["waterfowl", "ducks", "quota", "west-zone"] },

  // --- va-wma-doe-creek (West zone) ---
  { id: "va-wma-doe-creek-deer-archery-early", state: "VA", land_id: "va-wma-doe-creek", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-doe-creek-deer-muzzleloader-early", state: "VA", land_id: "va-wma-doe-creek", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone (Nov 1–14)", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-doe-creek-deer-firearms", state: "VA", land_id: "va-wma-doe-creek", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-doe-creek-deer-muzzleloader-late", state: "VA", land_id: "va-wma-doe-creek", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-doe-creek-turkey-spring", state: "VA", land_id: "va-wma-doe-creek", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-featherfin (Piedmont, East zone — quota spring turkey #401) ---
  { id: "va-wma-featherfin-deer-archery-early", state: "VA", land_id: "va-wma-featherfin", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-featherfin-deer-muzzleloader-early", state: "VA", land_id: "va-wma-featherfin", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-featherfin-deer-firearms", state: "VA", land_id: "va-wma-featherfin", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-featherfin-turkey-youth", state: "VA", land_id: "va-wma-featherfin", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth/Apprentice only", tags: ["turkey", "spring", "youth"] },
  { id: "va-wma-featherfin-turkey-spring-quota", state: "VA", land_id: "va-wma-featherfin", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: true, notes: "Quota hunt #401; bearded only; Phase 1 (Apr 11–26) sunrise–noon, Phase 2 (Apr 27–May 16) sunrise–sunset", tags: ["turkey", "spring", "quota"] },

  // --- va-wma-g-richard-thompson (Fauquier/Clarke/Warren Co., West zone — Warren = extended county) ---
  // Warren County is an extended-season county (west zone, but firearms through Jan 3)
  { id: "va-wma-g-richard-thompson-deer-archery-early", state: "VA", land_id: "va-wma-g-richard-thompson", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west of Blue Ridge zone (Warren Co. = extended county)", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-g-richard-thompson-deer-muzzleloader-early", state: "VA", land_id: "va-wma-g-richard-thompson", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone (Nov 1–14)", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-g-richard-thompson-deer-firearms", state: "VA", land_id: "va-wma-g-richard-thompson", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "EXTENDED season through Jan 3; Warren Co. is an extended county (west zone); good turkey area", tags: ["deer", "rifle", "west-zone", "extended-county"] },
  { id: "va-wma-g-richard-thompson-deer-muzzleloader-late", state: "VA", land_id: "va-wma-g-richard-thompson", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone (extended county)", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-g-richard-thompson-turkey-spring", state: "VA", land_id: "va-wma-g-richard-thompson", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Good turkey hunting; Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-game-farm-marsh (West zone — Waterfowl quota #113) ---
  { id: "va-wma-game-farm-marsh-deer-archery-early", state: "VA", land_id: "va-wma-game-farm-marsh", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-game-farm-marsh-deer-muzzleloader-early", state: "VA", land_id: "va-wma-game-farm-marsh", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone (Nov 1–14)", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-game-farm-marsh-deer-firearms", state: "VA", land_id: "va-wma-game-farm-marsh", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-game-farm-marsh-deer-muzzleloader-late", state: "VA", land_id: "va-wma-game-farm-marsh", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-game-farm-marsh-waterfowl-quota", state: "VA", land_id: "va-wma-game-farm-marsh", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt #113; apply through VDWR; main season Nov 15–30, Dec 13–Jan 31", tags: ["waterfowl", "ducks", "quota", "west-zone"] },
  { id: "va-wma-game-farm-marsh-geese", state: "VA", land_id: "va-wma-game-farm-marsh", species: "Canada Geese", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-02-15", quota_required: false, notes: "Canada Geese: Nov 15–Feb 15; limit 1/day", bag_limit: "1/day", tags: ["waterfowl", "geese", "west-zone"] },

  // --- va-wma-hardware-river (East zone) ---
  { id: "va-wma-hardware-river-deer-archery-early", state: "VA", land_id: "va-wma-hardware-river", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-hardware-river-deer-muzzleloader-early", state: "VA", land_id: "va-wma-hardware-river", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-hardware-river-deer-firearms", state: "VA", land_id: "va-wma-hardware-river", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-hardware-river-turkey-spring", state: "VA", land_id: "va-wma-hardware-river", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-hog-island (Coastal, East zone — DEER/TURKEY QUOTA CANCELLED 2025-2026) ---
  // Dominion Energy security change: deer and turkey quota hunts CANCELLED this season
  // Waterfowl quota hunts remain (#101, 8 hunters/day)
  { id: "va-wma-hog-island-deer-archery-early", state: "VA", land_id: "va-wma-hog-island", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone; NOTE: 2025-2026 quota hunts for deer and turkey CANCELLED (Dominion Energy security change) — verify current access status with VDWR", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-hog-island-deer-firearms", state: "VA", land_id: "va-wma-hog-island", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone; deer/turkey quota hunts CANCELLED 2025-2026 due to Dominion Energy security change", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-hog-island-waterfowl-quota", state: "VA", land_id: "va-wma-hog-island", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: true, notes: "Waterfowl quota hunt #101; 8 hunters/day; apply through VDWR; waterfowl quota hunts remain active despite deer/turkey cancellation", tags: ["waterfowl", "ducks", "quota", "east-zone"] },
  { id: "va-wma-hog-island-geese", state: "VA", land_id: "va-wma-hog-island", species: "Canada Geese", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-02-15", quota_required: false, notes: "Canada Geese Nov 15–Feb 15; limit 1/day; verify current access", bag_limit: "1/day", tags: ["waterfowl", "geese", "east-zone"] },

  // --- va-wma-horsepen-lake (East zone) ---
  { id: "va-wma-horsepen-lake-deer-archery-early", state: "VA", land_id: "va-wma-horsepen-lake", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-horsepen-lake-deer-muzzleloader-early", state: "VA", land_id: "va-wma-horsepen-lake", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-horsepen-lake-deer-firearms", state: "VA", land_id: "va-wma-horsepen-lake", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-horsepen-lake-turkey-spring", state: "VA", land_id: "va-wma-horsepen-lake", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-james-river (Nelson Co., East zone — waterfowl: opening day, Wed, Sat only) ---
  // Note: Nelson County is NOT an extended firearms county for deer
  { id: "va-wma-james-river-deer-archery-early", state: "VA", land_id: "va-wma-james-river", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone (Nelson Co. E of Rt. 151 = east zone)", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-james-river-deer-muzzleloader-early", state: "VA", land_id: "va-wma-james-river", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-james-river-deer-firearms", state: "VA", land_id: "va-wma-james-river", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-james-river-waterfowl-ducks", state: "VA", land_id: "va-wma-james-river", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: false, notes: "RESTRICTED DAYS ONLY: opening day, Wednesdays, and Saturdays of regular season (Nov 15–30, Dec 13–Jan 31)", tags: ["waterfowl", "ducks", "restricted-days", "east-zone"] },
  { id: "va-wma-james-river-turkey-spring", state: "VA", land_id: "va-wma-james-river", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-lands-end (East zone — quota archery deer #222; quota spring turkey #416) ---
  { id: "va-wma-lands-end-deer-archery-quota", state: "VA", land_id: "va-wma-lands-end", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: true, notes: "Quota archery deer hunt #222; east zone; either-sex", tags: ["deer", "archery", "quota", "east-zone"] },
  { id: "va-wma-lands-end-deer-muzzleloader-early", state: "VA", land_id: "va-wma-lands-end", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-lands-end-deer-firearms", state: "VA", land_id: "va-wma-lands-end", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-lands-end-turkey-spring-quota", state: "VA", land_id: "va-wma-lands-end", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: true, notes: "Quota spring turkey #416; bearded only; Phase 1 (Apr 11–26) sunrise–noon, Phase 2 (Apr 27–May 16) sunrise–sunset", tags: ["turkey", "spring", "quota"] },

  // --- va-wma-mattaponi (East zone) ---
  { id: "va-wma-mattaponi-deer-archery-early", state: "VA", land_id: "va-wma-mattaponi", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-mattaponi-deer-muzzleloader-early", state: "VA", land_id: "va-wma-mattaponi", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-mattaponi-deer-firearms", state: "VA", land_id: "va-wma-mattaponi", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-mattaponi-turkey-spring", state: "VA", land_id: "va-wma-mattaponi", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-mattaponi-bluffs (Caroline Co., East zone — quota spring turkey #413) ---
  { id: "va-wma-mattaponi-bluffs-deer-archery-early", state: "VA", land_id: "va-wma-mattaponi-bluffs", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-mattaponi-bluffs-deer-muzzleloader-early", state: "VA", land_id: "va-wma-mattaponi-bluffs", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-mattaponi-bluffs-deer-firearms", state: "VA", land_id: "va-wma-mattaponi-bluffs", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-mattaponi-bluffs-turkey-spring-quota", state: "VA", land_id: "va-wma-mattaponi-bluffs", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: true, notes: "Quota spring turkey #413; Caroline Co.; bearded only; Phase 1 (Apr 11–26) sunrise–noon, Phase 2 (Apr 27–May 16) sunrise–sunset", tags: ["turkey", "spring", "quota"] },

  // --- va-wma-merrimac-farm (Prince William Co., East zone — quota spring turkey #404) ---
  { id: "va-wma-merrimac-farm-deer-archery-early", state: "VA", land_id: "va-wma-merrimac-farm", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-merrimac-farm-deer-muzzleloader-early", state: "VA", land_id: "va-wma-merrimac-farm", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-merrimac-farm-deer-firearms", state: "VA", land_id: "va-wma-merrimac-farm", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-merrimac-farm-turkey-spring-quota", state: "VA", land_id: "va-wma-merrimac-farm", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: true, notes: "Quota spring turkey #404; Prince William Co.; bearded only; Phase 1 (Apr 11–26) sunrise–noon, Phase 2 (Apr 27–May 16) sunrise–sunset", tags: ["turkey", "spring", "quota"] },

  // --- va-wma-mockhorn-island (Coastal, East zone — quota muzzleloader deer #204) ---
  { id: "va-wma-mockhorn-island-deer-archery-early", state: "VA", land_id: "va-wma-mockhorn-island", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; coastal east zone", tags: ["deer", "archery", "east-zone", "coastal"] },
  { id: "va-wma-mockhorn-island-deer-muzzleloader-quota", state: "VA", land_id: "va-wma-mockhorn-island", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: true, notes: "Quota muzzleloader deer hunt #204; apply through VDWR", tags: ["deer", "muzzleloader", "quota", "east-zone", "coastal"] },
  { id: "va-wma-mockhorn-island-deer-firearms", state: "VA", land_id: "va-wma-mockhorn-island", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; coastal east zone", tags: ["deer", "rifle", "east-zone", "coastal"] },
  { id: "va-wma-mockhorn-island-waterfowl-ducks", state: "VA", land_id: "va-wma-mockhorn-island", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: false, notes: "Main duck season Nov 15–30, Dec 13–Jan 31; coastal location", tags: ["waterfowl", "ducks", "coastal", "east-zone"] },

  // --- va-wma-oakley-forest (East zone) ---
  { id: "va-wma-oakley-forest-deer-archery-early", state: "VA", land_id: "va-wma-oakley-forest", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-oakley-forest-deer-muzzleloader-early", state: "VA", land_id: "va-wma-oakley-forest", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-oakley-forest-deer-firearms", state: "VA", land_id: "va-wma-oakley-forest", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-oakley-forest-turkey-spring", state: "VA", land_id: "va-wma-oakley-forest", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-pettigrew (East zone) ---
  { id: "va-wma-pettigrew-deer-archery-early", state: "VA", land_id: "va-wma-pettigrew", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-pettigrew-deer-muzzleloader-early", state: "VA", land_id: "va-wma-pettigrew", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-pettigrew-deer-firearms", state: "VA", land_id: "va-wma-pettigrew", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-pettigrew-turkey-spring", state: "VA", land_id: "va-wma-pettigrew", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-powhatan (East zone) ---
  { id: "va-wma-powhatan-deer-archery-early", state: "VA", land_id: "va-wma-powhatan", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-powhatan-deer-muzzleloader-early", state: "VA", land_id: "va-wma-powhatan", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-powhatan-deer-firearms", state: "VA", land_id: "va-wma-powhatan", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-powhatan-turkey-spring", state: "VA", land_id: "va-wma-powhatan", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-princess-anne (Virginia Beach, Coastal — major waterfowl quota site) ---
  // Coastal exception: general firearms Oct 1–Nov 30
  // Quota hunts: #102 (4 hunters/day), #107 floating blind stakes, #112 early geese/teal, #205 archery deer
  { id: "va-wma-princess-anne-deer-archery-quota", state: "VA", land_id: "va-wma-princess-anne", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: true, notes: "Quota archery deer #205; Virginia Beach coastal area; apply through VDWR", tags: ["deer", "archery", "quota", "coastal", "east-zone"] },
  { id: "va-wma-princess-anne-deer-firearms-coastal", state: "VA", land_id: "va-wma-princess-anne", species: "Deer", weapon_type: "Rifle", start_date: "2025-10-01", end_date: "2025-11-30", quota_required: false, notes: "Coastal exception: general firearms Oct 1–Nov 30; Virginia Beach (Chesapeake/Suffolk/VA Beach zone)", tags: ["deer", "rifle", "coastal", "east-zone"] },
  { id: "va-wma-princess-anne-waterfowl-quota", state: "VA", land_id: "va-wma-princess-anne", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-10-11", end_date: "2026-01-31", quota_required: true, notes: "Major waterfowl quota site: #102 (4 hunters/day), #107 floating blind stakes; early teal/geese quota #112; apply through VDWR", tags: ["waterfowl", "ducks", "quota", "coastal", "east-zone"] },
  { id: "va-wma-princess-anne-geese", state: "VA", land_id: "va-wma-princess-anne", species: "Canada Geese", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-02-15", quota_required: false, notes: "Canada Geese Nov 15–Feb 15; limit 1/day; check quota requirements for specific areas", bag_limit: "1/day", tags: ["waterfowl", "geese", "coastal", "east-zone"] },

  // --- va-wma-ragged-island (Coastal, East zone) ---
  { id: "va-wma-ragged-island-deer-archery-early", state: "VA", land_id: "va-wma-ragged-island", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; coastal east zone", tags: ["deer", "archery", "east-zone", "coastal"] },
  { id: "va-wma-ragged-island-deer-firearms", state: "VA", land_id: "va-wma-ragged-island", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; coastal east zone", tags: ["deer", "rifle", "east-zone", "coastal"] },
  { id: "va-wma-ragged-island-waterfowl-ducks", state: "VA", land_id: "va-wma-ragged-island", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: false, notes: "Main duck season Nov 15–30, Dec 13–Jan 31; coastal location", tags: ["waterfowl", "ducks", "coastal", "east-zone"] },
  { id: "va-wma-ragged-island-geese", state: "VA", land_id: "va-wma-ragged-island", species: "Canada Geese", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-02-15", quota_required: false, notes: "Canada Geese Nov 15–Feb 15; limit 1/day", bag_limit: "1/day", tags: ["waterfowl", "geese", "coastal", "east-zone"] },

  // --- va-wma-rapidan (Madison/Greene, East zone — standard; neither is extended county) ---
  { id: "va-wma-rapidan-deer-archery-early", state: "VA", land_id: "va-wma-rapidan", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone (Madison and Greene Co. — standard east zone, not extended)", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-rapidan-deer-muzzleloader-early", state: "VA", land_id: "va-wma-rapidan", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-rapidan-deer-firearms", state: "VA", land_id: "va-wma-rapidan", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-rapidan-turkey-spring", state: "VA", land_id: "va-wma-rapidan", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // --- va-wma-robert-w-duncan (East zone — waterfowl restricted days only) ---
  // Waterfowl: ONLY Oct 10–13 (opener), Youth/Veteran Days (Oct 25, Feb 7), plus Thursdays and Sundays
  { id: "va-wma-robert-w-duncan-deer-archery-early", state: "VA", land_id: "va-wma-robert-w-duncan", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-robert-w-duncan-deer-muzzleloader-early", state: "VA", land_id: "va-wma-robert-w-duncan", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-robert-w-duncan-deer-firearms", state: "VA", land_id: "va-wma-robert-w-duncan", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-robert-w-duncan-waterfowl-ducks", state: "VA", land_id: "va-wma-robert-w-duncan", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-10-10", end_date: "2026-01-31", quota_required: false, notes: "RESTRICTED DAYS ONLY: Oct 10–13 (teal/early opener), Youth Day (Oct 25), Veteran Day (Feb 7 if applicable), then Thursdays and Sundays of regular season only (Nov 15–30, Dec 13–Jan 31)", tags: ["waterfowl", "ducks", "restricted-days", "east-zone"] },

  // --- va-wma-saxis (Accomack Co., Coastal/Eastern Shore, East zone) ---
  { id: "va-wma-saxis-deer-archery-early", state: "VA", land_id: "va-wma-saxis", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; coastal east zone", tags: ["deer", "archery", "east-zone", "coastal"] },
  { id: "va-wma-saxis-deer-firearms", state: "VA", land_id: "va-wma-saxis", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; coastal east zone", tags: ["deer", "rifle", "east-zone", "coastal"] },
  { id: "va-wma-saxis-waterfowl-ducks", state: "VA", land_id: "va-wma-saxis", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-10-11", end_date: "2026-01-31", quota_required: false, notes: "Excellent waterfowl; early Oct 11–14; main Nov 15–30, Dec 13–Jan 31", tags: ["waterfowl", "ducks", "coastal", "east-zone"] },
  { id: "va-wma-saxis-geese", state: "VA", land_id: "va-wma-saxis", species: "Canada Geese", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-02-15", quota_required: false, notes: "Canada Geese Nov 15–Feb 15; limit 1/day", bag_limit: "1/day", tags: ["waterfowl", "geese", "coastal", "east-zone"] },

  // --- va-wma-tye-river (West zone) ---
  { id: "va-wma-tye-river-deer-archery-early", state: "VA", land_id: "va-wma-tye-river", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-tye-river-deer-muzzleloader-early", state: "VA", land_id: "va-wma-tye-river", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone (Nov 1–14)", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-tye-river-deer-firearms", state: "VA", land_id: "va-wma-tye-river", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-tye-river-deer-muzzleloader-late", state: "VA", land_id: "va-wma-tye-river", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-tye-river-turkey-spring", state: "VA", land_id: "va-wma-tye-river", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-ware-creek (New Kent Co., East zone — waterfowl Tue/Thu/Sat only; quota spring turkey #409) ---
  { id: "va-wma-ware-creek-deer-archery-early", state: "VA", land_id: "va-wma-ware-creek", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-ware-creek-deer-muzzleloader-early", state: "VA", land_id: "va-wma-ware-creek", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-ware-creek-deer-firearms", state: "VA", land_id: "va-wma-ware-creek", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-ware-creek-waterfowl-ducks", state: "VA", land_id: "va-wma-ware-creek", species: "Ducks", weapon_type: "Shotgun", start_date: "2025-11-15", end_date: "2026-01-31", quota_required: false, notes: "RESTRICTED DAYS ONLY: Tuesdays, Thursdays, and Saturdays of regular season (Nov 15–30, Dec 13–Jan 31)", tags: ["waterfowl", "ducks", "restricted-days", "east-zone"] },
  { id: "va-wma-ware-creek-turkey-spring-quota", state: "VA", land_id: "va-wma-ware-creek", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: true, notes: "Quota spring turkey #409; New Kent Co.; bearded only; Phase 1 (Apr 11–26) sunrise–noon, Phase 2 (Apr 27–May 16) sunrise–sunset", tags: ["turkey", "spring", "quota"] },

  // --- va-wma-weston (East zone) ---
  { id: "va-wma-weston-deer-archery-early", state: "VA", land_id: "va-wma-weston", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-weston-deer-muzzleloader-early", state: "VA", land_id: "va-wma-weston", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-weston-deer-firearms", state: "VA", land_id: "va-wma-weston", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-weston-turkey-spring", state: "VA", land_id: "va-wma-weston", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring"] },

  // ============================================================
  // WEST OF BLUE RIDGE WMAs
  // Deer zones: Early Archery Oct 4–Nov 14 | Early ML Nov 1–14
  //             General Firearms Nov 15–Dec 13, 2025 (standard)
  //             Extended county WMAs: Nov 15, 2025–Jan 3, 2026
  //             Late ML: Dec 13–Jan 3, 2026
  // Turkey Spring: Youth Apr 4–5 | Phase 1 Apr 11–26 | Phase 2 Apr 27–May 16, 2026
  // Quail CLOSED on all public lands west of Blue Ridge
  // West WMAs: clinch-mountain, crooked-creek, dick-cross, doe-creek, fairystone-farms,
  //   g-richard-thompson, game-farm-marsh, goshen-little-north-mountain, hidden-valley,
  //   highland, stewarts-creek, tye-river, white-oak-mountain, gathright
  // ============================================================

  // --- va-wma-big-survey (East zone — placed here alphabetically; see East section above) ---
  { id: "va-wma-big-survey-deer-archery-early", state: "VA", land_id: "va-wma-big-survey", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east of Blue Ridge zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-big-survey-deer-muzzleloader-early", state: "VA", land_id: "va-wma-big-survey", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east zone (Nov 8–14)", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-big-survey-deer-firearms", state: "VA", land_id: "va-wma-big-survey", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone (Nov 15–Jan 3)", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-big-survey-deer-archery-late", state: "VA", land_id: "va-wma-big-survey", species: "Deer", weapon_type: "Archery", start_date: "2025-12-14", end_date: "2026-01-03", quota_required: false, notes: "Late archery; east zone", tags: ["deer", "archery", "late", "east-zone"] },
  { id: "va-wma-big-survey-deer-muzzleloader-late", state: "VA", land_id: "va-wma-big-survey", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-big-survey-turkey-spring", state: "VA", land_id: "va-wma-big-survey", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "east-zone"] },

  // --- va-wma-clinch-mountain (SW VA, West zone — grouse, turkey, deer) ---
  { id: "va-wma-clinch-mountain-deer-archery-early", state: "VA", land_id: "va-wma-clinch-mountain", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone; SW Virginia", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-clinch-mountain-deer-muzzleloader-early", state: "VA", land_id: "va-wma-clinch-mountain", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-clinch-mountain-deer-firearms", state: "VA", land_id: "va-wma-clinch-mountain", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-clinch-mountain-turkey-spring", state: "VA", land_id: "va-wma-clinch-mountain", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Excellent turkey habitat; Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },
  { id: "va-wma-clinch-mountain-grouse", state: "VA", land_id: "va-wma-clinch-mountain", species: "Grouse", weapon_type: "Shotgun", start_date: "2025-10-25", end_date: "2026-01-31", quota_required: false, notes: "Ruffed grouse season Oct 25–Jan 31; SW VA highlands", tags: ["small-game", "grouse", "west-zone"] },

  // --- va-wma-crooked-creek (West zone) ---
  { id: "va-wma-crooked-creek-deer-archery-early", state: "VA", land_id: "va-wma-crooked-creek", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-crooked-creek-deer-muzzleloader-early", state: "VA", land_id: "va-wma-crooked-creek", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-crooked-creek-deer-firearms", state: "VA", land_id: "va-wma-crooked-creek", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-crooked-creek-turkey-spring", state: "VA", land_id: "va-wma-crooked-creek", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-fairystone-farms (West zone) ---
  { id: "va-wma-fairystone-farms-deer-archery-early", state: "VA", land_id: "va-wma-fairystone-farms", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-fairystone-farms-deer-muzzleloader-early", state: "VA", land_id: "va-wma-fairystone-farms", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-fairystone-farms-deer-firearms", state: "VA", land_id: "va-wma-fairystone-farms", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-fairystone-farms-turkey-spring", state: "VA", land_id: "va-wma-fairystone-farms", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-gathright (Bath Co., West zone — 9,000+ acres; deer/turkey/bear) ---
  { id: "va-wma-gathright-deer-archery-early", state: "VA", land_id: "va-wma-gathright", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone; Bath Co., 9,000+ acres", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-gathright-deer-muzzleloader-early", state: "VA", land_id: "va-wma-gathright", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone (Nov 1–14)", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-gathright-deer-firearms", state: "VA", land_id: "va-wma-gathright", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13); Bath Co.", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-gathright-deer-muzzleloader-late", state: "VA", land_id: "va-wma-gathright", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-gathright-turkey-spring", state: "VA", land_id: "va-wma-gathright", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },
  { id: "va-wma-gathright-bear", state: "VA", land_id: "va-wma-gathright", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "Bear season concurrent with general firearms; check VDWR western bear zone regulations", tags: ["bear", "west-zone"] },

  // --- va-wma-goshen-little-north-mountain (Rockbridge/Augusta Co., West zone — 33,000+ acres; bear) ---
  { id: "va-wma-goshen-little-north-mountain-deer-archery-early", state: "VA", land_id: "va-wma-goshen-little-north-mountain", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone; 33,000+ acres; Rockbridge/Augusta Co.", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-goshen-little-north-mountain-deer-muzzleloader-early", state: "VA", land_id: "va-wma-goshen-little-north-mountain", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-goshen-little-north-mountain-deer-firearms", state: "VA", land_id: "va-wma-goshen-little-north-mountain", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13)", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-goshen-little-north-mountain-deer-muzzleloader-late", state: "VA", land_id: "va-wma-goshen-little-north-mountain", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-goshen-little-north-mountain-turkey-spring", state: "VA", land_id: "va-wma-goshen-little-north-mountain", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },
  { id: "va-wma-goshen-little-north-mountain-bear", state: "VA", land_id: "va-wma-goshen-little-north-mountain", species: "Bear", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "Bear season in western bear zone; check VDWR regulations for specific unit rules", tags: ["bear", "west-zone"] },

  // --- va-wma-havens (East zone) ---
  { id: "va-wma-havens-deer-archery-early", state: "VA", land_id: "va-wma-havens", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-havens-deer-muzzleloader-early", state: "VA", land_id: "va-wma-havens", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east zone (Nov 8–14)", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-havens-deer-firearms", state: "VA", land_id: "va-wma-havens", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone (Nov 15–Jan 3)", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-havens-deer-archery-late", state: "VA", land_id: "va-wma-havens", species: "Deer", weapon_type: "Archery", start_date: "2025-12-14", end_date: "2026-01-03", quota_required: false, notes: "Late archery; east zone", tags: ["deer", "archery", "late", "east-zone"] },
  { id: "va-wma-havens-deer-muzzleloader-late", state: "VA", land_id: "va-wma-havens", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-havens-turkey-spring", state: "VA", land_id: "va-wma-havens", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "east-zone"] },

  // --- va-wma-hidden-valley (West zone) ---
  { id: "va-wma-hidden-valley-deer-archery-early", state: "VA", land_id: "va-wma-hidden-valley", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-hidden-valley-deer-muzzleloader-early", state: "VA", land_id: "va-wma-hidden-valley", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-hidden-valley-deer-firearms", state: "VA", land_id: "va-wma-hidden-valley", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-hidden-valley-turkey-spring", state: "VA", land_id: "va-wma-hidden-valley", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-highland (Highland Co., West zone — expanded either-sex; ELK quota hunts) ---
  // Note: Elk are managed separately from deer — quota hunts, different application process
  { id: "va-wma-highland-deer-archery-early", state: "VA", land_id: "va-wma-highland", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone; Highland Co.; expanded either-sex days apply", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-highland-deer-muzzleloader-early", state: "VA", land_id: "va-wma-highland", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-highland-deer-firearms", state: "VA", land_id: "va-wma-highland", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13); expanded either-sex days apply", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-highland-deer-muzzleloader-late", state: "VA", land_id: "va-wma-highland", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-highland-elk-quota", state: "VA", land_id: "va-wma-highland", species: "Elk", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: true, notes: "ELK QUOTA HUNTS ONLY — completely separate from deer license/tags; apply through VDWR elk quota system; Highland Co. is part of VA elk restoration zone", tags: ["elk", "quota", "west-zone"] },
  { id: "va-wma-highland-turkey-spring", state: "VA", land_id: "va-wma-highland", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-short-hills (East zone) ---
  { id: "va-wma-short-hills-deer-archery-early", state: "VA", land_id: "va-wma-short-hills", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-short-hills-deer-muzzleloader-early", state: "VA", land_id: "va-wma-short-hills", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east zone (Nov 8–14)", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-short-hills-deer-firearms", state: "VA", land_id: "va-wma-short-hills", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone (Nov 15–Jan 3)", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-short-hills-deer-archery-late", state: "VA", land_id: "va-wma-short-hills", species: "Deer", weapon_type: "Archery", start_date: "2025-12-14", end_date: "2026-01-03", quota_required: false, notes: "Late archery; east zone", tags: ["deer", "archery", "late", "east-zone"] },
  { id: "va-wma-short-hills-deer-muzzleloader-late", state: "VA", land_id: "va-wma-short-hills", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-short-hills-turkey-spring", state: "VA", land_id: "va-wma-short-hills", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "east-zone"] },

  // --- va-wma-smith-mountain-coop (East zone) ---
  { id: "va-wma-smith-mountain-coop-deer-archery-early", state: "VA", land_id: "va-wma-smith-mountain-coop", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone", tags: ["deer", "archery", "east-zone"] },
  { id: "va-wma-smith-mountain-coop-deer-muzzleloader-early", state: "VA", land_id: "va-wma-smith-mountain-coop", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east zone (Nov 8–14)", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-smith-mountain-coop-deer-firearms", state: "VA", land_id: "va-wma-smith-mountain-coop", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "General firearms; east zone (Nov 15–Jan 3)", tags: ["deer", "rifle", "east-zone"] },
  { id: "va-wma-smith-mountain-coop-deer-archery-late", state: "VA", land_id: "va-wma-smith-mountain-coop", species: "Deer", weapon_type: "Archery", start_date: "2025-12-14", end_date: "2026-01-03", quota_required: false, notes: "Late archery; east zone", tags: ["deer", "archery", "late", "east-zone"] },
  { id: "va-wma-smith-mountain-coop-deer-muzzleloader-late", state: "VA", land_id: "va-wma-smith-mountain-coop", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-smith-mountain-coop-turkey-spring", state: "VA", land_id: "va-wma-smith-mountain-coop", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "east-zone"] },

  // --- va-wma-stewarts-creek (West zone) ---
  { id: "va-wma-stewarts-creek-deer-archery-early", state: "VA", land_id: "va-wma-stewarts-creek", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-stewarts-creek-deer-muzzleloader-early", state: "VA", land_id: "va-wma-stewarts-creek", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-stewarts-creek-deer-firearms", state: "VA", land_id: "va-wma-stewarts-creek", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-stewarts-creek-turkey-spring", state: "VA", land_id: "va-wma-stewarts-creek", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

  // --- va-wma-turkeycock (Franklin/Henry Co., East zone — EXTENDED firearms Nov 15–Jan 3; expanded either-sex) ---
  // Franklin Co. is an extended firearms county; east of Blue Ridge assignment per VDWR zone
  { id: "va-wma-turkeycock-deer-archery-early", state: "VA", land_id: "va-wma-turkeycock", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; east zone (Franklin Co. — extended county, firearms through Jan 3)", tags: ["deer", "archery", "east-zone", "extended-county"] },
  { id: "va-wma-turkeycock-deer-muzzleloader-early", state: "VA", land_id: "va-wma-turkeycock", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-08", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; east zone (Nov 8–14)", tags: ["deer", "muzzleloader", "east-zone"] },
  { id: "va-wma-turkeycock-deer-firearms", state: "VA", land_id: "va-wma-turkeycock", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2026-01-03", quota_required: false, notes: "EXTENDED season through Jan 3 (Franklin Co. = extended county); east zone; expanded either-sex days apply; excellent turkey habitat", tags: ["deer", "rifle", "east-zone", "extended-county"] },
  { id: "va-wma-turkeycock-deer-archery-late", state: "VA", land_id: "va-wma-turkeycock", species: "Deer", weapon_type: "Archery", start_date: "2025-12-14", end_date: "2026-01-03", quota_required: false, notes: "Late archery; east zone", tags: ["deer", "archery", "late", "east-zone"] },
  { id: "va-wma-turkeycock-deer-muzzleloader-late", state: "VA", land_id: "va-wma-turkeycock", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; east zone", tags: ["deer", "muzzleloader", "late", "east-zone"] },
  { id: "va-wma-turkeycock-turkey-youth", state: "VA", land_id: "va-wma-turkeycock", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-04", end_date: "2026-04-05", quota_required: false, notes: "Youth/Apprentice only", tags: ["turkey", "spring", "youth", "east-zone"] },
  { id: "va-wma-turkeycock-turkey-spring", state: "VA", land_id: "va-wma-turkeycock", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Excellent turkey hunting; Phase 1 (Apr 11–26) sunrise–noon; Phase 2 (Apr 27–May 16) sunrise–sunset; bearded only", tags: ["turkey", "spring", "east-zone"] },

  // --- va-wma-white-oak-mountain (Pittsylvania Co., West zone — NOTE: Pittsylvania is NOT an extended county) ---
  // Despite being west-adjacent, Pittsylvania Co. is NOT on the extended firearms list
  { id: "va-wma-white-oak-mountain-deer-archery-early", state: "VA", land_id: "va-wma-white-oak-mountain", species: "Deer", weapon_type: "Archery", start_date: "2025-10-04", end_date: "2025-11-14", quota_required: false, notes: "Either-sex; west zone; Pittsylvania Co. (NOT extended — standard Dec 13 close)", tags: ["deer", "archery", "west-zone"] },
  { id: "va-wma-white-oak-mountain-deer-muzzleloader-early", state: "VA", land_id: "va-wma-white-oak-mountain", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-11-01", end_date: "2025-11-14", quota_required: false, notes: "Early muzzleloader; west zone", tags: ["deer", "muzzleloader", "west-zone"] },
  { id: "va-wma-white-oak-mountain-deer-firearms", state: "VA", land_id: "va-wma-white-oak-mountain", species: "Deer", weapon_type: "Rifle", start_date: "2025-11-15", end_date: "2025-12-13", quota_required: false, notes: "General firearms; standard west zone (Nov 15–Dec 13); Pittsylvania Co. is NOT an extended county; expanded either-sex days apply", tags: ["deer", "rifle", "west-zone"] },
  { id: "va-wma-white-oak-mountain-deer-muzzleloader-late", state: "VA", land_id: "va-wma-white-oak-mountain", species: "Deer", weapon_type: "Muzzleloader", start_date: "2025-12-13", end_date: "2026-01-03", quota_required: false, notes: "Late muzzleloader; west zone", tags: ["deer", "muzzleloader", "late", "west-zone"] },
  { id: "va-wma-white-oak-mountain-turkey-spring", state: "VA", land_id: "va-wma-white-oak-mountain", species: "Turkey", weapon_type: "Shotgun", start_date: "2026-04-11", end_date: "2026-05-16", quota_required: false, notes: "Phase 1 sunrise–noon; Phase 2 sunrise–sunset; bearded only", tags: ["turkey", "spring", "west-zone"] },

];
