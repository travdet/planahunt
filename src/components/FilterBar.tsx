"use client";
import type { FilterState } from "@/lib/types";
import clsx from "clsx";

const tan = "bg-amber-100 text-amber-900 border-amber-200";
const green = "bg-emerald-600 text-white border-emerald-700";

// Props are updated to receive dynamic lists
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
    const arr = new Set((filters[key] as string[]) || []);
    if (arr.has(value)) {
      arr.delete(value);
    } else {
      arr.add(value);
    }
    onChange({ [key]: Array.from(arr) });
  }

  // NEW: Handler for date range
  function onDateChange(part: "start" | "end", dateStr: string) {
    const newStart = part === "start" ? dateStr : filters.dateRange?.start;
    const newEnd = part === "end" ? dateStr : filters.dateRange?.end;

    if (newStart && newEnd) {
      // Create new Date objects
      onChange({
        dateRange: { start: new Date(newStart), end: new Date(newEnd) },
      });
    } else if (newStart) {
      // If only start exists, set range to just that day
      onChange({
        dateRange: { start: new Date(newStart), end: new Date(newStart) },
      });
    } else {
      onChange({ dateRange: null });
    }
  }

  // Helper to get string value from Date object for the input
  const getISODate = (date?: Date) => {
    if (!date) return "";
    try {
      return date.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  const startDateStr = getISODate(filters.dateRange?.start);
  const endDateStr = getISODate(filters.dateRange?.end);

  return (
    <aside className="rounded-xl border bg-white p-4 shadow-sm space-y-4">
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="WMA, tract, species…"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
        />
      </div>

      {/* UPDATED: Date Range Inputs */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Hunt Date(s)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2"
            value={startDateStr}
            onChange={(e) => onDateChange("start", e.target.value)}
          />
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2"
            value={endDateStr}
            onChange={(e) => onDateChange("end", e.target.value)}
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
          {/* <option value="doe">Doe Only</option> */}
        </select>
      </div>

      {/* UPDATED: Dynamic Weapons */}
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

      {/* UPDATED: Dynamic Species */}
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

      {/* NEW: Dynamic Tags */}
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Counties</label>
        <select
          multiple
          className="w-full rounded-md border px-3 py-2 h-28"
          value={filters.counties}
          onChange={(e) => {
            const opts = Array.from(e.target.selectedOptions).map(
              (o) => o.value
            );
            onChange({ counties: opts });
          }}
        >
          {allCounties.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <p className="text-xs text-slate-600">Hold Cmd/Ctrl to multi-select.</p>
      </div>
    </aside>
  );
}
