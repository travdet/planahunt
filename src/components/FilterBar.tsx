"use client";

import type { FilterState } from "@/lib/types";
import { getAreaCategoryStyle } from "@/lib/palette";

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
    areaCategories: string[];
    weaponSubcategories: string[];
    activityTypes: string[];
  };
};

import DateSelector from "./DateSelector";
import MultiSelect from "./MultiSelect";

const SELECTED_CLASS = "bg-[#0FA47A] text-white border-transparent";
const UNSELECTED_CLASS = "bg-[#E6DFC8] text-slate-800 border-transparent";

export default function FilterBar({ filters, onChange, onReset, options }: Props) {
  function toggleList(key: keyof FilterState, value: string) {
    const current = new Set((filters[key] as string[]) ?? []);
    if (current.has(value)) current.delete(value);
    else current.add(value);
    onChange({ [key]: Array.from(current) });
  }

  const countyOptions = options.counties.map((county) => ({ value: county, label: county }));
  const regionOptions = options.regions.map((region) => {
    const value = region?.trim() ?? "";
    return { value, label: value || "Not listed" };
  });

  const weaponSubcategoryOptions = options.weaponSubcategories.map((value) => ({
    value,
    label: value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }));

  const activityOptions = options.activityTypes.map((value) => ({
    value,
    label: value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }));

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

      <DateSelector filters={filters} onChange={onChange} />

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

      <MultiSelect
        label="Counties"
        options={countyOptions}
        values={filters.counties}
        onChange={(next) => onChange({ counties: next })}
      />

      <MultiSelect
        label="Regions"
        options={regionOptions}
        values={filters.regions}
        onChange={(next) => onChange({ regions: next })}
      />

      <div>
        <label className="text-sm font-medium text-slate-700">Area Type</label>
        <div className="mt-2 space-y-2">
          {options.areaCategories.map((value) => {
            const canonical = value === "federal"
              ? "Federal"
              : value === "state park"
              ? "State Park"
              : value === "vpa"
              ? "VPA"
              : "WMA";
            const style = getAreaCategoryStyle(canonical);
            const label = style.label;
            const checked = filters.areaCategories.includes(value);
            return (
              <label key={value} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-flex h-3 w-3 rounded-full"
                    style={{ backgroundColor: style.color }}
                  />
                  {label}
                </span>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={checked}
                  onChange={(event) =>
                    onChange({
                      areaCategories: event.target.checked
                        ? Array.from(new Set([...filters.areaCategories, value]))
                        : filters.areaCategories.filter((item) => item !== value)
                    })
                  }
                />
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Amenities</label>
        <div className="mt-2 space-y-2 text-sm text-slate-700">
          <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2">
            <span className="flex items-center gap-2">
              <span aria-hidden>🏕️</span> Camping available
            </span>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={filters.campingAllowed === true}
              onChange={(event) => onChange({ campingAllowed: event.target.checked ? true : null })}
            />
          </label>
          <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2">
            <span className="flex items-center gap-2">
              <span aria-hidden>🏍️</span> ATVs allowed
            </span>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={filters.atvAllowed === true}
              onChange={(event) => onChange({ atvAllowed: event.target.checked ? true : null })}
            />
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Weapon restrictions</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {weaponSubcategoryOptions.map((option) => {
            const selected = filters.weaponSubcategories.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selected ? SELECTED_CLASS : UNSELECTED_CLASS
                }`}
                onClick={() => toggleList("weaponSubcategories", option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Activity type</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {activityOptions.map((option) => {
            const selected = filters.activityTypes.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selected ? SELECTED_CLASS : UNSELECTED_CLASS
                }`}
                onClick={() => toggleList("activityTypes", option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
