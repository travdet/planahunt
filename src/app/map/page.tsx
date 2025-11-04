"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // 1. IMPORT THE ROUTER
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { FilterState, SeasonRule, WMA, HomeLocation } from "@/lib/types";
import { applyFilters, type Row } from "@/lib/filters";
import { resolveStatewide } from "@/lib/rules";
// We no longer need WMAModal or AddressField here
// import WMAModal from "@/components/WMAModal";
// import AddressField from "@/components/AddressField";

const Filters = dynamic(() => import("@/components/Filters"), { ssr: false });
const Mapbox = dynamic(() => import("@/components/Mapbox"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Loading map...</p>
    </div>
  ),
});

const defaultFilters: FilterState = {
  query: "",
  species: [],
  weapons: [],
  accessType: "any",
  sex: "any",
  regions: [],
  counties: [],
  dateRange: null,
  maxDistanceMi: null,
  tags: [],
  showFavorites: false,
};

const FAVORITES_KEY = "planahunt_favorites";

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [home, setHome] = useState<HomeLocation | null>(null); // Kept for distance filtering
  const router = useRouter(); // 2. INITIALIZE THE ROUTER

  // 3. ADD FAVORITES STATE & LOGIC
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) { console.error("Could not load favorites", e); }
  }, []);
  // --- END FAVORITES LOGIC ---

  useEffect(() => {
    setMounted(true);
  }, []);

  const mapPoints = useMemo(() => {
    if (!mounted) return [];

    const byId = new Map((wmas as WMA[]).map((w) => [w.wma_id, w]));
    
    const rows: Row[] = (rulesData as SeasonRule[]).flatMap((rule) => {
      const wma = byId.get(rule.wma_id);
      if (!wma) return [];

      const resolvedRules = resolveStatewide(rule, wma, statewide);
      return resolvedRules.map((resolvedRule) => ({
        wma,
        rule: resolvedRule,
      }));
    });
    
    // 4. PASS 'favorites' TO applyFilters
    const filtered = applyFilters(rows, filters, home, favorites); 
    
    const m = new Map<string, { wma: WMA; count: number }>();
    for (const row of filtered) {
      const id = row.wma.wma_id;
      if (!m.has(id)) m.set(id, { wma: row.wma, count: 0 });
      m.get(id)!.count += 1;
    }

    return Array.from(m.values())
      .map(({ wma, count }) => {
        if (wma.lat == null || wma.lng == null) {
          return null;
        }
        return {
          id: wma.wma_id,
          name: wma.name,
          count,
          lat: wma.lat,
          lng: wma.lng,
        };
      })
      .filter((p): p is any => p !== null);
  }, [mounted, filters, home, favorites]);

  // 5. UPDATE onPick TO NAVIGATE TO THE NEW PAGE
  const pick = (id: string) => {
    router.push(`/hunt/${id}`);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex h-screen max-h-screen">
      {/* Modal is GONE */}
      <aside className="w-[350px] bg-slate-50 p-4 overflow-y-auto">
        {/* We can add AddressField here later if needed */}
        <Filters
          value={filters}
          onChange={setFilters}
          wmas={wmas as WMA[]}
          rules={rulesData as SeasonRule[]}
        />
      </aside>
      <section className="flex-1">
        <Mapbox points={mapPoints} onPick={pick} />
      </section>
    </main>
  );
}
