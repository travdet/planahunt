# Plan-A-Hunt Access UX Notes

These notes capture the intent behind the October 2025 access-focused refinements so future contributors can extend them without re-learning the UX rationale.

## Map markers
- Markers now reflect **access profile** (general, quota, or mixed) rather than land ownership alone.
- `Mapbox` pulls the status from `summarizeAccessProfile` and colours/labels via `getAccessBadgeStyle`.
- Keep both helpers in sync if you introduce new access types so the legend, hover card, and markers stay aligned.

## Filter experience
- The access selector in `FilterBar` is a button group to match the language hunters use (“General access” vs “Quota hunts”).
- The default filter (`INITIAL_FILTERS.accessType`) is set to `general` so new sessions prioritise walk-on opportunities.
- Quick filters expose a “General access” chip (`QuickFilters.generalAccess`) that piggybacks on the same summary helper.

## Card and detail badges
- `WMACard` and the hunt detail header both surface a dedicated access badge. This is calculated once per render to keep map, cards, and detail views in step.
- When adding new summary badges or metrics, prefer computing them alongside this badge so we avoid inconsistent summaries.

Feel free to append to this file as more UX tweaks land—treat it as a changelog for developer-facing behaviour.
