// src/components/MultiSelect.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Opt = { value: string; label?: string };

type Props = {
  label: string;
  options: Opt[];
  values: string[];
  onChange: (next: string[]) => void;
};

export default function MultiSelect({ label, options, values, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  function toggle(v: string) {
    if (values.includes(v)) onChange(values.filter(x => x !== v));
    else onChange([...values, v]);
  }

  const labelText = values.length ? `${values.length} selected` : "Any";
  const allSelected = values.length === options.length && options.length > 0;

  const activeOptions = useMemo(() => {
    if (!values.length) return [] as { value: string; label: string }[];
    const map = new Map(options.map((opt) => [opt.value, opt.label ?? opt.value]));
    return values.map((value) => ({ value, label: map.get(value) || value }));
  }, [options, values]);

  const showSummary = activeOptions.slice(0, 3).map((item) => item.label).join(", ");

  return (
    <div className="space-y-2" ref={ref}>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-left shadow-sm transition hover:border-emerald-400"
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-700">{labelText}</span>
          <span className="text-xs text-slate-500">{showSummary}</span>
        </div>
      </button>

      {open && (
        <div className="mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 text-xs text-slate-500">
            <span>{values.length ? `${values.length} selected` : "No filters applied"}</span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border border-slate-300 px-2 py-1 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
                onClick={() => onChange([])}
                disabled={values.length === 0}
              >
                Clear all
              </button>
              <button
                type="button"
                className="rounded border border-emerald-600 px-2 py-1 font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-40"
                onClick={() => onChange(allSelected ? [] : options.map((opt) => opt.value))}
                disabled={options.length === 0}
              >
                {allSelected ? "Unselect all" : "Select all"}
              </button>
            </div>
          </div>
          <div className="max-h-60 overflow-auto py-1">
            {options.map((o) => (
              <label
                key={o.value}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  checked={values.includes(o.value)}
                  onChange={() => toggle(o.value)}
                />
                <span>{o.label ?? o.value}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {activeOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {activeOptions.map((item) => (
            <span key={item.value} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              {item.label}
              <button
                type="button"
                className="text-emerald-600 hover:text-emerald-800"
                onClick={() => toggle(item.value)}
                aria-label={`Remove ${item.label}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
