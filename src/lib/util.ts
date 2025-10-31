export const fmtMDY = (iso?: string) => {
  if (!iso) return "";
  const [y,m,d] = iso.split("-");
  return `${m}-${d}-${y}`;
};
export const parseDate = (iso: string) => new Date(iso+"T00:00:00");
export const todayISO = () => new Date().toISOString().slice(0,10);
export function rangeOverlaps(aStart: string, aEnd: string, targetISO: string){
  const s = parseDate(aStart).getTime();
  const e = new Date(aEnd+"T23:59:59").getTime();
  const t = parseDate(targetISO).getTime();
  return s <= t && t <= e;
}
export function haversineMi(a:{lat:number,lng:number}, b:{lat:number,lng:number}){
  const toRad = (x:number)=> x*Math.PI/180;
  const R=3958.8;
  const dLat = toRad(b.lat-a.lat);
  const dLon = toRad(b.lng-a.lng);
  const la1 = toRad(a.lat), la2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}
