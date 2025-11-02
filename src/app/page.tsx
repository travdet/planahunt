"use client";

import type { FilterState, HomeLoc, SeasonRule, WMA } from "@/lib/types";
import { applyFilters } from "@/lib/filters";
import { fmtMDY } from "@/lib/util";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";
import FilterBar from "@/components/FilterBar";
import HomeLocation from "@/components/HomeLocation";

import wmas from "@/data/wmas.json";
import rulesRaw from "@/data/seasons.json";

const Mapbox = dynamic(() => import("@/components/Mapbox"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Loading map...</p>
    </div>
  ),
});

export default function Page() {
  // initial filters
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    date: null,
    dateRange: null,
    accessType: "any",
    sex: "any",
    weapons: [],
    species: [],
    counties: [],
    regions: [],
    tags: [],
    maxDistanceMi: null
  });

  const [home, setHome] = useState<HomeLoc>({ address: "", lat: null, lng: null });

  // Modal state
  const [openId, setOpenId] = useState<string | null>(null);

  // Data joins
  const rows = useMemo(()=>{
    const byWma = new Map<string, WMA>();
    (wmas as WMA[]).forEach(w => byWma.set(w.id, w));
    return (rulesRaw as SeasonRule[])
      .map(r => {
        const wma = byWma.get(r.wma_id);
        if (!wma) return null;
        return { wma, rule: r };
      })
      .filter((x): x is { wma: WMA; rule: SeasonRule } => x !== null);
  }, []);

  const allCounties = useMemo(()=>{
    const set = new Set<string>();
    (wmas as WMA[]).forEach(w => w.counties.forEach(c => set.add(c)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(()=>{
    return applyFilters(rows, filters, { lat: home.lat, lng: home.lng }, filters.maxDistanceMi || null);
  }, [rows, filters, home.lat, home.lng]);

  const grouped = useMemo(()=>{
    const m = new Map<string, { wma: WMA; rules: SeasonRule[] }>();
    filtered.forEach(({ wma, rule }) => {
      if (!m.has(wma.id)) m.set(wma.id, { wma, rules: [] });
      m.get(wma.id)!.rules.push(rule);
    });
    return Array.from(m.values()).sort((a,b)=>a.wma.name.localeCompare(b.wma.name));
  }, [filtered]);

  const points = useMemo(() => {
    return grouped
      .filter(({ wma }) => wma.lat != null && wma.lng != null && wma.name)
      .map(({ wma, rules }) => ({
        id: wma.id,
        name: wma.name,
        lat: wma.lat!,
        lng: wma.lng!,
        count: rules.length,
      }));
  }, [grouped]);

  const selected = useMemo(()=> grouped.find(g => g.wma.id === openId) || null, [grouped, openId]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {/* Top green header */}
      <div className="mb-6 rounded-2xl bg-emerald-700 px-6 py-4 text-white">
        <h1 className="text-2xl font-semibold">Plan A Hunt (Georgia)</h1>
        <p className="text-sm opacity-90">Filter WMAs by date, access type, species, and more.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[320px,1fr]">
        {/* Left filter column */}
        <div className="space-y-6">
          <HomeLocation value={home} onChange={setHome} />
          <div>
            <label className="text-sm font-medium">Max Distance (mi)</label>
            <input
              type="number"
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="e.g. 60"
              value={filters.maxDistanceMi ?? ""}
              onChange={(e)=>setFilters(prev=>({...prev, maxDistanceMi: e.target.value ? Number(e.target.value) : null}))}
            />
            <p className="mt-1 text-xs text-slate-600">Straight-line distance for now. Driving ETA shows approx on cards.</p>
          </div>

          <FilterBar
            filters={filters}
            onChange={(f)=>setFilters(prev=>({ ...prev, ...f }))}
            allCounties={allCounties}
          />
        </div>

        {/* Right side: Map and Results */}
        <div className="space-y-6">
          {/* Results count and selected date */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">{grouped.length} areas</div>
            {filters.date && <div className="text-sm text-slate-700">Hunt date: <span className="font-medium">{fmtMDY(filters.date)}</span></div>}
          </div>

          {/* Map */}
          <Mapbox points={points} onPick={(id) => setOpenId(id)} />

          {/* WMA Cards */}
          <div className="space-y-4">
            {grouped.map(({ wma, rules })=>(
              <WMACard
                key={wma.id}
                wma={wma}
                rules={rules}
                date={filters.date || null}
                home={{ lat: home.lat, lng: home.lng }}
                onOpen={()=>setOpenId(wma.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <WMAModal
          wma={selected.wma}
          rules={selected.rules}
          onClose={()=>setOpenId(null)}
        />
      )}
    </main>
  );
}
