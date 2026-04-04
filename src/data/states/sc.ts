/**
 * South Carolina Public Hunting & Fishing Lands — 2025-2026 Season
 *
 * Sources:
 *   https://www.eregulations.com/southcarolina/hunting/wildlife-management-areas
 *   https://www.eregulations.com/southcarolina/hunting/deer
 *   https://www.eregulations.com/southcarolina/hunting/turkey
 *   https://www.eregulations.com/southcarolina/hunting/migratory-birds
 *   https://www.eregulations.com/southcarolina/fishing
 *   https://www.dnr.sc.gov/wma/
 *   https://www.dnr.sc.gov/hunting.html
 *   https://www.dnr.sc.gov/fishing.html
 *   https://www.fs.usda.gov/scnfs (Francis Marion & Sumter NFs)
 *   https://www.fws.gov/refuge/ernest-f-hollings-ace-basin (ACE Basin NWR)
 *   https://www.fws.gov/refuge/santee (Santee NWR)
 *   https://www.sas.usace.army.mil (Hartwell, Thurmond lakes)
 *   https://www.scfc.gov/state-lands/hunting-on-sc-forestry-commission-managed-lands/
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SC GAME ZONES (deer seasons vary by zone):
 *   Zone 1 = Upstate/Mountain (Oconee, Pickens, Greenville — above I-85)
 *   Zone 2 = Western Piedmont (Abbeville, McCormick, Greenwood, Edgefield,
 *            Saluda, Laurens west of Enoree River, Anderson, Spartanburg
 *            west of I-26)
 *   Zone 3 = Central/Upper Piedmont
 *   Zone 4 = Lower Piedmont / Upper Coastal Plain
 *   Zone 5 = Pee Dee region
 *   Zone 6 = Lowcountry / Coastal
 *
 *   NOTE: SCDNR simplified from 10 zones to 6 zones starting 2022-2023.
 *   Some older maps/WMA references still cite old zone numbering.
 *   This file uses the current 6-zone system.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * STATEWIDE RULES SUMMARY (hunters should know these):
 *
 *   ANTLER RESTRICTIONS:
 *     - Zones 1 & 2: Antlered deer must have at least 4 points on one side
 *       (1" or longer). One "bonus" antlered tag per season allows harvest
 *       of any legal buck regardless of points.
 *     - Zones 3–6: No antler point restriction.
 *
 *   BAITING:
 *     - ILLEGAL on all WMA lands statewide.
 *     - On private land: Legal in Zones 3–6 (Coastal Plain & Lowcountry).
 *     - On private land: ILLEGAL in Zones 1 & 2 (Upstate / Piedmont).
 *
 *   DOG HUNTING (deer with dogs):
 *     - Legal in parts of Zones 4, 5, and 6 (roughly east of I-95 and
 *       south of Hwy 378). Prohibited in Zones 1, 2, and 3 and western
 *       portions of Zone 4.
 *     - All organized dog deer drives on WMA lands must be registered
 *       with SCDNR in advance.
 *     - Dog deer hunters must wear a hat, coat, or vest of solid
 *       international orange.
 *     - Dogs must have owner's name/address on collar.
 *
 *   SUNDAY HUNTING:
 *     - PROHIBITED on all WMA lands (Wildlife Management Areas).
 *     - Legal on private land statewide.
 *     - Prohibited on National Forest WMA lands.
 *
 *   EITHER-SEX DAYS (deer):
 *     - Zone 1: Either-sex archery Sept 15–Oct 1 and last 2 weeks of
 *       firearms season. Bucks only Oct 2 through most of firearms.
 *     - Zone 2: Either-sex archery Sept 1–Oct 1 and specific firearms
 *       dates. Otherwise bucks only.
 *     - Zones 3–6: Either-sex entire season (archery and firearms).
 *
 *   BAG LIMITS (deer):
 *     - Statewide: 2 antlered deer per day (tags required).
 *     - Season total: Varies — typically 5 total deer (max 2 antlered)
 *       on WMAs, up to 10–11 on private land depending on zone.
 *     - Antlerless deer: Additional antlerless tags available for
 *       private land in Zones 3–6 (up to 4 additional).
 *
 *   TURKEY:
 *     - Spring season only (no fall turkey season in SC).
 *     - Gobblers only. Hens fully protected year-round.
 *     - Daily bag: 2 gobblers. Season limit: 3 gobblers statewide
 *       (total across all zones and properties).
 *     - Legal shot sizes: No. 4 or smaller (no rifle for turkey).
 *     - Legal weapons: Shotgun (20 ga or larger), archery, crossbow.
 *       No rifles or handguns for turkey.
 *     - Shooting hours: 30 min before sunrise to noon first 2 weeks;
 *       30 min before sunrise to sunset remainder of season.
 *     - Youth turkey weekend: Typically last weekend of March (youth
 *       under 18 with licensed adult).
 *
 *   HOG (feral hog/wild boar):
 *     - No closed season on private land — legal year-round with
 *       any legal weapon, day or night.
 *     - On WMA lands: May be taken during any open deer or small game
 *       season. Some WMAs have specific hog hunts.
 *     - No bag limit. No size/sex restrictions.
 *     - Night hunting on private land legal with landowner permission
 *       (light at point of kill required).
 *
 *   ALLIGATOR:
 *     - Season: Mid-September through mid-October (specific dates set
 *       annually by SCDNR).
 *     - Tags required: Apply through public drawing (typically July).
 *       Tag assigned to specific unit (public water or private land).
 *     - Public water units: Santee Cooper lakes, ACE Basin, Savannah
 *       River, and others.
 *     - Weapons: Hand-held snares, harpoons, bowfishing equipment,
 *       bang sticks. No firearms from boat.
 *     - Minimum size: 4 feet total length.
 *     - Season bag: 1 alligator per tag.
 *
 *   WATERFOWL:
 *     - Category I WMAs: Waterfowl hunting by PERMIT ONLY (annual
 *       computer drawing). These are managed impoundment areas:
 *       Bear Island, Donnelley, Samworth, Santee Coastal Reserve,
 *       Santee Delta, Botany Bay, Hatchery, Canal.
 *     - Category II WMAs: Public walk-in waterfowl hunting during
 *       statewide season — NO drawing required. Includes: Woodbury,
 *       Bonneau Ferry, Santee Cooper WMA, Pee Dee Station Site,
 *       Great Pee Dee HP, Broad River Waterfowl Area, and portions
 *       of Francis Marion NF.
 *     - Steel shot required for all waterfowl hunting.
 *     - Federal duck stamp required in addition to state license.
 *     - Daily bag: 6 ducks (species restrictions apply per federal
 *       framework), 15 coots, 25 snipe, 5 woodcock.
 *     - Duck season: Typically mid-November through late January
 *       (split season varies by zone).
 *     - Goose season: Typically October through late January plus
 *       February conservation order.
 *
 *   SMALL GAME:
 *     - Squirrel: Oct 1 – Mar 1. Bag limit 10/day.
 *     - Rabbit: Nov 26 – Mar 1. Bag limit 5/day.
 *     - Quail: Nov 26 – Mar 1. Bag limit 12/day.
 *     - Raccoon/Opossum: Year-round at night; daylight hours during
 *       open small game season. No bag limit.
 *
 *   DOVE:
 *     - Split season: Sept 1–Oct 10; Nov 8–Nov 29; Dec 18–Jan 15.
 *     - Daily bag: 15. Possession: 45.
 *     - Shotgun only. Unplugged shotgun prohibited (3-shell max).
 *     - Managed dove fields on WMAs: First-come walk-in or draw.
 *
 *   BEAR (limited):
 *     - Black bear: Rare in SC. No open season. Protected species.
 *       Bears occasionally present in mountains (Zone 1) and coastal
 *       areas (Lewis Ocean Bay HP). Report sightings to SCDNR.
 *
 *   LICENSING:
 *     - WMA permit required for all hunting/fishing on WMA lands
 *       ($26 resident, varies nonresident). Separate from hunting
 *       license.
 *     - Migratory bird permit + federal duck stamp required for
 *       waterfowl.
 *     - Tags/report cards: Antlered deer tags required (available
 *       through GoOutdoorsSC.com or SCDNR).
 *
 *   LEGAL SHOOTING HOURS:
 *     - Big game (deer, turkey, bear): 30 min before sunrise to
 *       30 min after sunset (turkey noon restriction first 2 weeks
 *       of spring season).
 *     - Waterfowl: 30 min before sunrise to sunset.
 *     - Small game: 30 min before sunrise to 30 min after sunset.
 *     - Raccoon/opossum at night: Sunset to sunrise.
 *
 * IMPORTANT: Verify against official sources each season — regulations
 * change annually. Season data reflects 2025-2026 where available.
 * WMA permit applications: https://www.dnr.sc.gov/hunting/wma.html
 */

import { PublicLand, HuntingSeason, QuotaHunt, FishingRegulation, State } from '@/lib/types';

export const SC_STATE: State = {
  code: 'SC',
  name: 'South Carolina',
  agency: 'South Carolina Department of Natural Resources',
  website: 'https://www.dnr.sc.gov/hunting.html',
};

