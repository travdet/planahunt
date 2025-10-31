"use client";

import { ArrowUpDown } from "lucide-react";

export type SortOption = "name" | "acreage" | "opening-soon";

type Props = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <ArrowUpDown className="h-4 w-4 text-slate-500" aria-hidden />
      <select
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        <option value="name">Name (A–Z)</option>
        <option value="acreage">Size (largest first)</option>
        <option value="opening-soon">Opening soon</option>
      </select>
    </label>
  );
}
