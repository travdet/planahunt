# Quick Reference: Updated Data Structure

## WMA Object Structure
```json
{
  "id": "wma-example",
  "name": "Example WMA",
  "tract_name": "",
  "area_type": "WMA",
  "acreage": 5000,
  "phone": "123.456.7890",
  "counties": [],
  "region": "",
  "lat": null,
  "lng": null,
  "source_url": "",
  "tags": ["Quota", "Bonus"],
  "directions": "From City: Take Hwy...",
  "area_notes": "No camping. ATVs prohibited...",
  "camping_allowed": false,
  "atv_allowed": false,
  "area_category": "WMA",
  "managing_agency": "GA DNR Wildlife Resources Division"
}
```

## Season Object Structure
```json
{
  "id": "wma-example-deer-archery-any-2025-09-13",
  "wma_id": "wma-example",
  "species": "Deer",
  "weapon": "Archery",
  "weapon_subcategory": null,
  "follows_statewide": false,
  "includes": [{"start": "2025-09-13", "end": "2025-10-19"}],
  "excludes": [],
  "quota_required": false,
  "buck_only": false,
  "notes_short": "",
  "antler_restrictions": null,
  "bag_limit": null,
  "quota_details": null,
  "shooting_hours_restriction": null,
  "sign_in_required": false,
  "important_notes": [],
  "activity_type": "Hunting",
  "tags": []
}
```

## Field Value Options

### area_category
- `"WMA"` - Wildlife Management Area
- `"Federal"` - Federal lands (NWR, National Forest, etc.)
- `"State Park"` - Georgia State Parks
- `"VPA"` - Voluntary Public Access

### managing_agency
- `"GA DNR Wildlife Resources Division"`
- `"US Forest Service"`
- `"US Fish & Wildlife Service"`
- `"US Army Corps of Engineers"`
- `"GA State Parks"`
- `"National Park Service"`
- `"US Department of Defense"`

### weapon
- `"Archery"`
- `"Primitive"`
- `"Firearms"`
- `null` (for non-hunting activities)

### weapon_subcategory
- `null` (most common - no restriction)
- `"Shotgun Only"`
- `"Buckshot Only"`
- `"Muzzleloader"`

### species
- `"Deer"`
- `"Bear"`
- `"Turkey"`
- `"Dove"`
- `"Waterfowl"`
- `"Quail"`
- `"Rabbit"`
- `"Small Game"`
- `"Coyote"`
- `"Alligator"`
- `"Feral Hog"`
- `"Bird Dog Training"`
- `"Rabbit Dog Training"`
- `"Furbearer Dog Training"`

### activity_type
- `"Hunting"`
- `"Dog Training"`
- `"Shooting Range"`
- `"Archery Range"`

## ID Formatting

### WMA IDs
Format: `prefix-lowercase-name`

Examples:
- `wma-alapaha-river`
- `federal-bond-swamp-nwr`
- `park-hard-labor-creek`
- `vpa-london-farms`

### Season IDs
Format: `wma-id-species-weapon-sex-start-date`

Examples:
- `wma-alapaha-river-deer-archery-any-2025-09-13`
- `wma-dawson-forest-deer-firearms-buck-2025-10-29`
- `park-hard-labor-creek-deer-firearms-any-2025-11-04`

## Date Formatting

Always use: `YYYY-MM-DD`

Year rules:
- Sept-Dec → 2025
- Jan-May → 2026
- June-Aug → 2025

Examples:
- Sept. 13 → `2025-09-13`
- Apr. 4 → `2026-04-04`
- Dec. 31 → `2025-12-31`

## Boolean Fields

Use actual booleans, not strings:
- ✅ `"camping_allowed": false`
- ❌ `"camping_allowed": "false"`

## Null vs Empty String

For optional text fields:
- Use `null` if data doesn't exist
- Use `""` (empty string) if field exists but is empty
- Use actual text if data exists

Example:
```json
{
  "antler_restrictions": null,      // No restrictions
  "notes_short": "",                // Field exists but empty
  "bag_limit": "3/person"          // Has value
}
```

## important_notes Array

Auto-populate based on these flags:
- If `sign_in_required: true` → Add "Sign-in required"
- If `bag_limit` not null → Add "Bag limits apply - see details"
- If `shooting_hours_restriction` not null → Add "Shooting hours restricted - see details"
- If `antler_restrictions` not null → Add "Antler restrictions apply"
- If `quota_required: true` → Add "Quota hunt - permit required"

Example:
```json
{
  "sign_in_required": true,
  "bag_limit": "3/person",
  "important_notes": [
    "Sign-in required",
    "Bag limits apply - see details"
  ]
}
```

## Map Pin Reference

| Category | Color | Shape |
|----------|-------|-------|
| WMA | Green | Circle |
| Federal | Blue | Square |
| State Park | Red | Triangle |
| VPA | Purple | Diamond |

## Common Patterns

### Standard Hunt
```json
{
  "quota_required": false,
  "buck_only": false,
  "weapon_subcategory": null,
  "important_notes": []
}
```

### Quota Hunt
```json
{
  "quota_required": true,
  "quota_details": "Q150",
  "important_notes": ["Quota hunt - permit required"]
}
```

### Antler-Restricted Hunt
```json
{
  "buck_only": true,
  "antler_restrictions": "Only bucks with at least 4 points...",
  "important_notes": ["Antler restrictions apply"]
}
```

### Shotgun-Only Hunt
```json
{
  "weapon": "Firearms",
  "weapon_subcategory": "Shotgun Only"
}
```

### Statewide Season
```json
{
  "follows_statewide": true,
  "includes": [],
  "excludes": []
}
```

### Dog Training Activity
```json
{
  "species": "Bird Dog Training",
  "weapon": null,
  "activity_type": "Dog Training",
  "buck_only": false
}
```

## Validation Checklist

Before adding data, verify:
- [ ] ID follows correct format
- [ ] Dates are YYYY-MM-DD format
- [ ] area_category is one of 4 valid values
- [ ] weapon is one of 3 valid values (or null)
- [ ] Booleans are actual booleans, not strings
- [ ] important_notes array matches the flags
- [ ] wma_id references an existing WMA
- [ ] No special characters in IDs (only lowercase letters, numbers, hyphens)
