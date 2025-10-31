"use client";
import { useEffect, useState } from "react";

const endpoint = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export default function HomeLocation({
  value,
  onChange
}) {
  const [query, setQuery] = useState(value.address || "");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function geocode() {
    if (!query.trim()) return;
    setLoading(true);
    setErr(null);
    try {
      const url = `${endpoint}/${encodeURIComponent(query)}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
      const res = await fetch(url);
      const json = await res.json();
      const f = json?.features?.[0];
      if (f && Array.isArray(f.center)) {
        const [lng, lat] = f.center;
        onChange({ address: f.place_name || query, lat, lng });
      } else {
        setErr("Address not found.");
      }
    } catch (e) {
      setErr(e?.message || "Geocoding failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setQuery(value.address || "");
  }, [value.address]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Home Address</label>
      <div className="flex gap-2">
        <input
          className="w-full rounded-md border px-3 py-2"
          placeholder="123 Main St, City, GA"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <button
          className="rounded-md bg-emerald-600 px-3 py-2 text-white disabled:opacity-50"
          onClick={geocode}
          disabled={loading}
          type="button"
        >
          {loading ? "..." : "Set"}
        </button>
      </div>
      {value.lat && value.lng ? (
        <p className="text-xs text-slate-600">Saved • {value.address}</p>
      ) : null}
      {err && <p className="text-xs text-red-600">{err}</p>}
    </div>
  );
}
