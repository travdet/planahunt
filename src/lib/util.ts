export function fmtMDY(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${m}-${d}-${y}`;
}

export function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function normalizeLabel(value: string) {
  if (!value) return value;
  return value
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      if (word.toUpperCase() === word) return word; // already uppercase (e.g. WMA)
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return toISO(d);
}

export function compareISO(a: string, b: string) {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function overlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return !(aEnd < bStart || bEnd < aStart);
}

export function isDateWithin(isoDate: string, start: string, end: string) {
  return isoDate >= start && isoDate <= end;
}

export function isSameDay(a: string | null | undefined, b: string | null | undefined) {
  if (!a || !b) return false;
  return a === b;
}

export function haversineMi(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 3958.8; // miles
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function minutesAt(avgMph: number, miles: number) {
  if (!avgMph || avgMph <= 0) return null;
  return Math.round((miles / avgMph) * 60);
}
