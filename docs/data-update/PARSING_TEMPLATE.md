# Parsing Template: Georgia Hunting Data

Use this template when converting regulation documents into structured JSON.

## 1. WMA Entry Template

```json
{
  "id": "",
  "name": "",
  "tract_name": "",
  "area_type": "",
  "acreage": 0,
  "phone": "",
  "counties": [],
  "region": "",
  "lat": null,
  "lng": null,
  "source_url": "",
  "tags": [],
  "directions": "",
  "area_notes": "",
  "camping_allowed": false,
  "atv_allowed": false,
  "area_category": "WMA",
  "managing_agency": "GA DNR Wildlife Resources Division"
}
```

### WMA Parsing Steps
1. **Assign ID**
   - Format: `prefix-lowercase-name`
   - Prefix options: `wma-`, `federal-`, `park-`, `vpa-`
2. **Fill metadata**
   - `area_type` from document heading (WMA, NWR, State Park, VPA)
   - `area_category` based on type
   - `tags` for highlights (Quota, Youth, Mobility-Impaired, etc.)
3. **Amenities**
   - Set `camping_allowed` & `atv_allowed` booleans
4. **Directions & Notes**
   - Copy full text, preserving capitalization
5. **Counts & Region**
   - Use comma-separated county names
   - `region` from DNR region

## 2. Season Entry Template

```json
{
  "id": "",
  "wma_id": "",
  "species": "",
  "weapon": "",
  "weapon_subcategory": null,
  "follows_statewide": false,
  "includes": [
    { "start": "", "end": "" }
  ],
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

### Season Parsing Steps
1. **ID Format**
   - `wma-id-species-weapon-sex-start-date`
   - Use `any` for either-sex hunts
2. **Date Handling**
   - Convert month/day to `YYYY-MM-DD`
   - Sept–Dec = 2025, Jan–May = 2026
   - For multiple ranges, create multiple entries OR fill `includes`
3. **Weapon Type**
   - Normalize to `Archery`, `Primitive`, `Firearms`
   - Use `weapon_subcategory` for "Shotgun Only", "Buckshot Only"
4. **Access & Restrictions**
   - `quota_required` true if quota hunt
   - `buck_only` true if antler restrictions specify bucks only
   - Fill `antler_restrictions`, `bag_limit`, `shooting_hours_restriction`
5. **Notes & Tags**
   - `notes_short` for short descriptions (e.g., "Youth hunt")
   - `tags` array for highlights (Youth, Bonus, Mobility-Impaired)
6. **Important Notes**
   - Populate array with warning strings (see Quick Reference)

## 3. Activities Beyond Hunting

Use `activity_type` for:
- `"Dog Training"`
- `"Shooting Range"`
- `"Archery Range"`

Set `weapon` to `null` for non-hunting activities.

## 4. Validation Checklist

Before finalizing each entry:
- [ ] IDs follow naming convention
- [ ] Dates converted to `YYYY-MM-DD`
- [ ] Booleans (no string booleans)
- [ ] `important_notes` matches restriction flags
- [ ] `weapon_subcategory` used for special weapon rules
- [ ] Quota details copied exactly
- [ ] Bag limits formatted like `"3/person"` or `"5 deer, no more than 2 antlered"`
- [ ] Shooting hours note captured when limited

## 5. Batch Workflow

1. **Copy template** for each WMA/Area
2. **Fill WMA fields**
3. **List each species** mentioned
4. **For each species**, create season objects for each weapon/date window
5. **Validate** using checklist
6. **Append** to JSON array

## 6. Example Workflow (Pseudocode)

```python
result = []
for area in source_document:
    wma = parse_area(area)
    result.append(wma)
    for season_info in area.seasons:
        seasons.extend(parse_seasons(wma["id"], season_info))
```

## 7. Common Pitfalls

- Forgetting to split non-contiguous date ranges into separate entries
- Missing important notes for bag limits or sign-in requirements
- Using strings for boolean fields
- Leaving `weapon` blank for dog training (should be `null`)
- Not capturing weekday-only restrictions (convert to array of integers)

## 8. Final Steps

- Validate JSON (use `jq` or online validator)
- Run linting/migration script after import
- Spot-check data in app UI to ensure warnings/filters appear correctly
