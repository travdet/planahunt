"use client";
import type { SeasonRule } from "@/lib/types";
import { useMemo, useState } from "react";
import { toISO, fmtMmmDd } from "@/lib/util";
import clsx from "clsx";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type CalendarDay = {
  date: Date;
  iso: string;
  isCurrentMonth: boolean;
  dayOfWeek: number; // 0=Sun
};

type CalendarEvent = {
  rule: SeasonRule;
  gridStart: number; // 1-indexed grid column
  span: number;
  label: string;
  weaponType: string;
  access: "general" | "quota";
};

// Helper to get days for the month grid
function getMonthGrid(year: number, month: number): CalendarDay[] {
  const startDate = new Date(year, month, 1);
  const firstDayOfWeek = startDate.getDay(); // 0 = Sunday
  const gridStart = new Date(startDate);
  gridStart.setDate(startDate.getDate() - firstDayOfWeek); 

  const days: CalendarDay[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push({
      date: d,
      iso: toISO(d),
      isCurrentMonth: d.getMonth() === month,
      dayOfWeek: d.getDay(),
    });
  }
  return days;
}

// Helper to check for same day
const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export default function InteractiveCalendar({ rules }: { rules: SeasonRule[] }) {
  const [viewDate, setViewDate] = useState(new Date());

  const { gridDays, eventRows, monthLabel } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const gridDays = getMonthGrid(year, month);
    const gridStartDate = gridDays[0].date;
    const gridEndDate = gridDays[gridDays.length - 1].date;
    const monthLabel = viewDate.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    // 1. Convert rules into events, spanning the entire viewable month
    const events: CalendarEvent[] = rules
      .map((rule) => {
        const start = new Date(rule.start_date + "T12:00:00");
        const end = new Date(rule.end_date + "T12:00:00");

        const viewStart = start < gridStartDate ? gridStartDate : start;
        const viewEnd = end > gridEndDate ? gridEndDate : end;

        if (viewStart > viewEnd) return null;

        const startDayIndex = gridDays.findIndex((d) => isSameDay(d.date, viewStart));
        const endDayIndex = gridDays.findIndex((d) => isSameDay(d.date, viewEnd));

        if (startDayIndex === -1 || endDayIndex === -1) return null;
        
        // Clamp to start of the row (Sunday) and end of the row (Saturday)
        const rowStart = Math.floor(startDayIndex / 7) * 7;
        const rowEnd = Math.floor(endDayIndex / 7) * 7 + 6;
        
        // Calculate the actual grid start (1-7) and span (1-7)
        const gridStart = (startDayIndex % 7) + 1;
        const span = endDayIndex - startDayIndex + 1;

        return {
          rule,
          gridStart,
          span,
          label: `${rule.species} (${rule.weapon})`,
          weaponType: rule.weapon.toLowerCase(),
          access: rule.quota_required ? "quota" : "general",
        };
      })
      .filter((e): e is CalendarEvent => e !== null)
      .sort((a, b) => a.rule.start_date.localeCompare(b.rule.start_date));

    // 2. Assign events to rows for visual stacking
    const eventRows: CalendarEvent[][] = [];
    events.forEach(event => {
      let placed = false;
      const eventEndColumn = event.gridStart + event.span;
      
      // Find the first row where this event can fit visually
      for (const row of eventRows) {
        const overlaps = row.some(e => {
          const eEndColumn = e.gridStart + e.span;
          return (
            (event.gridStart < eEndColumn) && 
            (eventEndColumn > e.gridStart)
          );
        });

        if (!overlaps) {
          row.push(event);
          placed = true;
          break;
        }
      }
      // If it didn't fit, create a new row
      if (!placed) {
        eventRows.push([event]);
      }
    });

    return { gridDays, eventRows, monthLabel };
  }, [viewDate, rules]);
  
  const addMonth = (n: number) =>
    setViewDate((d) => {
      const newD = new Date(d);
      newD.setDate(1); 
      newD.setMonth(d.getMonth() + n);
      return newD;
    });

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{monthLabel}</h4>
        <div className="flex gap-2">
          <button
            className="rounded-md border p-1"
            onClick={() => addMonth(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="rounded-md border px-2 py-1 text-sm"
            onClick={() => setViewDate(new Date())}
          >
            Today
          </button>
          <button
            className="rounded-md border p-1"
            onClick={() => addMonth(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Grid container with day names */}
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border bg-slate-100">
        {/* Day Headers (Sun-Sat) */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-white py-1 text-center text-xs font-medium text-slate-500">
            {d}
          </div>
        ))}

        {/* Calendar Cells and Event Strips */}
        <div className="relative col-span-7 grid grid-cols-7 grid-rows-6 h-full w-full bg-white">
          {/* Day Cells */}
          {gridDays.map((day, i) => (
            <div
              key={day.iso}
              className={clsx(
                "h-16 border-r border-b p-1",
                day.dayOfWeek === 6 && "border-r-0", // Hide right border on Saturday
                i > 35 && "border-b-0", // Hide bottom border on last row
                !day.isCurrentMonth && "bg-slate-50"
              )}
            >
              <span
                className={clsx(
                  "text-xs font-medium",
                  !day.isCurrentMonth && "text-slate-400"
                )}
              >
                {day.date.getDate()}
              </span>
            </div>
          ))}

          {/* Event Strips Container */}
          <div className="absolute inset-0 grid grid-cols-7 grid-rows-6 pointer-events-none">
            {eventRows.map((row, rowIndex) =>
              row.map(event => {
                const isGeneral = event.access === "general";
                const rowStart = Math.floor(gridDays.findIndex(d => isSameDay(d.date, event.rule.start_date)) / 7) + 1;
                
                return (
                  <div
                    key={event.rule.id}
                    className={clsx(
                      "rounded p-1 overflow-hidden text-xs text-white",
                      "pointer-events-auto cursor-pointer shadow-sm",
                      isGeneral ? "bg-emerald-60x" : "bg-amber-600",
                    )}
                    style={{
                      // Grid position (using 1-based index)
                      gridRowStart: rowStart + Math.floor(event.gridStart / 7),
                      gridColumnStart: event.gridStart,
                      gridColumnEnd: `span ${event.span}`,
                      // Stacking within the grid cell
                      top: `${1.1 * rowIndex + 0.1}rem`,
                      left: '0.1rem',
                      right: '0.1rem',
                      height: '1.2rem',
                    }}
                    title={`${event.label} (${fmtMmmDd(event.rule.start_date)} - ${fmtMmmDd(event.rule.end_date)})`}
                  >
                    <span className="truncate uppercase font-semibold">{event.rule.weapon}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
