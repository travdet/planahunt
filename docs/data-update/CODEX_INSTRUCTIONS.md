# Instructions for Codex: Update Hunting App with New Data Structure

## Overview
The app's data structure has been significantly enhanced to support more detailed hunting information, multiple area types (WMAs, Federal lands, State Parks, VPAs), and better user experience through warnings and filters.

## Database Schema Changes

### 1. WMAs Collection - NEW FIELDS

Add these fields to the WMAs collection/table:

```typescript
interface WMA {
  // Existing fields (keep as-is)
  id: string;
  name: string;
  tract_name: string;
  area_type: string;
  acreage: number;
  phone: string;
  counties: string[];
  region: string;
  lat: number | null;
  lng: number | null;
  source_url: string;
  tags: string[];
  
  // NEW FIELDS - Add these:
  directions: string;                    // Driving directions to the area
  area_notes: string;                    // General notes about the area
  camping_allowed: boolean;              // Whether camping is permitted
  atv_allowed: boolean;                  // Whether ATVs are permitted
  area_category: "WMA" | "Federal" | "State Park" | "VPA";  // Type of hunting area
  managing_agency: string;               // Which agency manages this land
}
```

### 2. Seasons Collection - NEW FIELDS

Add these fields to the Seasons collection/table:

```typescript
interface Season {
  // Existing fields (keep as-is)
  id: string;
  wma_id: string;
  species: string;
  weapon: string;
  follows_statewide: boolean;
  includes: DateRange[];
  excludes: DateRange[];
  quota_required: boolean;
  buck_only: boolean;
  notes_short: string;
  tags: string[];
  
  // NEW FIELDS - Add these:
  weapon_subcategory: string | null;       // e.g., "Shotgun Only", "Buckshot Only"
  antler_restrictions: string | null;      // Full text of antler restrictions
  bag_limit: string | null;                // e.g., "3/person" or "5 deer, no more than 2 antlered"
  quota_details: string | null;            // e.g., "Q150 permits, Pre-hunt meeting required"
  shooting_hours_restriction: string | null; // e.g., "End at noon"
  sign_in_required: boolean;               // Whether sign-in at station is required
  important_notes: string[];               // Array of critical warnings to highlight
  activity_type: "Hunting" | "Dog Training" | "Shooting Range" | "Archery Range";
}
```

## UI/UX Updates Needed

### 3. Map Pin Visualization

Update the map component to use **different colored pins AND shapes** based on `area_category`:

```typescript
const getPinStyle = (area_category: string) => {
  switch(area_category) {
    case "WMA":
      return { color: "green", shape: "circle" };      // Green Circle
    case "Federal":
      return { color: "blue", shape: "square" };       // Blue Square
    case "State Park":
      return { color: "red", shape: "triangle" };      // Red Triangle
    case "VPA":
      return { color: "purple", shape: "diamond" };    // Purple Diamond
    default:
      return { color: "green", shape: "circle" };
  }
};
```

**Implementation notes:**
- Use SVG or custom markers for shapes
- Ensure pins are distinguishable at all zoom levels
- Add legend to map showing what each color/shape means

### 4. Area Cards - Category Badges

Add a colored badge to each area card showing the area category:

```tsx
<AreaCard>
  <CategoryBadge category={area.area_category} />
  {/* Green badge for WMA, Blue for Federal, Red for State Park, Purple for VPA */}
  <h3>{area.name}</h3>
  {/* ... rest of card */}
</AreaCard>
```

### 5. Filters - Add New Filter Options

Add these new filters to the search/filter interface:

**Area Type Filter:**
- [ ] WMA
- [ ] Federal
- [ ] State Park
- [ ] VPA

**Amenities Filter:**
- [ ] Camping Available
- [ ] ATV Allowed

**Activity Type Filter** (for seasons):
- [ ] Hunting
- [ ] Dog Training
- [ ] Shooting Range
- [ ] Archery Range

**Weapon Subcategory Filter:**
- [ ] Any Firearms
- [ ] Shotgun Only
- [ ] Buckshot Only
- [ ] Muzzleloader

### 6. Season Detail View - Important Warnings Section

When displaying season details, add a prominent "Important Information" section at the top if `important_notes` array has items:

```tsx
{season.important_notes.length > 0 && (
  <ImportantNotesSection>
    <WarningIcon />
    <h4>Important Information</h4>
    <ul>
      {season.important_notes.map(note => (
        <li key={note}>⚠️ {note}</li>
      ))}
    </ul>
  </ImportantNotesSection>
)}
```

**Style this prominently:** 
- Yellow/orange background
- Bold text
- Warning icon
- Positioned above other season details

### 7. Season Detail View - Detailed Information Sections

After important notes, display detailed information in organized sections:

```tsx
<SeasonDetails>
  {/* Important Notes (from step 6) */}
  
  {/* Basic Info */}
  <Section>
    <h4>Hunt Details</h4>
    <Detail label="Species">{season.species}</Detail>
    <Detail label="Weapon">{season.weapon}</Detail>
    {season.weapon_subcategory && (
      <Detail label="Weapon Restriction">{season.weapon_subcategory}</Detail>
    )}
    <Detail label="Activity Type">{season.activity_type}</Detail>
  </Section>

  {/* Restrictions */}
  {(season.antler_restrictions || season.bag_limit || season.shooting_hours_restriction) && (
    <Section>
      <h4>Restrictions</h4>
      {season.antler_restrictions && (
        <Detail label="Antler Requirements">{season.antler_restrictions}</Detail>
      )}
      {season.bag_limit && (
        <Detail label="Bag Limit">{season.bag_limit}</Detail>
      )}
      {season.shooting_hours_restriction && (
        <Detail label="Shooting Hours">{season.shooting_hours_restriction}</Detail>
      )}
    </Section>
  )}

  {/* Quota Information */}
  {season.quota_required && (
    <Section>
      <h4>Quota Hunt Information</h4>
      <Detail label="Permit Required">Yes</Detail>
      {season.quota_details && (
        <Detail label="Details">{season.quota_details}</Detail>
      )}
    </Section>
  )}

  {/* Additional Notes */}
  {season.notes_short && (
    <Section>
      <h4>Additional Information</h4>
      <p>{season.notes_short}</p>
    </Section>
  )}
</SeasonDetails>
```

