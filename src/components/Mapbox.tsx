"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getAccessBadgeStyle } from "@/lib/palette";
import { getMapboxToken } from "@/lib/map";
import type { AccessProfile } from "@/lib/types";

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
  areaCategory?: string | null;
  campingAllowed?: boolean;
  atvAllowed?: boolean;
  accessProfile: AccessProfile;
  accessLabel: string;
  accessIcon?: string | null;
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<MarkerHandle[]>([]);
  const homeMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{ point: Point; x: number; y: number } | null>(null);

  const hoverDisplay = useMemo(() => {
    if (!hoverInfo || !containerRef.current) return null;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const bufferX = 140;
    const bufferY = 160;
    const clampedX = Math.min(Math.max(hoverInfo.x, bufferX), Math.max(bufferX, width - bufferX));
    const clampedY = Math.min(Math.max(hoverInfo.y, bufferY), Math.max(bufferY, height - 20));
    return { ...hoverInfo, x: clampedX, y: clampedY };
  }, [hoverInfo]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const accessToken = token || getMapboxToken();
    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-84.29, 33.77],
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
      const markerElement = buildMarkerElement(point.accessProfile, point.accessIcon ?? "");

      const marker = new mapboxgl.Marker({ element: markerElement }).setLngLat([point.lng, point.lat]).addTo(map);
      markerElement.classList.add("cursor-pointer");
      markerElement.setAttribute("tabindex", "0");
      markerElement.setAttribute("aria-label", `${point.name} marker`);

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

      markerElement.addEventListener("mouseenter", enter);
      markerElement.addEventListener("mouseleave", leave);
      markerElement.addEventListener("focus", enter);
      markerElement.addEventListener("blur", leave);
      markerElement.addEventListener("click", click);

      markersRef.current.push({ marker, enter, leave, click });
    });

    const coords: [number, number][] = validPoints.map((point) => [point.lng, point.lat]);
    if (home && typeof home.lat === "number" && typeof home.lng === "number") {
      coords.push([home.lng, home.lat]);
    }

    if (coords.length) {
      const bounds = coords.reduce(
        (acc, [lng, lat]) => acc.extend([lng, lat]),
        new mapboxgl.LngLatBounds(coords[0], coords[0])
      );
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
      const element = document.createElement("div");
      element.innerHTML =
        '<svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 3l11 10v14a2 2 0 0 1-2 2h-6v-8h-6v8H7a2 2 0 0 1-2-2V13L16 3z" fill="#ef4444" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>';
      element.className = "drop-shadow-md";
      homeMarkerRef.current = new mapboxgl.Marker({ element }).setLngLat([home.lng, home.lat]).addTo(map);
    }
  }, [home]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !hoverInfo) return;

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
      <div ref={containerRef} className="h-full w-full overflow-hidden rounded-xl border border-slate-200" />
      {hoverDisplay && (
        <div
          className="pointer-events-none absolute z-20 w-72 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-xl"
          style={{ left: hoverDisplay.x, top: hoverDisplay.y }}
        >
          <p className="text-sm font-semibold text-slate-900">{hoverDisplay.point.name}</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">{hoverDisplay.point.accessLabel}</p>
          {hoverDisplay.point.areaCategory && (
            <p className="text-xs text-slate-500">{hoverDisplay.point.areaCategory}</p>
          )}
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
          <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
            {hoverDisplay.point.campingAllowed && (
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">🏕️ Camping</span>
            )}
            {hoverDisplay.point.atvAllowed && (
              <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700">🏍️ ATVs</span>
            )}
          </div>
        </div>
      )}
      <MapLegend />
    </div>
  );
}

function MapLegend() {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow">
      <p className="mb-2 font-semibold text-slate-700">Access on this map</p>
      <div className="space-y-1.5">
        <LegendRow profile="general" />
        <LegendRow profile="quota" />
        <LegendRow profile="mixed" />
        <LegendRow profile="none" />
      </div>
    </div>
  );
}

function LegendRow({ profile }: { profile: AccessProfile }) {
  const style = getAccessBadgeStyle(profile);
  return (
    <div className="flex items-center gap-2">
      <LegendMarker profile={profile} icon={style.icon} />
      <span>{style.label}</span>
    </div>
  );
}

function buildMarkerElement(profile: AccessProfile, icon: string) {
  const style = getAccessBadgeStyle(profile);
  const wrapper = document.createElement("div");
  wrapper.className = "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-semibold text-white drop-shadow";
  wrapper.style.backgroundColor = style.color;
  wrapper.textContent = icon || style.icon || "•";
  wrapper.setAttribute("role", "presentation");
  return wrapper;
}

function LegendMarker({ profile, icon }: { profile: AccessProfile; icon: string }) {
  const style = getAccessBadgeStyle(profile);
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-semibold text-white shadow"
      style={{ backgroundColor: style.color }}
    >
      {icon || style.icon || "•"}
    </span>
  );
}
