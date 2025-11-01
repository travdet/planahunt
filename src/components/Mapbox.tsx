// src/components/Mapbox.tsx
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export type MapPoint = { id: string; name: string; lng: number; lat: number };
type Props = {
  points: MapPoint[];
  onPick?: (id: string) => void;
  token?: string;
};

export default function Mapbox({ points, onPick, token }: Props) {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!el.current || mapRef.current) return;

    const accessToken =
      token ||
      process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
      "pk.eyJ1IjoidHJhdmRldCIsImEiOiJjbWhlNmMzMXYwN2N5MnNwd2IwZWJjc20zIn0.WxziVb9nSzPYoPuQPpGbXA";

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: el.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-84.29, 33.77], // GA-ish
      zoom: 7
    });

    mapRef.current = map;

    // add markers
    points.forEach((p) => {
      const m = new mapboxgl.Marker()
        .setLngLat([p.lng, p.lat])
        .setPopup(new mapboxgl.Popup({ closeOnClick: true }).setText(p.name))
        .addTo(map);

      m.getElement().addEventListener("click", () => onPick?.(p.id));
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [points, onPick, token]);

  // fit bounds when points change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !points.length) return;
    const bounds = new mapboxgl.LngLatBounds();
    points.forEach((p) => bounds.extend([p.lng, p.lat]));
    map.fitBounds(bounds, { padding: 40, maxZoom: 10 });
  }, [points]);

  return (
    <div
      ref={el}
      className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200"
    />
  );
}
