export function fmtMDY(iso) {
  // input yyyy-mm-dd -> MM-DD-YYYY
  const [y, m, d] = iso.split("-");
  return `${m}-${d}-${y}`;
}

export function toISO(date) {
  return date.toISOString().slice(0,10);
}

export function overlap(aStart, aEnd, bStart, bEnd) {
  return !(aEnd < bStart || bEnd < aStart);
}

export function isDateWithin(isoDate, start, end) {
  return isoDate >= start && isoDate <= end;
}

export function haversineMi(a, b) {
  const R = 3958.8; // miles
  const toRad = (v)=>v*Math.PI/180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}

export function minutesAt(avgMph, miles){
  if (!avgMph || avgMph<=0) return null;
  return Math.round((miles/avgMph)*60);
}
