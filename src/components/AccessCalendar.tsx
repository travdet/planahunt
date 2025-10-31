"use client";

import { useMemo, useState } from "react";
import type { SeasonWithMeta } from "@/lib/types";
import { fmtMDY, toISO } from "@/lib/util";
import { dayStatus, isRuleActiveOnDate } from "@/lib/rules";

type Props = {
  rules: SeasonWithMeta[];
  initialMonth?: string;
};

export default function AccessCalendar({ rules, initialMonth }: Props) {
  const initialDate = useMemo(() => {
    if (!initialMonth) return new Date();
    const [year, month] = initialMonth.split("-");
    if (!year || !month) return new Date();
    return new Date(Number(year), Number(month) - 1, 1);
  }, [initialMonth]);

  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date(initialDate);
  base.setDate(1);
  const view = new Date(base);
  view.setMonth(base.getMonth() + monthOffset);

  const { label, cells } = useMemo(() => {
    const yyyy = view.getFullYear();
    const mm = view.getMonth();
    const firstOfMonth = new Date(yyyy, mm, 1);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7; // convert so Monday=0
    const daysInMonth = new Date(yyyy, mm + 1, 0).getDate();
    const label = view.toLocaleString(undefined, { month: "long", year: "numeric" });

    const cells = Array.from({ length: 42 }).map((_, index) => {
      const dayNumber = index - startWeekday + 1;
      const inMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
      const iso = inMonth ? toISO(new Date(yyyy, mm, dayNumber)) : "";
      const status = iso ? dayStatus(rules, iso) : "closed";
      const activeRules = iso ? rules.filter((rule) => isRuleActiveOnDate(rule, iso)) : [];
      return { dayNumber: inMonth ? dayNumber : null, iso, status, inMonth, activeRules };
    });

    return { label, cells };
  }, [rules, view]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{label}</h4>
        <div className="flex gap-2">
          <button className="rounded-md border px-2 py-1" onClick={() => setMonthOffset((prev) => prev - 1)}>
            Prev
          </button>
          <button className="rounded-md border px-2 py-1" onClick={() => setMonthOffset(0)}>
            Today
          </button>
          <button className="rounded-md border px-2 py-1" onClick={() => setMonthOffset((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center font-medium text-slate-600">
            {day}
          </div>
        ))}
        {cells.map((cell, index) => {
          const baseClass = "h-10 rounded-md border text-center flex items-center justify-center";
          const palette =
            cell.status === "general"
              ? "bg-[#0FA47A] text-white border-emerald-700"
              : cell.status === "quota"
              ? "bg-[#FACC15] text-amber-900 border-amber-300"
              : "bg-[#E5E7EB] text-slate-600 border-slate-300";

          return (
            <div
              key={index}
              className={`${baseClass} ${palette} ${cell.inMonth ? "" : "opacity-40"}`}
              title={cell.iso ? `${fmtMDY(cell.iso)} • ${cell.activeRules.length} window(s)` : undefined}
            >
              {cell.dayNumber}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-[#0FA47A]" /> General access
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-[#FACC15]" /> Quota access
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded bg-[#E5E7EB]" /> Closed
        </div>
      </div>
    </div>
  );
}
