"use client";

import type { FilterState, HomeLoc, SeasonRule, WMA } from "@/lib/types";
import { applyFilters } from "@/lib/filters";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";
import FilterBar from "@/components/FilterBar";
import HomeLocation from "@/components/HomeLocation";

// Import the new data files
import wmas from "@/data/wmas.json";
import rulesRaw from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import { resolveStatewide } from "@/lib/rules";

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
    (wmas as WMA[]).forEach(w => byWma.set(w.wma_id, w));

    return (rulesRaw as SeasonRule[])
      .map(r => {
        const wma = byWma.get(r.wma_id);
        if (!wma) return null; // Defensive check
        
        const resolvedRule = resolveStatewide(r, wma, statewide);
        return { wma, rule: resolvedRule };
      })
      .filter((x): x is { wma: WMA; rule: SeasonRule } => x !== null);
  }, []);

  const allCounties = useMemo(()=>{
    const set = new Set<string>();
    (wmas as WMA[]).forEach(w => {
