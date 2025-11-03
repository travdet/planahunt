"use client";
import type { FilterState } from "@/lib/types";
import clsx from "clsx";
import CountyFilter from "./CountyFilter"; // 1. IMPORT THE NEW COMPONENT

const tan = "bg-amber-100 text-amber-900 border-amber-200";
const green = "bg-emerald-600 text-white border-emerald-700";

// ... (props are the same)
export default function FilterBar({
  filters,
  onChange,
  allCounties,
  allSpecies,
  allWeapons,
  allTags,
}: {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  allCounties: string[];
  allSpecies: string[];
  allWeapons: string[];
  allTags: string[];
}) {
  function toggleArr(key: keyof FilterState, value: string) {
    // ... (this function is the same)
    const arr = new Set((filters[key] as string[]) || []);
    if (arr.has(value)) {
      arr.delete(value);
    } else {
      arr.add(value);
    }
    onChange({ [key]: Array.from(arr) });
  }

  function onDateChange(part: "start" | "end", dateStr: string) {
    // ... (this function is the same)
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
    // ... (this function is the same)
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
    <aside className="rounded-xl border bg-white p-4 shadow-sm space-y-4">
      {/* ... (Search, Date, Access, Buck/Doe are the same) ... */}
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="WMA, tract, species…"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
        />
      </div>

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
          Pick a start and end date. (For a single day, set both to the same
          date).
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

      {/* ... (Weapons, Species, Tags are the same) ... */}
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

      {/* 2. REPLACE THE OLD COUNTY FILTER */}
      <div className="space-y-2">
        <CountyFilter
          allCounties={allCounties}
          selectedCounties={filters.counties}
          onChange={(counties) => onChange({ counties })}
        />
      </div>
    </aside>
  );
}
