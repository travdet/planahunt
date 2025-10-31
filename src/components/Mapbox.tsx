"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import type { WMA } from "@/lib/types";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoidHJhdmRldCIsImEiOiJjbWhlNmMzMXYwN2N5MnNwd2IwZWJjc20zIn0.WxziVb9nSzPYoPuQPpGbXA";
mapboxgl.accessToken = token;

export default function Mapbox({ points, onPick }:{ points: (WMA & {count:number})[], onPick:(id:string)=>void }){
  const ref = useRef<HTMLDivElement|null>(null);
  const mapRef = useRef<mapboxgl.Map|null>(null);

  useEffect(()=>{
    if (!ref.current || mapRef.current) return;
    const m = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-83.5, 32.5],
      zoom: 6.2,
    });
    mapRef.current = m;
  }, []);

  useEffect(()=>{
    const m = mapRef.current;
    if (!m) return;
    // clear old markers
    (m as any)._planMarkers?.forEach((mk:any)=> mk.remove());
    const markers:any[] = [];
    points.forEach(p => {
      if (p.lat && p.lng){
        const el = document.createElement("div");
        el.className = "bg-parkGreen text-white text-[11px] px-2 py-1 rounded-full shadow";
        el.style.cursor = "pointer";
        el.textContent = `${p.name} (${p.count})`;
        el.onclick = ()=> onPick(p.id);
        const mk = new mapboxgl.Marker(el).setLngLat([p.lng, p.lat]).addTo(m);
        markers.push(mk);
      }
    });
    (m as any)._planMarkers = markers;
  }, [points, onPick]);

  return <div ref={ref} className="w-full h-[70vh] rounded-xl border border-slate-200"/>;
}
