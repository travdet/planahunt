"use client";

import type { FilterState } from "@/lib/types";

type Option = { label: string; value: string };

type Props = {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  options: {
    species: Option[];
    weapons: Option[];
    counties: string[];
    regions: string[];
    tags: string[];
  };
};

const SELECTED_CLASS = "bg-[#0FA47A] text-white border-transparent";
const UNSELECTED_CLASS = "bg-[#E6DFC8] text-slate-800 border-transparent";

export default function FilterBar({ filters, onChange, onReset, options }: Props) {
  function toggleList(key: keyof FilterState, value: string) {
    const current = new Set((filters[key] as string[]) ?? []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    onChange({ [key]: Array.from(current) });
  }

  function updateDateRange(partial: Partial<NonNullable<FilterState["dateRange"]>>) {
    const next = {
      start: filters.dateRange?.start ?? null,
      end: filters.dateRange?.end ?? null,
      ...partial
    };
    if (!next.start && !next.end) {
      onChange({ dateRange: null });
    } else {
      onChange({ dateRange: next });
    }
  }

  return (
    <aside className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-emerald-700 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Search</label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          placeholder="WMA, county, species…"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
        />
      </div>

      <div className="grid gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Single Hunt Date</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.date || ""}
            onChange={(event) => onChange({ date: event.target.value || null })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Date Range</label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              type="date"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={filters.dateRange?.start || ""}
              onChange={(event) => updateDateRange({ start: event.target.value || null })}
            />
            <input
              type="date"
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={filters.dateRange?.end || ""}
              onChange={(event) => updateDateRange({ end: event.target.value || null })}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">Leave blank to include the entire season.</p>
        </div>
      </div>

      <div className="grid gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Access Type</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.accessType}
            onChange={(event) => onChange({ accessType: event.target.value as FilterState["accessType"] })}
          >
            <option value="any">Any</option>
            <option value="general">General</option>
            <option value="quota">Quota</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Buck / Doe</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.sex}
            onChange={(event) => onChange({ sex: event.target.value as FilterState["sex"] })}
          >
            <option value="any">Any</option>
            <option value="either">Either Sex</option>
            <option value="buck">Buck Only</option>
            <option value="doe">Doe Only</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Species</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.species.map((option) => {
            const selected = filters.species.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selected ? SELECTED_CLASS : UNSELECTED_CLASS
                }`}
                onClick={() => toggleList("species", option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Weapons</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.weapons.map((option) => {
            const selected = filters.weapons.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selected ? SELECTED_CLASS : UNSELECTED_CLASS
                }`}
                onClick={() => toggleList("weapons", option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Tags</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.tags.map((tag) => {
            const value = tag.toLowerCase();
            const selected = filters.tags.includes(value);
            return (
              <button
                key={tag}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selected ? SELECTED_CLASS : UNSELECTED_CLASS
                }`}
                onClick={() => toggleList("tags", value)}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Counties</label>
          <select
            multiple
            className="mt-1 h-28 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.counties}
            onChange={(event) =>
              onChange({ counties: Array.from(event.target.selectedOptions).map((option) => option.value) })
            }
          >
            {options.counties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">Hold Cmd/Ctrl to select multiple counties.</p>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Regions</label>
          <select
            multiple
            className="mt-1 h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.regions}
            onChange={(event) =>
              onChange({ regions: Array.from(event.target.selectedOptions).map((option) => option.value) })
            }
          >
            {options.regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Max Distance (miles)</label>
        <input
          type="number"
          min="0"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={filters.maxDistanceMi ?? ""}
          onChange={(event) =>
            onChange({ maxDistanceMi: event.target.value ? Number(event.target.value) : null })
          }
          placeholder="e.g. 60"
        />
        <p className="mt-1 text-xs text-slate-500">Requires a saved home address.</p>
      </div>
    </aside>
  );
}
