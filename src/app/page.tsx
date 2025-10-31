// src/app/page.tsx
import rulesRaw from "@/data/seasons.json";
import statewide from "@/data/statewide.json";
import wmasRaw from "@/data/wmas.json";
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { resolveStatewide } from "@/lib/rules";
import { applyFilters, decorateWithDistance } from "@/lib/filters";
import AddressField from "@/components/AddressField";
import MultiSelect from "@/components/MultiSelect";
import WMACard from "@/components/WMACard";
import WMAModal from "@/components/WMAModal";
import { useMemo, useState } from "react";

export default function Page() {
  const wmas = wmasRaw as WMA[];
  const rules = (rulesRaw as SeasonRule[]).map((r) =>
    r.follows_statewide ? resolveStatewide(r, statewide) : r
  );

  // Build rows for filtering
  const allRows = useMemo(
    () =>
      rules.map((rule) => ({
        wma: wmas.find((w) => w.id === rule.wma_id)!,
        rule,
      })).filter((x) => !!x.wma),
    [wmas, rules]
  );

  const [filters, setFilters] = useState<FilterState>({
    query: "",
    species: [],
    weapons: [],
    accessType: "any",
    sex: "any",
    regions: [],
    counties: [],
    tags: [],
    huntStart: undefined,
    huntEnd: undefined,
    homeAddress: undefined,
    homeLat: undefined,
    homeLng: undefined,
  });

  const filteredRows = useMemo(() => applyFilters(allRows, filters), [allRows, filters]);
  const rowsWithMiles = useMemo(
    () => decorateWithDistance(filteredRows, { lat: filters.homeLat, lng: filters.homeLng }),
    [filteredRows, filters.homeLat, filters.homeLng]
  );

  const byWMA = useMemo(() => {
    const m = new Map<string, { wma: WMA; rules: SeasonRule[]; _miles?: number }>();
    for (const r of rowsWithMiles) {
      const existing = m.get(r.wma.id);
      if (existing) {
        existing.rules.push(r.rule);
        if (r as any)._miles !== undefined) existing._miles = (r as any)._miles;
      } else {
        m.set(r.wma.id, { wma: r.wma, rules: [r.rule], _miles: (r as any)._miles });
      }
    }
    return Array.from(m.values()).sort((a, b) => {
      // If home set, sort by miles; else by name
      if (a._miles != null && b._miles != null) return a._miles - b._miles;
      return a.wma.name.localeCompare(b.wma.name);
    });
  }, [rowsWithMiles]);

  // Modal
  const [openId, setOpenId] = useState<string | null>(null);
  const openItem = openId ? byWMA.find((x) => x.wma.id === openId) || null : null;

  // Options
  const allSpecies = Array.from(new Set(rules.map((r) => r.species))).sort();
  const allWeapons = Array.from(new Set(rules.map((r) => r.weapon))).sort();
  const allRegions = Array.from(new Set(wmas.map((w) => w.region))).sort();
  const allCounties = Array.from(new Set(wmas.flatMap((w) => w.counties))).sort();
  const allTags = Array.from(
    new Set(
      wmas
        .flatMap((w) => w.tags || [])
        .filter((t) =>
          !["Quota", "Either-sex last day", "Either Sex last two days"].includes(t)
        )
    )
  ).sort();

  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-[320px,1fr]">
      {/* LEFT FILTERS */}
      <aside>
        <div className="rounded-xl border border-slate-200 p-3 bg-white">
          <div className="mb-3">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Search
            </label>
            <input
              value={filters.query}
              onChange={(e) => set("query", e.target.value)}
              placeholder="Name, county, species…"
              className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
            />
          </div>

          <AddressField
            value={filters}
            onChange={(next) => setFilters((f) => ({ ...f, ...next }))}
          />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Hunt Start
              </label>
              <input
                type="date"
                value={filters.huntStart || ""}
                onChange={(e) => set("huntStart", e.target.value || undefined)}
                className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Hunt End (optional)
              </label>
              <input
                type="date"
                value={filters.huntEnd || ""}
                onChange={(e) => set("huntEnd", e.target.value || undefined)}
                className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Species
            </label>
            <div className="flex flex-wrap gap-2">
              {allSpecies.map((s) => {
                const on = filters.species.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() =>
                      set(
                        "species",
                        on ? filters.species.filter((x) => x !== s) : [...filters.species, s]
                      )
                    }
                    className={
                      "text-[12px] px-2 py-0.5 rounded-full border " +
                      (on
                        ? "bg-emerald-100 border-emerald-400 text-emerald-900"
                        : "bg-amber-50 border-amber-300 text-amber-800")
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Weapons
            </label>
            <div className="flex flex-wrap gap-2">
              {allWeapons.map((w) => {
                const on = filters.weapons.includes(w);
                return (
                  <button
                    key={w}
                    onClick={() =>
                      set(
                        "weapons",
                        on ? filters.weapons.filter((x) => x !== w) : [...filters.weapons, w]
                      )
                    }
                    className={
                      "text-[12px] px-2 py-0.5 rounded-full border " +
                      (on
                        ? "bg-emerald-100 border-emerald-400 text-emerald-900"
                        : "bg-amber-50 border-amber-300 text-amber-800")
                    }
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Access Type
              </label>
              <select
                value={filters.accessType}
                onChange={(e) => set("accessType", e.target.value as any)}
                className="w-full rounded border border-slate-300 px-2 py-1 text-sm bg-white"
              >
                <option value="any">Any</option>
                <option value="general">General</option>
                <option value="quota">Quota</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Buck/Doe?
              </label>
              <select
                value={filters.sex}
                onChange={(e) => set("sex", e.target.value as any)}
                className="w-full rounded border border-slate-300 px-2 py-1 text-sm bg-white"
              >
                <option value="any">Any</option>
                <option value="either">Either Sex</option>
                <option value="buck">Buck Only</option>
                <option value="doe">Doe Only</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <MultiSelect
              label="Region"
              options={allRegions.map((r) => ({ value: r }))}
              values={filters.regions}
              onChange={(v) => set("regions", v)}
            />
            <MultiSelect
              label="Counties"
              options={allCounties.map((c) => ({ value: c }))}
              values={filters.counties}
              onChange={(v) => set("counties", v)}
            />
            <MultiSelect
              label="Tags"
              options={allTags.map((t) => ({ value: t }))}
              values={filters.tags}
              onChange={(v) => set("tags", v)}
            />
          </div>
        </div>
      </aside>

      {/* RIGHT RESULTS */}
      <main className="space-y-4">
        <div className="text-sm text-slate-600">
          {rules.length} season windows • {byWMA.length} WMAs
        </div>

        {byWMA.map(({ wma, rules }) => (
          <WMACard
            key={wma.id}
            wma={wma}
            rules={rules}
            filters={filters}
            onOpenModal={(w) => setOpenId(w.id)}
          />
        ))}
      </main>

      {openItem && (
        <WMAModal
          wma={openItem.wma}
          rules={openItem.rules}
          filters={filters}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}
