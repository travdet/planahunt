# Plan A Hunt (Georgia) — Full Featured (A–C)

**What’s new over MVP:**
- Map page with Mapbox markers (counts reflect filtered windows).
- Region / County / Tag filters (derived from data).
- Distance filter from custom "home" coordinate (lat,lng).
- 90‑day blackout **heatmap** per-card.
- CSV export (client-side) of filtered rows.
- Robust types; statewide resolver hook.

## ENV
Set `NEXT_PUBLIC_MAPBOX_TOKEN` (defaults to the token you provided).

## Dev
```bash
npm i
npm run dev
```

## Deploy
Vercel: import repo, add `NEXT_PUBLIC_MAPBOX_TOKEN` env var (or rely on default), Deploy.
