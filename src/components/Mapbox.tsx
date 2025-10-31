// src/components/Mapbox.tsx
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMapboxToken } from "@/lib/map";

type Point = { id: string; name: string; lng: number; lat: number };
type Props = {
  points: Point[];
  onPick?: (id: string) => void;
  token?: string;
};

export default function Mapbox({ points, onPick, token }: Props) {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!el.current || mapRef.current) return;

    const accessToken = token || getMapboxToken();

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: el.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-84.29, 33.77], // GA-ish
      zoom: 7
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  // update markers when points change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const validPoints = points.filter((point) =>
      typeof point.lat === "number" && typeof point.lng === "number"
    );

    validPoints.forEach((point) => {
      const marker = new mapboxgl.Marker({ color: "#0FA47A" })
        .setLngLat([point.lng, point.lat])
        .setPopup(new mapboxgl.Popup({ closeOnClick: true }).setText(point.name))
        .addTo(map);
      marker.getElement().addEventListener("click", () => onPick?.(point.id));
      markersRef.current.push(marker);
    });

    if (validPoints.length) {
      const bounds = new mapboxgl.LngLatBounds();
      validPoints.forEach((point) => bounds.extend([point.lng, point.lat]));
      map.fitBounds(bounds, { padding: 48, maxZoom: 9 });
    } else {
      map.easeTo({ center: [-84.29, 33.77], zoom: 6.2 });
    }
  }, [points, onPick]);

  return (
    <div
      ref={el}
      className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200"
    />
  );
}
