import type { HuntingSeason } from '@/lib/types';

/**
 * Florida WMA/NWR/State Forest land-specific hunting seasons — 2025-2026
 * Sources: FWC MyFWC.com/Hunting, USFWS hunt plans
 *
 * Florida Deer Season Zones (approximate by location):
 *   Zone A (NW Panhandle): Archery Aug 2–Sep 5; ML Sep 6–19; Gun Sep 20–Oct 19 + Nov 22–Jan 4
 *   Zone B (NE Florida): Archery Sep 13–Oct 12; ML Oct 18–31; Gun Nov 1–Jan 18
 *   Zone C (Central): Archery Sep 13–Oct 12; ML Oct 18–31; Gun Nov 1–Jan 18
 *   Zone D (Central-East): Archery Oct 18–Nov 16; ML Nov 22–Dec 5; Gun Dec 6–Feb 22
 *   Zone E (South of SR 70): Archery Oct 25–Nov 26; ML Dec 6–12; Gun Nov 27–30 + Dec 13–Feb 22
 * Turkey: Mar 21–Apr 26 (north of SR 70); Mar 7–Apr 12 (south of SR 70)
 * All zones: FWC WMA Permit required (GoOutdoorsFlorida.com, free unless noted)
 * Skip: fl-wma-eglin-afb (military); already-covered lands in fl.ts
 */