export const SC_LANDS: PublicLand[] = [
  // ── NATIONAL FORESTS ──────────────────────────────────────────────────────
  {
    id: 'sc-francis-marion-nf',
    state: 'SC',
    name: 'Francis Marion National Forest',
    type: 'National Forest',
    acreage: 260480,
    counties: ['Berkeley', 'Charleston'],
    region: 'Lowcountry',
    lat: 33.19,
    lng: -79.77,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'waterfowl', 'dog-hunting', 'small-game', 'dove'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Dog drive hunts: Multiple SCDNR-scheduled dates Sept–Dec; all dog drives must be pre-registered with SCDNR. ' +
      'Either-sex entire season. 2 antlered/day, 5 total deer/season on WMA. ' +
      'No antler point restriction (Zone 6). ' +
      'Category II waterfowl area (portions) — walk-in during statewide season, steel shot required. ' +
      'Turkey: Spring only, gobblers only, 2/day, 3/season. Shotgun/archery only, shot size #4 or smaller. ' +
      'Hog: Legal during any open deer or small game season, no limit. ' +
      'Squirrel Oct 1–Mar 1. Dove on managed fields (Huger, Witherbee Ranger Districts). ' +
      'Check-in/check-out: Required at designated stations for dog drives. ' +
      'Access: Open daily except Sunday. Some roads gated seasonally.',
  },
  {
    id: 'sc-sumter-nf-andrew-pickens',
    state: 'SC',
    name: 'Sumter National Forest — Andrew Pickens Ranger District',
    type: 'National Forest',
    acreage: 79591,
    counties: ['Oconee', 'Pickens'],
    region: 'Mountain / Upstate',
    lat: 34.91,
    lng: -83.02,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'bear', 'trout', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1 — baiting prohibited). Zone 1 deer season. ' +
      '4-point antler restriction: Antlered deer must have at least 4 points on one side (1" or longer). ' +
      'One "bonus" antlered tag per season allows harvest of any legal buck regardless of points. ' +
      'Either-sex: Archery only Sept 15–Oct 1 and last 2 weeks of firearms. Bucks only remainder. ' +
      'Bear: Protected — no open season. Report sightings. ' +
      'Turkey: Spring only, gobblers only, 2/day, 3/season. ' +
      'Wild and Scenic Chattooga River — excellent trout fishing (special regulations apply). ' +
      'Trout: Chattooga River and tributaries — delayed harvest sections, catch-and-release sections. ' +
      'Squirrel Oct 1–Mar 1. Rabbit/quail Nov 26–Mar 1. ' +
      'Access: Open daily except Sunday.',
  },
  {
    id: 'sc-sumter-nf-enoree',
    state: 'SC',
    name: 'Sumter National Forest — Enoree Ranger District',
    type: 'National Forest',
    acreage: 94174,
    counties: ['Laurens', 'Newberry', 'Union'],
    region: 'Piedmont',
    lat: 34.50,
    lng: -81.74,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'waterfowl'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 2/3 deer season (varies by tract). ' +
      'Portions in Zone 2 have 4-point antler restriction. Zone 3 portions: No antler point restriction. ' +
      'Central Piedmont Hunt Unit overlap. Either-sex varies by zone portion. ' +
      'Turkey: Spring only, gobblers only. ' +
      'Squirrel Oct 1–Mar 1. Rabbit/quail Nov 26–Mar 1. ' +
      'Access: Open daily except Sunday.',
  },
  {
    id: 'sc-sumter-nf-long-cane',
    state: 'SC',
    name: 'Sumter National Forest — Long Cane Ranger District',
    type: 'National Forest',
    acreage: 114492,
    counties: ['Abbeville', 'Edgefield', 'Greenwood', 'McCormick', 'Saluda'],
    region: 'Western Piedmont',
    lat: 33.96,
    lng: -82.36,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 2 — baiting prohibited). Zone 2 deer season. ' +
      '4-point antler restriction: Antlered deer must have at least 4 points on one side. ' +
      'One "bonus" antlered tag per season allows any legal buck. ' +
      'Either-sex: Archery Sept 1–Oct 1 and specific firearms dates. Bucks only remainder. ' +
      'Western Piedmont Hunt Unit overlap. ' +
      'Turkey: Spring only, gobblers only. ' +
      'Squirrel Oct 1–Mar 1. Rabbit/quail Nov 26–Mar 1. ' +
      'Access: Open daily except Sunday.',
  },
  // ── NATIONAL WILDLIFE REFUGES ─────────────────────────────────────────────
  {
    id: 'sc-ace-basin-nwr',
    state: 'SC',
    name: 'ACE Basin National Wildlife Refuge (Ernest F. Hollings)',
    type: 'National Wildlife Refuge',
    acreage: 11815,
    counties: ['Colleton', 'Charleston'],
    region: 'Lowcountry',
    lat: 32.72,
    lng: -80.50,
    managing_agency: 'U.S. Fish & Wildlife Service',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'dove', 'waterfowl', 'small-game', 'alligator'],
    special_rules:
      'Free refuge permit required (available at refuge HQ or online). Zone 6 deer season. ' +
      'Deer: Archery only on Grove Tract; firearms on Combahee Unit by quota. Either-sex entire season. ' +
      'No antler point restriction. No baiting. No Sunday hunting. ' +
      'Hog: Legal during open deer season, no limit. ' +
      'Turkey: Spring only, gobblers only, refuge-specific dates. ' +
      'Waterfowl: Designated areas only, federal duck stamp + refuge permit. Steel shot required. ' +
      'Dove: Managed fields on specific shoot dates. ' +
      'Alligator: Public water drawing tags may include refuge waters. ' +
      'Part of ACE Basin — largest undeveloped estuary on East Coast. ' +
      'Check-in/check-out required. Access by boat for some units.',
  },
  {
    id: 'sc-santee-nwr',
    state: 'SC',
    name: 'Santee National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 15095,
    counties: ['Clarendon'],
    region: 'Midlands',
    lat: 33.66,
    lng: -80.48,
    managing_agency: 'U.S. Fish & Wildlife Service',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'archery', 'primitive-weapons', 'youth-hunt'],
    special_rules:
      'Free refuge permit required. Archery-only and primitive weapons hunts on Cuddo/Pine Island Units. ' +
      'Archery: Sept 20–Oct 4. Primitive weapons: Oct 17–19, Oct 31–Nov 2. ' +
      'Bluff Unit youth hunt: Oct 25–26. ' +
      'No firearms deer hunts. No waterfowl or alligator hunting on refuge. ' +
      'Hog: Legal during open deer hunts, no limit. ' +
      'No Sunday hunting. Check-in/check-out required at Bluff Unit kiosk. ' +
      'Fishing: Bank fishing on Lake Marion from designated areas. ' +
      'No boats launched from refuge (use nearby public ramps).',
  },
  {
    id: 'sc-cape-romain-nwr',
    state: 'SC',
    name: 'Cape Romain National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 66287,
    counties: ['Charleston'],
    region: 'Lowcountry / Coastal',
    lat: 32.97,
    lng: -79.56,
    managing_agency: 'U.S. Fish & Wildlife Service',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'shorebird', 'waterfowl-viewing', 'crabbing'],
    special_rules:
      'No hunting allowed. Primarily saltwater fishing access. ' +
      'Barrier islands (Bull Island, Cape Island) accessible by boat or ferry. ' +
      'Bull Island: Seasonal access (ferry from Garris Landing). ' +
      'Saltwater fishing: Red drum, flounder, spotted seatrout, sheepshead from surf and creeks. ' +
      'Crabbing allowed with recreational license. ' +
      'No overnight camping except designated Bull Island campground (permit required).',
  },
  {
    id: 'sc-carolina-sandhills-nwr',
    state: 'SC',
    name: 'Carolina Sandhills National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 47668,
    counties: ['Chesterfield'],
    region: 'PeeDee / Sandhills',
    lat: 34.55,
    lng: -80.22,
    managing_agency: 'U.S. Fish & Wildlife Service',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'quail', 'dove', 'small-game', 'quota-hunt'],
    special_rules:
      'Free refuge permit required. Zone 4 deer season. ' +
      'Deer: Quota hunts only — archery, muzzleloader, and firearms by drawing. ' +
      'Apply through refuge office. Either-sex. No antler point restriction. ' +
      'Turkey: Spring gobbler only, refuge-specific dates. ' +
      'Quail: Open during statewide season on designated areas. ' +
      'Dove: Managed field hunts on specific dates. ' +
      'No baiting. No Sunday hunting. No dogs for deer. ' +
      'Check-in/check-out required. ' +
      'Longleaf pine/wiregrass ecosystem — significant red-cockaded woodpecker colony. ' +
      'Fishing: 30 ponds — largemouth bass, bream, catfish. Refuge fishing permit required.',
  },
  // ── STATE FORESTS ─────────────────────────────────────────────────────────
  {
    id: 'sc-manchester-state-forest',
    state: 'SC',
    name: 'Manchester State Forest',
    type: 'State Forest',
    acreage: 23135,
    counties: ['Sumter'],
    region: 'Midlands',
    lat: 33.98,
    lng: -80.36,
    managing_agency: 'SC Forestry Commission / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'dove', 'small-game', 'quail'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Deer bag: 2 antlered/day, 5 total/season on WMA. ' +
      'Turkey: Spring gobblers only. ' +
      'Dove: Bland Tract and Tuomey Tract managed dove fields — specific shoot dates posted annually. ' +
      'First-come basis or drawing depending on field. ' +
      'Squirrel Oct 1–Mar 1. Rabbit/quail Nov 26–Mar 1. ' +
      'Hog: Legal during open deer/small game seasons. ' +
      'Dog deer hunting: Prohibited on Manchester SF.',
  },
  {
    id: 'sc-sand-hills-state-forest',
    state: 'SC',
    name: 'Sand Hills State Forest',
    type: 'State Forest',
    acreage: 46838,
    counties: ['Chesterfield', 'Darlington'],
    region: 'PeeDee',
    lat: 34.58,
    lng: -80.12,
    managing_agency: 'SC Forestry Commission / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'quail', 'dove', 'small-game', 'fox-squirrel'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Longleaf pine restoration area — excellent quail and turkey habitat. ' +
      'Fox squirrel present — PROTECTED, do not harvest. Gray squirrel legal. ' +
      'Turkey: Spring gobblers only, shotgun/archery, shot #4 or smaller. ' +
      'Dove: Managed fields on specific dates. ' +
      'Dog deer hunting: Prohibited. ' +
      'Fishing: Sugar Loaf Mountain Lake — bass, bream, catfish.',
  },
  {
    id: 'sc-harbison-state-forest',
    state: 'SC',
    name: 'Harbison State Forest',
    type: 'State Forest',
    acreage: 2137,
    counties: ['Richland'],
    region: 'Midlands',
    lat: 34.08,
    lng: -81.13,
    managing_agency: 'SC Forestry Commission',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['hiking', 'mountain-biking', 'no-hunting'],
    special_rules:
      'No hunting or fishing. Urban state forest in Columbia metro area. ' +
      'Trails for hiking, mountain biking, and nature study only.',
  },
  {
    id: 'sc-wee-tee-state-forest',
    state: 'SC',
    name: 'Wee Tee State Forest WMA',
    type: 'WMA',
    acreage: 18544,
    counties: ['Williamsburg', 'Georgetown'],
    region: 'PeeDee',
    lat: 33.73,
    lng: -79.47,
    managing_agency: 'SC Forestry Commission / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'small-game', 'dog-hunting'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dog deer hunting: Legal on designated portions — registered dog drives only. ' +
      'Along the Santee River. Known for high deer density. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  // ── CORPS OF ENGINEERS ────────────────────────────────────────────────────
  {
    id: 'sc-hartwell-lake-coe',
    state: 'SC',
    name: 'Hartwell Lake — Corps of Engineers Public Land',
    type: 'Corps of Engineers',
    acreage: 56000,
    counties: ['Anderson', 'Oconee'],
    region: 'Upstate',
    lat: 34.47,
    lng: -82.84,
    managing_agency: 'U.S. Army Corps of Engineers / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'striped-bass', 'crappie', 'catfish'],
    special_rules:
      'Hunting in designated areas only — campgrounds, boat ramps, and day-use areas excluded. ' +
      'SC hunting license and WMA permit required. Zone 1/2 deer season (varies by location). ' +
      'Antler restrictions apply per zone (4-point in Zones 1 & 2). ' +
      'No baiting (Zones 1 & 2). No Sunday hunting on WMA-managed portions. ' +
      '56,000 acres combined SC/GA. ' +
      'Fishing: Excellent striped bass fishery (10/day, no minimum size). ' +
      'Bass: 10/day combined (Hartwell special regulation — higher than statewide 5/day). ' +
      'Crappie: No minimum size, 30/day. ' +
      'Catfish: 25/day blue catfish, max 2 over 32".',
  },
  {
    id: 'sc-thurmond-lake-coe',
    state: 'SC',
    name: 'J. Strom Thurmond Lake — Corps of Engineers Public Land',
    type: 'Corps of Engineers',
    acreage: 70000,
    counties: ['Edgefield', 'McCormick', 'Abbeville'],
    region: 'Western Piedmont',
    lat: 33.67,
    lng: -82.24,
    managing_agency: 'U.S. Army Corps of Engineers / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'quail', 'waterfowl', 'bass', 'striped-bass', 'crappie'],
    special_rules:
      'WMA permit required on SC portions. Zone 2 deer season. ' +
      '4-point antler restriction (Zone 2). No baiting. ' +
      '~56,000 acres public SC/GA combined. ' +
      'Deer, turkey, small game, hog, waterfowl. No hunting in campgrounds/day-use areas. ' +
      'Hog: Legal during open deer/small game seasons, no limit. ' +
      'No Sunday hunting on WMA portions. ' +
      'Fishing: Bass 10/day combined (Thurmond special regulation). ' +
      'Striped bass/hybrid: 10/day. Crappie: 30/day.',
  },
  {
    id: 'sc-russell-lake-coe',
    state: 'SC',
    name: 'Richard B. Russell Lake — Corps of Engineers Public Land',
    type: 'Corps of Engineers',
    acreage: 26650,
    counties: ['Abbeville', 'Anderson'],
    region: 'Western Piedmont / Upstate',
    lat: 34.07,
    lng: -82.60,
    managing_agency: 'U.S. Army Corps of Engineers / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'striped-bass'],
    special_rules:
      'Hunting in designated areas only. WMA permit required. Zone 2 deer season. ' +
      '4-point antler restriction. No baiting. No Sunday hunting on WMA portions. ' +
      'Fishing: Bass 10/day combined (Russell special regulation). ' +
      'Striped bass: 10/day. Good landlocked striped bass fishery.',
  },
  // ── SCDNR WMAs ────────────────────────────────────────────────────────────
  {
    id: 'sc-bear-island',
    state: 'SC',
    name: 'Bear Island WMA',
    type: 'WMA',
    acreage: 12153,
    counties: ['Colleton'],
    region: 'Lowcountry',
    lat: 32.60,
    lng: -80.45,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'waterfowl', 'hog', 'quota-hunt', 'alligator', 'dove'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Gun deer hunts: BY LOTTERY ONLY — annual computer drawing through SCDNR. Multiple hunt dates Oct–Dec. ' +
      'Walk-on archery deer: Available without lottery permit during archery season. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Managed impoundments — premier SC waterfowl destination. ' +
      'Alligator: Public drawing tags may include Bear Island waters. ' +
      'Hog: Legal during open deer seasons, no limit. ' +
      'Turkey: Spring gobblers only, specific WMA dates. ' +
      'Dove: Managed field hunts on specific dates. ' +
      'Check-in/check-out required at main gate. ' +
      'Access: Closed to public except during scheduled hunts and fishing dates.',
  },
  {
    id: 'sc-donnelley',
    state: 'SC',
    name: 'Donnelley WMA',
    type: 'WMA',
    acreage: 8066,
    counties: ['Colleton'],
    region: 'Lowcountry',
    lat: 32.72,
    lng: -80.53,
    managing_agency: 'SCDNR / USFWS (partner)',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'dove', 'waterfowl', 'hog', 'quota-hunt', 'alligator'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Gun deer hunts: BY LOTTERY — annual computer drawing. ' +
      'Walk-on archery available. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'ACE Basin — part of largest undeveloped estuary on East Coast. ' +
      'Dove: Managed fields on specific shoot dates. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only. ' +
      'Alligator: Drawing tags may include Donnelley waters. ' +
      'Check-in/check-out required.',
  },
  {
    id: 'sc-santee-coastal',
    state: 'SC',
    name: 'Santee Coastal Reserve WMA',
    type: 'WMA',
    acreage: 23776,
    counties: ['Charleston', 'Georgetown'],
    region: 'Lowcountry',
    lat: 33.15,
    lng: -79.40,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'alligator'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Primarily walk-on archery deer. Limited gun deer hunts by drawing. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Saltwater impoundments — excellent waterfowl habitat. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Alligator: Public drawing tags may include Santee Coastal waters. ' +
      'Access: Some areas by boat only. Cape Island sub-unit closed to hunting.',
  },
  {
    id: 'sc-woodbury',
    state: 'SC',
    name: 'Woodbury WMA',
    type: 'WMA',
    acreage: 25668,
    counties: ['Marion'],
    region: 'PeeDee',
    lat: 34.05,
    lng: -79.44,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'hog', 'dog-hunting', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dog deer hunting: Legal — registered dog drives on designated dates. ' +
      'All dog drives must be pre-registered with SCDNR. ' +
      'Waterfowl: CATEGORY II — public walk-in during statewide season, no drawing required. ' +
      'Steel shot required for waterfowl. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-bonneau-ferry',
    state: 'SC',
    name: 'Bonneau Ferry WMA',
    type: 'WMA',
    acreage: 10712,
    counties: ['Berkeley'],
    region: 'Lowcountry',
    lat: 33.34,
    lng: -79.98,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'hog', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Adjacent to Lake Moultrie. Good waterfowl habitat. ' +
      'Waterfowl: CATEGORY II — walk-in during statewide season. Steel shot required. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-moultrie-hunt-unit',
    state: 'SC',
    name: 'Moultrie Hunt Unit WMA',
    type: 'WMA',
    acreage: 9773,
    counties: ['Berkeley'],
    region: 'Lowcountry',
    lat: 33.20,
    lng: -80.05,
    managing_agency: 'SCDNR / Santee Cooper',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Managed on Santee Cooper lands around Lake Moultrie. ' +
      'Waterfowl: Category II — walk-in during statewide season. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Access: Some areas only accessible by boat from Lake Moultrie.',
  },
  {
    id: 'sc-fants-grove',
    state: 'SC',
    name: "Fant's Grove WMA",
    type: 'WMA',
    acreage: 7444,
    counties: ['Anderson', 'Oconee', 'Pickens'],
    region: 'Upstate / Mountain',
    lat: 34.43,
    lng: -82.91,
    managing_agency: 'Clemson University / U.S. Army Corps of Engineers / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Managed on Lake Hartwell shoreline. Clemson University-owned. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1. ' +
      'Access: Closed during Clemson home football games.',
  },
  {
    id: 'sc-keowee',
    state: 'SC',
    name: 'Keowee WMA',
    type: 'WMA',
    acreage: 4930,
    counties: ['Oconee', 'Pickens'],
    region: 'Upstate / Mountain',
    lat: 34.78,
    lng: -82.93,
    managing_agency: 'Clemson University / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Clemson University-owned. Lake Keowee area. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-mountain-hunt-unit',
    state: 'SC',
    name: 'Mountain Hunt Unit WMA',
    type: 'WMA',
    acreage: 154249,
    counties: ['Greenville', 'Oconee', 'Pickens'],
    region: 'Upstate / Mountain',
    lat: 35.01,
    lng: -82.70,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'bear', 'turkey', 'trout', 'small-game', 'grouse'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction: Antlered deer must have at least 4 points on one side (1" or longer). ' +
      'One "bonus" antlered tag per season allows harvest of any legal buck. ' +
      'Either-sex: Archery only Sept 15–Oct 1 and last 2 weeks of firearms. Bucks only remainder. ' +
      'Overlaps Sumter NF Andrew Pickens District. ' +
      'Bear: No open season — protected in SC. Report sightings. ' +
      'Ruffed grouse: Oct 15–Mar 1, 3/day. Mountain-only species. ' +
      'Turkey: Spring gobblers only. ' +
      'Trout: Delayed harvest streams, catch-and-release sections, and put-and-take sections. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-western-piedmont-hunt-unit',
    state: 'SC',
    name: 'Western Piedmont Hunt Unit WMA',
    type: 'WMA',
    acreage: 146561,
    counties: ['Abbeville', 'Edgefield', 'Greenwood', 'McCormick', 'Saluda'],
    region: 'Western Piedmont',
    lat: 33.97,
    lng: -82.35,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 2). Zone 2 deer season. ' +
      '4-point antler restriction. ' +
      'Overlaps Sumter NF Long Cane District. ' +
      'Either-sex: Archery Sept 1–Oct 1 and specific firearms dates. Bucks only remainder. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1. Rabbit/quail Nov 26–Mar 1.',
  },
  {
    id: 'sc-central-piedmont-hunt-unit',
    state: 'SC',
    name: 'Central Piedmont Hunt Unit WMA',
    type: 'WMA',
    acreage: 183706,
    counties: ['Cherokee', 'Chester', 'Fairfield', 'Lancaster', 'Laurens', 'Newberry', 'Spartanburg', 'Union', 'York'],
    region: 'Central Piedmont',
    lat: 34.58,
    lng: -81.55,
    managing_agency: 'USDA Forest Service / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'waterfowl'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction (Zone 3). Either-sex entire season. ' +
      'Largest hunt unit in SC. Overlaps Sumter NF Enoree District. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1. Rabbit/quail Nov 26–Mar 1.',
  },
  {
    id: 'sc-belfast',
    state: 'SC',
    name: 'Belfast WMA',
    type: 'WMA',
    acreage: 4664,
    counties: ['Laurens', 'Newberry'],
    region: 'Piedmont',
    lat: 34.24,
    lng: -81.79,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-crackerneck',
    state: 'SC',
    name: 'Crackerneck WMA and Ecological Reserve',
    type: 'WMA',
    acreage: 10600,
    counties: ['Aiken'],
    region: 'Midlands',
    lat: 33.40,
    lng: -81.65,
    managing_agency: 'U.S. Department of Energy / SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'dove', 'small-game', 'quota-hunt'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Located on Savannah River Site DOE land — special access procedures. ' +
      'Deer hunts: Quota hunts on specific dates. Apply through SCDNR drawing. ' +
      'Dove: Managed fields on specific dates. ' +
      'Turkey: Spring gobblers only, specific dates. ' +
      'Access: Open only on designated hunt dates. Photo ID required at gate. ' +
      'No overnight access. Check-in/check-out required.',
  },
  {
    id: 'sc-mccalla',
    state: 'SC',
    name: 'McCalla WMA',
    type: 'WMA',
    acreage: 5667,
    counties: ['Abbeville'],
    region: 'Western Piedmont',
    lat: 34.09,
    lng: -82.43,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 2). Zone 2 deer season. ' +
      '4-point antler restriction. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-liberty-hill',
    state: 'SC',
    name: 'Liberty Hill WMA',
    type: 'WMA',
    acreage: 7876,
    counties: ['Kershaw', 'Lancaster'],
    region: 'Midlands / PeeDee',
    lat: 34.35,
    lng: -80.71,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'dove', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dove: Managed fields on specific dates. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-forty-acre-rock',
    state: 'SC',
    name: 'Forty Acre Rock Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 2965,
    counties: ['Lancaster'],
    region: 'Piedmont',
    lat: 34.55,
    lng: -80.60,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Heritage Preserve with rare granite outcrop ecosystem. ' +
      'Sensitive plant communities — stay on trails when not hunting. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-hamilton-ridge',
    state: 'SC',
    name: 'Hamilton Ridge WMA',
    type: 'WMA',
    acreage: 13281,
    counties: ['Hampton'],
    region: 'Lowcountry',
    lat: 32.87,
    lng: -81.15,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'hog', 'small-game', 'dog-hunting'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dog deer hunting: Legal — registered dog drives on specific dates. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-coosawhatchie',
    state: 'SC',
    name: 'Coosawhatchie WMA',
    type: 'WMA',
    acreage: 12168,
    counties: ['Jasper'],
    region: 'Lowcountry',
    lat: 32.65,
    lng: -81.10,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'small-game', 'dog-hunting'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dog deer hunting: Legal on designated portions — registered dog drives. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-palachucola',
    state: 'SC',
    name: 'Palachucola WMA',
    type: 'WMA',
    acreage: 6757,
    counties: ['Hampton', 'Jasper'],
    region: 'Lowcountry',
    lat: 32.73,
    lng: -81.25,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'hog', 'small-game', 'dog-hunting'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dog deer hunting: Legal — registered dog drives on specific dates. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-webb-wildlife-center',
    state: 'SC',
    name: 'Webb Wildlife Center WMA',
    type: 'WMA',
    acreage: 5866,
    counties: ['Hampton'],
    region: 'Lowcountry',
    lat: 32.92,
    lng: -81.07,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'dove', 'quail', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Notable quail management program — among best quail habitat in SC. ' +
      'Quail: Nov 26–Mar 1, 12/day. ' +
      'Dove: Managed fields on specific dates. ' +
      'Turkey: Spring gobblers only. ' +
      'SCDNR research station on-site.',
  },
  {
    id: 'sc-waccamaw-river-hp',
    state: 'SC',
    name: 'Waccamaw River Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 9049,
    counties: ['Horry'],
    region: 'PeeDee / Grand Strand',
    lat: 33.98,
    lng: -78.83,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'hog'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Along Waccamaw River — good waterfowl habitat. ' +
      'Waterfowl: Category II — walk-in during statewide season. Steel shot required. ' +
      'Hog: Legal during open seasons, no limit.',
  },
  {
    id: 'sc-lewis-ocean-bay-hp',
    state: 'SC',
    name: 'Lewis Ocean Bay Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 10450,
    counties: ['Horry'],
    region: 'PeeDee / Grand Strand',
    lat: 33.82,
    lng: -79.01,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'bear', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Rare Carolina bay ecosystem. One of few SC black bear populations — ' +
      'BEAR IS PROTECTED, no open season. Report all bear sightings to SCDNR. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-little-pee-dee-hp',
    state: 'SC',
    name: 'Little Pee Dee Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 10444,
    counties: ['Horry', 'Marion'],
    region: 'PeeDee',
    lat: 34.10,
    lng: -79.18,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'small-game', 'dog-hunting'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Along Little Pee Dee River. ' +
      'Dog deer hunting: Legal on designated portions. ' +
      'Waterfowl: Category II — walk-in during statewide season.',
  },
  {
    id: 'sc-marsh-wma',
    state: 'SC',
    name: 'Marsh WMA',
    type: 'WMA',
    acreage: 8660,
    counties: ['Marion'],
    region: 'PeeDee',
    lat: 34.01,
    lng: -79.63,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'small-game', 'dog-hunting'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Dog deer hunting: Legal on designated portions. ' +
      'Hog: Legal during open seasons, no limit.',
  },
  {
    id: 'sc-samworth',
    state: 'SC',
    name: 'Samworth WMA',
    type: 'WMA',
    acreage: 1588,
    counties: ['Georgetown'],
    region: 'Lowcountry',
    lat: 33.44,
    lng: -79.37,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'waterfowl', 'quota-hunt'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Tidal freshwater area — excellent duck habitat. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-santee-delta',
    state: 'SC',
    name: 'Santee Delta WMA',
    type: 'WMA',
    acreage: 1899,
    counties: ['Georgetown'],
    region: 'Lowcountry',
    lat: 33.13,
    lng: -79.25,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'waterfowl', 'fishing'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Delta habitat at Santee River mouth. ' +
      'Fishing: Tidal river and creek access.',
  },
  {
    id: 'sc-canal-wma',
    state: 'SC',
    name: 'Canal WMA',
    type: 'WMA',
    acreage: 2491,
    counties: ['Berkeley'],
    region: 'Lowcountry',
    lat: 33.28,
    lng: -79.92,
    managing_agency: 'SCDNR / Santee Cooper',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'waterfowl', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Santee-Cooper Canal area.',
  },
  {
    id: 'sc-hatchery-wma',
    state: 'SC',
    name: 'Hatchery WMA',
    type: 'WMA',
    acreage: 2400,
    counties: ['Berkeley'],
    region: 'Lowcountry',
    lat: 33.25,
    lng: -79.85,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'waterfowl', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Adjacent to Bonneau Ferry.',
  },
  {
    id: 'sc-botany-bay-hp',
    state: 'SC',
    name: 'Botany Bay Plantation Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 4687,
    counties: ['Charleston'],
    region: 'Lowcountry',
    lat: 32.53,
    lng: -80.31,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'shorebird', 'quota-hunt'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Deer: Quota hunts by drawing. Walk-on archery available. ' +
      'Waterfowl: CATEGORY I — PERMIT ONLY (annual computer drawing). ' +
      'Edisto Island area. Beachfront access for fishing/nature viewing. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Check-in/check-out required. ' +
      'NOTE: Public beach access available year-round on scheduled days — separate from hunting.',
  },
  {
    id: 'sc-edisto-river-wma',
    state: 'SC',
    name: 'Edisto River WMA',
    type: 'WMA',
    acreage: 1394,
    counties: ['Dorchester'],
    region: 'Lowcountry',
    lat: 32.99,
    lng: -80.52,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'fishing'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Edisto River bottomland — subject to flooding. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Fishing: Edisto River — red breast sunfish, bass, catfish.',
  },
  {
    id: 'sc-st-helena-sound-hp',
    state: 'SC',
    name: 'St. Helena Sound Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 10302,
    counties: ['Beaufort'],
    region: 'Lowcountry / Coastal',
    lat: 32.38,
    lng: -80.45,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'saltwater-fishing', 'alligator'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Coastal barrier islands accessible by boat — check tide tables. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Alligator: Public drawing tags may include these waters. ' +
      'Saltwater fishing: Red drum, flounder, trout from boats and banks.',
  },
  {
    id: 'sc-turtle-island',
    state: 'SC',
    name: 'Turtle Island WMA',
    type: 'WMA',
    acreage: 1667,
    counties: ['Jasper'],
    region: 'Lowcountry',
    lat: 32.12,
    lng: -80.96,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'alligator'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Savannah River delta area — boat access only. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Alligator: Public drawing tags may include these waters.',
  },
  {
    id: 'sc-tillman-sand-ridge-hp',
    state: 'SC',
    name: 'Tillman Sand Ridge Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 1437,
    counties: ['Jasper'],
    region: 'Lowcountry',
    lat: 32.26,
    lng: -81.05,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Rare sandhill scrub habitat — gopher tortoise present. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-victoria-bluff-hp',
    state: 'SC',
    name: 'Victoria Bluff Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 1113,
    counties: ['Beaufort'],
    region: 'Lowcountry',
    lat: 32.19,
    lng: -80.79,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Bluffton/Hilton Head corridor — limited parking. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-great-pee-dee-hp',
    state: 'SC',
    name: 'Great Pee Dee Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 2725,
    counties: ['Darlington'],
    region: 'PeeDee',
    lat: 34.25,
    lng: -79.74,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Great Pee Dee River bottomland — subject to flooding. ' +
      'Waterfowl: CATEGORY II — walk-in during statewide season. Steel shot required.',
  },
  {
    id: 'sc-manchester-dove-bland',
    state: 'SC',
    name: 'Bland Tract Dove Field, Manchester State Forest WMA',
    type: 'WMA',
    acreage: 640,
    counties: ['Sumter'],
    region: 'Midlands',
    lat: 33.97,
    lng: -80.39,
    managing_agency: 'SC Forestry Commission / SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['dove', 'small-game'],
    special_rules:
      'WMA permit required. Managed dove fields within Manchester State Forest. ' +
      'Dove shoot dates posted annually — typically opening weekend of each split. ' +
      'First-come walk-in or drawing depending on date. ' +
      'Shotgun only, unplugged prohibited (3-shell max). ' +
      'No Sunday hunting.',
  },
  {
    id: 'sc-oak-lea',
    state: 'SC',
    name: 'Oak Lea WMA',
    type: 'WMA',
    acreage: 2000,
    counties: ['Clarendon'],
    region: 'Midlands',
    lat: 33.59,
    lng: -80.22,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-hickory-top',
    state: 'SC',
    name: 'Hickory Top WMA',
    type: 'WMA',
    acreage: 1105,
    counties: ['Clarendon'],
    region: 'Midlands',
    lat: 33.55,
    lng: -80.05,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-mcbee',
    state: 'SC',
    name: 'McBee WMA',
    type: 'WMA',
    acreage: 1221,
    counties: ['Chesterfield'],
    region: 'PeeDee',
    lat: 34.45,
    lng: -80.27,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-aiken-gopher-tortoise-hp',
    state: 'SC',
    name: 'Aiken Gopher Tortoise Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 1782,
    counties: ['Aiken'],
    region: 'Midlands',
    lat: 33.52,
    lng: -81.73,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game', 'quail'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Gopher tortoise habitat — longleaf pine ecosystem. GOPHER TORTOISE PROTECTED. ' +
      'Quail: Nov 26–Mar 1. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-wateree-hp',
    state: 'SC',
    name: 'Wateree River Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 3674,
    counties: ['Richland'],
    region: 'Midlands',
    lat: 34.08,
    lng: -80.72,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Wateree River bottomland — subject to flooding. ' +
      'Waterfowl: Category II — walk-in during statewide season.',
  },
  {
    id: 'sc-broad-river-waterfowl',
    state: 'SC',
    name: 'Broad River Waterfowl Area WMA',
    type: 'WMA',
    acreage: 640,
    counties: ['Fairfield'],
    region: 'Piedmont',
    lat: 34.32,
    lng: -81.28,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['waterfowl', 'deer', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'Waterfowl: CATEGORY II — walk-in during statewide season. Steel shot required. ' +
      'Primary purpose is waterfowl management on Broad River. ' +
      'Deer: Walk-in archery and firearms per Zone 3 dates.',
  },
  {
    id: 'sc-parr-hydro',
    state: 'SC',
    name: 'Parr Hydroelectric Project WMA',
    type: 'WMA',
    acreage: 4400,
    counties: ['Fairfield', 'Newberry'],
    region: 'Piedmont',
    lat: 34.24,
    lng: -81.41,
    managing_agency: 'Dominion Energy / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'bass', 'crappie'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Parr/Monticello Reservoir shoreline. ' +
      'Turkey: Spring gobblers only. ' +
      'Fishing: Monticello Reservoir — excellent bass and crappie. ' +
      'Parr Reservoir — seasonal drawdowns affect fishing access.',
  },
  {
    id: 'sc-worth-mountain',
    state: 'SC',
    name: 'Worth Mountain WMA',
    type: 'WMA',
    acreage: 1643,
    counties: ['York'],
    region: 'Piedmont',
    lat: 35.00,
    lng: -81.34,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-draper',
    state: 'SC',
    name: 'Draper WMA',
    type: 'WMA',
    acreage: 806,
    counties: ['York'],
    region: 'Piedmont',
    lat: 35.01,
    lng: -81.04,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-santee-cooper',
    state: 'SC',
    name: 'Santee Cooper WMA',
    type: 'WMA',
    acreage: 3144,
    counties: ['Orangeburg'],
    region: 'Midlands',
    lat: 33.47,
    lng: -80.51,
    managing_agency: 'SCDNR / Santee Cooper',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'bass', 'crappie', 'catfish'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Lakes Marion/Moultrie shoreline. ' +
      'Waterfowl: CATEGORY II — walk-in during statewide season. Steel shot required. ' +
      'Turkey: Spring gobblers only. ' +
      'Fishing: Access to Lakes Marion/Moultrie — premier SC freshwater fishing. ' +
      'Bass 5/day (14" minimum on Marion/Moultrie). Crappie 20/day (8" minimum). ' +
      'Blue catfish 25/day, max 1 over 36".',
  },
  {
    id: 'sc-pee-dee-station-site',
    state: 'SC',
    name: 'Pee Dee Station Site WMA',
    type: 'WMA',
    acreage: 2701,
    counties: ['Florence'],
    region: 'PeeDee',
    lat: 34.08,
    lng: -79.65,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Pee Dee River bottomland. ' +
      'Waterfowl: CATEGORY II — walk-in during statewide season.',
  },
  {
    id: 'sc-cartwheel-bay-hp',
    state: 'SC',
    name: 'Cartwheel Bay Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 568,
    counties: ['Horry'],
    region: 'Grand Strand',
    lat: 33.88,
    lng: -78.87,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'Rare Carolina bay ecosystem. Small area — limited parking. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-dungannon-hp',
    state: 'SC',
    name: 'Dungannon Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 730,
    counties: ['Charleston'],
    region: 'Lowcountry',
    lat: 32.80,
    lng: -80.21,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-delta-south',
    state: 'SC',
    name: 'Delta South WMA',
    type: 'WMA',
    acreage: 2174,
    counties: ['Union'],
    region: 'Piedmont',
    lat: 34.74,
    lng: -81.56,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-santee-island',
    state: 'SC',
    name: 'Santee Island WMA',
    type: 'WMA',
    acreage: 1861,
    counties: ['Georgetown'],
    region: 'Lowcountry',
    lat: 33.18,
    lng: -79.30,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'North Santee River island — boat access may be required during high water. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Waterfowl: Category II — walk-in during statewide season.',
  },
  {
    id: 'sc-south-fenwick',
    state: 'SC',
    name: 'South Fenwick WMA',
    type: 'WMA',
    acreage: 427,
    counties: ['Colleton'],
    region: 'Lowcountry',
    lat: 32.59,
    lng: -80.27,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-old-island-hp',
    state: 'SC',
    name: 'Old Island Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 400,
    counties: ['Beaufort'],
    region: 'Lowcountry',
    lat: 32.31,
    lng: -80.64,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'hog', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Port Royal Sound area. ' +
      'Hog: Legal during open seasons, no limit.',
  },
  {
    id: 'sc-bobwhite-hills',
    state: 'SC',
    name: 'Bobwhite Hills WMA',
    type: 'WMA',
    acreage: 790,
    counties: ['Lee', 'Sumter'],
    region: 'Midlands',
    lat: 34.02,
    lng: -80.13,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'quail', 'dove', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'Managed quail habitat — among best in the state. ' +
      'Quail: Nov 26–Mar 1, 12/day. ' +
      'Dove: Managed fields on specific dates. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-james-island-county-park',
    state: 'SC',
    name: 'James Island County Park Archery Range/WMA',
    type: 'WMA',
    acreage: 643,
    counties: ['Charleston'],
    region: 'Lowcountry',
    lat: 32.73,
    lng: -79.97,
    managing_agency: 'Charleston County Parks / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'archery'],
    special_rules:
      'Archery-only deer management hunts on designated dates. ' +
      'Apply through Charleston County Parks. No Sunday hunting. ' +
      'Urban deer management program. Zone 6.',
  },
  {
    id: 'sc-jocassee-gorges',
    state: 'SC',
    name: 'Jocassee Gorges WMA',
    type: 'WMA',
    acreage: 43547,
    counties: ['Oconee', 'Pickens'],
    region: 'Mountain / Upstate',
    lat: 34.98,
    lng: -82.85,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'bear', 'trout', 'small-game', 'grouse'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Bear: No open season — protected. Report sightings. ' +
      'Ruffed grouse: Oct 15–Mar 1, 3/day. ' +
      'Trout: Multiple streams — delayed harvest and put-and-take sections. ' +
      'Thompson River, Whitewater River, Eastatoe Creek — premier trout waters. ' +
      'Turkey: Spring gobblers only. ' +
      'Access: Some roads rough/4WD recommended. Gate closures in wet weather.',
  },
  {
    id: 'sc-piedmont-forestry-center',
    state: 'SC',
    name: 'Piedmont Forestry Center WMA',
    type: 'WMA',
    acreage: 1360,
    counties: ['Oconee'],
    region: 'Upstate',
    lat: 34.73,
    lng: -83.05,
    managing_agency: 'SC Forestry Commission / SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Turkey: Spring gobblers only.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// HUNTING SEASONS
// ═══════════════════════════════════════════════════════════════════════════
//
// SC deer seasons vary by Game Zone. Dates below are approximate for
// 2025-2026 based on established SC patterns. Verify with SCDNR annually.
//
// Zone 1 (Mountain): Oct 1–Jan 1 (archery Sept 15–Oct 1)
// Zone 2 (W. Piedmont): Sept 1–Jan 1 (archery Sept 1–Oct 1)
// Zone 3 (Central Piedmont): Aug 15–Jan 1
// Zone 4 (Upper Coastal Plain): Aug 15–Jan 1
// Zone 5 (PeeDee): Aug 15–Jan 1
// Zone 6 (Lowcountry/Coastal): Aug 15–Jan 1
// ═══════════════════════════════════════════════════════════════════════════

export const SC_SEASONS: HuntingSeason[] = [
  // ── ZONE 1 (Mountain) — Mountain Hunt Unit / Jocassee Gorges / Fant's Grove / Keowee ──
  { id: 'sc-deer-z1-archery', state: 'SC', land_id: 'sc-mountain-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-09-15', end_date: '2025-10-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA (max 2 antlered). 4-point rule: at least 4 points on one side, 1" or longer. One bonus buck tag exempt from point restriction.', notes: 'Zone 1 archery — either-sex. No baiting. No Sunday hunting on WMA.', tags: ['deer', 'archery', 'zone-1'] },
  { id: 'sc-deer-z1-firearms-bucks', state: 'SC', land_id: 'sc-mountain-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-10-02', end_date: '2025-12-15', quota_required: false, buck_only: true, bag_limit: '2 antlered/day, 5 total/season on WMA. 4-point rule applies.', notes: 'Zone 1 firearms — BUCKS ONLY. All legal firearms. No baiting. No dogs for deer.', tags: ['deer', 'rifle', 'zone-1'] },
  { id: 'sc-deer-z1-firearms-eithersex', state: 'SC', land_id: 'sc-mountain-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-12-16', end_date: '2026-01-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. 4-point rule on antlered.', notes: 'Zone 1 late-season either-sex firearms period. Last ~2 weeks of season.', tags: ['deer', 'rifle', 'zone-1', 'either-sex'] },

  // ── ZONE 2 (Western Piedmont) — Long Cane / Western Piedmont Hunt Unit / McCalla ──
  { id: 'sc-deer-z2-archery', state: 'SC', land_id: 'sc-western-piedmont-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-09-01', end_date: '2025-10-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. 4-point rule applies.', notes: 'Zone 2 archery — either-sex. No baiting. No Sunday hunting on WMA.', tags: ['deer', 'archery', 'zone-2'] },
  { id: 'sc-deer-z2-firearms-bucks', state: 'SC', land_id: 'sc-western-piedmont-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-10-02', end_date: '2025-12-15', quota_required: false, buck_only: true, bag_limit: '2 antlered/day, 5 total/season on WMA. 4-point rule.', notes: 'Zone 2 firearms — BUCKS ONLY majority of season. No baiting. No dogs for deer.', tags: ['deer', 'rifle', 'zone-2'] },
  { id: 'sc-deer-z2-firearms-eithersex', state: 'SC', land_id: 'sc-western-piedmont-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-12-16', end_date: '2026-01-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA.', notes: 'Zone 2 late-season either-sex. Also specific either-sex dates earlier in season (check SCDNR).', tags: ['deer', 'rifle', 'zone-2', 'either-sex'] },

  // ── ZONE 3 (Central Piedmont) — Central Piedmont Hunt Unit / Enoree / Belfast / Crackerneck ──
  { id: 'sc-deer-z3-archery', state: 'SC', land_id: 'sc-central-piedmont-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-08-15', end_date: '2025-10-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 3 archery — either-sex entire season. No baiting on WMA. No Sunday hunting on WMA.', tags: ['deer', 'archery', 'zone-3', 'either-sex'] },
  { id: 'sc-deer-z3-firearms', state: 'SC', land_id: 'sc-central-piedmont-hunt-unit', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-10-02', end_date: '2026-01-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 3 firearms — either-sex entire season. All legal firearms. No dogs for deer in Zone 3.', tags: ['deer', 'rifle', 'zone-3', 'either-sex'] },

  // ── ZONE 4 (Upper Coastal Plain) — Manchester SF / Sand Hills SF / Liberty Hill / Oak Lea ──
  { id: 'sc-deer-z4-archery', state: 'SC', land_id: 'sc-manchester-state-forest', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-08-15', end_date: '2025-09-30', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 4 archery — either-sex. No baiting on WMA. No Sunday hunting on WMA.', tags: ['deer', 'archery', 'zone-4', 'either-sex'] },
  { id: 'sc-deer-z4-firearms', state: 'SC', land_id: 'sc-manchester-state-forest', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-10-01', end_date: '2026-01-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 4 firearms — either-sex entire season. No dogs for deer on Manchester SF.', tags: ['deer', 'rifle', 'zone-4', 'either-sex'] },

  // ── ZONE 5 (PeeDee) — Woodbury / Wee Tee / Waccamaw / Lewis Ocean Bay / Little Pee Dee ──
  { id: 'sc-deer-z5-archery', state: 'SC', land_id: 'sc-woodbury', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-08-15', end_date: '2025-08-31', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 5 early archery — either-sex. No baiting on WMA.', tags: ['deer', 'archery', 'zone-5', 'either-sex'] },
  { id: 'sc-deer-z5-firearms', state: 'SC', land_id: 'sc-woodbury', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-09-01', end_date: '2026-01-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 5 firearms — either-sex entire season. Dog deer hunting legal on designated WMA portions (registered drives only).', tags: ['deer', 'rifle', 'zone-5', 'either-sex', 'dog-hunting'] },

  // ── ZONE 6 (Lowcountry/Coastal) — Francis Marion NF / Bear Island / Donnelley / Bonneau Ferry ──
  { id: 'sc-deer-z6-archery', state: 'SC', land_id: 'sc-francis-marion-nf', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-08-15', end_date: '2025-08-31', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 6 early archery — either-sex. No baiting on WMA. No Sunday hunting.', tags: ['deer', 'archery', 'zone-6', 'either-sex'] },
  { id: 'sc-deer-z6-combined', state: 'SC', land_id: 'sc-francis-marion-nf', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-09-01', end_date: '2026-01-01', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA. No antler point restriction.', notes: 'Zone 6 combined firearms — either-sex entire season. Dog drive hunts on Francis Marion on SCDNR-scheduled dates (registration required).', tags: ['deer', 'rifle', 'zone-6', 'either-sex', 'dog-hunting'] },

  // ── BEAR ISLAND — WMA-specific deer hunts ──
  { id: 'sc-deer-bear-island-archery', state: 'SC', land_id: 'sc-bear-island', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-09-01', end_date: '2025-10-15', quota_required: false, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA.', notes: 'Walk-on archery — no lottery permit needed. Either-sex.', tags: ['deer', 'archery', 'zone-6'] },
  { id: 'sc-deer-bear-island-firearms', state: 'SC', land_id: 'sc-bear-island', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-10-16', end_date: '2025-12-31', quota_required: true, buck_only: false, bag_limit: '2 antlered/day, 5 total/season on WMA.', notes: 'LOTTERY REQUIRED — gun deer hunts by annual computer drawing through SCDNR. Multiple hunt dates.', tags: ['deer', 'rifle', 'quota', 'zone-6'] },

  // ── SANTEE NWR — refuge-specific hunts ──
  { id: 'sc-deer-santee-nwr-archery', state: 'SC', land_id: 'sc-santee-nwr', species: 'White-tailed Deer', weapon_type: 'Archery', start_date: '2025-09-20', end_date: '2025-10-04', quota_required: false, buck_only: false, bag_limit: 'Refuge limits — check with USFWS.', notes: 'Cuddo and Pine Island Units. Archery only. Free refuge permit required. Check-in required.', tags: ['deer', 'archery', 'nwr'] },
  { id: 'sc-deer-santee-nwr-primitive', state: 'SC', land_id: 'sc-santee-nwr', species: 'White-tailed Deer', weapon_type: 'Muzzleloader', start_date: '2025-10-17', end_date: '2025-10-19', quota_required: false, buck_only: false, bag_limit: 'Refuge limits.', notes: 'Primitive weapons only. Cuddo and Pine Island Units.', tags: ['deer', 'muzzleloader', 'nwr'] },
  { id: 'sc-deer-santee-nwr-primitive-2', state: 'SC', land_id: 'sc-santee-nwr', species: 'White-tailed Deer', weapon_type: 'Muzzleloader', start_date: '2025-10-31', end_date: '2025-11-02', quota_required: false, buck_only: false, bag_limit: 'Refuge limits.', notes: 'Primitive weapons only, second window. Cuddo and Pine Island Units.', tags: ['deer', 'muzzleloader', 'nwr'] },
  { id: 'sc-deer-santee-nwr-youth', state: 'SC', land_id: 'sc-santee-nwr', species: 'White-tailed Deer', weapon_type: 'Rifle', start_date: '2025-10-25', end_date: '2025-10-26', quota_required: false, buck_only: false, bag_limit: 'Refuge limits.', notes: 'Youth hunt — Bluff Unit. Youth under 18 with licensed adult.', tags: ['deer', 'youth', 'nwr'] },

  // ── TURKEY — statewide spring season ──
  { id: 'sc-turkey-spring-statewide', state: 'SC', species: 'Wild Turkey (Gobbler)', weapon_type: 'Shotgun', start_date: '2026-04-01', end_date: '2026-05-01', quota_required: false, buck_only: false, bag_limit: '2 gobblers/day, 3/season statewide total. GOBBLERS ONLY — hens fully protected.', notes: 'Shotgun (20 ga+), archery, or crossbow. Shot size #4 or smaller for shotgun. No rifles. Shooting hours: 30 min before sunrise to noon first 2 weeks, then sunrise to sunset. Call SCDNR for exact dates.', tags: ['turkey', 'spring', 'gobbler'] },
  { id: 'sc-turkey-youth', state: 'SC', species: 'Wild Turkey (Gobbler)', weapon_type: 'Shotgun', start_date: '2026-03-28', end_date: '2026-03-29', quota_required: false, buck_only: false, bag_limit: '1 gobbler. Youth under 18 only, with licensed adult.', notes: 'Youth turkey weekend — gobblers only. Same weapon/shot restrictions as regular season.', tags: ['turkey', 'spring', 'youth'] },
  { id: 'sc-turkey-francis-marion', state: 'SC', land_id: 'sc-francis-marion-nf', species: 'Wild Turkey (Gobbler)', weapon_type: 'Shotgun', start_date: '2026-04-01', end_date: '2026-05-01', quota_required: false, buck_only: false, bag_limit: '2 gobblers/day, 3/season. Gobblers only.', notes: 'Many sub-areas Thu–Sat only (check SCDNR WMA schedule). No Sunday hunting. Shot #4 or smaller.', tags: ['turkey', 'spring', 'nf'] },

  // ── DOVE — split season ──
  { id: 'sc-dove-split-1', state: 'SC', species: 'Mourning Dove', weapon_type: 'Shotgun', start_date: '2025-09-01', end_date: '2025-10-10', quota_required: false, bag_limit: '15/day, 45 possession. Shotgun only, 3-shell max (unplugged prohibited).', notes: 'Split 1. Managed dove fields on WMAs (Manchester Bland Tract, Sand Hills, Webb, Crackerneck, others) — specific shoot dates posted by SCDNR.', tags: ['dove', 'shotgun', 'migratory'] },
  { id: 'sc-dove-split-2', state: 'SC', species: 'Mourning Dove', weapon_type: 'Shotgun', start_date: '2025-11-08', end_date: '2025-11-29', quota_required: false, bag_limit: '15/day, 45 possession.', notes: 'Split 2.', tags: ['dove', 'shotgun', 'migratory'] },
  { id: 'sc-dove-split-3', state: 'SC', species: 'Mourning Dove', weapon_type: 'Shotgun', start_date: '2025-12-18', end_date: '2026-01-15', quota_required: false, bag_limit: '15/day, 45 possession.', notes: 'Split 3.', tags: ['dove', 'shotgun', 'migratory'] },

  // ── WATERFOWL — duck season (approximate, set by federal framework) ──
  { id: 'sc-duck-split-1', state: 'SC', species: 'Ducks', weapon_type: 'Shotgun', start_date: '2025-11-15', end_date: '2025-11-29', quota_required: false, bag_limit: '6/day aggregate (species restrictions per federal framework: max 4 mallards [2 hens], 3 wood ducks, 2 redheads, 2 scaup, 1 canvasback, 1 pintail, 1 black duck, 1 mottled duck). Steel/non-toxic shot REQUIRED.', notes: 'Split 1. Federal duck stamp + SC migratory bird permit required. Category I WMAs require additional drawing permit. Category II WMAs: walk-in, no drawing.', tags: ['duck', 'waterfowl', 'shotgun', 'migratory'] },
  { id: 'sc-duck-split-2', state: 'SC', species: 'Ducks', weapon_type: 'Shotgun', start_date: '2025-12-06', end_date: '2026-01-31', quota_required: false, bag_limit: '6/day aggregate. Same species restrictions. Steel/non-toxic shot REQUIRED.', notes: 'Split 2. Shooting hours: 30 min before sunrise to sunset. No electronic calls.', tags: ['duck', 'waterfowl', 'shotgun', 'migratory'] },
  { id: 'sc-teal-early', state: 'SC', species: 'Teal', weapon_type: 'Shotgun', start_date: '2025-09-13', end_date: '2025-09-28', quota_required: false, bag_limit: '6 teal/day. Blue-winged, green-winged, and cinnamon teal only.', notes: 'Early teal season. Steel/non-toxic shot required. Federal duck stamp required.', tags: ['teal', 'waterfowl', 'shotgun', 'migratory'] },
  { id: 'sc-goose-early', state: 'SC', species: 'Canada Geese (Resident)', weapon_type: 'Shotgun', start_date: '2025-09-01', end_date: '2025-09-25', quota_required: false, bag_limit: '15 Canada geese/day.', notes: 'Early resident Canada goose season. Steel/non-toxic shot required.', tags: ['goose', 'waterfowl', 'shotgun', 'migratory'] },
  { id: 'sc-goose-regular', state: 'SC', species: 'Geese', weapon_type: 'Shotgun', start_date: '2025-11-15', end_date: '2026-02-15', quota_required: false, bag_limit: '5 Canada geese/day, 20 snow/blue geese/day. Steel/non-toxic shot required.', notes: 'Regular goose season. Concurrent with duck season. Light goose conservation order may extend through March.', tags: ['goose', 'waterfowl', 'shotgun', 'migratory'] },
  { id: 'sc-coot', state: 'SC', species: 'Coot', weapon_type: 'Shotgun', start_date: '2025-11-15', end_date: '2026-01-31', quota_required: false, bag_limit: '15/day. Steel/non-toxic shot required.', notes: 'Concurrent with duck season.', tags: ['coot', 'waterfowl', 'shotgun'] },
  { id: 'sc-woodcock', state: 'SC', species: 'Woodcock', weapon_type: 'Shotgun', start_date: '2025-12-18', end_date: '2026-01-31', quota_required: false, bag_limit: '3/day.', notes: 'HIP registration required.', tags: ['woodcock', 'shotgun', 'migratory'] },
  { id: 'sc-snipe', state: 'SC', species: 'Wilson\'s Snipe', weapon_type: 'Shotgun', start_date: '2025-11-01', end_date: '2026-02-28', quota_required: false, bag_limit: '8/day.', notes: 'HIP registration required.', tags: ['snipe', 'shotgun', 'migratory'] },

  // ── SMALL GAME ──
  { id: 'sc-squirrel', state: 'SC', species: 'Gray Squirrel / Fox Squirrel', weapon_type: 'Rifle', start_date: '2025-10-01', end_date: '2026-03-01', quota_required: false, bag_limit: '10/day. NOTE: Fox squirrel PROTECTED on some WMAs (Sand Hills SF, others) — gray squirrel only.', notes: '.22 rimfire, shotgun, or archery. No Sunday hunting on WMAs.', tags: ['squirrel', 'small-game'] },
  { id: 'sc-rabbit', state: 'SC', species: 'Rabbit (Cottontail & Marsh)', weapon_type: 'Shotgun', start_date: '2025-11-26', end_date: '2026-03-01', quota_required: false, bag_limit: '5/day.', notes: 'Dogs allowed for rabbit. Shotgun or .22 rimfire.', tags: ['rabbit', 'small-game'] },
  { id: 'sc-quail', state: 'SC', species: 'Bobwhite Quail', weapon_type: 'Shotgun', start_date: '2025-11-26', end_date: '2026-03-01', quota_required: false, bag_limit: '12/day.', notes: 'Shotgun only. Dogs recommended. Webb WMA and Bobwhite Hills WMA have managed quail habitat.', tags: ['quail', 'small-game'] },
  { id: 'sc-raccoon-opossum', state: 'SC', species: 'Raccoon / Opossum', weapon_type: 'Shotgun', start_date: '2025-01-01', end_date: '2025-12-31', quota_required: false, bag_limit: 'No limit.', notes: 'Night hunting: Sunset to sunrise year-round. Daylight hours during open small game season (Nov 26–Mar 1). Dogs allowed. Lights allowed for night hunting.', tags: ['raccoon', 'opossum', 'small-game', 'night-hunting'] },

  // ── HOG — year-round on private land ──
  { id: 'sc-hog-private', state: 'SC', species: 'Feral Hog / Wild Boar', weapon_type: 'Rifle', start_date: '2025-01-01', end_date: '2025-12-31', quota_required: false, bag_limit: 'No bag limit. No size/sex restriction.', notes: 'PRIVATE LAND: Legal year-round, day or night, any legal weapon. Night hunting legal with landowner permission (light at point of kill required). On WMA lands: Legal during any open deer or small game season only.', tags: ['hog', 'year-round'] },

  // ── ALLIGATOR (approximate dates — set annually by SCDNR) ──
  { id: 'sc-alligator-public', state: 'SC', species: 'American Alligator', weapon_type: 'Archery', start_date: '2025-09-13', end_date: '2025-10-11', quota_required: true, bag_limit: '1 alligator per tag. Minimum 4 feet total length.', notes: 'PUBLIC WATER UNITS: Apply through SCDNR public drawing (typically July). Tag assigned to specific unit. Legal methods: Hand-held snares, harpoons, bowfishing equipment, bang sticks/powerheads. No firearms from boat. Hunting hours: 1 hour before sunset to 1 hour after sunrise. Units include: Santee Cooper lakes, ACE Basin, Savannah River, Lake Marion, Lake Moultrie, and others.', tags: ['alligator', 'quota', 'drawing'] },
  { id: 'sc-alligator-private', state: 'SC', species: 'American Alligator', weapon_type: 'Archery', start_date: '2025-09-13', end_date: '2025-10-11', quota_required: true, bag_limit: '1 alligator per tag. Minimum 4 feet.', notes: 'PRIVATE LAND TAGS: Apply through SCDNR drawing. Same methods and hours as public water. Must have written landowner permission.', tags: ['alligator', 'quota', 'private-land'] },

  // ── RUFFED GROUSE (mountain only) ──
  { id: 'sc-ruffed-grouse', state: 'SC', land_id: 'sc-mountain-hunt-unit', species: 'Ruffed Grouse', weapon_type: 'Shotgun', start_date: '2025-10-15', end_date: '2026-03-01', quota_required: false, bag_limit: '3/day.', notes: 'Mountain counties only (Oconee, Pickens, Greenville above I-85). Also legal on Jocassee Gorges WMA. Dogs allowed. Rare species — populations declining.', tags: ['grouse', 'small-game', 'mountain'] },
];

// ═══════════════════════════════════════════════════════════════════════════
// QUOTA HUNTS / DRAWINGS
// ═══════════════════════════════════════════════════════════════════════════

export const SC_QUOTA_HUNTS: QuotaHunt[] = [
  {
    id: 'sc-qh-bear-island-deer',
    state: 'SC',
    land_id: 'sc-bear-island',
    species: 'White-tailed Deer',
    hunt_type: 'Gun Deer — Computer Drawing',
    weapon_type: 'Rifle',
    dates: 'Oct–Dec 2025 (multiple dates)',
    application_url: 'https://www.dnr.sc.gov/hunting/wmadirections.html',
    notes: 'Annual computer drawing through SCDNR. Walk-on archery available without permit. Apply online through GoOutdoorsSC.com. Multiple hunt dates available.',
  },
  {
    id: 'sc-qh-bear-island-waterfowl',
    state: 'SC',
    land_id: 'sc-bear-island',
    species: 'Waterfowl',
    hunt_type: 'Category I Waterfowl — Computer Drawing',
    weapon_type: 'Shotgun',
    dates: 'Nov 2025 – Jan 2026',
    application_url: 'https://www.eregulations.com/southcarolina/hunting/wma-waterfowl-on-management-areas',
    notes: 'CATEGORY I designated waterfowl area. Annual computer drawing — very competitive. Managed impoundments. Steel shot required. Federal duck stamp + SC migratory bird permit required.',
  },
  {
    id: 'sc-qh-donnelley-deer',
    state: 'SC',
    land_id: 'sc-donnelley',
    species: 'White-tailed Deer',
    hunt_type: 'Gun Deer — Computer Drawing',
    weapon_type: 'Rifle',
    dates: 'Oct–Dec 2025 (multiple dates)',
    application_url: 'https://www.dnr.sc.gov/hunting/wmadirections.html',
    notes: 'Annual computer lottery through SCDNR. ACE Basin property. Walk-on archery available without permit.',
  },
  {
    id: 'sc-qh-donnelley-waterfowl',
    state: 'SC',
    land_id: 'sc-donnelley',
    species: 'Waterfowl',
    hunt_type: 'Category I Waterfowl — Computer Drawing',
    weapon_type: 'Shotgun',
    dates: 'Nov 2025 – Jan 2026',
    application_url: 'https://www.eregulations.com/southcarolina/hunting/wma-waterfowl-on-management-areas',
    notes: 'Category I designated waterfowl area. Annual computer drawing. ACE Basin managed impoundments.',
  },
  {
    id: 'sc-qh-francis-marion-dog-drives',
    state: 'SC',
    land_id: 'sc-francis-marion-nf',
    species: 'White-tailed Deer',
    hunt_type: 'Dog Drive Deer Hunts — Registration Required',
    weapon_type: 'Rifle',
    dates: 'Sept–Dec 2025 (various dates)',
    application_url: 'https://www.dnr.sc.gov/hunting/wmadirections.html',
    notes: 'Multiple dog drive hunt dates on Francis Marion NF. Buck only except designated either-sex dates. All drives must be pre-registered with SCDNR. Orange hat/coat/vest required for dog drive participants.',
  },
  {
    id: 'sc-qh-santee-nwr-deer',
    state: 'SC',
    land_id: 'sc-santee-nwr',
    species: 'White-tailed Deer',
    hunt_type: 'Archery/Primitive Weapons — Refuge Permit',
    weapon_type: 'Archery',
    dates: 'Sept 20–Nov 2, 2025 (multiple hunts)',
    application_url: 'https://www.fws.gov/refuge/santee/visit-us/activities/hunting',
    notes: 'Cuddo and Pine Island Units. Archery Sept 20–Oct 4; PW Oct 17–19, Oct 31–Nov 2. Bluff Unit youth hunt Oct 25–26. Free refuge permit required.',
  },
  {
    id: 'sc-qh-santee-coastal-waterfowl',
    state: 'SC',
    land_id: 'sc-santee-coastal',
    species: 'Waterfowl',
    hunt_type: 'Category I Waterfowl — Computer Drawing',
    weapon_type: 'Shotgun',
    dates: 'Nov 2025 – Jan 2026',
    application_url: 'https://www.eregulations.com/southcarolina/hunting/wma-waterfowl-on-management-areas',
    notes: 'Category I designated area. Annual computer drawing. Saltwater impoundments — premier waterfowl.',
  },
  {
    id: 'sc-qh-samworth-waterfowl',
    state: 'SC',
    land_id: 'sc-samworth',
    species: 'Waterfowl',
    hunt_type: 'Category I Waterfowl — Computer Drawing',
    weapon_type: 'Shotgun',
    dates: 'Nov 2025 – Jan 2026',
    application_url: 'https://www.eregulations.com/southcarolina/hunting/wma-waterfowl-on-management-areas',
    notes: 'Category I designated area. Tidal freshwater — excellent duck habitat.',
  },
  {
    id: 'sc-qh-botany-bay-deer',
    state: 'SC',
    land_id: 'sc-botany-bay-hp',
    species: 'White-tailed Deer',
    hunt_type: 'Gun Deer — Computer Drawing',
    weapon_type: 'Rifle',
    dates: 'Oct–Dec 2025',
    application_url: 'https://www.dnr.sc.gov/hunting/wmadirections.html',
    notes: 'Quota hunts by drawing. Walk-on archery available. Edisto Island.',
  },
  {
    id: 'sc-qh-botany-bay-waterfowl',
    state: 'SC',
    land_id: 'sc-botany-bay-hp',
    species: 'Waterfowl',
    hunt_type: 'Category I Waterfowl — Computer Drawing',
    weapon_type: 'Shotgun',
    dates: 'Nov 2025 – Jan 2026',
    application_url: 'https://www.eregulations.com/southcarolina/hunting/wma-waterfowl-on-management-areas',
    notes: 'Category I designated area.',
  },
  {
    id: 'sc-qh-crackerneck-deer',
    state: 'SC',
    land_id: 'sc-crackerneck',
    species: 'White-tailed Deer',
    hunt_type: 'Quota Deer Hunts — DOE Land Drawing',
    weapon_type: 'Rifle',
    dates: 'Oct–Dec 2025 (specific dates)',
    application_url: 'https://www.dnr.sc.gov/hunting/wmadirections.html',
    notes: 'Savannah River Site DOE land. Apply through SCDNR. Photo ID required at gate. Check-in/check-out mandatory. Open only on designated hunt dates.',
  },
  {
    id: 'sc-qh-carolina-sandhills-nwr',
    state: 'SC',
    land_id: 'sc-carolina-sandhills-nwr',
    species: 'White-tailed Deer',
    hunt_type: 'Quota Deer Hunts — Refuge Drawing',
    weapon_type: 'Rifle',
    dates: 'Oct–Nov 2025',
    application_url: 'https://www.fws.gov/refuge/carolina-sandhills',
    notes: 'Archery, muzzleloader, and firearms hunts by refuge drawing. Apply through refuge office.',
  },
  {
    id: 'sc-qh-alligator-public',
    state: 'SC',
    species: 'American Alligator',
    hunt_type: 'Public Water Alligator Drawing',
    weapon_type: 'Archery',
    dates: 'Sept 13–Oct 11, 2025 (approximate)',
    application_deadline: 'July 2025 (typically)',
    application_url: 'https://www.dnr.sc.gov/wildlife/alligator/',
    notes: 'Public water alligator tags. Apply through SCDNR online drawing. 1 tag per person. Tag assigned to specific public water unit. Units: Santee Cooper, ACE Basin, Savannah River, Lake Marion, Lake Moultrie, Lake Russell, Combahee River, and others. Methods: snares, harpoons, bowfishing, bang sticks — no firearms from boat.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// FISHING REGULATIONS
// ═══════════════════════════════════════════════════════════════════════════
//
// SC fishing license required for ages 16+. Freshwater and saltwater are
// separate licenses (combo available). Trout stamp required for trout.
// ═══════════════════════════════════════════════════════════════════════════

export const SC_FISHING: FishingRegulation[] = [
  // ── FRESHWATER ──
  {
    id: 'sc-fw-largemouth-bass',
    state: 'SC',
    species: 'Largemouth Bass',
    water_type: 'freshwater',
    bag_limit: '5/day combined (all black bass species)',
    size_limit: 'No statewide minimum. EXCEPTIONS: Lakes Marion & Moultrie: 14" minimum. Lake Murray: 14" minimum.',
    notes: 'Max 40 game fish total per day (all species combined). Special lakes with higher limits (10/day combined): Hartwell, Russell, Thurmond, Tugaloo, Yonah, Keowee, Stevens Creek, Chattooga/Savannah River lakes.',
    special_areas: [
      'Lakes Marion & Moultrie: 5/day, 14" minimum',
      'Lake Murray: 5/day, 14" minimum',
      'Hartwell/Russell/Thurmond/Tugaloo/Yonah/Keowee/Stevens Creek: 10/day combined, no minimum',
      'Savannah River lakes: 10/day combined, no minimum',
    ],
  },
  {
    id: 'sc-fw-smallmouth-bass',
    state: 'SC',
    species: 'Smallmouth Bass',
    water_type: 'freshwater',
    bag_limit: '5/day combined with all black bass',
    size_limit: 'No statewide minimum.',
    notes: 'Found primarily in upstate rivers (Savannah, Chattooga, and tributaries). Same limits as largemouth.',
  },
  {
    id: 'sc-fw-spotted-bass',
    state: 'SC',
    species: 'Spotted Bass',
    water_type: 'freshwater',
    bag_limit: '5/day combined with all black bass',
    size_limit: 'No statewide minimum.',
    notes: 'Common in piedmont rivers and reservoirs. Same limits as largemouth.',
  },
  {
    id: 'sc-fw-striped-bass',
    state: 'SC',
    species: 'Striped Bass / Hybrid Striped Bass',
    water_type: 'freshwater',
    bag_limit: '10/day combined (striped + hybrid)',
    size_limit: 'No statewide minimum. EXCEPTION: Santee River system: 26" minimum, 3 fish/day.',
    notes: 'Most waters: 10/day, no minimum. SANTEE RIVER SYSTEM SPECIAL RULES: 26" minimum, 3 fish (Oct 1–Jun 15). CLOSED Jun 16–Sep 30 on Santee system. Lake Murray: No minimum, 5/day (may differ from statewide). Hartwell: 10/day, no minimum.',
    special_areas: [
      'Santee River/Diversion Canal/Rediversion Canal/Tailrace Canal: 3/day, 26" minimum, CLOSED Jun 16–Sep 30',
      'Lakes Marion & Moultrie: 5/day combined stripers + hybrids, no minimum',
      'Lake Murray: 5/day, no minimum',
      'Hartwell/Russell/Thurmond: 10/day, no minimum',
    ],
  },
  {
    id: 'sc-fw-crappie',
    state: 'SC',
    species: 'Crappie (Black & White)',
    water_type: 'freshwater',
    bag_limit: '20/day statewide',
    size_limit: '8" minimum on Lake Murray. No minimum elsewhere.',
    notes: 'Lake Murray: 8" minimum, 20/day. Lakes Marion & Moultrie: No minimum, 20/day — excellent crappie. Hartwell: 30/day, no minimum.',
    special_areas: [
      'Lake Murray: 20/day, 8" minimum',
      'Lakes Marion & Moultrie: 20/day, no minimum',
      'Hartwell: 30/day, no minimum',
    ],
  },
  {
    id: 'sc-fw-blue-catfish',
    state: 'SC',
    species: 'Blue Catfish',
    water_type: 'freshwater',
    bag_limit: '25/day. Max 2 fish over 32".',
    size_limit: 'No minimum. Trophy regulation: max 2 over 32".',
    notes: 'Lakes Marion & Moultrie: 25/day, max 1 blue catfish over 36" per person per day. Santee Cooper system is world-class blue catfish fishery — state and world records.',
    special_areas: [
      'Lakes Marion & Moultrie: 25/day, max 1 over 36"',
      'Santee River system: 25/day, max 2 over 32"',
    ],
  },
  {
    id: 'sc-fw-channel-catfish',
    state: 'SC',
    species: 'Channel Catfish',
    water_type: 'freshwater',
    bag_limit: '25/day combined with other catfish species.',
    size_limit: 'No minimum.',
    notes: 'Statewide. Common in rivers, lakes, and ponds.',
  },
  {
    id: 'sc-fw-flathead-catfish',
    state: 'SC',
    species: 'Flathead Catfish',
    water_type: 'freshwater',
    bag_limit: '5/day.',
    size_limit: 'No minimum.',
    notes: 'Found in larger rivers. Separate from blue/channel cat limits.',
  },
  {
    id: 'sc-fw-bream',
    state: 'SC',
    species: 'Bream / Bluegill / Sunfish / Shellcracker',
    water_type: 'freshwater',
    bag_limit: '30/day combined (all sunfish species).',
    size_limit: 'No minimum.',
    notes: 'Includes bluegill, redear (shellcracker), warmouth, longear, and other sunfish. Statewide.',
  },
  {
    id: 'sc-fw-chain-pickerel',
    state: 'SC',
    species: 'Chain Pickerel (Jack)',
    water_type: 'freshwater',
    bag_limit: '10/day.',
    size_limit: 'No minimum.',
    notes: 'Common in blackwater rivers and coastal plain lakes.',
  },
  {
    id: 'sc-fw-bowfin',
    state: 'SC',
    species: 'Bowfin (Mudfish)',
    water_type: 'freshwater',
    bag_limit: 'No limit.',
    size_limit: 'No minimum.',
    notes: 'Native species. Common in swamps and blackwater areas.',
  },
  {
    id: 'sc-fw-gar',
    state: 'SC',
    species: 'Gar (Longnose, Spotted)',
    water_type: 'freshwater',
    bag_limit: 'No limit.',
    size_limit: 'No minimum.',
    notes: 'Bowfishing popular. Legal to take by bow/crossbow, hook and line.',
  },
  {
    id: 'sc-fw-trout',
    state: 'SC',
    species: 'Trout (Rainbow, Brown, Brook)',
    water_type: 'freshwater',
    bag_limit: '5/day combined. SC trout stamp required in addition to fishing license.',
    size_limit: 'No statewide minimum. Delayed harvest sections: Artificial lures only, catch-and-release Nov 1–May 31 (check specific waters).',
    notes: 'Mountain counties only (Oconee, Pickens, Greenville above I-85). Chattooga River: Wild & Scenic River, special regulations. Delayed harvest streams include portions of Eastatoe Creek, Middle Saluda River, and others. Put-and-take streams stocked Oct–May.',
    special_areas: [
      'Chattooga River (National Wild & Scenic): Special regulations, check SCDNR',
      'Delayed harvest streams: Artificial lures only, catch-and-release Nov 1–May 31',
      'Put-and-take streams: 5/day, stocked regularly Oct–May',
      'Lake Jocassee: Trout present (brown and rainbow), 5/day, deep trolling',
    ],
  },
  {
    id: 'sc-fw-walleye',
    state: 'SC',
    species: 'Walleye',
    water_type: 'freshwater',
    bag_limit: '5/day.',
    size_limit: '14" minimum.',
    notes: 'Limited distribution — primarily Lake Hartwell tailrace and Tugaloo River area.',
  },
  {
    id: 'sc-fw-sauger',
    state: 'SC',
    species: 'Sauger',
    water_type: 'freshwater',
    bag_limit: '5/day.',
    size_limit: '14" minimum.',
    notes: 'Rare in SC. Same regulations as walleye.',
  },
  {
    id: 'sc-fw-white-bass',
    state: 'SC',
    species: 'White Bass',
    water_type: 'freshwater',
    bag_limit: '25/day.',
    size_limit: 'No minimum.',
    notes: 'Common in larger reservoirs.',
  },
  {
    id: 'sc-fw-yellow-perch',
    state: 'SC',
    species: 'Yellow Perch',
    water_type: 'freshwater',
    bag_limit: '20/day.',
    size_limit: 'No minimum.',
    notes: 'Common in upstate and midlands lakes.',
  },
  {
    id: 'sc-fw-shad',
    state: 'SC',
    species: 'American Shad / Hickory Shad',
    water_type: 'freshwater',
    bag_limit: '10/day combined.',
    size_limit: 'No minimum.',
    season: 'Jan 1 – Apr 15 (approximate — varies by river)',
    notes: 'Anadromous species. Popular spring fishery on Edisto, Combahee, Santee, Savannah, and Pee Dee rivers. Check specific river opening dates with SCDNR.',
  },
  // ── SALTWATER ──
  {
    id: 'sc-sw-red-drum',
    state: 'SC',
    species: 'Red Drum (Redfish/Spot-tail Bass)',
    water_type: 'saltwater',
    bag_limit: '2/person/day, 6/boat/day.',
    size_limit: 'Slot: 15"–23" total length. Must release fish outside slot.',
    notes: 'Year-round. Gig harvest prohibited Dec 1 – Feb 28. Premier inshore species in SC. Catch-and-release encouraged for fish over 23".',
  },
  {
    id: 'sc-sw-flounder',
    state: 'SC',
    species: 'Flounder (Southern)',
    water_type: 'saltwater',
    bag_limit: '5/person/day, 10/boat/day.',
    size_limit: '16" total length minimum.',
    notes: 'Hook and line or gig only. Year-round but best Sept–Nov during fall run. Gigging legal (except during closures). Check for seasonal closures — some years have Oct/Nov recreational closures.',
  },
  {
    id: 'sc-sw-spotted-seatrout',
    state: 'SC',
    species: 'Spotted Seatrout (Speckled Trout)',
    water_type: 'saltwater',
    bag_limit: '10/person/day.',
    size_limit: '14" total length minimum.',
    notes: 'Year-round. Gig harvest prohibited Dec 1 – Feb 28. Premier inshore species. Live shrimp under popping corks is classic SC technique.',
  },
  {
    id: 'sc-sw-sheepshead',
    state: 'SC',
    species: 'Sheepshead',
    water_type: 'saltwater',
    bag_limit: '10/person/day.',
    size_limit: '14" fork length minimum.',
    notes: 'Year-round. Common around pilings, docks, bridges, and oyster beds. Fiddler crabs popular bait.',
  },
  {
    id: 'sc-sw-black-drum',
    state: 'SC',
    species: 'Black Drum',
    water_type: 'saltwater',
    bag_limit: '5/person/day.',
    size_limit: 'No minimum. Max 1 fish over 27" per day.',
    notes: 'Year-round. Common inshore — often caught alongside redfish.',
  },
  {
    id: 'sc-sw-cobia',
    state: 'SC',
    species: 'Cobia',
    water_type: 'saltwater',
    bag_limit: '1/person/day.',
    size_limit: '33" fork length minimum.',
    notes: 'Season: Jun 1 – Apr 30 (closed May). Federal waters may differ. Check for annual changes.',
  },
  {
    id: 'sc-sw-king-mackerel',
    state: 'SC',
    species: 'King Mackerel',
    water_type: 'saltwater',
    bag_limit: '3/person/day.',
    size_limit: '24" fork length minimum.',
    notes: 'Year-round (state waters). Federal limits may differ. Popular offshore species May–Oct.',
  },
  {
    id: 'sc-sw-spanish-mackerel',
    state: 'SC',
    species: 'Spanish Mackerel',
    water_type: 'saltwater',
    bag_limit: '15/person/day.',
    size_limit: '12" fork length minimum.',
    notes: 'Year-round. Surf and pier fishing popular May–Oct.',
  },
  {
    id: 'sc-sw-tripletail',
    state: 'SC',
    species: 'Tripletail',
    water_type: 'saltwater',
    bag_limit: '2/person/day.',
    size_limit: '18" total length minimum.',
    notes: 'Summer species. Found around buoys, crab pots, and channel markers.',
  },
  {
    id: 'sc-sw-tarpon',
    state: 'SC',
    species: 'Tarpon',
    water_type: 'saltwater',
    bag_limit: '1/person/day. TAG REQUIRED for harvest.',
    size_limit: '77" fork length minimum for harvest.',
    notes: 'Catch-and-release strongly encouraged. Must purchase tarpon tag before harvest. Occasional in SC waters Jun–Oct.',
  },
  {
    id: 'sc-sw-sharks',
    state: 'SC',
    species: 'Sharks (legal species)',
    water_type: 'saltwater',
    bag_limit: '1 shark/person/day (Atlantic sharpnose: 1/person/day additional).',
    size_limit: 'Varies by species. Most require 54" fork length minimum. Atlantic sharpnose: no minimum.',
    notes: 'Many species prohibited (great white, whale, basking, sand tiger, etc.). Blacktip, spinner, bull, and Atlantic sharpnose most common. Check SCDNR prohibited species list.',
  },
  {
    id: 'sc-sw-shrimp',
    state: 'SC',
    species: 'Shrimp (White, Brown, Pink)',
    water_type: 'saltwater',
    bag_limit: 'Recreational cast net: 48 quarts (heads on) per boat per day.',
    size_limit: 'No minimum size.',
    season: 'Typically mid-May through mid-December. Season set annually by SCDNR based on sampling.',
    notes: 'Cast net (up to 12\' radius) from boat or bank. Trawling: Recreational trawl nets allowed in designated areas only with permit. Channel net: Up to 4\' opening allowed in designated areas. Baiting for shrimp prohibited in salt water.',
  },
  {
    id: 'sc-sw-blue-crab',
    state: 'SC',
    species: 'Blue Crab',
    water_type: 'saltwater',
    bag_limit: '1 bushel/person/day (recreational). 2 dozen/person/day (non-commercial peeler crabs).',
    size_limit: '5" point-to-point minimum.',
    notes: 'Year-round. Max 2 recreational crab pots per person. Pots must have escape rings and be marked with buoy showing owner name/license number. Egg-bearing females (sponge crabs) must be returned.',
  },
  {
    id: 'sc-sw-oyster',
    state: 'SC',
    species: 'Oyster (Eastern)',
    water_type: 'saltwater',
    bag_limit: '2 bushels/person/day.',
    size_limit: '3" minimum.',
    season: 'Oct 1 – May 15 (typically). Closed May 16 – Sep 30.',
    notes: 'Recreational harvest from designated public shellfish grounds only. State shellfish license required. Pick by hand or use oyster tongs only — no dredging.',
  },
  {
    id: 'sc-sw-clam',
    state: 'SC',
    species: 'Clam (Hard)',
    water_type: 'saltwater',
    bag_limit: '1/2 bushel per person per day.',
    size_limit: '1" minimum.',
    notes: 'Recreational harvest from designated grounds. State shellfish license required.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// ADDITIONAL SC PUBLIC LANDS — Batch 2
// Sources: SCDNR WMA list, SC Heritage Trust Program, USFS, USFWS, USACE,
//          SC Forestry Commission, SC State Parks, Duke Energy public lands
// ═══════════════════════════════════════════════════════════════════════════

export const SC_LANDS_BATCH2: PublicLand[] = [
  // ── ADDITIONAL WMAs ───────────────────────────────────────────────────────
  {
    id: 'sc-south-saluda',
    state: 'SC',
    name: 'South Saluda WMA',
    type: 'WMA',
    acreage: 1090,
    counties: ['Pickens'],
    region: 'Upstate / Mountain',
    lat: 34.90,
    lng: -82.62,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'trout', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'South Saluda River corridor — trout fishing access. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-santee-dam',
    state: 'SC',
    name: 'Santee Dam WMA',
    type: 'WMA',
    acreage: 575,
    counties: ['Clarendon'],
    region: 'Midlands',
    lat: 33.67,
    lng: -80.20,
    managing_agency: 'SCDNR / Santee Cooper',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'waterfowl', 'bass', 'crappie'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Adjacent to Lake Marion — Santee Cooper system. ' +
      'Fishing: Access to Lake Marion — premier bass and crappie. ' +
      'Waterfowl: Category II — walk-in during statewide season.',
  },
  {
    id: 'sc-mill-shoals',
    state: 'SC',
    name: 'Mill Shoals WMA',
    type: 'WMA',
    acreage: 774,
    counties: ['Pickens'],
    region: 'Upstate / Mountain',
    lat: 34.87,
    lng: -82.68,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Turkey: Spring gobblers only. ' +
      'Squirrel Oct 1–Mar 1.',
  },
  {
    id: 'sc-longleaf-pine-hp',
    state: 'SC',
    name: 'Longleaf Pine Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 843,
    counties: ['Lee'],
    region: 'Midlands',
    lat: 34.08,
    lng: -80.25,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'small-game', 'quail'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Longleaf pine restoration — Sandhills region. ' +
      'Quail: Nov 26–Mar 1.',
  },
  {
    id: 'sc-lynchburg-savanna-hp',
    state: 'SC',
    name: 'Lynchburg Savanna Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 291,
    counties: ['Lee'],
    region: 'Midlands',
    lat: 34.04,
    lng: -80.08,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'Rare longleaf pine wiregrass savanna. Sensitive endemic plants. ' +
      'Small area — limited access.',
  },
  {
    id: 'sc-rock-hill-blackjacks-hp',
    state: 'SC',
    name: 'Rock Hill Blackjacks Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 291,
    counties: ['York'],
    region: 'Piedmont',
    lat: 34.93,
    lng: -81.02,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'Blackjack oak barren — uncommon habitat type. ' +
      'Small tract; limited parking at Heritage Preserve.',
  },
  {
    id: 'sc-henderson-hp',
    state: 'SC',
    name: 'Henderson Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 453,
    counties: ['Aiken'],
    region: 'Midlands',
    lat: 33.60,
    lng: -81.60,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Aiken County — Sandhills longleaf pine community.',
  },
  {
    id: 'sc-ditch-pond-hp',
    state: 'SC',
    name: 'Ditch Pond Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 285,
    counties: ['Aiken', 'Barnwell'],
    region: 'Midlands',
    lat: 33.27,
    lng: -81.44,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Pocosins and Carolina bay habitats.',
  },
  {
    id: 'sc-peachtree-rock-hp',
    state: 'SC',
    name: 'Peachtree Rock Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 354,
    counties: ['Lexington'],
    region: 'Midlands',
    lat: 33.89,
    lng: -81.27,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Sandstone outcrop with rare Sandhills species. ' +
      'Nature trail — stay on trail when not hunting.',
  },
  {
    id: 'sc-pine-island-hp',
    state: 'SC',
    name: 'Pine Island Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 502,
    counties: ['Horry'],
    region: 'Grand Strand',
    lat: 33.69,
    lng: -79.05,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: false,
    tags: ['deer', 'turkey', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 5 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Longleaf pine flatwoods — pitcher plant bogs. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-otter-island-hp',
    state: 'SC',
    name: 'Otter Island Heritage Preserve/WMA',
    type: 'WMA',
    acreage: 3510,
    counties: ['Colleton'],
    region: 'Lowcountry / Coastal',
    lat: 32.38,
    lng: -80.50,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'saltwater-fishing', 'alligator'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 6 deer season. ' +
      'Boat access only — no road access. ' +
      'Sea island: barrier beach, maritime forest, salt marsh. ' +
      'Hog: Legal during open seasons, no limit. ' +
      'Alligator: Drawing tags may include these waters. ' +
      'Saltwater fishing: red drum, trout, flounder from surrounding waters.',
  },
  {
    id: 'sc-calhoun-falls-state-park',
    state: 'SC',
    name: 'Calhoun Falls State Park',
    type: 'State Park',
    acreage: 308,
    counties: ['Abbeville'],
    region: 'Western Piedmont',
    lat: 34.09,
    lng: -82.60,
    managing_agency: 'SC State Parks',
    website: 'https://southcarolinaparks.com/calhoun-falls',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'catfish', 'striped-bass', 'freshwater-fishing'],
    special_rules:
      'No hunting in state park. Fishing only. ' +
      'Access to Richard B. Russell Lake — a Savannah River basin impoundment. ' +
      'Bank fishing and boat launch available. ' +
      'Bass: 10/day Russell special regulation. Striped bass: 10/day.',
  },
  // ── ADDITIONAL HERITAGE PRESERVES ─────────────────────────────────────────
  {
    id: 'sc-ace-basin-hp',
    state: 'SC',
    name: 'ACE Basin Heritage Preserve',
    type: 'Heritage Preserve',
    acreage: 9170,
    counties: ['Colleton', 'Beaufort'],
    region: 'Lowcountry',
    lat: 32.63,
    lng: -80.60,
    managing_agency: 'SCDNR Heritage Trust',
    website: 'https://www.dnr.sc.gov/managed/heritage/',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'alligator', 'saltwater-fishing'],
    special_rules:
      'WMA permit required on WMA-designated tracts. No Sunday hunting. Zone 6. ' +
      'Multiple parcels within ACE Basin conservation area. ' +
      'Some tracts: archery only. ' +
      'Hog: Legal during open seasons. ' +
      'Alligator: Drawing tags may apply. ' +
      'Saltwater fishing on adjacent tidal creeks and rivers.',
  },
  {
    id: 'sc-yawkey-wildlife-center',
    state: 'SC',
    name: 'Tom Yawkey Wildlife Center Heritage Preserve',
    type: 'Heritage Preserve',
    acreage: 24000,
    counties: ['Georgetown'],
    region: 'Lowcountry / PeeDee',
    lat: 33.27,
    lng: -79.24,
    managing_agency: 'SCDNR Heritage Trust',
    website: 'https://www.dnr.sc.gov/managed/yawkey/',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['wildlife-viewing', 'waterfowl-viewing', 'no-hunting', 'research'],
    special_rules:
      'No public hunting or general fishing. Research and education facility. ' +
      'Guided tours available by reservation through SCDNR. ' +
      'Premier shorebird and waterfowl habitat — South Island, Cat Island, North Island. ' +
      'Loggerhead sea turtle nesting beach on North Island. ' +
      'Access: Boat tours from Georgetown only. No walk-on access.',
  },
  {
    id: 'sc-woods-bay-hp',
    state: 'SC',
    name: 'Woods Bay State Natural Area',
    type: 'Heritage Preserve',
    acreage: 1541,
    counties: ['Sumter'],
    region: 'PeeDee / Midlands',
    lat: 33.90,
    lng: -79.97,
    managing_agency: 'SC State Parks / SCDNR',
    website: 'https://southcarolinaparks.com/woods-bay',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['freshwater-fishing', 'carolina-bay', 'canoe', 'no-hunting'],
    special_rules:
      'No hunting. Fishing allowed with valid license. ' +
      'Carolina bay lake — blackwater with pitcher plants. ' +
      'Canoe and kayak access. Boat speed limit 5 mph. ' +
      'Largemouth bass, chain pickerel, bream, bowfin.',
  },
  {
    id: 'sc-ellicott-rock-wilderness',
    state: 'SC',
    name: 'Ellicott Rock Wilderness Area',
    type: 'National Forest',
    acreage: 8274,
    counties: ['Oconee'],
    region: 'Mountain / Upstate',
    lat: 35.03,
    lng: -83.12,
    managing_agency: 'USDA Forest Service (Sumter NF / Andrew Pickens District)',
    website: 'https://www.fs.usda.gov/recarea/scnfs/recreation/recarea/?recid=47150',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'trout', 'bear', 'small-game', 'wilderness'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Designated Wilderness Area — no motorized vehicles or equipment. ' +
      'Chattooga River: Wild & Scenic River — special trout regulations apply. ' +
      'Horse and mule use allowed on trails. No bikes. ' +
      'Camping without permit. Pack out all waste. ' +
      'Bear: No open season — protected. ' +
      'Turkey: Spring gobblers only.',
  },
  // ── CORPS OF ENGINEERS / RESERVOIR LANDS ──────────────────────────────────
  {
    id: 'sc-lake-wateree-coe',
    state: 'SC',
    name: 'Lake Wateree — Duke Energy / COE Public Lands',
    type: 'Corps of Engineers',
    acreage: 13864,
    counties: ['Fairfield', 'Kershaw', 'Lancaster'],
    region: 'Midlands / Piedmont',
    lat: 34.37,
    lng: -80.88,
    managing_agency: 'Duke Energy / SCDNR',
    website: 'https://www.duke-energy.com/community/parks/wateree',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'crappie', 'catfish', 'striped-bass'],
    special_rules:
      'WMA permit required on SCDNR-managed shoreline tracts. Zone 3/4 deer season varies by location. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Duke Energy managed recreation areas: No hunting within recreation boundaries. ' +
      'Fishing: Lake Wateree — excellent largemouth and striped bass. ' +
      'Bass: 5/day, 12" minimum. Striped bass: 10/day. ' +
      'Crappie: 20/day, 8" minimum. Blue catfish: 25/day.',
  },
  {
    id: 'sc-lake-wylie-coe',
    state: 'SC',
    name: 'Lake Wylie — Duke Energy Public Lands',
    type: 'Corps of Engineers',
    acreage: 13443,
    counties: ['York', 'Chester'],
    region: 'Piedmont',
    lat: 35.11,
    lng: -81.10,
    managing_agency: 'Duke Energy / SCDNR',
    website: 'https://www.duke-energy.com/community/parks/lake-wylie',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'catfish', 'striped-bass', 'freshwater-fishing'],
    special_rules:
      'Primarily fishing access. No hunting on most Duke Energy shoreline. ' +
      'Some SCDNR WMA tracts on York County side allow hunting — check boundaries. ' +
      'Fishing: Largemouth bass, spotted bass, crappie, catfish, striped bass. ' +
      'Straddles SC/NC border. Check applicable state regulations by location.',
  },
  {
    id: 'sc-lake-murray-shoreline',
    state: 'SC',
    name: 'Lake Murray — Dominion Energy Public Lands',
    type: 'Conservation Area',
    acreage: 50000,
    counties: ['Lexington', 'Newberry', 'Richland', 'Saluda'],
    region: 'Midlands',
    lat: 34.07,
    lng: -81.25,
    managing_agency: 'Dominion Energy / SCDNR',
    website: 'https://www.dominionenergy.com/south-carolina/lake-murray',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'striped-bass', 'crappie', 'catfish', 'freshwater-fishing', 'landlocked-stripers'],
    special_rules:
      'No public hunting on Dominion Energy shoreline. ' +
      'Fishing: Nationally known striped bass fishery — landlocked stripers, hybrids. ' +
      'Bass: 5/day, 12" minimum. Striped bass/hybrid: 3/day, 18" minimum. ' +
      'Crappie: 20/day, 8" minimum. ' +
      'Blue catfish present — 25/day. ' +
      'Bald Eagle Island (Lake Murray): Bald eagle nesting colony visible from boats. ' +
      'Irmo, Chapin, and Batesburg-Leesville boat ramps provide access.',
  },
  {
    id: 'sc-lake-jocassee',
    state: 'SC',
    name: 'Lake Jocassee — Duke Energy / Jocassee Gorges',
    type: 'Conservation Area',
    acreage: 7565,
    counties: ['Oconee', 'Pickens'],
    region: 'Mountain / Upstate',
    lat: 34.97,
    lng: -82.93,
    managing_agency: 'Duke Energy / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'trout', 'bass', 'smallmouth-bass', 'walleye', 'bear', 'small-game'],
    special_rules:
      'WMA permit required on SCDNR Jocassee Gorges WMA tracts bordering lake. Zone 1 deer season. ' +
      '4-point antler restriction. No Sunday hunting. No baiting. ' +
      'Fishing: Nationally regarded trophy fishery. ' +
      'Trout: Brown and rainbow trout — 5/day, 12" minimum on Jocassee. Trolling effective. ' +
      'Walleye: Present — 5/day, 14" minimum. ' +
      'Smallmouth bass present. ' +
      'Lake depth exceeds 350 feet. Crystalline water — one of cleanest reservoirs in Southeast. ' +
      'Boat access only to most shoreline. Canoe/kayak camping allowed on uninhabited coves.',
  },
  {
    id: 'sc-savannah-river-banks',
    state: 'SC',
    name: 'Savannah River Public Fishing Area',
    type: 'Conservation Area',
    acreage: 5000,
    counties: ['Aiken', 'Allendale', 'Barnwell', 'Jasper'],
    region: 'Midlands / Lowcountry',
    lat: 33.20,
    lng: -81.60,
    managing_agency: 'SCDNR / USACE Savannah District',
    website: 'https://www.dnr.sc.gov/fishing/',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'catfish', 'shad', 'sturgeon', 'striper', 'freshwater-fishing', 'public-access'],
    special_rules:
      'Fishing along SC bank of Savannah River — public right-of-way. ' +
      'American shad: Jan 1–Apr 15 (approximate). ' +
      'Striped bass: Present but regulated — check SCDNR for minimum size and bag. ' +
      'Shortnose sturgeon: PROTECTED, catch-and-release only. ' +
      'Multiple public boat ramps along SC shore. ' +
      'No hunting on most public access areas.',
  },
  // ── NATIONAL PARK SERVICE LANDS ───────────────────────────────────────────
  {
    id: 'sc-congaree-national-park',
    state: 'SC',
    name: 'Congaree National Park',
    type: 'National Park',
    acreage: 26546,
    counties: ['Richland'],
    region: 'Midlands',
    lat: 33.78,
    lng: -80.78,
    managing_agency: 'National Park Service',
    phone: '803-776-4396',
    website: 'https://www.nps.gov/cong/',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['freshwater-fishing', 'bass', 'catfish', 'bream', 'canoe', 'hiking', 'no-hunting'],
    special_rules:
      'No hunting. Fishing allowed with valid SC fishing license. ' +
      'Fishing: Cedar Creek, Congaree River — largemouth bass, catfish, bream. ' +
      'Canoe trail: Cedar Creek canoe trail (15 miles) — permit required for overnight camping. ' +
      'No boats with gasoline motors on Cedar Creek. Electric motors allowed. ' +
      'Old-growth bottomland hardwood forest — tallest trees east of Rockies. ' +
      'Fireflies: Park hosts synchronous firefly event (spring). ' +
      'Harry Hampton Visitor Center on SC-734.',
  },
  {
    id: 'sc-cowpens-national-battlefield',
    state: 'SC',
    name: 'Cowpens National Battlefield',
    type: 'National Park',
    acreage: 842,
    counties: ['Cherokee'],
    region: 'Upstate',
    lat: 35.13,
    lng: -81.81,
    managing_agency: 'National Park Service',
    phone: '864-461-2828',
    website: 'https://www.nps.gov/cowp/',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['no-hunting', 'no-fishing', 'history'],
    special_rules:
      'No hunting or fishing. Revolutionary War battlefield — national historic site. ' +
      'Hiking and auto tour route only.',
  },
  {
    id: 'sc-kings-mountain-nmp',
    state: 'SC',
    name: 'Kings Mountain National Military Park',
    type: 'National Park',
    acreage: 3945,
    counties: ['York'],
    region: 'Piedmont',
    lat: 35.13,
    lng: -81.40,
    managing_agency: 'National Park Service',
    phone: '864-936-7921',
    website: 'https://www.nps.gov/kimo/',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['no-hunting', 'no-fishing', 'history'],
    special_rules:
      'No hunting or fishing. Revolutionary War battlefield — national historic site. ' +
      'Hiking trails, auto tour available. ' +
      'Adjacent Kings Mountain State Park (SC) allows some hunting — see separate entry.',
  },
  // ── STATE PARKS WITH HUNTING / FISHING ACCESS ─────────────────────────────
  {
    id: 'sc-cheraw-state-park',
    state: 'SC',
    name: 'Cheraw State Park',
    type: 'State Park',
    acreage: 7361,
    counties: ['Chesterfield'],
    region: 'PeeDee',
    lat: 34.73,
    lng: -79.94,
    managing_agency: 'SC State Parks',
    phone: '843-537-9656',
    website: 'https://southcarolinaparks.com/cheraw',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'bass', 'crappie', 'bream', 'catfish'],
    special_rules:
      'WMA permit required for hunting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Lake Juniper: 360-acre lake — bass, crappie, bream, catfish. ' +
      'Fishing license required. Boat launch available (electric motors only). ' +
      'Hunting allowed in designated areas — check park for boundaries. ' +
      'No Sunday hunting in designated WMA areas.',
  },
  {
    id: 'sc-lee-state-park',
    state: 'SC',
    name: 'Lee State Park',
    type: 'State Park',
    acreage: 2839,
    counties: ['Lee'],
    region: 'Midlands',
    lat: 34.16,
    lng: -80.20,
    managing_agency: 'SC State Parks',
    phone: '803-428-5307',
    website: 'https://southcarolinaparks.com/lee',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'bream', 'catfish', 'freshwater-fishing', 'artesian-wells'],
    special_rules:
      'No hunting. Fishing allowed in Lynches River and park ponds. ' +
      'Lynches River: Redbreast sunfish, largemouth bass, catfish. ' +
      'Known for artesian well springs — feeding park lakes and swimming area. ' +
      'Horseback trails on adjacent land.',
  },
  {
    id: 'sc-kings-mountain-state-park',
    state: 'SC',
    name: 'Kings Mountain State Park',
    type: 'State Park',
    acreage: 6883,
    counties: ['York'],
    region: 'Piedmont',
    lat: 35.09,
    lng: -81.36,
    managing_agency: 'SC State Parks / SCDNR',
    phone: '803-222-3209',
    website: 'https://southcarolinaparks.com/kings-mountain',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'bream', 'catfish'],
    special_rules:
      'WMA permit required for hunting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. No Sunday hunting on WMA tracts. ' +
      'Lake Crawford: 65-acre lake — bass, bream, catfish. ' +
      'Fishing license required. Boat rentals available (no private gas motors). ' +
      'Hunting in designated WMA portions — contact SCDNR/park for boundaries. ' +
      'Adjacent Kings Mountain NMP: No hunting on NPS land.',
  },
  {
    id: 'sc-hunting-island-state-park',
    state: 'SC',
    name: 'Hunting Island State Park',
    type: 'State Park',
    acreage: 5000,
    counties: ['Beaufort'],
    region: 'Lowcountry / Coastal',
    lat: 32.37,
    lng: -80.45,
    managing_agency: 'SC State Parks',
    phone: '843-838-2011',
    website: 'https://southcarolinaparks.com/hunting-island',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'surf-fishing', 'pier-fishing', 'redfish', 'flounder', 'trout'],
    special_rules:
      'No hunting. Fishing only. ' +
      'Fishing pier: Free access, popular for redfish, flounder, and sheepshead. ' +
      'Surf fishing: Atlantic Ocean beach — sharks, whiting, pompano. ' +
      'Lagoon fishing: Trout, redfish, flounder. ' +
      'License required (saltwater or combo). ' +
      'Loggerhead sea turtle nesting beach (May–Aug) — no lights on beach at night.',
  },
  {
    id: 'sc-lake-hartwell-state-park',
    state: 'SC',
    name: 'Lake Hartwell State Park',
    type: 'State Park',
    acreage: 680,
    counties: ['Oconee'],
    region: 'Upstate',
    lat: 34.56,
    lng: -83.02,
    managing_agency: 'SC State Parks',
    phone: '864-972-3352',
    website: 'https://southcarolinaparks.com/lake-hartwell',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'striped-bass', 'crappie', 'catfish', 'freshwater-fishing'],
    special_rules:
      'No hunting in state park. Fishing access to Lake Hartwell. ' +
      'Boat launch available. ' +
      'Bass: 10/day combined (Hartwell special regulation). ' +
      'Striped bass/hybrid: 10/day. ' +
      'Crappie: 30/day. No minimum size. ' +
      'Catfish: 25/day blue catfish.',
  },
  {
    id: 'sc-edisto-beach-state-park',
    state: 'SC',
    name: 'Edisto Beach State Park',
    type: 'State Park',
    acreage: 1255,
    counties: ['Colleton'],
    region: 'Lowcountry / Coastal',
    lat: 32.50,
    lng: -80.31,
    managing_agency: 'SC State Parks',
    phone: '843-869-2756',
    website: 'https://southcarolinaparks.com/edisto-beach',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'surf-fishing', 'pier-fishing', 'redfish', 'flounder', 'trout', 'crabbing', 'shrimping'],
    special_rules:
      'No hunting. Fishing and shellfishing. ' +
      'Surf fishing on Atlantic beach: Whiting, pompano, sharks, redfish. ' +
      'Saltwater creek fishing: Redfish, flounder, trout in Edisto River estuary. ' +
      'Crabbing allowed in creek areas. ' +
      'Shrimping: Cast net from bank in season. ' +
      'Boat ramp access to ACE Basin waters. ' +
      'Marine Fossil Beach: Shark teeth and fossil collecting permitted.',
  },
  {
    id: 'sc-table-rock-state-park',
    state: 'SC',
    name: 'Table Rock State Park',
    type: 'State Park',
    acreage: 3083,
    counties: ['Pickens'],
    region: 'Mountain / Upstate',
    lat: 35.03,
    lng: -82.71,
    managing_agency: 'SC State Parks',
    phone: '864-878-9813',
    website: 'https://southcarolinaparks.com/table-rock',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['trout', 'bass', 'bream', 'freshwater-fishing'],
    special_rules:
      'No hunting. Fishing in Carrick Creek and park lakes. ' +
      'Pinnacle Lake and Table Rock Lake: Largemouth bass, bream, catfish. ' +
      'Trout in Carrick Creek (mountain stream) — stocked seasonally. ' +
      'Fishing license + SC trout stamp required for trout. ' +
      'Rowboats and kayaks available for rent.',
  },
  {
    id: 'sc-myrtle-beach-state-park',
    state: 'SC',
    name: 'Myrtle Beach State Park',
    type: 'State Park',
    acreage: 312,
    counties: ['Horry'],
    region: 'Grand Strand',
    lat: 33.66,
    lng: -78.93,
    managing_agency: 'SC State Parks',
    phone: '843-238-5325',
    website: 'https://southcarolinaparks.com/myrtle-beach',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'pier-fishing', 'surf-fishing'],
    special_rules:
      'No hunting. Pier and surf fishing only. ' +
      'Myrtle Beach Fishing Pier (755 feet): Fee required. ' +
      'Pier species: King mackerel, Spanish mackerel, bluefish, sheepshead, flounder. ' +
      'Surf fishing on beach: Whiting, pompano, sharks. ' +
      'Saltwater license required.',
  },
  // ── FISH HATCHERIES WITH PUBLIC FISHING ACCESS ────────────────────────────
  {
    id: 'sc-dennis-wildlife-center',
    state: 'SC',
    name: 'Dennis Center Fish Hatchery (SCDNR)',
    type: 'Fish Hatchery',
    acreage: 800,
    counties: ['Berkeley'],
    region: 'Lowcountry',
    lat: 33.24,
    lng: -79.82,
    managing_agency: 'SCDNR',
    phone: '843-825-3387',
    website: 'https://www.dnr.sc.gov/fish/hatcheries.html',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'bream', 'catfish', 'freshwater-fishing', 'hatchery'],
    special_rules:
      'Limited public fishing in hatchery ponds on designated days. ' +
      'Call ahead for current access schedule. ' +
      'License required. ' +
      'SCDNR research facility and brood fish center — not primarily a public fishing area.',
  },
  {
    id: 'sc-columbia-hatchery',
    state: 'SC',
    name: 'Columbia Freshwater Fish Hatchery (SCDNR)',
    type: 'Fish Hatchery',
    acreage: 200,
    counties: ['Richland'],
    region: 'Midlands',
    lat: 34.05,
    lng: -81.06,
    managing_agency: 'SCDNR',
    phone: '803-734-3886',
    website: 'https://www.dnr.sc.gov/fish/hatcheries.html',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['hatchery', 'no-public-fishing'],
    special_rules:
      'No public fishing or hunting. SCDNR freshwater fish hatchery. ' +
      'Produces bass, bream, catfish, and other warmwater species for stocking. ' +
      'Tours by appointment.',
  },
  {
    id: 'sc-walhalla-fish-hatchery',
    state: 'SC',
    name: 'Walhalla State Fish Hatchery',
    type: 'Fish Hatchery',
    acreage: 120,
    counties: ['Oconee'],
    region: 'Mountain / Upstate',
    lat: 34.76,
    lng: -83.08,
    managing_agency: 'SCDNR',
    phone: '864-638-2866',
    website: 'https://www.dnr.sc.gov/fish/hatcheries.html',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['hatchery', 'trout', 'no-public-fishing'],
    special_rules:
      'No public fishing or hunting. Trout hatchery — produces rainbow, brown, and brook trout. ' +
      'Stocks over 90 streams and lakes in Upstate SC annually. ' +
      'Self-guided tours available when staff present.',
  },
  // ── ADDITIONAL NATIONAL FOREST / RECREATION AREAS ─────────────────────────
  {
    id: 'sc-chattooga-nra',
    state: 'SC',
    name: 'Chattooga National Wild & Scenic River Corridor',
    type: 'National Forest',
    acreage: 14753,
    counties: ['Oconee'],
    region: 'Mountain / Upstate',
    lat: 34.97,
    lng: -83.07,
    managing_agency: 'USDA Forest Service (Sumter NF / Andrew Pickens District)',
    website: 'https://www.fs.usda.gov/recarea/scnfs/recreation/fishing/recarea/?recid=47143',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'trout', 'bear', 'small-game', 'whitewater', 'wild-scenic-river'],
    special_rules:
      'WMA permit required for hunting. No Sunday hunting. No baiting (Zone 1). ' +
      '4-point antler restriction. Zone 1 deer season. ' +
      'Chattooga River: National Wild & Scenic River. Special fishing regulations. ' +
      'Trout: Catch-and-release sections, delayed harvest sections, put-and-take sections — check SCDNR. ' +
      'SC Trout stamp required. ' +
      'Whitewater rafting corridor — high recreational use. Be visible to boaters. ' +
      'Section IV (Bull Sluice to Tugaloo): Most remote. ' +
      'No motorized boats on Chattooga River.',
  },
  {
    id: 'sc-long-cane-area-trails',
    state: 'SC',
    name: 'Long Cane Scenic Area (Sumter NF)',
    type: 'National Forest',
    acreage: 3000,
    counties: ['Abbeville', 'McCormick'],
    region: 'Western Piedmont',
    lat: 34.03,
    lng: -82.44,
    managing_agency: 'USDA Forest Service (Sumter NF / Long Cane District)',
    website: 'https://www.fs.usda.gov/recarea/scnfs/',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'bass', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 2). Zone 2 deer season. ' +
      '4-point antler restriction. ' +
      'Long Cane Creek: Bass and sunfish. ' +
      'Scenic area within broader Western Piedmont Hunt Unit. ' +
      'Horse trails popular — be aware of equestrian use.',
  },
  {
    id: 'sc-beaverdam-creek-wma',
    state: 'SC',
    name: 'Beaverdam Creek WMA',
    type: 'WMA',
    acreage: 2100,
    counties: ['Oconee'],
    region: 'Upstate / Mountain',
    lat: 34.80,
    lng: -83.00,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'trout', 'small-game'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Beaverdam Creek: Trout stream — stocked seasonally, special regulations may apply. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-big-wateree-creek-wma',
    state: 'SC',
    name: 'Big Wateree Creek WMA',
    type: 'WMA',
    acreage: 1850,
    counties: ['Kershaw', 'Lancaster'],
    region: 'Midlands',
    lat: 34.50,
    lng: -80.70,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'bream'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting. Zone 4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Big Wateree Creek bottomlands — subject to flooding after heavy rain. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-calhoun-county-public',
    state: 'SC',
    name: 'Calhoun County Public Fishing Area',
    type: 'Conservation Area',
    acreage: 450,
    counties: ['Calhoun'],
    region: 'Midlands',
    lat: 33.68,
    lng: -80.78,
    managing_agency: 'SCDNR',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'bream', 'catfish', 'freshwater-fishing'],
    special_rules:
      'Public fishing area with multiple ponds. No hunting. ' +
      'Stocked by SCDNR — bass, crappie, bream, catfish. ' +
      'License required. Handicap-accessible fishing pier.',
  },
  {
    id: 'sc-carolina-wildlife-center',
    state: 'SC',
    name: 'Carolina Wildlife and Freshwater Fisheries Center',
    type: 'Conservation Area',
    acreage: 3200,
    counties: ['Orangeburg'],
    region: 'Midlands',
    lat: 33.47,
    lng: -80.81,
    managing_agency: 'SCDNR',
    phone: '803-534-5781',
    website: 'https://www.dnr.sc.gov/fish/',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'bream', 'catfish', 'freshwater-fishing', 'research'],
    special_rules:
      'Public fishing on designated ponds — check SCDNR for access dates. ' +
      'No hunting. SCDNR freshwater fisheries research station. ' +
      'License required.',
  },
  // ── PUBLIC FISHING AREAS (SCDNR) ──────────────────────────────────────────
  {
    id: 'sc-lake-greenwood-public',
    state: 'SC',
    name: 'Lake Greenwood Public Fishing and Hunting Areas',
    type: 'Conservation Area',
    acreage: 11400,
    counties: ['Greenwood', 'Newberry', 'Saluda'],
    region: 'Western Piedmont',
    lat: 34.18,
    lng: -81.92,
    managing_agency: 'Greenwood County / SCDNR',
    website: 'https://www.dnr.sc.gov/fishing/',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'bass', 'crappie', 'catfish', 'striped-bass', 'freshwater-fishing'],
    special_rules:
      'WMA permit required for hunting on SCDNR-managed shoreline tracts. Zone 2/3 deer. ' +
      '4-point antler restriction (Zone 2 portions). ' +
      'Lake Greenwood: 11,400-acre reservoir on Saluda River. ' +
      'Bass: 5/day, 12" minimum. ' +
      'Striped bass/hybrid: 3/day, 18" minimum. ' +
      'Crappie: 20/day, 8" minimum. ' +
      'Multiple county and SCDNR boat ramps.',
  },
  {
    id: 'sc-lake-clark-hill',
    state: 'SC',
    name: 'Clarks Hill / Strom Thurmond Lake Recreation Areas',
    type: 'Corps of Engineers',
    acreage: 26000,
    counties: ['McCormick', 'Edgefield'],
    region: 'Western Piedmont',
    lat: 33.67,
    lng: -82.20,
    managing_agency: 'U.S. Army Corps of Engineers / SCDNR',
    website: 'https://www.sas.usace.army.mil/Missions/Recreation/',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'quail', 'bass', 'striped-bass', 'crappie', 'catfish'],
    special_rules:
      'Part of J. Strom Thurmond Lake system — also listed under Thurmond Lake COE. ' +
      'Clarks Hill is the name used on GA side; Thurmond is SC side official name. ' +
      'WMA permit required on SC hunting lands. Zone 2 deer season. ' +
      '4-point antler restriction. No baiting. No Sunday hunting on WMA. ' +
      'Fishing: Same regulations as sc-thurmond-lake-coe.',
  },
  {
    id: 'sc-columbia-canal-riverfront',
    state: 'SC',
    name: 'Columbia Canal and Riverfront Park',
    type: 'Conservation Area', // DISCOVERED TYPE: Urban public fishing area managed by city/SCDNR
    acreage: 126,
    counties: ['Richland'],
    region: 'Midlands',
    lat: 34.01,
    lng: -81.05,
    managing_agency: 'City of Columbia / SCDNR',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'catfish', 'freshwater-fishing', 'urban-fishing', 'striper'],
    special_rules:
      'Urban fishing area — Broad River and Columbia Canal. No hunting. ' +
      'Striped bass: Present in Broad River (below Saluda dam confluence). ' +
      'Largemouth and smallmouth bass in rocky tailrace. ' +
      'Excellent striper fishing in spring. License required. ' +
      'Handicap-accessible platform at Riverfront Park.',
  },
  // ── DUKE ENERGY WILDLIFE LANDS ────────────────────────────────────────────
  {
    id: 'sc-duke-energy-catawba-lands',
    state: 'SC',
    name: 'Duke Energy Catawba-Wateree Project Wildlife Lands',
    type: 'Conservation Area',
    acreage: 45000,
    counties: ['Chester', 'Fairfield', 'Lancaster', 'York'],
    region: 'Piedmont',
    lat: 34.62,
    lng: -80.95,
    managing_agency: 'Duke Energy / SCDNR',
    website: 'https://www.duke-energy.com/community/parks',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'crappie', 'catfish', 'striped-bass'],
    special_rules:
      'WMA permit required on SCDNR-managed tracts. Zone 3/4 deer season varies by location. ' +
      'No antler point restriction (Zone 3 portions). ' +
      'Duke Energy manages shoreline lands around Lakes Wylie, Wateree, Fishing Creek, Great Falls. ' +
      'No hunting within posted recreation areas or boat ramps. ' +
      'Fishing: Largemouth bass, crappie, catfish, striped bass in all reservoirs. ' +
      'Check Duke Energy SC recreation map for specific land boundaries.',
  },
  {
    id: 'sc-fishing-creek-reservoir',
    state: 'SC',
    name: 'Fishing Creek Reservoir — Duke Energy',
    type: 'Conservation Area',
    acreage: 3415,
    counties: ['Chester'],
    region: 'Piedmont',
    lat: 34.71,
    lng: -81.12,
    managing_agency: 'Duke Energy / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'bass', 'crappie', 'catfish'],
    special_rules:
      'WMA permit required on hunting tracts. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Part of Duke Energy Catawba-Wateree Project. ' +
      'Fishing: Bass, crappie, catfish. Boat launch at Chester State Park area.',
  },
  {
    id: 'sc-great-falls-reservoir',
    state: 'SC',
    name: 'Great Falls (Rocky Creek) Reservoir — Duke Energy',
    type: 'Conservation Area',
    acreage: 2250,
    counties: ['Chester', 'Lancaster'],
    region: 'Piedmont',
    lat: 34.58,
    lng: -80.88,
    managing_agency: 'Duke Energy / SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'crappie', 'catfish'],
    special_rules:
      'WMA permit required on hunting tracts. Zone 3/4 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Catawba River impoundment. ' +
      'Fishing: Bass, crappie, catfish. Some bank fishing access.',
  },
  // ── CONGAREE SWAMP NATIONAL HERITAGE AREA ─────────────────────────────────
  {
    id: 'sc-lower-saluda-state-park',
    state: 'SC',
    name: 'Saluda Shoals Park / Lower Saluda River',
    type: 'Conservation Area',
    acreage: 380,
    counties: ['Lexington'],
    region: 'Midlands',
    lat: 34.05,
    lng: -81.23,
    managing_agency: 'Lexington County Recreation / SCDNR',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['trout', 'bass', 'catfish', 'striper', 'freshwater-fishing', 'tailrace'],
    special_rules:
      'No hunting. Urban river park with excellent fishing. ' +
      'Lower Saluda River below Lake Murray dam. ' +
      'Striped bass: Excellent tailrace fishery, especially spring. ' +
      'Trout: Stocked in cold water below dam during cool months (Nov–Mar). ' +
      'SC Trout stamp required when trout present. ' +
      'Largemouth and smallmouth bass also present. ' +
      'Kayak/canoe access. No gas motors in park boundaries.',
  },
  {
    id: 'sc-lake-thurmond-coe-recreation',
    state: 'SC',
    name: 'Thurmond Lake — Modoc Recreation Area / Hawe Creek',
    type: 'Corps of Engineers',
    acreage: 1200,
    counties: ['McCormick'],
    region: 'Western Piedmont',
    lat: 33.70,
    lng: -82.30,
    managing_agency: 'U.S. Army Corps of Engineers',
    website: 'https://www.sas.usace.army.mil/Missions/Recreation/',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'striped-bass', 'crappie', 'catfish', 'freshwater-fishing'],
    special_rules:
      'Recreation area — no hunting within campground/day-use boundaries. ' +
      'Fishing: Same regulations as Thurmond Lake COE. ' +
      'Bass: 10/day combined. Striped bass: 10/day. Crappie: 30/day. ' +
      'Modoc Recreation Area: Full-service campground, boat ramp, beach. ' +
      'Hawe Creek: Primitive camping, boat ramp.',
  },
  // ── ADDITIONAL LOWCOUNTRY / COASTAL LANDS ─────────────────────────────────
  {
    id: 'sc-palmetto-islands-county-park',
    state: 'SC',
    name: 'Palmetto Islands County Park',
    type: 'Conservation Area', // DISCOVERED TYPE: County conservation park with fishing access
    acreage: 943,
    counties: ['Charleston'],
    region: 'Lowcountry',
    lat: 32.86,
    lng: -79.91,
    managing_agency: 'Charleston County Parks',
    phone: '843-884-0832',
    website: 'https://www.ccprc.com/1426/Palmetto-Islands-County-Park',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'redfish', 'trout', 'flounder', 'crabbing'],
    special_rules:
      'No hunting. Saltwater and tidal creek fishing. ' +
      'Fishing pier and dock access. Canoe/kayak rentals available. ' +
      'Tidal creek species: Redfish, trout, flounder, sheepshead. ' +
      'Crabbing permitted with recreational license. ' +
      'Entrance fee. Open year-round.',
  },
  {
    id: 'sc-bear-island-waterfowl-area',
    state: 'SC',
    name: 'Bear Island Waterfowl Management Area (separate from Bear Island WMA)',
    type: 'WMA',
    acreage: 3900,
    counties: ['Colleton'],
    region: 'Lowcountry',
    lat: 32.57,
    lng: -80.43,
    managing_agency: 'SCDNR',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['waterfowl', 'deer', 'alligator', 'quota-hunt'],
    special_rules:
      'NOTE: This refers to the additional impoundment/waterfowl sections adjacent to main Bear Island WMA. ' +
      'Waterfowl: CATEGORY I — permit drawing required. ' +
      'Same general rules as sc-bear-island. WMA permit required. No Sunday hunting. Zone 6. ' +
      'Access by scheduled dates only. Check-in/check-out required.',
  },
  {
    id: 'sc-combahee-unit-ace-basin',
    state: 'SC',
    name: 'Combahee Unit — ACE Basin NWR',
    type: 'National Wildlife Refuge',
    acreage: 4900,
    counties: ['Colleton', 'Hampton'],
    region: 'Lowcountry',
    lat: 32.63,
    lng: -80.74,
    managing_agency: 'U.S. Fish & Wildlife Service',
    website: 'https://www.fws.gov/refuge/ace-basin',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'hog', 'dove', 'waterfowl', 'alligator', 'quota-hunt'],
    special_rules:
      'Part of ACE Basin NWR (Ernest F. Hollings). Managed separately from Grove Tract. ' +
      'Free refuge hunting permit required (at refuge HQ or online). Zone 6 deer season. ' +
      'Deer: Firearms hunts by quota — apply through FWS. Archery walk-on available. ' +
      'No antler point restriction. Either-sex. No baiting. No Sunday hunting. ' +
      'Dove: Managed field hunts. ' +
      'Hog: Legal during open deer season. ' +
      'Turkey: Spring gobblers, refuge-specific dates. ' +
      'Fishing: Combahee River — redfish, trout, flounder (tidal), bass and catfish (freshwater). ' +
      'Check-in/check-out required.',
  },
  {
    id: 'sc-grove-tract-ace-basin',
    state: 'SC',
    name: 'Grove Tract — ACE Basin NWR',
    type: 'National Wildlife Refuge',
    acreage: 6915,
    counties: ['Colleton'],
    region: 'Lowcountry',
    lat: 32.72,
    lng: -80.52,
    managing_agency: 'U.S. Fish & Wildlife Service',
    website: 'https://www.fws.gov/refuge/ace-basin',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'archery', 'alligator', 'saltwater-fishing'],
    special_rules:
      'Part of ACE Basin NWR (Ernest F. Hollings). Archery-only for deer hunting. ' +
      'Free refuge hunting permit required. Zone 6 deer season. ' +
      'Deer: ARCHERY ONLY — walk-on during archery season. ' +
      'Hog: Legal during archery season, no limit. ' +
      'Alligator: Drawing tags may include Grove Tract waters. ' +
      'Fishing: Tidal creeks and rivers — redfish, flounder, trout. ' +
      'No Sunday hunting. No baiting.',
  },
  {
    id: 'sc-pinckney-island-nwr',
    state: 'SC',
    name: 'Pinckney Island National Wildlife Refuge',
    type: 'National Wildlife Refuge',
    acreage: 4053,
    counties: ['Beaufort'],
    region: 'Lowcountry / Coastal',
    lat: 32.22,
    lng: -80.75,
    managing_agency: 'U.S. Fish & Wildlife Service',
    phone: '912-652-4415',
    website: 'https://www.fws.gov/refuge/pinckney-island',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'redfish', 'trout', 'flounder', 'wildlife-viewing', 'hiking'],
    special_rules:
      'No hunting. Freshwater pond fishing and tidal fishing allowed. ' +
      'Freshwater ponds: Largemouth bass, bream. License required. ' +
      'Tidal creek fishing: Redfish, trout, flounder from banks. Saltwater license required. ' +
      'Refuge open sunrise to sunset. No overnight camping. ' +
      'Near Hilton Head Island — accessible via US-278 causeway. ' +
      'Excellent shorebird and wading bird watching.',
  },
  {
    id: 'sc-savannah-nwr',
    state: 'SC',
    name: 'Savannah National Wildlife Refuge (SC portion)',
    type: 'National Wildlife Refuge',
    acreage: 14869,
    counties: ['Jasper'],
    region: 'Lowcountry',
    lat: 32.12,
    lng: -81.07,
    managing_agency: 'U.S. Fish & Wildlife Service',
    phone: '912-652-4415',
    website: 'https://www.fws.gov/refuge/savannah',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'hog', 'waterfowl', 'dove', 'alligator', 'saltwater-fishing'],
    special_rules:
      'Free refuge hunting permit required. Zone 6 deer season. ' +
      'No antler point restriction. Either-sex entire season. No baiting. No Sunday hunting. ' +
      'Deer: Quota archery and firearms hunts — apply through FWS. ' +
      'Waterfowl: Impoundments — waterfowl hunting by quota permit. ' +
      'Dove: Managed field hunts on specific dates. ' +
      'Hog: Legal during open deer season. ' +
      'Alligator: Drawing tags include Savannah River Pool units. ' +
      'Fishing: Pools and Savannah River — bass, catfish, bream; tidal species in SC. ' +
      'Swamp road walk/bike: Open daily during daylight. ' +
      'Straddles SC/GA border; SC portion in Jasper County.',
  },
  {
    id: 'sc-tybee-nwr-sc',
    state: 'SC',
    name: 'Tybee National Wildlife Refuge (SC waters)',
    type: 'National Wildlife Refuge',
    acreage: 100,
    counties: ['Jasper'],
    region: 'Lowcountry / Coastal',
    lat: 32.00,
    lng: -80.90,
    managing_agency: 'U.S. Fish & Wildlife Service',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['saltwater-fishing', 'redfish', 'trout', 'wildlife-viewing'],
    special_rules:
      'Primarily a migratory bird refuge and loggerhead turtle nesting site. ' +
      'Limited public access — primarily waters around Tybee Island. ' +
      'Saltwater fishing in surrounding SC coastal waters with state license. ' +
      'No vehicle or foot access to most NWR lands.',
  },
  // ── SANTEE COOPER / LAKES MARION & MOULTRIE ───────────────────────────────
  {
    id: 'sc-lake-marion-public',
    state: 'SC',
    name: 'Lake Marion Public Fishing and Wildlife Access',
    type: 'Conservation Area',
    acreage: 110600,
    counties: ['Clarendon', 'Calhoun', 'Orangeburg', 'Berkeley', 'Sumter'],
    region: 'Midlands',
    lat: 33.55,
    lng: -80.35,
    managing_agency: 'Santee Cooper / SCDNR',
    website: 'https://www.santeecoopercountry.org',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'catfish', 'striped-bass', 'bream', 'freshwater-fishing'],
    special_rules:
      'Open lake — public fishing access with valid SC license. No hunting on lake itself. ' +
      'Bass: 5/day, 14" minimum. Slot protection: 14"–18" protected on some portions. ' +
      'Crappie: 20/day, 8" minimum. ' +
      'Blue catfish: 25/day, max 1 over 36". ' +
      'World-famous bass fishing. One of top crappie lakes in Southeast. ' +
      'Striped bass: Landlocked population, 3/day, 18" minimum. ' +
      'Numerous public boat ramps around lake. Santee Cooper manages shoreline.',
  },
  {
    id: 'sc-lake-moultrie-public',
    state: 'SC',
    name: 'Lake Moultrie Public Fishing and Wildlife Access',
    type: 'Conservation Area',
    acreage: 60435,
    counties: ['Berkeley', 'Orangeburg'],
    region: 'Lowcountry',
    lat: 33.22,
    lng: -80.03,
    managing_agency: 'Santee Cooper / SCDNR',
    website: 'https://www.santeecoopercountry.org',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'catfish', 'striped-bass', 'bream', 'freshwater-fishing'],
    special_rules:
      'Open lake — public fishing access. No hunting on lake itself. ' +
      'Same regulations as Lake Marion for most species. ' +
      'Bass: 5/day, 14" minimum. Crappie: 20/day, 8" minimum. ' +
      'Blue catfish: 25/day, max 1 over 36". ' +
      'Striped bass: 3/day, 18" minimum — landlocked population. ' +
      'Moultrie has some of the highest blue catfish densities in SC. ' +
      'Multiple public boat ramps — Russellville, Moncks Corner, Bonneau areas.',
  },
  // ── SWAMPS AND RIVER CORRIDORS ─────────────────────────────────────────────
  {
    id: 'sc-four-holes-swamp',
    state: 'SC',
    name: 'Four Holes Swamp / Francis Beidler Forest',
    type: 'Conservation Area',
    acreage: 18000,
    counties: ['Dorchester', 'Colleton'],
    region: 'Lowcountry',
    lat: 33.10,
    lng: -80.45,
    managing_agency: 'National Audubon Society / The Nature Conservancy',
    website: 'https://www.audubon.org/nature-center/beidler-forest',
    hunting_allowed: false,
    fishing_allowed: false,
    tags: ['wildlife-viewing', 'boardwalk', 'no-hunting', 'no-fishing', 'old-growth'],
    special_rules:
      'No hunting or fishing. Private conservation sanctuary. ' +
      'Francis Beidler Forest: Old-growth bald cypress-tupelo swamp. ' +
      'World\'s largest virgin bald cypress swamp forest. ' +
      'Guided canoe tours and boardwalk nature walks. Fee required. ' +
      'Barred owls, prothonotary warblers, alligators, river otters.',
  },
  {
    id: 'sc-lower-lynches-river',
    state: 'SC',
    name: 'Lynches River County Park and Public Fishing Area',
    type: 'Conservation Area',
    acreage: 675,
    counties: ['Florence'],
    region: 'PeeDee',
    lat: 34.01,
    lng: -79.76,
    managing_agency: 'Florence County / SCDNR',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'catfish', 'bream', 'chain-pickerel', 'freshwater-fishing', 'canoe'],
    special_rules:
      'No hunting. Public river fishing. ' +
      'Lynches River: Blackwater river — largemouth bass, catfish, bream, chain pickerel. ' +
      'Canoe launch available. SCDNR stocks annually. ' +
      'License required.',
  },
  {
    id: 'sc-lake-thurston-fishing',
    state: 'SC',
    name: 'Lake Thurston Public Fishing Area (Cheraw SP)',
    type: 'State Park',
    acreage: 360,
    counties: ['Chesterfield'],
    region: 'PeeDee',
    lat: 34.70,
    lng: -79.93,
    managing_agency: 'SC State Parks',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'bream', 'catfish', 'crappie', 'freshwater-fishing'],
    special_rules:
      'Fishing access at Cheraw State Park lake. ' +
      'Electric motors only. No gas motors. ' +
      'Boat rentals available at park. ' +
      'License required. See also sc-cheraw-state-park for hunting info.',
  },
  // ── PIEDMONT PUBLIC AREAS ──────────────────────────────────────────────────
  {
    id: 'sc-sumter-nf-buncombe-trail',
    state: 'SC',
    name: 'Buncombe Trail / Sumter NF Enoree District Recreation',
    type: 'National Forest',
    acreage: 4500,
    counties: ['Newberry', 'Union'],
    region: 'Piedmont',
    lat: 34.52,
    lng: -81.65,
    managing_agency: 'USDA Forest Service (Sumter NF / Enoree District)',
    website: 'https://www.fs.usda.gov/recarea/scnfs/',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'bass', 'equestrian', 'hiking'],
    special_rules:
      'WMA permit required. No Sunday hunting. Zone 3 deer season. ' +
      'No antler point restriction. Either-sex entire season. ' +
      'Buncombe Horse Trail system (75 miles) — hunting and equestrian coexist. ' +
      'Enoree River access for bass and catfish fishing. ' +
      'Turkey: Spring gobblers only.',
  },
  {
    id: 'sc-sumter-nf-long-cane-trail',
    state: 'SC',
    name: 'Long Cane Trail Area / Sumter NF Long Cane District',
    type: 'National Forest',
    acreage: 6000,
    counties: ['Abbeville', 'McCormick'],
    region: 'Western Piedmont',
    lat: 34.05,
    lng: -82.38,
    managing_agency: 'USDA Forest Service (Sumter NF / Long Cane District)',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'small-game', 'equestrian'],
    special_rules:
      'WMA permit required. No Sunday hunting. No baiting (Zone 2). Zone 2 deer season. ' +
      '4-point antler restriction. ' +
      'Horse and mule use on designated equestrian trails. ' +
      'Turkey: Spring gobblers only. ' +
      'Long Cane Creek: Bass and sunfish fishing.',
  },
  // ── COUNTY AND MUNICIPAL FISHING LAKES ────────────────────────────────────
  {
    id: 'sc-lake-robinson',
    state: 'SC',
    name: 'Lake Robinson (Greenville Water System)',
    type: 'Conservation Area', // DISCOVERED TYPE: Municipal utility land with public fishing
    acreage: 850,
    counties: ['Greenville'],
    region: 'Upstate',
    lat: 34.95,
    lng: -82.31,
    managing_agency: 'Greenville Water / SCDNR',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'bream', 'catfish', 'freshwater-fishing'],
    special_rules:
      'Public fishing only — no hunting. Municipal water supply reservoir. ' +
      'Fishing permit required from Greenville Water in addition to SC license. ' +
      'Electric motors only (no gasoline). No swimming. ' +
      'Excellent largemouth bass fishing in upstate SC. ' +
      'Year-round access from permitted ramps.',
  },
  {
    id: 'sc-lake-cooley',
    state: 'SC',
    name: 'Lake Cooley — Spartanburg Reservoir',
    type: 'Conservation Area',
    acreage: 340,
    counties: ['Spartanburg'],
    region: 'Upstate',
    lat: 34.83,
    lng: -81.93,
    managing_agency: 'Spartanburg Water / SCDNR',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'bream', 'catfish', 'freshwater-fishing'],
    special_rules:
      'Municipal water supply reservoir — public fishing allowed with permit. ' +
      'Permit from Spartanburg Water + SC fishing license required. ' +
      'Electric motors only. No gas. No swimming. ' +
      'Bass, crappie, bream, catfish present.',
  },
  {
    id: 'sc-landsford-canal-state-park',
    state: 'SC',
    name: 'Landsford Canal State Park',
    type: 'State Park',
    acreage: 448,
    counties: ['Chester'],
    region: 'Piedmont',
    lat: 34.77,
    lng: -80.87,
    managing_agency: 'SC State Parks',
    phone: '803-789-5800',
    website: 'https://southcarolinaparks.com/landsford-canal',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'catfish', 'bream', 'freshwater-fishing', 'rocky-shoals-spider-lily'],
    special_rules:
      'No hunting. Catawba River bank fishing. ' +
      'Historic canal with spider lily bloom (May–June) — world\'s largest rocky shoals spider lily colony. ' +
      'Catawba River: Largemouth and spotted bass, catfish, bream. ' +
      'Boat launch limited — mostly bank fishing. ' +
      'State park entry fee.',
  },
  {
    id: 'sc-devils-fork-state-park',
    state: 'SC',
    name: "Devil's Fork State Park (Lake Jocassee)",
    type: 'State Park',
    acreage: 622,
    counties: ['Oconee'],
    region: 'Mountain / Upstate',
    lat: 34.98,
    lng: -82.93,
    managing_agency: 'SC State Parks',
    phone: '864-944-2639',
    website: 'https://southcarolinaparks.com/devils-fork',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['trout', 'bass', 'walleye', 'smallmouth-bass', 'freshwater-fishing'],
    special_rules:
      'No hunting. Primary public access point to Lake Jocassee. ' +
      'Lake Jocassee fishing: Trout (brown and rainbow, 5/day, 12" minimum), ' +
      'walleye (5/day, 14" minimum), smallmouth bass. ' +
      'SC trout stamp required for trout. ' +
      'Boat ramp available. Crystal clear water — excellent scuba diving. ' +
      'Also see sc-lake-jocassee entry.',
  },
  {
    id: 'sc-oconee-state-park',
    state: 'SC',
    name: 'Oconee State Park',
    type: 'State Park',
    acreage: 1165,
    counties: ['Oconee'],
    region: 'Mountain / Upstate',
    lat: 34.86,
    lng: -83.12,
    managing_agency: 'SC State Parks',
    phone: '864-638-5353',
    website: 'https://southcarolinaparks.com/oconee',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['trout', 'bass', 'bream', 'freshwater-fishing'],
    special_rules:
      'No hunting. Fishing in park lake and streams. ' +
      'Station Cove: Mountain stream trout water — stocked rainbow trout. ' +
      'SC trout stamp required. ' +
      'Park lake: Bass and bream. Boat rentals available (no private gas motors). ' +
      'Appalachian Trail access nearby.',
  },
  {
    id: 'sc-caesars-head-state-park',
    state: 'SC',
    name: "Caesar's Head State Park",
    type: 'State Park',
    acreage: 7467,
    counties: ['Greenville'],
    region: 'Mountain / Upstate',
    lat: 35.09,
    lng: -82.63,
    managing_agency: 'SC State Parks / SCDNR',
    phone: '864-836-6115',
    website: 'https://southcarolinaparks.com/caesars-head',
    hunting_allowed: true,
    fishing_allowed: true,
    tags: ['deer', 'turkey', 'grouse', 'trout', 'bear', 'small-game'],
    special_rules:
      'WMA permit required for hunting. No Sunday hunting. No baiting (Zone 1). Zone 1 deer season. ' +
      '4-point antler restriction. ' +
      'Overlaps with Mountain Hunt Unit — check boundaries. ' +
      'Ruffed grouse: Oct 15–Mar 1, 3/day. ' +
      'Bear: Protected — no open season. ' +
      'Trout: Matthews Creek and tributaries — stocked. SC trout stamp required. ' +
      'Turkey: Spring gobblers only. ' +
      'Hawk watching: World-class broad-winged hawk migration in September.',
  },
  {
    id: 'sc-paris-mountain-state-park',
    state: 'SC',
    name: 'Paris Mountain State Park',
    type: 'State Park',
    acreage: 1275,
    counties: ['Greenville'],
    region: 'Upstate',
    lat: 34.94,
    lng: -82.34,
    managing_agency: 'SC State Parks',
    phone: '864-244-5565',
    website: 'https://southcarolinaparks.com/paris-mountain',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'bream', 'catfish', 'freshwater-fishing'],
    special_rules:
      'No hunting. Urban state park in Greenville metro. ' +
      'Lake Placid and smaller lakes: Largemouth bass, bream, catfish. ' +
      'Fishing license required. Boat rentals (no gas motors). ' +
      'Swimming area open in summer.',
  },
  {
    id: 'sc-poinsett-state-park',
    state: 'SC',
    name: 'Poinsett State Park',
    type: 'State Park',
    acreage: 1006,
    counties: ['Sumter'],
    region: 'Midlands',
    lat: 33.83,
    lng: -80.53,
    managing_agency: 'SC State Parks',
    phone: '803-494-8177',
    website: 'https://southcarolinaparks.com/poinsett',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'bream', 'catfish', 'freshwater-fishing'],
    special_rules:
      'No hunting. Mountain Swell terrain — unusual for Midlands SC. ' +
      'Mill Pond: Largemouth bass, bream, catfish. ' +
      'Fishing license required. Boat rentals (no gas motors). ' +
      'Unique ecological transition zone — mountain and Lowcountry species overlap.',
  },
  {
    id: 'sc-givhans-ferry-state-park',
    state: 'SC',
    name: 'Givhans Ferry State Park',
    type: 'State Park',
    acreage: 988,
    counties: ['Dorchester'],
    region: 'Lowcountry',
    lat: 33.04,
    lng: -80.38,
    managing_agency: 'SC State Parks',
    phone: '843-873-0692',
    website: 'https://southcarolinaparks.com/givhans-ferry',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'catfish', 'bream', 'redbreast', 'freshwater-fishing'],
    special_rules:
      'No hunting. Edisto River bank and boat fishing. ' +
      'Edisto River: Redbreast sunfish, largemouth bass, catfish — known for redbreast fishery. ' +
      'Canoe/kayak launch available. Fishing license required.',
  },
  {
    id: 'sc-santee-state-park',
    state: 'SC',
    name: 'Santee State Park',
    type: 'State Park',
    acreage: 2500,
    counties: ['Orangeburg'],
    region: 'Midlands',
    lat: 33.50,
    lng: -80.49,
    managing_agency: 'SC State Parks',
    phone: '803-854-2408',
    website: 'https://southcarolinaparks.com/santee',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'crappie', 'catfish', 'striped-bass', 'bream', 'freshwater-fishing'],
    special_rules:
      'No hunting. Premier fishing access to Lakes Marion and Moultrie. ' +
      'Two piers (one over Lake Marion, one over Lake Moultrie connecting canal). ' +
      'Boat ramp available. Fishing license required. ' +
      'Bass: 5/day, 14" minimum. Crappie: 20/day, 8" minimum. ' +
      'Striped bass: 3/day, 18" minimum. ' +
      'Blue catfish: 25/day, max 1 over 36". ' +
      'Known as one of the best fishing state parks in SC.',
  },
  {
    id: 'sc-colleton-state-park',
    state: 'SC',
    name: 'Colleton State Park',
    type: 'State Park',
    acreage: 35,
    counties: ['Colleton'],
    region: 'Lowcountry',
    lat: 33.17,
    lng: -80.61,
    managing_agency: 'SC State Parks',
    phone: '843-538-8206',
    website: 'https://southcarolinaparks.com/colleton',
    hunting_allowed: false,
    fishing_allowed: true,
    tags: ['bass', 'catfish', 'bream', 'redbreast', 'freshwater-fishing', 'canoe'],
    special_rules:
      'No hunting. Small park — primary use is Edisto River canoe trail access. ' +
      'Edisto River: Redbreast sunfish, largemouth bass, catfish. ' +
      'Canoe launch for Edisto River paddling trail. Fishing license required.',
  },
];

