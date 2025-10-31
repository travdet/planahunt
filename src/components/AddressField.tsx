// src/components/AddressField.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { geocodeAddress } from "@/lib/map";
import type { FilterState } from "@/lib/types";

type Props = {
  value: Pick<FilterState, "homeAddress" | "homeLat" | "homeLng">;
  onChange: (next: Partial<FilterState>) => void;
};

export default function AddressField({ value, onChange }: Props) {
  const [q, setQ] = useState(value.homeAddress ?? "");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{place_name:string; lat:number; lng:number;}[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setResults([]);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  async function search() {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const hits = await geocodeAddress(q.trim());
      setResults(hits);
    } finally {
      setLoading(false);
    }
  }

  function select(hit: {place_name:string; lat:number; lng:number}) {
    onChange({ homeAddress: hit.place_name, homeLat: hit.lat, homeLng: hit.lng });
    setQ(hit.place_name);
    setResults([]);
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
        <button
          type="button"
          onClick={search}
          className="px-3 py-1 rounded bg-slate-900 text-white text-sm"
        >
          {loading ? "…" : "Set"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full rounded border border-slate-300 bg-white shadow">
          {results.map((r, i) => (
            <button
              key={i}
              className="block w-full text-left px-2 py-1 text-sm hover:bg-slate-50"
              onClick={() => select(r)}
            >
              {r.place_name}
            </button>
          ))}
        </div>
      )}

      {value.homeAddress && (
        <p className="mt-1 text-[11px] text-slate-500">
          Saved: {value.homeAddress}
        </p>
      )}
    </div>
  );
}
