// NEW FUNCTION: "2025-09-13" -> "Sep 13"
export function fmtMMM DD(iso: string) {
  try {
    const d = new Date(iso);
    // Add time to correct for timezone issues
    const dLocal = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
    return dLocal.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return iso;
  }
}

export function fmtMDY(iso: string) {
  try {
    // input yyyy-mm-dd -> MM-DD-YYYY
    const [y, m, d] = iso.split("-");
    return `${m}-${d}-${y}`;
  } catch (e) {
    return iso;
  }
}

export function toISO(date: Date) {
  try {
    // Add time an local timezone to prevent off-by-one day errors
    const d = new Date(date);
    const userTimezoneOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - userTimezoneOffset).toISOString().split("T")[0];
  } catch (e) {
    return "";
  }
}

export function overlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return !(aEnd < bStart || bEnd < aStart);
}

export function isDateWithin(isoDate: string, start: string, end: string) {
  return isoDate >= start && isoDate <= end;
}

export function haversineMi(a: {lat:number, lng:number}, b:{lat:number,lng:number}) {
  const R = 3958.8; // miles
  const toRad = (v:number)=>v*Math.PI/180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}

export function minutesAt(avgMph:number, miles:number){
  if (!avgMph || avgMph<=0) return null;
  return Math.round((miles/avgMph)*60);
}
