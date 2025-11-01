"use client";

import { useEffect, useMemo, useState } from "react";
import type { FilterState } from "@/lib/types";
import { fmtMDY } from "@/lib/util";

type Props = {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
};

type Mode = "single" | "range" | "multiple" | "any";

function deriveMode(filters: FilterState): Mode {
  if (filters.dates && filters.dates.length) return "multiple";
  if (filters.dateRange?.start || filters.dateRange?.end) return "range";
  if (filters.date) return "single";
  return "any";
}

export default function DateSelector({ filters, onChange }: Props) {
  const [mode, setMode] = useState<Mode>(() => deriveMode(filters));
  const [pendingDate, setPendingDate] = useState<string>("");

  useEffect(() => {
    setMode(deriveMode(filters));
  }, [filters.date, filters.dateRange?.start, filters.dateRange?.end, filters.dates?.length]);

  const hasSelection = useMemo(() => {
    if (mode === "single") return !!filters.date;
    if (mode === "range") return !!(filters.dateRange?.start && filters.dateRange?.end);
    if (mode === "multiple") return !!(filters.dates && filters.dates.length);
    return false;
  }, [mode, filters.date, filters.dateRange?.start, filters.dateRange?.end, filters.dates]);

  function switchMode(next: Mode) {
    setMode(next);
    if (next === "single") {
      onChange({ dateRange: null, dates: [], date: filters.date ?? null });
    } else if (next === "range") {
      onChange({ date: null, dates: [], dateRange: filters.dateRange ?? { start: null, end: null } });
    } else if (next === "multiple") {
      onChange({ date: null, dateRange: null, dates: filters.dates ?? [] });
    } else {
      onChange({ date: null, dateRange: null, dates: [] });
    }
  }

  function updateDate(value: string | null) {
    onChange({ date: value || null, dateRange: null, dates: [] });
  }

  function updateRange(partial: { start?: string | null; end?: string | null }) {
    const next = {
      start: partial.start ?? filters.dateRange?.start ?? null,
      end: partial.end ?? filters.dateRange?.end ?? null
    };
    onChange({ date: null, dates: [], dateRange: next });
  }

  function addMultiDate() {
    if (!pendingDate) return;
    const existing = filters.dates ?? [];
    if (existing.includes(pendingDate)) {
      setPendingDate("");
      return;
    }
    const next = [...existing, pendingDate].sort();
    onChange({ date: null, dateRange: null, dates: next });
    setPendingDate("");
  }

  function removeMultiDate(value: string) {
    const next = (filters.dates ?? []).filter((entry) => entry !== value);
    onChange({ dates: next, date: null, dateRange: null });
  }

  function clearAll() {
    onChange({ date: null, dateRange: null, dates: [] });
    setPendingDate("");
  }

  const multiDates = filters.dates ?? [];

  return (
    <section className="space-y-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-700">Hunt Dates</h4>
          <p className="text-xs text-slate-500">Choose single days, ranges, or multiple specific dates.</p>
        </div>
        {hasSelection && (
          <button
            type="button"
            className="text-xs font-semibold text-emerald-700 hover:underline"
            onClick={clearAll}
          >
            Clear dates
          </button>
        )}
      </header>

      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {["any", "single", "range", "multiple"].map((option) => {
          const labelMap: Record<Mode, string> = {
            any: "Any time",
            single: "Single day",
            range: "Date range",
            multiple: "Multiple days"
          } as const;
          const active = mode === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => switchMode(option as Mode)}
              className={`rounded-full border px-3 py-1 transition ${
                active ? "border-transparent bg-emerald-600 text-white" : "border-slate-300 bg-white text-slate-700"
              }`}
            >
              {labelMap[option as Mode]}
            </button>
          );
        })}
      </div>

      {mode === "single" && (
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600" htmlFor="hunt-date-single">
            Pick a day
          </label>
          <input
            id="hunt-date-single"
            type="date"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.date ?? ""}
            onChange={(event) => updateDate(event.target.value || null)}
          />
        </div>
      )}

      {mode === "range" && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600" htmlFor="hunt-date-start">
                Start
              </label>
              <input
                id="hunt-date-start"
                type="date"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={filters.dateRange?.start ?? ""}
                onChange={(event) => updateRange({ start: event.target.value || null })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600" htmlFor="hunt-date-end">
                End
              </label>
              <input
                id="hunt-date-end"
                type="date"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={filters.dateRange?.end ?? ""}
                onChange={(event) => updateRange({ end: event.target.value || null })}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Leave either field blank to include the full season window.
          </p>
        </div>
      )}

      {mode === "multiple" && (
        <div className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-600" htmlFor="hunt-date-multi">
                Add a date
              </label>
              <input
                id="hunt-date-multi"
                type="date"
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={pendingDate}
                onChange={(event) => setPendingDate(event.target.value)}
              />
            </div>
            <button
              type="button"
              className="mt-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
              onClick={addMultiDate}
              disabled={!pendingDate}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {multiDates.length === 0 && <p className="text-xs text-slate-500">No dates selected yet.</p>}
            {multiDates.map((date) => (
              <span
                key={date}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
              >
                {fmtMDY(date)}
                <button
                  type="button"
                  className="text-emerald-600 hover:text-emerald-800"
                  onClick={() => removeMultiDate(date)}
                  aria-label={`Remove ${fmtMDY(date)}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
