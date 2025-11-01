"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HomeLoc } from "@/lib/types";
import { geocodeFirst, geocodePlace } from "@/lib/map";

type Props = {
  value: HomeLoc;
  onChange: (v: HomeLoc) => void;
  maxDistance: number | null;
  onDistanceChange: (miles: number | null) => void;
};

type Suggestion = {
  placeName: string;
  lat: number;
  lng: number;
};

export default function HomeLocation({ value, onChange, maxDistance, onDistanceChange }: Props) {
  const [query, setQuery] = useState(value.address || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number>();

  useEffect(() => {
    setQuery(value.address || "");
  }, [value.address]);

  const hasLocation = useMemo(() => value.lat != null && value.lng != null, [value.lat, value.lng]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed === value.address || trimmed.length < 3) {
      setSuggestions([]);
      return;
    }

    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      setSuggestLoading(true);
      try {
        const results = await geocodePlace(`${trimmed}, Georgia`, { limit: 5 });
        setSuggestions(results);
      } catch (err) {
        console.warn("Autocomplete failed", err);
      } finally {
        setSuggestLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(debounceRef.current);
    };
  }, [query, value.address]);

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
      setSuggestions([]);
    } catch (err: any) {
      setError(err?.message || "Geocoding failed");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    onChange({ address: "", lat: null, lng: null });
    setQuery("");
    setSuggestions([]);
    onDistanceChange(null);
  }

  function applySuggestion(entry: Suggestion) {
    onChange({ address: entry.placeName, lat: entry.lat, lng: entry.lng });
    setQuery(entry.placeName);
    setSuggestions([]);
    setError(null);
  }

  return (
    <div className="space-y-3" ref={containerRef}>
      <div>
        <label className="text-sm font-medium text-slate-700">Home Address</label>
        <div className="relative mt-1">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 pr-24 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="123 Main St, City, GA"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setError(null);
            }}
          />
          <button
            className="absolute inset-y-0 right-0 rounded-r-md border-l border-slate-200 bg-emerald-600 px-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            onClick={geocode}
            disabled={loading}
            type="button"
          >
            {loading ? "…" : "Set"}
          </button>

          {(suggestions.length > 0 || suggestLoading) && (
            <div className="absolute z-20 mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
              {suggestLoading && <div className="px-3 py-2 text-xs text-slate-500">Searching…</div>}
              {suggestions.map((item) => (
                <button
                  key={`${item.placeName}-${item.lat}-${item.lng}`}
                  type="button"
                  className="flex w-full flex-col items-start px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-emerald-50"
                  onClick={() => applySuggestion(item)}
                >
                  <span className="font-medium text-slate-800">{item.placeName}</span>
                  <span className="text-xs text-slate-500">Set as home base</span>
                </button>
              ))}
              {!suggestLoading && suggestions.length === 0 && query.trim().length >= 3 && (
                <div className="px-3 py-2 text-xs text-slate-500">No matches found.</div>
              )}
            </div>
          )}
        </div>
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

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Max Distance (miles)</label>
        <input
          type="number"
          min="0"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          value={maxDistance ?? ""}
          onChange={(event) => {
            const value = event.target.value;
            onDistanceChange(value ? Number(value) : null);
          }}
          placeholder="e.g. 60"
        />
        <p className="text-xs text-slate-500">Only show WMAs within this driving radius once your address is set.</p>
      </div>
    </div>
  );
}
