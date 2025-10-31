// src/lib/map.ts
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// Geocode a human address -> {lat,lng,place_name}
export async function geocodeAddress(query: string) {
  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`);
  url.searchParams.set("access_token", TOKEN);
  url.searchParams.set("autocomplete", "true");
  url.searchParams.set("limit", "5");
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("Geocoding failed");
  const j = await r.json();
  const features = (j.features || []).map((f: any) => ({
    place_name: f.place_name as string,
    lat: f.center?.[1] as number,
    lng: f.center?.[0] as number,
  }));
  return features as {place_name: string; lat: number; lng: number;}[];
}

// Driving distance + ETA (minutes) using Directions API
export async function drivingStats(from: {lat:number; lng:number}, to: {lat:number; lng:number}) {
  const url = new URL(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}`
  );
  url.searchParams.set("access_token", TOKEN);
  url.searchParams.set("overview", "false");
  url.searchParams.set("alternatives", "false");
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("Directions failed");
  const j = await r.json();
  const route = j.routes?.[0];
  if (!route) return null;
  const meters = route.distance as number;
  const seconds = route.duration as number;
  return { miles: meters / 1609.344, minutes: seconds / 60 };
}
