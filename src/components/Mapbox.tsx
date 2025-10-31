// src/components/Mapbox.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMapboxToken } from "@/lib/map";

type UpcomingSummary = { label: string; access?: string | null } | null;

type Point = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  counties?: string[];
  region?: string | null;
  acreage?: number | null;
  distanceMi?: number | null;
  driveMinutes?: number | null;
  upcoming?: UpcomingSummary;
};
type Props = {
  points: Point[];
  onPick?: (id: string) => void;
  token?: string;
  home?: { lat: number; lng: number } | null;
};

type MarkerHandle = {
  marker: mapboxgl.Marker;
  enter: () => void;
  leave: () => void;
  click: () => void;
};

export default function Mapbox({ points, onPick, token, home }: Props) {
  const el = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<MarkerHandle[]>([]);
  const homeMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{ point: Point; x: number; y: number } | null>(null);

  const hoverDisplay = useMemo(() => {
    if (!hoverInfo || !el.current) return null;
    const width = el.current.clientWidth;
    const height = el.current.clientHeight;
    const bufferX = 140;
    const bufferY = 160;
    const clampedX = Math.min(Math.max(hoverInfo.x, bufferX), Math.max(bufferX, width - bufferX));
    const clampedY = Math.min(Math.max(hoverInfo.y, bufferY), Math.max(bufferY, height - 20));
    return { ...hoverInfo, x: clampedX, y: clampedY };
  }, [hoverInfo]);

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
      markersRef.current.forEach(({ marker, enter, leave, click }) => {
        const element = marker.getElement();
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
        element.removeEventListener("focus", enter);
        element.removeEventListener("blur", leave);
        element.removeEventListener("click", click);
        marker.remove();
      });
      markersRef.current = [];
      if (homeMarkerRef.current) {
        homeMarkerRef.current.remove();
        homeMarkerRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  // update markers when points change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(({ marker, enter, leave, click }) => {
      const element = marker.getElement();
      element.removeEventListener("mouseenter", enter);
      element.removeEventListener("mouseleave", leave);
      element.removeEventListener("focus", enter);
      element.removeEventListener("blur", leave);
      element.removeEventListener("click", click);
      marker.remove();
    });
    markersRef.current = [];
    setHoverInfo(null);

    const validPoints = points.filter((point) => typeof point.lat === "number" && typeof point.lng === "number");

    validPoints.forEach((point) => {
      const marker = new mapboxgl.Marker({ color: "#0FA47A" })
        .setLngLat([point.lng, point.lat])
        .addTo(map);

      const element = marker.getElement();
      element.classList.add("cursor-pointer");
      element.setAttribute("tabindex", "0");

      const enter = () => {
        const position = map.project([point.lng, point.lat]);
        setHoverInfo({ point, x: position.x, y: position.y });
      };
      const leave = () => {
        setHoverInfo((current) => (current?.point.id === point.id ? null : current));
      };
      const click = () => {
        setHoverInfo(null);
        onPick?.(point.id);
      };

      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
      element.addEventListener("focus", enter);
      element.addEventListener("blur", leave);
      element.addEventListener("click", click);

      markersRef.current.push({ marker, enter, leave, click });
    });

    const coords: [number, number][] = validPoints.map((point) => [point.lng, point.lat]);
    if (home && typeof home.lat === "number" && typeof home.lng === "number") {
      coords.push([home.lng, home.lat]);
    }

    if (coords.length) {
      const bounds = coords.reduce((acc, [lng, lat]) => acc.extend([lng, lat]), new mapboxgl.LngLatBounds(coords[0], coords[0]));
      map.fitBounds(bounds, { padding: 48, maxZoom: 9 });
    } else {
      map.easeTo({ center: [-84.29, 33.77], zoom: 6.2 });
    }
  }, [points, onPick, home]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (homeMarkerRef.current) {
      homeMarkerRef.current.remove();
      homeMarkerRef.current = null;
    }

    if (home && typeof home.lat === "number" && typeof home.lng === "number") {
      homeMarkerRef.current = new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([home.lng, home.lat])
        .addTo(map);
    }
  }, [home]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!hoverInfo) return;

    const update = () => {
      setHoverInfo((current) => {
        if (!current) return null;
        const position = map.project([current.point.lng, current.point.lat]);
        return { point: current.point, x: position.x, y: position.y };
      });
    };

    map.on("move", update);
    map.on("zoom", update);
    return () => {
      map.off("move", update);
      map.off("zoom", update);
    };
  }, [hoverInfo]);

  return (
    <div className="relative h-[400px] w-full">
      <div ref={el} className="h-full w-full overflow-hidden rounded-xl border border-slate-200" />
      {hoverDisplay && (
        <div
          className="pointer-events-none absolute z-20 w-72 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-xl"
          style={{ left: hoverDisplay.x, top: hoverDisplay.y }}
        >
          <p className="text-sm font-semibold text-slate-900">{hoverDisplay.point.name}</p>
          {hoverDisplay.point.region && (
            <p className="text-xs text-slate-500">{hoverDisplay.point.region}</p>
          )}
          {hoverDisplay.point.counties && hoverDisplay.point.counties.length > 0 && (
            <p className="mt-1 text-xs text-slate-600">{hoverDisplay.point.counties.join(", ")}</p>
          )}
          {(hoverDisplay.point.acreage || hoverDisplay.point.distanceMi != null) && (
            <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              {hoverDisplay.point.acreage ? `${hoverDisplay.point.acreage.toLocaleString()} acres` : null}
              {hoverDisplay.point.distanceMi != null && (
                <span>
                  {hoverDisplay.point.distanceMi.toFixed(1)} mi
                  {hoverDisplay.point.driveMinutes != null ? ` • ~${hoverDisplay.point.driveMinutes} min` : ""}
                </span>
              )}
            </p>
          )}
          {hoverDisplay.point.upcoming ? (
            <div className="mt-3 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-800">
              <p className="font-semibold">Upcoming: {hoverDisplay.point.upcoming.label}</p>
              {hoverDisplay.point.upcoming.access && (
                <p className="text-[11px] uppercase tracking-wide text-emerald-600">{hoverDisplay.point.upcoming.access}</p>
              )}
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500">No upcoming seasons posted.</p>
          )}
        </div>
      )}
    </div>
  );
}