### 8. Area Detail View - Enhanced Information Display

Update the WMA/Area detail page to show new fields:

```tsx
<AreaDetails>
  <Header>
    <CategoryBadge category={area.area_category} />
    <h1>{area.name}</h1>
    <SubHeader>{area.managing_agency}</SubHeader>
  </Header>

  <QuickInfo>
    <InfoItem icon="🏕️" label="Camping" value={area.camping_allowed ? "Allowed" : "Not Allowed"} />
    <InfoItem icon="🏍️" label="ATVs" value={area.atv_allowed ? "Allowed" : "Not Allowed"} />
    <InfoItem icon="📏" label="Size" value={`${area.acreage.toLocaleString()} acres`} />
    <InfoItem icon="📞" label="Phone" value={area.phone} />
  </QuickInfo>

  {area.directions && (
    <Section>
      <h3>🗺️ Directions</h3>
      <p>{area.directions}</p>
    </Section>
  )}

  {area.area_notes && (
    <Section>
      <h3>ℹ️ Area Information</h3>
      <p>{area.area_notes}</p>
    </Section>
  )}

  {/* ... seasons list ... */}
</AreaDetails>
```

### 9. Search/Filter Logic Updates

Update search and filter logic to handle new fields:

**Filtering by activity type:**
```typescript
const filteredSeasons = seasons.filter(season => {
  // Existing filters...
  
  // Activity type filter
  if (filters.activityType && season.activity_type !== filters.activityType) {
    return false;
  }
  
  // Weapon subcategory filter
  if (filters.weaponSubcategory && season.weapon_subcategory !== filters.weaponSubcategory) {
    return false;
  }
  
  // Camping filter
  if (filters.campingOnly && !wmas.find(w => w.id === season.wma_id)?.camping_allowed) {
    return false;
  }
  
  return true;
});
```

### 10. Data Migration

If you have existing data in the database, create a migration script:

```typescript
// Migration: Add new fields with default values
async function migrateWMAs() {
  const wmas = await db.collection('wmas').find().toArray();
  
  for (const wma of wmas) {
    await db.collection('wmas').updateOne(
      { id: wma.id },
      {
        $set: {
          directions: wma.directions || "",
          area_notes: wma.area_notes || "",
          camping_allowed: wma.camping_allowed ?? false,
          atv_allowed: wma.atv_allowed ?? false,
          area_category: wma.area_category || "WMA",
          managing_agency: wma.managing_agency || "GA DNR Wildlife Resources Division"
        }
      }
    );
  }
}

async function migrateSeasons() {
  const seasons = await db.collection('seasons').find().toArray();
  
  for (const season of seasons) {
    await db.collection('seasons').updateOne(
      { id: season.id },
      {
        $set: {
          weapon_subcategory: season.weapon_subcategory || null,
          antler_restrictions: season.antler_restrictions || null,
          bag_limit: season.bag_limit || null,
          quota_details: season.quota_details || null,
          shooting_hours_restriction: season.shooting_hours_restriction || null,
          sign_in_required: season.sign_in_required ?? false,
          important_notes: season.important_notes || [],
          activity_type: season.activity_type || "Hunting"
        }
      }
    );
  }
}
```

### 11. Testing Checklist

After implementing changes, test:

- [ ] Map displays different colored pins/shapes for different area categories
- [ ] Legend on map correctly identifies each category
- [ ] Area cards show category badges
- [ ] Filters work for: area category, camping, ATVs, activity type, weapon subcategory
- [ ] Season detail pages show important notes prominently
- [ ] All new fields display correctly
- [ ] Statewide seasons (follows_statewide: true) display appropriately
- [ ] Mobile responsiveness maintained with new UI elements
- [ ] Search functionality works with new fields

### 12. Data Import

Once app is updated, import the new data files:
- `wmas_updated_schema.json` - Contains updated WMA data with new schema
- `seasons_updated_schema.json` - Contains updated season data with new schema

**Note:** The provided schema files contain examples. The complete dataset needs to be parsed from the regulation documents. See "Data Parsing Requirements" section below.

## Data Parsing Requirements

The regulation documents contain approximately:
- 150+ hunting areas (WMAs, Federal, State Parks, VPAs)
- 2,000+ season entries
- Multiple species per area
- Multiple weapon types per species  
- Multiple date ranges per season

**Recommendation:** Create a Python/Node.js parsing script that:
1. Reads the regulation PDF/text documents
2. Parses each area's information systematically
3. Creates season entries for each species/weapon/date combination
4. Validates all dates and relationships
5. Outputs complete JSON files

**Key parsing rules:**
- September-December dates = year 2025
- January-May dates = year 2026
- "State seasons" = set `follows_statewide: true` with empty `includes` array
- Create separate season entries for each weapon type
- Create separate season entries for each non-contiguous date range
- Parse all species including: Deer, Bear, Turkey, Dove, Waterfowl, Quail, Rabbit, Small Game, Coyote, Alligator, Feral Hog
- Parse all activities including: Dog Training (Bird, Rabbit, Furbearer), Shooting Ranges, Archery Ranges

## Questions or Issues?

If you encounter any ambiguities in the data structure or need clarification on implementation details, please ask before proceeding with significant code changes.