export const FL_LAND_SEASONS: HuntingSeason[] = [

  // ─── NATIONAL FORESTS ───────────────────────────────────────────

  // Apalachicola National Forest (Liberty/Gulf/Franklin/Wakulla/Leon Co — Zone A)
  {
    id: 'fl-nf-apalachicola-deer-archery',
    state: 'FL', land_id: 'fl-nf-apalachicola',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A archery. FWC WMA Permit + USFS permit required. General archery follows through Oct.',
    tags: ['deer', 'archery', 'national-forest', 'zone-a'],
  },
  {
    id: 'fl-nf-apalachicola-deer-gun',
    state: 'FL', land_id: 'fl-nf-apalachicola',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A gun: Sep 20–Oct 19 + Nov 22–Jan 4. USFS Florida Recreation Pass or equivalent required.',
    tags: ['deer', 'rifle', 'national-forest', 'zone-a'],
  },
  {
    id: 'fl-nf-apalachicola-turkey',
    state: 'FL', land_id: 'fl-nf-apalachicola',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'North of SR 70. Spring turkey season.',
    tags: ['turkey', 'spring', 'national-forest'],
  },

  // Ocala National Forest (Marion/Lake/Putnam/Alachua/Levy — Zone B/C central)
  {
    id: 'fl-nf-ocala-deer-archery',
    state: 'FL', land_id: 'fl-nf-ocala',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone C-type archery. FWC WMA Permit + USFS pass required. One of largest contiguous tracts of longleaf pine in world.',
    tags: ['deer', 'archery', 'national-forest'],
  },
  {
    id: 'fl-nf-ocala-deer-muzzleloader',
    state: 'FL', land_id: 'fl-nf-ocala',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-10-18', end_date: '2025-10-31',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader', 'national-forest'],
  },
  {
    id: 'fl-nf-ocala-deer-gun',
    state: 'FL', land_id: 'fl-nf-ocala',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone C gun season. Check specific management unit dates at MyFWC.',
    tags: ['deer', 'rifle', 'national-forest'],
  },
  {
    id: 'fl-nf-ocala-turkey',
    state: 'FL', land_id: 'fl-nf-ocala',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'North of SR 70 spring turkey.',
    tags: ['turkey', 'spring', 'national-forest'],
  },

  // Osceola National Forest (Baker/Columbia Co — Zone D, NE FL)
  {
    id: 'fl-nf-osceola-deer-archery',
    state: 'FL', land_id: 'fl-nf-osceola',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone D archery. FWC WMA Permit required. Distinct from fl-wma-osceola WMA.',
    tags: ['deer', 'archery', 'national-forest', 'zone-d'],
  },
  {
    id: 'fl-nf-osceola-deer-muzzleloader',
    state: 'FL', land_id: 'fl-nf-osceola',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-11-22', end_date: '2025-12-05',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader', 'national-forest'],
  },
  {
    id: 'fl-nf-osceola-deer-gun',
    state: 'FL', land_id: 'fl-nf-osceola',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'national-forest'],
  },
  {
    id: 'fl-nf-osceola-turkey',
    state: 'FL', land_id: 'fl-nf-osceola',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'North of SR 70.',
    tags: ['turkey', 'spring', 'national-forest'],
  },

  // ─── NATIONAL WILDLIFE REFUGES ────────────────────────────────────

  // St. Marks NWR (Wakulla/Jefferson/Taylor Co) — quota deer + turkey + waterfowl
  {
    id: 'fl-nwr-st-marks-deer-quota',
    state: 'FL', land_id: 'fl-nwr-st-marks',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: true, bag_limit: '2/season',
    notes: 'Quota hunt via GoOutdoorsFlorida.com. Antler restriction: legal buck must have ≥3 points on one side. USFWS Refuge Special Use Permit required. Season dates approximate — verify at USFWS.',
    tags: ['deer', 'rifle', 'quota', 'nwr', 'antler-restriction'],
  },
  {
    id: 'fl-nwr-st-marks-deer-archery',
    state: 'FL', land_id: 'fl-nwr-st-marks',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: true, bag_limit: '2/season',
    notes: 'Archery quota hunt. Apply at GoOutdoorsFlorida.com. $27.50 permit fee.',
    tags: ['deer', 'archery', 'quota', 'nwr'],
  },
  {
    id: 'fl-nwr-st-marks-turkey',
    state: 'FL', land_id: 'fl-nwr-st-marks',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: true, bag_limit: '1 gobbler/season',
    notes: 'Spring turkey quota hunt. USFWS permit required.',
    tags: ['turkey', 'spring', 'quota', 'nwr'],
  },
  {
    id: 'fl-nwr-st-marks-waterfowl',
    state: 'FL', land_id: 'fl-nwr-st-marks',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-22', end_date: '2026-01-31',
    quota_required: true, bag_limit: 'Federal limits',
    notes: 'Waterfowl quota hunt on designated impoundments. USFWS permit required.',
    tags: ['waterfowl', 'quota', 'nwr'],
  },

  // Lower Suwannee NWR (Levy/Dixie Co) — ML and gun permit hunts
  {
    id: 'fl-nwr-lower-suwannee-deer-ml',
    state: 'FL', land_id: 'fl-nwr-lower-suwannee',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-10-18', end_date: '2025-10-31',
    quota_required: true, bag_limit: '2/season',
    notes: '150 ML permits available first-come at refuge office. $25/permit. Antlerless only days designated.',
    tags: ['deer', 'muzzleloader', 'quota', 'nwr'],
  },
  {
    id: 'fl-nwr-lower-suwannee-deer-gun',
    state: 'FL', land_id: 'fl-nwr-lower-suwannee',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: true, bag_limit: '2/season',
    notes: '200 gun permits available first-come at refuge office. $25/permit. Verify current year dates at USFWS.',
    tags: ['deer', 'rifle', 'quota', 'nwr'],
  },

  // Chassahowitzka NWR (Citrus/Hernando Co) — limited hunting
  {
    id: 'fl-nwr-chassahowitzka-deer-archery',
    state: 'FL', land_id: 'fl-nwr-chassahowitzka',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: true, bag_limit: '2/season',
    notes: 'Limited archery quota hunt. USFWS Special Use Permit required. Apply through refuge.',
    tags: ['deer', 'archery', 'quota', 'nwr'],
  },

  // Lake Woodruff NWR (Volusia Co) — archery deer
  {
    id: 'fl-nwr-lake-woodruff-deer-archery',
    state: 'FL', land_id: 'fl-nwr-lake-woodruff',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: true, bag_limit: '2/season',
    notes: 'Archery quota hunt on designated areas. USFWS permit required.',
    tags: ['deer', 'archery', 'quota', 'nwr'],
  },

  // Loxahatchee NWR (Palm Beach Co) — waterfowl and some deer
  {
    id: 'fl-nwr-loxahatchee-waterfowl',
    state: 'FL', land_id: 'fl-nwr-loxahatchee',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-22', end_date: '2026-01-31',
    quota_required: true, bag_limit: 'Federal limits',
    notes: 'Waterfowl hunting on designated impoundments. USFWS permit required. Boat access only to most hunting areas.',
    tags: ['waterfowl', 'quota', 'nwr', 'boat-access'],
  },

  // ─── STATE FORESTS ────────────────────────────────────────────────

  // Blackwater State Forest (Santa Rosa/Okaloosa Co — Zone A NW panhandle)
  {
    id: 'fl-sf-blackwater-deer-archery',
    state: 'FL', land_id: 'fl-sf-blackwater',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A early archery opener. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'state-forest', 'zone-a'],
  },
  {
    id: 'fl-sf-blackwater-deer-gun',
    state: 'FL', land_id: 'fl-sf-blackwater',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A: Sep 20–Oct 19 + Nov 22–Jan 4.',
    tags: ['deer', 'rifle', 'state-forest', 'zone-a'],
  },
  {
    id: 'fl-sf-blackwater-turkey',
    state: 'FL', land_id: 'fl-sf-blackwater',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'North of SR 70.',
    tags: ['turkey', 'spring', 'state-forest'],
  },

  // Tate's Hell State Forest (Franklin/Liberty Co — Zone A)
  {
    id: 'fl-sf-tates-hell-deer-archery',
    state: 'FL', land_id: 'fl-sf-tates-hell',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A archery. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'state-forest', 'zone-a'],
  },
  {
    id: 'fl-sf-tates-hell-deer-gun',
    state: 'FL', land_id: 'fl-sf-tates-hell',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A: Sep 20–Oct 19 + Nov 22–Jan 4.',
    tags: ['deer', 'rifle', 'state-forest', 'zone-a'],
  },
  {
    id: 'fl-sf-tates-hell-turkey',
    state: 'FL', land_id: 'fl-sf-tates-hell',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    tags: ['turkey', 'spring', 'state-forest'],
  },

  // Pine Log State Forest (Bay/Washington Co — Zone A)
  {
    id: 'fl-sf-pine-log-deer-archery',
    state: 'FL', land_id: 'fl-sf-pine-log',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'state-forest', 'zone-a'],
  },
  {
    id: 'fl-sf-pine-log-deer-gun',
    state: 'FL', land_id: 'fl-sf-pine-log',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A gun season.',
    tags: ['deer', 'rifle', 'state-forest', 'zone-a'],
  },

  // Lake Talquin State Forest (Gadsden/Leon/Liberty/Jackson Co — Zone A)
  {
    id: 'fl-sf-lake-talquin-deer-archery',
    state: 'FL', land_id: 'fl-sf-lake-talquin',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'state-forest', 'zone-a'],
  },
  {
    id: 'fl-sf-lake-talquin-deer-gun',
    state: 'FL', land_id: 'fl-sf-lake-talquin',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A gun season.',
    tags: ['deer', 'rifle', 'state-forest', 'zone-a'],
  },

  // Withlacoochee State Forest (Pasco/Hernando/Citrus/Sumter/Marion — Zone C central)
  {
    id: 'fl-sf-withlacoochee-deer-archery',
    state: 'FL', land_id: 'fl-sf-withlacoochee',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone C archery. Large multi-unit forest — check specific unit dates at MyFWC.',
    tags: ['deer', 'archery', 'state-forest'],
  },
  {
    id: 'fl-sf-withlacoochee-deer-muzzleloader',
    state: 'FL', land_id: 'fl-sf-withlacoochee',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-10-18', end_date: '2025-10-31',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader', 'state-forest'],
  },
  {
    id: 'fl-sf-withlacoochee-deer-gun',
    state: 'FL', land_id: 'fl-sf-withlacoochee',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'state-forest'],
  },
  {
    id: 'fl-sf-withlacoochee-turkey',
    state: 'FL', land_id: 'fl-sf-withlacoochee',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'North of SR 70.',
    tags: ['turkey', 'spring', 'state-forest'],
  },

  // Goethe State Forest (Levy Co — Zone C central)
  {
    id: 'fl-sf-goethe-deer-archery',
    state: 'FL', land_id: 'fl-sf-goethe',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required.',
    tags: ['deer', 'archery', 'state-forest'],
  },
  {
    id: 'fl-sf-goethe-deer-gun',
    state: 'FL', land_id: 'fl-sf-goethe',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'state-forest'],
  },

  // Seminole State Forest (Lake Co — Zone D central)
  {
    id: 'fl-sf-seminole-deer-archery',
    state: 'FL', land_id: 'fl-sf-seminole',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required.',
    tags: ['deer', 'archery', 'state-forest', 'zone-d'],
  },
  {
    id: 'fl-sf-seminole-deer-muzzleloader',
    state: 'FL', land_id: 'fl-sf-seminole',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-11-22', end_date: '2025-12-05',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader', 'state-forest'],
  },
  {
    id: 'fl-sf-seminole-deer-gun',
    state: 'FL', land_id: 'fl-sf-seminole',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'state-forest'],
  },

  // ─── WMAs — PANHANDLE (Zone A) ────────────────────────────────────

  // WMA Blackwater (Santa Rosa/Okaloosa — Zone A; WMA portion of Blackwater SF)
  {
    id: 'fl-wma-blackwater-deer-archery',
    state: 'FL', land_id: 'fl-wma-blackwater',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A early archery. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-blackwater-deer-gun',
    state: 'FL', land_id: 'fl-wma-blackwater',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A: Sep 20–Oct 19 + Nov 22–Jan 4.',
    tags: ['deer', 'rifle', 'zone-a'],
  },
  {
    id: 'fl-wma-blackwater-turkey',
    state: 'FL', land_id: 'fl-wma-blackwater',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    tags: ['turkey', 'spring'],
  },

  // WMA Perdido River (Escambia Co — Zone A)
  {
    id: 'fl-wma-perdido-river-deer-archery',
    state: 'FL', land_id: 'fl-wma-perdido-river',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-perdido-river-deer-gun',
    state: 'FL', land_id: 'fl-wma-perdido-river',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A gun.',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Escambia River (Escambia Co — Zone A)
  {
    id: 'fl-wma-escambia-river-deer-archery',
    state: 'FL', land_id: 'fl-wma-escambia-river',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-escambia-river-deer-gun',
    state: 'FL', land_id: 'fl-wma-escambia-river',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Yellow River (Okaloosa/Santa Rosa — Zone A)
  {
    id: 'fl-wma-yellow-river-deer-archery',
    state: 'FL', land_id: 'fl-wma-yellow-river',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-yellow-river-deer-gun',
    state: 'FL', land_id: 'fl-wma-yellow-river',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },
  {
    id: 'fl-wma-yellow-river-turkey',
    state: 'FL', land_id: 'fl-wma-yellow-river',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    tags: ['turkey', 'spring'],
  },

  // WMA Point Washington (Walton Co — Zone A)
  {
    id: 'fl-wma-point-washington-deer-archery',
    state: 'FL', land_id: 'fl-wma-point-washington',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-point-washington-deer-gun',
    state: 'FL', land_id: 'fl-wma-point-washington',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Econfina Creek (Bay/Washington Co — Zone A)
  {
    id: 'fl-wma-econfina-creek-deer-archery',
    state: 'FL', land_id: 'fl-wma-econfina-creek',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-econfina-creek-deer-gun',
    state: 'FL', land_id: 'fl-wma-econfina-creek',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Joe Budd (Gadsden Co — Zone A adjacent)
  {
    id: 'fl-wma-joe-budd-deer-archery',
    state: 'FL', land_id: 'fl-wma-joe-budd',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A-type. Near Tallahassee. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-joe-budd-deer-gun',
    state: 'FL', land_id: 'fl-wma-joe-budd',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Ochlockonee River (Leon/Wakulla/Gadsden Co — Zone A)
  {
    id: 'fl-wma-ochlockonee-river-deer-archery',
    state: 'FL', land_id: 'fl-wma-ochlockonee-river',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-ochlockonee-river-deer-gun',
    state: 'FL', land_id: 'fl-wma-ochlockonee-river',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Wakulla (Wakulla Co — Zone A)
  {
    id: 'fl-wma-wakulla-deer-archery',
    state: 'FL', land_id: 'fl-wma-wakulla',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-wakulla-deer-gun',
    state: 'FL', land_id: 'fl-wma-wakulla',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // ─── WMAs — NORTH CENTRAL FLORIDA (Zone B/C) ──────────────────────

  // WMA Talquin (Leon/Gadsden/Liberty/Jackson Co — Zone A-B border)
  {
    id: 'fl-wma-talquin-deer-archery',
    state: 'FL', land_id: 'fl-wma-talquin',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required.',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-talquin-deer-gun',
    state: 'FL', land_id: 'fl-wma-talquin',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Apalachee (Jefferson Co — Zone B)
  {
    id: 'fl-wma-apalachee-deer-archery',
    state: 'FL', land_id: 'fl-wma-apalachee',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required.',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-apalachee-deer-gun',
    state: 'FL', land_id: 'fl-wma-apalachee',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },
  {
    id: 'fl-wma-apalachee-turkey',
    state: 'FL', land_id: 'fl-wma-apalachee',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    tags: ['turkey', 'spring'],
  },

  // WMA Aucilla (Jefferson/Taylor Co — Zone B)
  {
    id: 'fl-wma-aucilla-deer-archery',
    state: 'FL', land_id: 'fl-wma-aucilla',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-aucilla-deer-gun',
    state: 'FL', land_id: 'fl-wma-aucilla',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Big Bend (Taylor/Lafayette/Dixie Co — Zone B)
  {
    id: 'fl-wma-big-bend-deer-archery',
    state: 'FL', land_id: 'fl-wma-big-bend',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required. Large coastal area.',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-big-bend-deer-gun',
    state: 'FL', land_id: 'fl-wma-big-bend',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },
  {
    id: 'fl-wma-big-bend-turkey',
    state: 'FL', land_id: 'fl-wma-big-bend',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    tags: ['turkey', 'spring'],
  },

  // WMA Twin Rivers (Suwannee/Lafayette Co — Zone B)
  {
    id: 'fl-wma-twin-rivers-deer-archery',
    state: 'FL', land_id: 'fl-wma-twin-rivers',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-twin-rivers-deer-gun',
    state: 'FL', land_id: 'fl-wma-twin-rivers',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Andrews (Madison/Taylor Co — Zone B)
  {
    id: 'fl-wma-andrews-deer-archery',
    state: 'FL', land_id: 'fl-wma-andrews',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-andrews-deer-gun',
    state: 'FL', land_id: 'fl-wma-andrews',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Lochloosa (Alachua Co — Zone C)
  {
    id: 'fl-wma-lochloosa-deer-archery',
    state: 'FL', land_id: 'fl-wma-lochloosa',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-lochloosa-deer-gun',
    state: 'FL', land_id: 'fl-wma-lochloosa',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Camp Blanding (Clay/Bradford/Union Co — Zone B/C NE FL)
  {
    id: 'fl-wma-camp-blanding-deer-archery',
    state: 'FL', land_id: 'fl-wma-camp-blanding',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: true, bag_limit: '5/season (2/day)',
    notes: 'Florida National Guard training area — quota permits required. Apply at GoOutdoorsFlorida.com.',
    tags: ['deer', 'archery', 'quota'],
  },
  {
    id: 'fl-wma-camp-blanding-deer-gun',
    state: 'FL', land_id: 'fl-wma-camp-blanding',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: true, bag_limit: '5/season (2/day)',
    notes: 'Quota hunt required. Access controlled by FLARNG.',
    tags: ['deer', 'rifle', 'quota'],
  },

  // WMA Guana River (St. Johns Co — Zone D coastal NE FL)
  {
    id: 'fl-wma-guana-river-deer-archery',
    state: 'FL', land_id: 'fl-wma-guana-river',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-guana-river-deer-gun',
    state: 'FL', land_id: 'fl-wma-guana-river',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Caravelle Ranch (Putnam Co — Zone D)
  {
    id: 'fl-wma-caravelle-ranch-deer-archery',
    state: 'FL', land_id: 'fl-wma-caravelle-ranch',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-caravelle-ranch-deer-gun',
    state: 'FL', land_id: 'fl-wma-caravelle-ranch',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Lake George (Lake/Marion/Volusia Co — Zone C/D)
  {
    id: 'fl-wma-lake-george-deer-archery',
    state: 'FL', land_id: 'fl-wma-lake-george',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-lake-george-deer-gun',
    state: 'FL', land_id: 'fl-wma-lake-george',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Gulf Hammock (Levy Co — Zone C)
  {
    id: 'fl-wma-gulf-hammock-deer-archery',
    state: 'FL', land_id: 'fl-wma-gulf-hammock',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-gulf-hammock-deer-gun',
    state: 'FL', land_id: 'fl-wma-gulf-hammock',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Tiger Bay (Volusia Co — Zone D)
  {
    id: 'fl-wma-tiger-bay-deer-archery',
    state: 'FL', land_id: 'fl-wma-tiger-bay',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-tiger-bay-deer-gun',
    state: 'FL', land_id: 'fl-wma-tiger-bay',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Dunns Creek (Putnam Co — Zone D)
  {
    id: 'fl-wma-dunns-creek-deer-archery',
    state: 'FL', land_id: 'fl-wma-dunns-creek',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-dunns-creek-deer-gun',
    state: 'FL', land_id: 'fl-wma-dunns-creek',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Tosohatchee (Orange Co — Zone D central)
  {
    id: 'fl-wma-tosohatchee-deer-archery',
    state: 'FL', land_id: 'fl-wma-tosohatchee',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-d'],
  },
  {
    id: 'fl-wma-tosohatchee-deer-muzzleloader',
    state: 'FL', land_id: 'fl-wma-tosohatchee',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-11-22', end_date: '2025-12-05',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader'],
  },
  {
    id: 'fl-wma-tosohatchee-deer-gun',
    state: 'FL', land_id: 'fl-wma-tosohatchee',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-d'],
  },
  {
    id: 'fl-wma-tosohatchee-turkey',
    state: 'FL', land_id: 'fl-wma-tosohatchee',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-07', end_date: '2026-04-12',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'South of SR 70.',
    tags: ['turkey', 'spring'],
  },

  // WMA Upper St. Johns (Brevard/Indian River/St. Lucie — Zone D)
  {
    id: 'fl-wma-upper-st-johns-deer-archery',
    state: 'FL', land_id: 'fl-wma-upper-st-johns',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-upper-st-johns-deer-gun',
    state: 'FL', land_id: 'fl-wma-upper-st-johns',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },
  {
    id: 'fl-wma-upper-st-johns-waterfowl',
    state: 'FL', land_id: 'fl-wma-upper-st-johns',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-22', end_date: '2026-01-31',
    quota_required: false, bag_limit: 'Federal limits',
    notes: 'St. Johns River marsh — good teal and duck hunting.',
    tags: ['waterfowl', 'duck'],
  },

  // ─── WMAs — CENTRAL FLORIDA ───────────────────────────────────────

  // WMA Citrus (Citrus Co — Zone C central)
  {
    id: 'fl-wma-citrus-deer-archery',
    state: 'FL', land_id: 'fl-wma-citrus',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Withlacoochee State Forest / Citrus WMA complex. FWC WMA Permit required.',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-citrus-deer-muzzleloader',
    state: 'FL', land_id: 'fl-wma-citrus',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-10-18', end_date: '2025-10-31',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader'],
  },
  {
    id: 'fl-wma-citrus-deer-gun',
    state: 'FL', land_id: 'fl-wma-citrus',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },
  {
    id: 'fl-wma-citrus-turkey',
    state: 'FL', land_id: 'fl-wma-citrus',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-21', end_date: '2026-04-26',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'North of SR 70.',
    tags: ['turkey', 'spring'],
  },

  // WMA Half Moon (Citrus/Hernando Co)
  {
    id: 'fl-wma-half-moon-deer-archery',
    state: 'FL', land_id: 'fl-wma-half-moon',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-half-moon-deer-gun',
    state: 'FL', land_id: 'fl-wma-half-moon',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Flying Eagle (Citrus Co)
  {
    id: 'fl-wma-flying-eagle-deer-archery',
    state: 'FL', land_id: 'fl-wma-flying-eagle',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-flying-eagle-deer-gun',
    state: 'FL', land_id: 'fl-wma-flying-eagle',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Richloam (Sumter/Pasco/Hernando — Zone C)
  {
    id: 'fl-wma-richloam-deer-archery',
    state: 'FL', land_id: 'fl-wma-richloam',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-richloam-deer-gun',
    state: 'FL', land_id: 'fl-wma-richloam',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Green Swamp (Polk/Lake/Pasco — Zone C/D)
  {
    id: 'fl-wma-green-swamp-deer-archery',
    state: 'FL', land_id: 'fl-wma-green-swamp',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Check east vs. west unit dates at MyFWC.',
    tags: ['deer', 'archery', 'zone-d'],
  },
  {
    id: 'fl-wma-green-swamp-deer-gun',
    state: 'FL', land_id: 'fl-wma-green-swamp',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Walk-in-the-Water (Polk — Zone D)
  {
    id: 'fl-wma-walk-in-the-water-deer-archery',
    state: 'FL', land_id: 'fl-wma-walk-in-the-water',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-walk-in-the-water-deer-gun',
    state: 'FL', land_id: 'fl-wma-walk-in-the-water',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Seminole Forest (Lake Co — Zone D)
  {
    id: 'fl-wma-seminole-forest-deer-archery',
    state: 'FL', land_id: 'fl-wma-seminole-forest',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-seminole-forest-deer-gun',
    state: 'FL', land_id: 'fl-wma-seminole-forest',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // WMA Tates Hell (Franklin/Liberty — Zone A variant via WMA designation)
  {
    id: 'fl-wma-tates-hell-deer-archery',
    state: 'FL', land_id: 'fl-wma-tates-hell',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-08-02', end_date: '2025-09-05',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone A. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-a'],
  },
  {
    id: 'fl-wma-tates-hell-deer-gun',
    state: 'FL', land_id: 'fl-wma-tates-hell',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-09-20', end_date: '2026-01-04',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-a'],
  },

  // WMA Triple N Ranch (Osceola Co — Zone D/E boundary)
  {
    id: 'fl-wma-triple-n-ranch-deer-archery',
    state: 'FL', land_id: 'fl-wma-triple-n-ranch',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-triple-n-ranch-deer-gun',
    state: 'FL', land_id: 'fl-wma-triple-n-ranch',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },
  {
    id: 'fl-wma-triple-n-ranch-turkey',
    state: 'FL', land_id: 'fl-wma-triple-n-ranch',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-07', end_date: '2026-04-12',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'South of SR 70.',
    tags: ['turkey', 'spring'],
  },

  // ─── WMAs — SOUTH FLORIDA (Zone E — south of SR 70) ──────────────

  // WMA Babcock-Webb (Charlotte/Lee/Glades/Highlands — Zone E)
  {
    id: 'fl-wma-babcock-webb-deer-archery',
    state: 'FL', land_id: 'fl-wma-babcock-webb',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone E south archery. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-babcock-webb-deer-muzzleloader',
    state: 'FL', land_id: 'fl-wma-babcock-webb',
    species: 'Deer', weapon_type: 'Muzzleloader',
    start_date: '2025-12-06', end_date: '2025-12-12',
    quota_required: false, bag_limit: '5/season',
    tags: ['deer', 'muzzleloader'],
  },
  {
    id: 'fl-wma-babcock-webb-deer-gun',
    state: 'FL', land_id: 'fl-wma-babcock-webb',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Gun: Nov 27–30 + Dec 13–Feb 22.',
    tags: ['deer', 'rifle', 'zone-e'],
  },
  {
    id: 'fl-wma-babcock-webb-turkey',
    state: 'FL', land_id: 'fl-wma-babcock-webb',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-07', end_date: '2026-04-12',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'South of SR 70.',
    tags: ['turkey', 'spring'],
  },
  {
    id: 'fl-wma-babcock-webb-hog',
    state: 'FL', land_id: 'fl-wma-babcock-webb',
    species: 'Feral Hog', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-04-11',
    quota_required: false, bag_limit: 'No limit',
    notes: 'Allowed during open deer/turkey seasons.',
    tags: ['hog'],
  },

  // WMA J.W. Corbett (Palm Beach Co — Zone E)
  {
    id: 'fl-wma-j-w-corbett-deer-archery',
    state: 'FL', land_id: 'fl-wma-j-w-corbett',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone E south. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-j-w-corbett-deer-gun',
    state: 'FL', land_id: 'fl-wma-j-w-corbett',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },
  {
    id: 'fl-wma-j-w-corbett-turkey',
    state: 'FL', land_id: 'fl-wma-j-w-corbett',
    species: 'Turkey', weapon_type: 'Shotgun',
    start_date: '2026-03-07', end_date: '2026-04-12',
    quota_required: false, bag_limit: '2 gobblers/season',
    notes: 'South of SR 70.',
    tags: ['turkey', 'spring'],
  },

  // WMA Dinner Island Ranch (Hendry/Collier — Zone E)
  {
    id: 'fl-wma-dinner-island-deer-archery',
    state: 'FL', land_id: 'fl-wma-dinner-island',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone E. FWC WMA Permit required.',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-dinner-island-deer-gun',
    state: 'FL', land_id: 'fl-wma-dinner-island',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // WMA Spirit of the Wild (Glades/Hendry/Lee/Charlotte — Zone E)
  {
    id: 'fl-wma-spirit-of-the-wild-deer-archery',
    state: 'FL', land_id: 'fl-wma-spirit-of-the-wild',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-spirit-of-the-wild-deer-gun',
    state: 'FL', land_id: 'fl-wma-spirit-of-the-wild',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // WMA Okaloacoochee Slough (Hendry/Collier — Zone E)
  {
    id: 'fl-wma-okaloacoochee-slough-deer-archery',
    state: 'FL', land_id: 'fl-wma-okaloacoochee-slough',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-okaloacoochee-slough-deer-gun',
    state: 'FL', land_id: 'fl-wma-okaloacoochee-slough',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // WMA Picayune Strand (Collier Co — Zone E)
  {
    id: 'fl-wma-picayune-strand-deer-archery',
    state: 'FL', land_id: 'fl-wma-picayune-strand',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'FWC WMA Permit required. Boots recommended — extremely wet terrain.',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-picayune-strand-deer-gun',
    state: 'FL', land_id: 'fl-wma-picayune-strand',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // WMA DuPuis (Martin/Palm Beach — Zone E)
  {
    id: 'fl-wma-dupuis-deer-archery',
    state: 'FL', land_id: 'fl-wma-dupuis',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-dupuis-deer-gun',
    state: 'FL', land_id: 'fl-wma-dupuis',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // WMA Holey Land (Palm Beach/Broward — Zone E, limited deer)
  {
    id: 'fl-wma-holey-land-deer-archery',
    state: 'FL', land_id: 'fl-wma-holey-land',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone E. Very wet — primarily managed for waterfowl. Deer season secondary.',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-wma-holey-land-waterfowl',
    state: 'FL', land_id: 'fl-wma-holey-land',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-22', end_date: '2026-01-31',
    quota_required: false, bag_limit: 'Federal limits',
    notes: 'Managed water control structures. Check unit-specific dates.',
    tags: ['waterfowl', 'duck'],
  },

  // WMA Rotenberger (Palm Beach — wetland, waterfowl primary)
  {
    id: 'fl-wma-rotenberger-waterfowl',
    state: 'FL', land_id: 'fl-wma-rotenberger',
    species: 'Waterfowl', weapon_type: 'Shotgun',
    start_date: '2025-11-22', end_date: '2026-01-31',
    quota_required: false, bag_limit: 'Federal limits',
    notes: 'Primarily waterfowl impoundment area. FWC WMA Permit required.',
    tags: ['waterfowl', 'duck'],
  },

  // WMA Everglades/Taylor (Taylor/Lafayette/Madison — Zone B/C varies)
  {
    id: 'fl-wma-everglades-taylor-deer-archery',
    state: 'FL', land_id: 'fl-wma-everglades-taylor',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'North FL zone. FWC WMA Permit required.',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-wma-everglades-taylor-deer-gun',
    state: 'FL', land_id: 'fl-wma-everglades-taylor',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // ─── OTHER PUBLIC LANDS ──────────────────────────────────────────

  // Kissimmee Chain of Lakes (Osceola/Polk — Zone D)
  {
    id: 'fl-other-kissimmee-chain-deer-archery',
    state: 'FL', land_id: 'fl-other-kissimmee-chain',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-18', end_date: '2025-11-16',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-other-kissimmee-chain-deer-gun',
    state: 'FL', land_id: 'fl-other-kissimmee-chain',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-12-06', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // Kissimmee River Public Use Area (Glades/Highlands/Okeechobee — Zone E)
  {
    id: 'fl-other-kissimmee-river-deer-archery',
    state: 'FL', land_id: 'fl-other-kissimmee-river',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-other-kissimmee-river-deer-gun',
    state: 'FL', land_id: 'fl-other-kissimmee-river',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // T.M. Goodwin WMA (Pasco Co — Zone C/D)
  {
    id: 'fl-other-tm-goodwin-deer-archery',
    state: 'FL', land_id: 'fl-other-tm-goodwin',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-09-13', end_date: '2025-10-12',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery'],
  },
  {
    id: 'fl-other-tm-goodwin-deer-gun',
    state: 'FL', land_id: 'fl-other-tm-goodwin',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-01', end_date: '2026-01-18',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle'],
  },

  // Allapattah Flats (Martin/Palm Beach — Zone E)
  {
    id: 'fl-other-allapattah-flats-deer-archery',
    state: 'FL', land_id: 'fl-other-allapattah-flats',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-other-allapattah-flats-deer-gun',
    state: 'FL', land_id: 'fl-other-allapattah-flats',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // Fort Drum (Okeechobee/Indian River — Zone E)
  {
    id: 'fl-other-fort-drum-deer-archery',
    state: 'FL', land_id: 'fl-other-fort-drum',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: false, bag_limit: '5/season (2/day)',
    notes: 'Zone E south archery.',
    tags: ['deer', 'archery', 'zone-e'],
  },
  {
    id: 'fl-other-fort-drum-deer-gun',
    state: 'FL', land_id: 'fl-other-fort-drum',
    species: 'Deer', weapon_type: 'Rifle',
    start_date: '2025-11-27', end_date: '2026-02-22',
    quota_required: false, bag_limit: '5/season (2/day)',
    tags: ['deer', 'rifle', 'zone-e'],
  },

  // Southern Glades WEA (Miami-Dade — Zone E, archery only/quota)
  {
    id: 'fl-other-southern-glades-deer-archery',
    state: 'FL', land_id: 'fl-other-southern-glades',
    species: 'Deer', weapon_type: 'Archery',
    start_date: '2025-10-25', end_date: '2025-11-26',
    quota_required: true, bag_limit: '2/season',
    notes: 'Quota archery hunt. FWC permit required. Apply at GoOutdoorsFlorida.com.',
    tags: ['deer', 'archery', 'quota', 'zone-e'],
  },

];
