"use client";
import { useMemo } from "react";
import type { FilterState } from "@/lib/types";
import clsx from "clsx";

const tan = "bg-amber-100 text-amber-900 border-amber-200";
const green = "bg-emerald-600 text-white border-emerald-700";

const weaponOptions = ["archery","primitive","firearms","shotgun","muzzleloader"];
const speciesOptions = ["deer","turkey","bear","dove","quail","rabbit","hog","waterfowl","small game"];

export default function FilterBar({
  filters, onChange, allCounties
}: {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  allCounties: string[];
}) {
  const countySorted = useMemo(() => Array.from(new Set(allCounties)).sort(), [allCounties]);

  function toggleArr(key: keyof FilterState, value: string) {
    const arr = new Set((filters[key] as string[]) || []);
    if (arr.has(value)) { arr.delete(value); } else { arr.add(value); }
    onChange({ [key]: Array.from(arr) });
  }

  return (
    <aside className="rounded-xl border bg-white p-4 shadow-sm space-y-4">
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="WMA, tract, species…"
          value={filters.query}
          onChange={(e)=>onChange({query: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Hunt Date(s)</label>
        <input
          type="date"
          className="w-full rounded-md border px-3 py-2"
          value={filters.date || ""}
          onChange={(e)=>onChange({ date: e.target.value || null })}
        />
        <p className="text-xs text-slate-600">Pick a single day (MM-DD-YYYY shown on cards). Range picker comes next.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Access Type</label>
        <select
          className="w-full rounded-md border px-3 py-2"
          value={filters.accessType}
          onChange={(e)=>onChange({ accessType: e.target.value as any })}
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
          onChange={(e)=>onChange({ sex: e.target.value as any })}
        >
          <option value="any">Any</option>
          <option value="either">Either Sex</option>
          <option value="buck">Buck Only</option>
          <option value="doe">Doe Only</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Weapons</label>
        <div className="flex flex-wrap gap-2">
          {weaponOptions.map(w => {
            const selected = filters.weapons.includes(w);
            return (
              <button
                key={w}
                type="button"
                className={clsx(
                  "rounded-full border px-3 py-1 text-sm",
                  selected ? green : tan
                )}
                onClick={()=>toggleArr("weapons", w)}
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
          {speciesOptions.map(s => {
            const selected = filters.species.includes(s);
            return (
              <button
                key={s}
                type="button"
                className={clsx(
                  "rounded-full border px-3 py-1 text-sm",
                  selected ? green : tan
                )}
                onClick={()=>toggleArr("species", s)}
              >
                {s}
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
          onChange={(e)=>{
            const target = e.target as HTMLSelectElement;
            const opts = Array.from(target.selectedOptions).map(o=>o.value);
            onChange({ counties: opts });
          }}
        >
          {countySorted.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <p className="text-xs text-slate-600">Hold Cmd/Ctrl to multi-select.</p>
      </div>
    </aside>
  );
}
