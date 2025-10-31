// src/components/WMACard.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SeasonRule, WMA, FilterState } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import { drivingStats } from "@/lib/map";

type Props = {
  wma: WMA;
  rules: SeasonRule[];
  filters: FilterState;
  onOpenModal: (wma: WMA) => void;
};

function Pill({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        "inline-block text-[11px] px-2 py-0.5 rounded-full border " +
        (active
          ? "bg-emerald-100 border-emerald-400 text-emerald-900"
          : "bg-amber-50 border-amber-300 text-amber-800")
      }
    >
      {children}
    </span>
  );
}

export default function WMACard({ wma, rules, filters, onOpenModal }: Props) {
  const [eta, setEta] = useState<{ miles: number; minutes: number } | null>(null);

  useEffect(() => {
    let abort = false;
    async function run() {
      if (filters.homeLat && filters.homeLng && wma.lat && wma.lng) {
        try {
          const r = await drivingStats(
            { lat: filters.homeLat, lng: filters.homeLng },
            { lat: wma.lat, lng: wma.lng }
          );
          if (!abort) setEta(r);
        } catch {}
      }
    }
    run();
    return () => {
      abort = true;
    };
  }, [filters.homeLat, filters.homeLng, wma.lat, wma.lng]);

  // Next open summary (first include window)
  const firstInclude = rules
    .flatMap((r) => r.includes || [])
    .sort((a, b) => a.start_date.localeCompare(b.start_date))[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">{wma.name}</h3>
            <div className="text-xs text-slate-500">
              Region {wma.region}
              {wma.counties.length ? ` • ${wma.counties.join(", ")}` : ""}{" "}
              {typeof wma.acreage === "number" ? ` • ${wma.acreage.toLocaleString()} acres` : ""}
            </div>
          </div>

          <div className="text-right text-xs text-slate-600">
            {eta && (
              <div>
                <div className="font-semibold">{eta.miles.toFixed(1)} mi</div>
                <div>~{Math.round(eta.minutes)} min</div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <Pill active={filters.species.length === 0}>All species</Pill>
          {Array.from(new Set(rules.map((r) => r.species))).map((s) => (
            <Pill key={s} active={filters.species.includes(s)}>{s}</Pill>
          ))}
          {Array.from(new Set(rules.map((r) => r.weapon))).map((w) => (
            <Pill key={w} active={filters.weapons.includes(w)}>{w}</Pill>
          ))}
        </div>

        {firstInclude && (
          <div className="mt-3 text-sm">
            <span className="text-slate-500">Next:</span>{" "}
            <span className="font-medium text-slate-800">
              {fmtMDY(firstInclude.start_date)} – {fmtMDY(firstInclude.end_date)}
            </span>{" "}
            {firstInclude.quota_required && (
              <span className="ml-2 inline-block text-[11px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300">
                Quota
              </span>
            )}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-1 rounded bg-slate-900 text-white text-sm"
            onClick={() => onOpenModal(wma)}
          >
            View details
          </button>
          <Link
            href={`/hunt/${encodeURIComponent(wma.id)}`}
            className="px-3 py-1 rounded border border-slate-300 text-sm"
          >
            Full page
          </Link>
        </div>
      </div>
    </div>
  );
}
