// src/components/AddressField.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { geocodeAddress } from "@/lib/map";
import type { HomeLocation } from "@/lib/types";
import { MapPin, Target } from "lucide-react"; // <-- Import Target icon

type Props = {
  value: HomeLocation;
  onChange: (next: HomeLocation) => void;
};

export default function AddressField({ value, onChange }: Props) {
  const [q, setQ] = useState(value.address ?? "");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { place_name: string; lat: number; lng: number }[]
  >([]);
  const boxRef = useRef<HTMLDivElement>(null);

  // Click-away listener
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!q.trim() || q === value.address) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      async function search() {
        if (!q.trim()) return;
        try {
          const hits = await geocodeAddress(q.trim());
          setResults(hits);
        } catch (e) {
          console.error(e);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }
      search();
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [q, value.address]);

  function select(hit: { place_name: string; lat: number; lng: number }) {
    onChange({ address: hit.place_name, lat: hit.lat, lng: hit.lng });
    setQ(hit.place_name);
    setResults([]);
  }

  // NEW: "Use My Location" function
  function getMyLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Simple reverse geocode to get a "place name"
        const hit = {
          place_name: `My Location (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`,
          lat: latitude,
          lng: longitude,
        };
        select(hit);
        setLoading(false);
      },
      () => {
        alert("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  }

  return (
    <div ref={boxRef} className="relative">
      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
        Home Address
      </label>
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="123 Main St, City, GA"
          className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
        />
        {/* NEW: "Use My Location" button */}
        <button
          type="button"
          onClick={getMyLocation}
          className="p-1 rounded border border-slate-300 bg-white hover:bg-slate-50"
          title="Use my current GPS location"
        >
          <Target size={18} className="text-slate-600" />
        </button>
        {loading && <span className="p-1">...</span>}
      </div>
      {results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full rounded border border-slate-300 bg-white shadow max-h-48 overflow-auto">
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              className="block w-full text-left px-2 py-1 text-sm hover:bg-slate-50"
              onClick={() => select(r)}
            >
              {r.place_name}
            </button>
          ))}
        </div>
      )}
      {value.address && !results.length && (
        <p className="mt-1 text-[11px] text-slate-500">
          Saved: {value.address}
        </p>
      )}
    </div>
  );
}
