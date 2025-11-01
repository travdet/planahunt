# 2025-10-31 — Beta preview shell

## Summary
- Introduced a dedicated beta route tree (`/beta`) that can be toggled from the global header without breaking existing pages.
- Layered in a lightweight design system (color, typography, spacing tokens) that both the classic and beta experiences can reference.
- Added first-pass beta pages (home, explore, calendar placeholder, saved placeholder, WMA detail stub) and supporting components to show how the redesign will evolve.

## Key Files
- `src/components/shared/Header.tsx` — feature-toggle aware header that swaps between classic and beta views.
- `src/styles/design-system/*` — shared CSS tokens used by both themes.
- `src/app/beta/**/*` — Next.js App Router entry points for the beta preview.
- `src/components/beta/*` — postcard-style cards and summary map placeholders for the beta explore flow.

## Follow-up Ideas
- Wire the beta map component to the interactive Mapbox view once the design polish is ready.
- Expand `/beta/wma/[id]` with the detailed requirements, quota reminders, and calendar sections described in the redesign plan.
- Connect the favorite toggle to the existing `useFavorites` hook so the beta and classic lists remain in sync.
