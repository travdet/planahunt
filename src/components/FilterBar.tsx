"use client";
import type { FilterState } from "@/lib/types";
import clsx from "clsx";
import CountyFilter from "./CountyFilter";
import Accordion from "./Accordion";
import { Star } from "lucide-react";

const tan = "bg-amber-100 text-amber-900 border-amber-200";
const green = "bg-emerald-600 text-white border-emerald-700";

export default function FilterBar({
  filters,
  onChange,
  allCounties, // <-- 1. FIX: Was "allCountIES"
  allSpecies,
  allWeapons,
  allTags,
}: {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  allCounties: string[]; // <-- 2. FIX: Was "allCountIES"
  allSpecies: string[];
  allWeapons: string[];
  allTags: string[];
}) {
  function toggleArr(key: keyof FilterState, value: string) {
    const arr = new Set((filters[key] as string[]) || []);
    if (arr.has(value)) {
      arr.delete(value);
    } else {
      arr.add(value);
    }
    onChange({ [key]: Array.from(arr) });
  }

  function onDateChange(part: "start" | "end", dateStr: string) {
    const newStartStr = part === "start" ? dateStr : getISODate(filters.dateRange?.start);
    const newEndStr = part === "end" ? dateStr : getISODate(filters.dateRange?.end);

    if (newStartStr && newEndStr) {
      onChange({
        dateRange: { start: new Date(newStartStr), end: new Date(newEndStr) },
      });
    } else if (newStartStr) {
      onChange({
        dateRange: { start: new Date(newStartStr), end: new Date(newStartStr) },
      });
    } else {
      onChange({ dateRange: null });
    }
  }

  const getISODate = (date?: Date): string => {
    if (!date) return "";
    try {
      const d = new Date(date);
      const userTimezoneOffset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - userTimezoneOffset).toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  const startDateStr = getISODate(filters.dateRange?.start);
  const endDateStr = getISODate(filters.dateRange?.end);

  return (
    // WRAP FILTERS IN A SCROLLABLE CONTAINER
    <aside className="rounded-xl border bg-white p-4 shadow-sm md:sticky md:top-6 md:max-h-[90vh] md:overflow-y-auto">
      <div className="space-y-2">
        {/* --- FAVORITES TOGGLE --- */}
        <button
          type="button"
          onClick={() => onChange({ showFavorites: !filters.showFavorites })}
          className={clsx(
            "flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium",
            filters.showFavorites
              ? "border-amber-400 bg-amber-50 text-amber-900"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          )}
        >
          <Star
            size={16}
            className={clsx(filters.showFavorites && "fill-amber-400")}
          />
          Show My Favorites
        </button>

        {/* --- SEARCH --- */}
        <div>
          <label className="text-sm font-medium">Search</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="WMA, tract, species…"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
          />
        </div>

        {/* --- ACCORDIONS --- */}
        <Accordion title="Location" defaultOpen={true}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Max Distance (mi)</label>
            <input
              type="number"
              placeholder="e.g. 60"
              className="w-full rounded-md border px-2 py-1"
              value={filters.maxDistanceMi ?? ""}
              onChange={(e) =>
                onChange({
                  maxDistanceMi: e.target.value
                    ? parseFloat(e.target.value)
                    : null,
                })
              }
            />
          </div>
          <CountyFilter
            allCounties={allCounties}
            selectedCounties={filters.counties}
            onChange={(counties) => onChange({ counties })}
          />
        </Accordion>

        <Accordion title="Hunt Details" defaultOpen={true}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hunt Date(s)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                className="w-full rounded-md border px-3 py-2"
                value={startDateStr}
                onChange={(e) => onDateChange("start", e.target.value)}
                placeholder="Start Date"
              />
              <input
                type="date"
                className="w-full rounded-md border px-3 py-2"
                value={endDateStr}
                onChange={(e) => onDateChange("end", e.target.value)}
                placeholder="End Date"
              />
            </div>
            <p className="text-xs text-slate-600">
              For a single day, set both to the same date.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Access Type</label>
            <select
              className="w-full rounded-md border px-3 py-2"
              value={filters.accessType}
              onChange={(e) => onChange({ accessType: e.target.value as any })}
            >
              <option value="any">Any</option>
              <option value="general">General</option>
              <option value="quota">Quota</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Buck/Doe?</label>
            <select
              className="w-full rounded-md border px-3 py-2"
              value={filters.sex}
              onChange={(e) => onChange({ sex: e.target.value as any })}
            >
              <option value="any">Any</option>
              <option value="either">Either Sex</option>
              <option value="buck">Buck Only</option>
            </select>
          </div>
        </Accordion>

        <Accordion title="Hunt Type">
          <div className="space-y-2">
            <label className="text-sm font-medium">Weapons</label>
            <div className="flex flex-wrap gap-2">
              {allWeapons.map((w) => {
                const selected = filters.weapons.includes(w);
                return (
                  <button
                    key={w}
                    type="button"
                    className={clsx(
                      "rounded-full border px-3 py-1 text-sm capitalize",
                      selected ? green : tan
                    )}
                    onClick={() => toggleArr("weapons", w)}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Species</label>
            <div className="flex flex-wrap gap-2">
              {allSpecies.map((s) => {
                const selected = filters.species.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    className={clsx(
                      "rounded-full border px-3 py-1 text-sm capitalize",
                      selected ? green : tan
                    )}
                    onClick={() => toggleArr("species", s)}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => {
                const selected = filters.tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    className={clsx(
                      "rounded-full border px-3 py-1 text-sm",
                      selected ? green : tan
                    )}
                    onClick={() => toggleArr("tags", t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </Accordion>
      </div>
    </aside>
  );
}
