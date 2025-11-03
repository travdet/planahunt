"use client";
import { useMemo, useState } from "react";
import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import type { WMA, SeasonRule, FilterState, HomeLocation } from "@/lib/types";
import { resolveStatewide } from "@/lib/rules";
import { applyFilters, type Row } from "@/lib/filters";
import { toISO } from "@/lib/util";
import WMACard from "@/components/WMACard";
import FilterBar from "@/components/FilterBar";
import AddressField from "@/components/AddressField";
import WMAModal from "@/components/WMAModal";

const defaultFilters: FilterState = {
  query: "",
  accessType: "any",
  sex: "any",
  weapons: [],
  species: [],
  counties: [],
  regions: [],
  tags: [],
  maxDistanceMi: null,
  dateRange: null, // Use new dateRange property
};

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [home, setHome] = useState<HomeLocation | null>(null);
  const [openWma, setOpenWma] = useState<WMA | null>(null);

  // Rows: The master list of every single hunt, with statewide rules resolved
  const rows: Row[] = useMemo(() => {
    const byId = new Map((wmas as WMA[]).map((w) => [w.wma_id, w]));
    
    // Use flatMap to handle resolveStatewide returning an array
    return (rulesData as SeasonRule[]).flatMap((rule) => {
      const wma = byId.get(rule.wma_id);
      if (!wma) return []; // Return empty array to be filtered out

      // This now returns SeasonRule[]
      const resolvedRules = resolveStatewide(rule, wma, statewide);

      // Create a Row for each resolved rule
      return resolvedRules.map((resolvedRule) => ({
        wma,
        rule: resolvedRule,
      }));
    });
  }, []); // This runs only once

  // Dynamic lists for filters, derived from the resolved rows
  const allCounties = useMemo(
    () => Array.from(new Set((wmas as WMA[]).flatMap((w) => w.counties))).sort(),
    [] // wmas is static
  );
  const allSpecies = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.rule.species.toLowerCase()))).sort(),
    [rows]
  );
  const allWeapons = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.rule.weapon.toLowerCase()))).sort(),
    [rows]
  );
  const allTags = useMemo(
    () =>
      Array.from(
        new Set(
          rows.flatMap((r) => [
            ...(r.wma.tags || []),
            ...(r.rule.tags || []),
          ])
        )
      ).sort(),
    [rows]
  );

  // Filtered Rows: The list of hunts that match the user's filters
  const filteredRows = useMemo(() => {
    return applyFilters(rows, filters, home);
  }, [rows, filters, home]);

  // Grouped: Filtered hunts, grouped by WMA for display
  const groupedByWma = useMemo(() => {
    const map = new Map<string, { wma: WMA; rules: SeasonRule[] }>();
    for (const { wma, rule } of filteredRows) {
      if (!map.has(wma.wma_id)) {
        map.set(wma.wma_id, { wma, rules: [] });
      }
      map.get(wma.wma_id)!.rules.push(rule);
    }
    return Array.from(map.values());
  }, [filteredRows]);

  // WMA Rules for Modal
  const openWmaRules = useMemo(() => {
    if (!openWma) return [];
    // We must re-resolve the rules for the *selected* WMA
    // to show *all* its rules, not just the filtered ones
    return (rulesData as SeasonRule[])
      .filter((r) => r.wma_id === openWma.wma_id)
      .flatMap((rule) => resolveStatewide(rule, openWma, statewide));
  }, [openWma]);
  
  // Single-day string (YYYY-MM-DD) for WMACard
  // We use the start of the range. If range is null, pass null.
  const selectedDate = useMemo(() => {
    return filters.dateRange ? toISO(filters.dateRange.start) : null;
  }, [filters.dateRange]);

  return (
    <>
      {openWma && (
        <WMAModal
          wma={openWma}
          rules={openWmaRules}
          onClose={() => setOpenWma(null)}
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <aside className="h-fit md:sticky md:top-6 md:col-span-1">
          <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
            <AddressField
              value={home || { address: "", lat: null, lng: null }}
              onChange={setHome}
            />
          </div>
          <FilterBar
            filters={filters}
            onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
            allCounties={allCounties}
            allSpecies={allSpecies}
            allWeapons={allWeapons}
            allTags={allTags}
          />
        </aside>

        <section className="md:col-span-2 lg:col-span-3">
          <div className="mb-4 text-sm text-slate-600">
            Showing **{groupedByWma.length}** WMAs matching filters.
          </div>
          <div className="space-y-4">
            {groupedByWma.map(({ wma, rules }) => (
              <WMACard
                key={wma.wma_id}
                wma={wma}
                rules={rules}
                date={selectedDate}
                home={home}
                onOpen={() => setOpenWma(wma)}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
