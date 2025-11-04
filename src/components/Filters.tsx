"use client";
import { useMemo } from "react";
import type { FilterState, WMA, SeasonRule } from "@/lib/types";
import Accordion from "./Accordion"; // <-- IMPORT ACCORDION
import CountyFilter from "./CountyFilter"; // <-- IMPORT COUNTYFILTER
import { Star } from "lucide-react"; // <-- IMPORT STAR ICON
import clsx from "clsx";

const tan = "bg-amber-100 text-amber-900 border-amber-200";
const green = "bg-emerald-600 text-white border-emerald-700";

export default function Filters({
  value,
  onChange,
  wmas,
  rules,
}: {
  value: FilterState;
  onChange: (v: FilterState) => void;
  wmas: WMA[];
  rules: SeasonRule[];
}) {
  const regions = useMemo(
    () => Array.from(new Set(wmas.map((w) => w.region).filter((r) => r != null))).sort(),
    [wmas]
  );
  const allCounties = useMemo(
    () => Array.from(new Set(wmas.flatMap((w) => w.counties))).sort(),
    [wmas]
  );
  const tags = useMemo(
    () =>
      Array.from(
        new Set([
          ...(wmas.flatMap((w) => w.tags || [])),
          ...(rules.flatMap((r) => r.tags || [])),
        ])
      ).sort(),
    [wmas, rules]
  );
  const speciesOptions = useMemo(
    () =>
      Array.from(new Set(rules.map((r) => String(r.species)).filter((s) => s))).sort(),
    [rules]
  );
  const weaponOptions = useMemo(
    () =>
      Array.from(new Set(rules.map((r) => String(r.weapon)).filter((w) => w))).sort(),
    [rules]
  );

  const toggle = (arr: string[], item: string) => {
    const set = new Set(arr || []);
    set.has(item) ? set.delete(item) : set.add(item);
    return Array.from(set);
  };

  function onDateChange(part: "start" | "end", dateStr: string) {
    const newStartStr = part === "start" ? dateStr : getISODate(value.dateRange?.start);
    const newEndStr = part === "end" ? dateStr : getISODate(value.dateRange?.end);

    if (newStartStr && newEndStr) {
      onChange({
        ...value,
        dateRange: { start: new Date(newStartStr), end: new Date(newEndStr) },
      });
    } else if (newStartStr) {
      onChange({
        ...value,
        dateRange: { start: new Date(newStartStr), end: new Date(newStartStr) },
      });
    } else {
      onChange({ ...value, dateRange: null });
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

  const startDateStr = getISODate(value.dateRange?.start);
  const endDateStr = getISODate(value.dateRange?.end);

  return (
    // WRAP FILTERS IN A SCROLLABLE CONTAINER
    <aside className="space-y-4 md:max-h-[90vh] md:overflow-y-auto">
      <div className="space-y-2">
        {/* --- FAVORITES TOGGLE --- */}
        <button
          type="button"
          onClick={() => onChange({ ...value, showFavorites: !value.showFavorites })}
          className={clsx(
            "flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium",
            value.showFavorites
              ? "border-amber-400 bg-amber-50 text-amber-900"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          )}
        >
          <Star
            size={16}
            className={clsx(value.showFavorites && "fill-amber-400")}
          />
          Show My Favorites
        </button>

        {/* --- SEARCH --- */}
        <div className="hcard p-3">
          <div className="label mb-1">Search</div>
          <input
            value={value.query || ""}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Name, county, species..."
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        {/* --- ACCORDIONS --- */}
        <Accordion title="Location" defaultOpen={true}>
          <div className="space-y-2">
            <div className="label mb-1">Max Distance (mi)</div>
            <input
              type="number"
              placeholder="e.g. 60"
              className="w-full rounded-md border px-2 py-1"
              value={value.maxDistanceMi ?? ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  maxDistanceMi: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
            />
            <p className="mt-1 text-xs text-slate-600">From home address (set on homepage)</p>
          </div>
          <CountyFilter
            allCounties={allCounties}
            selectedCounties={value.counties}
            onChange={(counties) => onChange({ ...value, counties })}
          />
        </Accordion>

        <Accordion title="Hunt Details" defaultOpen={true}>
          <div className="hcard p-3 grid grid-cols-2 gap-3">
            <div>
              <div className="label mb-1">Access Type</div>
              <select
                value={value.accessType}
                onChange={(e) =>
                  onChange({ ...value, accessType: e.target.value as any })
                }
                className="w-full rounded-md border px-2 py-1"
              >
                <option value="any">any</option>
                <option value="general">general</option>
                <option value="quota">quota</option>
              </select>
            </div>
            <div>
              <div className="label mb-1">Buck/Doe</div>
              <select
                value={value.sex}
                onChange={(e) =>
                  onChange({ ...value, sex: e.target.value as any })
                }
                className="w-full rounded-md border px-2 py-1"
              >
                <option value="any">any</option>
                <option value="either">either</option>
                <option value="buck">buck</option>
              </select>
            </div>
            <div className="col-span-2">
              <div className="label mb-1">Open on date (Start)</div>
              <input
                type="date"
                value={startDateStr}
                onChange={(e) => onDateChange("start", e.target.value)}
                className="w-full rounded-md border px-2 py-1"
              />
            </div>
            <div className="col-span-2">
              <div className="label mb-1">Open on date (End)</div>
              <input
                type="date"
                value={endDateStr}
                onChange={(e) => onDateChange("end", e.target.value)}
                className="w-full rounded-md border px-2 py-1"
              />
            </div>
          </div>
        </Accordion>

        <Accordion title="Hunt Type">
          <div className="space-y-2">
            <div className="label mb-2">Species</div>
            <div className="flex flex-wrap gap-2">
              {speciesOptions.map((s) => (
                <button
                  key={s}
                  className={
                    "pill " +
                    (value.species.includes(s)
                      ? "bg-parkGreen text-parkPaper border-parkGreen"
                      : "")
                  }
                  onClick={() =>
                    onChange({ ...value, species: toggle(value.species, s) })
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="label mb-2">Weapons</div>
            <div className="flex flex-wrap gap-2">
              {weaponOptions.map((w) => (
                <button
                  key={w}
                  className={
                    "pill " +
                    (value.weapons.includes(w)
                      ? "bg-parkGreen text-parkPaper border-parkGreen"
                      : "")
                  }
                  onClick={() =>
                    onChange({ ...value, weapons: toggle(value.weapons, w) })
                  }
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="label mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  className={
                    "pill " +
                    (value.tags.includes(t)
                      ? "bg-parkGreen text-parkPaper border-parkGreen"
                      : "")
                  }
                  onClick={() =>
                    onChange({ ...value, tags: toggle(value.tags, t) })
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="label mb-2">Region</div>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <button
                  key={r}
                  className={
                    "pill " +
                    (value.regions.includes(r)
                      ? "bg-parkGreen text-parkPaper border-parkGreen"
                      : "")
                  }
                  onClick={() =>
                    onChange({ ...value, regions: toggle(value.regions, r) })
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </Accordion>
      </div>
    </aside>
  );
}
