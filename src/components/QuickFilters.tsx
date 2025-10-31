"use client";

import type { ReactNode } from "react";
import { Star } from "lucide-react";

export type QuickFilterState = {
  openNow: boolean;
  camping: boolean;
  noQuota: boolean;
  archery: boolean;
  federal: boolean;
  stateParks: boolean;
  deer: boolean;
  turkey: boolean;
  favoritesOnly: boolean;
};

type Props = {
  value: QuickFilterState;
  onChange: (state: QuickFilterState) => void;
  favoritesCount: number;
};

const INITIAL_STATE: QuickFilterState = {
  openNow: false,
  camping: false,
  noQuota: false,
  archery: false,
  federal: false,
  stateParks: false,
  deer: false,
  turkey: false,
  favoritesOnly: false
};

export default function QuickFilters({ value, onChange, favoritesCount }: Props) {
  const toggle = (key: keyof QuickFilterState) => {
    onChange({ ...value, [key]: !value[key] });
  };

  const clearAll = () => {
    onChange({ ...INITIAL_STATE });
  };

  const activeCount = Object.values(value).filter(Boolean).length;

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Quick filters</h3>
        {activeCount > 0 && (
          <button
            type="button"
            className="text-xs font-medium text-emerald-700 hover:underline"
            onClick={clearAll}
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <FilterChip label="🎯 Open now" active={value.openNow} onClick={() => toggle("openNow")} />
        <FilterChip label="🏕️ Camping" active={value.camping} onClick={() => toggle("camping")} />
        <FilterChip label="🚫 No quota" active={value.noQuota} onClick={() => toggle("noQuota")} />
        <FilterChip label="🏹 Archery" active={value.archery} onClick={() => toggle("archery")} />
        <FilterChip label="🏛️ Federal" active={value.federal} onClick={() => toggle("federal")} />
        <FilterChip label="🌲 State Parks" active={value.stateParks} onClick={() => toggle("stateParks")} />
        <FilterChip label="🦌 Deer" active={value.deer} onClick={() => toggle("deer")} />
        <FilterChip label="🦃 Turkey" active={value.turkey} onClick={() => toggle("turkey")} />
        <FilterChip
          label={
            <span className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden />
              Favorites ({favoritesCount})
            </span>
          }
          active={value.favoritesOnly}
          onClick={() => toggle("favoritesOnly")}
        />
      </div>
    </section>
  );
}

type ChipProps = {
  label: ReactNode;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        active ? "border-emerald-500 bg-emerald-500 text-white shadow" : "border-slate-300 bg-white text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

export function resetQuickFilters() {
  return { ...INITIAL_STATE };
}
