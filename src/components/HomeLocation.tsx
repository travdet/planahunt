"use client";

import { useEffect, useMemo, useState } from "react";
import type { HomeLoc } from "@/lib/types";
import { geocodeFirst } from "@/lib/map";

export default function HomeLocation({
  value,
  onChange
}: {
  value: HomeLoc;
  onChange: (v: HomeLoc) => void;
}) {
  const [query, setQuery] = useState(value.address || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(value.address || "");
  }, [value.address]);

  const hasLocation = useMemo(() => value.lat != null && value.lng != null, [value.lat, value.lng]);

  async function geocode() {
    const trimmed = query.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const result = await geocodeFirst(`${trimmed}, Georgia`);
      if (!result) {
        setError("Address not found. Try adding city and zip.");
        return;
      }
      onChange({ address: result.placeName, lat: result.lat, lng: result.lng });
    } catch (err: any) {
      setError(err?.message || "Geocoding failed");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    onChange({ address: "", lat: null, lng: null });
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Home Address</label>
      <div className="flex gap-2">
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="123 Main St, City, GA"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="rounded-md bg-emerald-600 px-3 py-2 text-white disabled:opacity-50"
          onClick={geocode}
          disabled={loading}
          type="button"
        >
          {loading ? "…" : "Set"}
        </button>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-600">
        {hasLocation ? <span>Saved • {value.address}</span> : <span>Enter your home base to sort by distance.</span>}
        {hasLocation && (
          <button type="button" className="text-emerald-700 hover:underline" onClick={clear}>
            Clear
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
