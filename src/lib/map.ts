import { FALLBACK_MAPBOX_TOKEN } from "./constants";

type GeocodeOptions = {
  limit?: number;
};

type GeocodeResult = {
  placeName: string;
  lat: number;
  lng: number;
};

export function getMapboxToken() {
  return process.env.NEXT_PUBLIC_MAPBOX_TOKEN || FALLBACK_MAPBOX_TOKEN;
}

export async function geocodePlace(query: string, options: GeocodeOptions = {}): Promise<GeocodeResult[]> {
  const token = getMapboxToken();
  const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`);
  url.searchParams.set("access_token", token);
  url.searchParams.set("country", "US");
  url.searchParams.set("limit", String(options.limit ?? 5));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Geocoding failed (${response.status})`);
  }
  const json = await response.json();
  const features = Array.isArray(json.features) ? json.features : [];
  return features
    .map((feature: any) => ({
      placeName: feature.place_name as string,
      lat: feature.center?.[1] as number,
      lng: feature.center?.[0] as number
    }))
    .filter((item) => typeof item.lat === "number" && typeof item.lng === "number");
}

export async function geocodeFirst(query: string) {
  const [first] = await geocodePlace(query, { limit: 1 });
  return first ?? null;
}
