import type { PublicLand } from '@/lib/types';

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Haversine distance between two lat/lng points in miles.
 */
export function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}

/**
 * Returns the nearest public lands sorted by distance from the given land,
 * excluding the input land itself.
 */
export function getNearbyLands(
  land: PublicLand,
  allLands: PublicLand[],
  limit: number = 5,
): Array<{ land: PublicLand; distance: number }> {
  if (land.lat == null || land.lng == null) return [];

  return allLands
    .filter((l) => l.id !== land.id && l.lat != null && l.lng != null)
    .map((l) => ({
      land: l,
      distance: getDistance(land.lat!, land.lng!, l.lat!, l.lng!),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
