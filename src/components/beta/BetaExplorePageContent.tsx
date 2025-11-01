"use client";

import { useMemo, useState } from "react";
import { AREAS_WITH_RULES } from "@/lib/data";
import type { WMAWithRules } from "@/lib/types";
import { todayISO } from "@/lib/util";
import { MapPin, SlidersHorizontal } from "lucide-react";
import BetaWMACard from "@/components/beta/BetaWMACard";
import BetaMap from "@/components/beta/BetaMap";

const today = todayISO();

function isOpenOn(rule: WMAWithRules["rules"][number], isoDate: string) {
  return isoDate >= rule.start_date && isoDate <= rule.end_date;
}

function derivePrimaryAccess(wma: WMAWithRules) {
  const hasGeneral = wma.rules.some((rule) => !rule.quota_required);
  const hasQuota = wma.rules.some((rule) => rule.quota_required);
  if (hasGeneral && hasQuota) return "mixed" as const;
  if (hasGeneral) return "general" as const;
  if (hasQuota) return "quota" as const;
  return "none" as const;
}

export default function BetaExplorePage() {
  const [maxDistance] = useState<number>(50);
  const [accessFilter, setAccessFilter] = useState<"general" | "all">("general");

  const derived = useMemo(() => {
    return AREAS_WITH_RULES.map((entry) => ({
      ...entry,
      primaryAccess: derivePrimaryAccess(entry),
      openToday: entry.rules.some((rule) => isOpenOn(rule, today))
    }));
  }, []);

  const filtered = useMemo(() => {
    return derived.filter((entry) => {
      if (accessFilter === "general" && entry.primaryAccess === "quota") return false;
      return true;
    });
  }, [derived, accessFilter]);

  return (
    <div className="space-y-6 px-4 pb-16">
      <section className="mx-auto max-w-5xl space-y-4 rounded-3xl border-2 border-[var(--stone-200)] bg-white p-6 shadow-sm">
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--forest-dark)]">Explore Georgia WMAs</h1>
            <p className="text-sm text-[var(--stone-600)]">
              Start with walk-on opportunities and layer in quota hunts when you are ready to plan ahead.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--stone-600)]">
            <MapPin className="h-4 w-4" /> Within {maxDistance} miles · {filtered.length} areas shown
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAccessFilter("general")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              accessFilter === "general"
                ? "border-[var(--forest-primary)] bg-[var(--forest-primary)] text-white"
                : "border-[var(--stone-300)] bg-white text-[var(--stone-700)] hover:border-[var(--forest-primary)]"
            }`}
          >
            Walk-on access
          </button>
          <button
            type="button"
            onClick={() => setAccessFilter("all")}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              accessFilter === "all"
                ? "border-[var(--clay-orange)] bg-[var(--clay-orange)] text-white"
                : "border-[var(--stone-300)] bg-white text-[var(--stone-700)] hover:border-[var(--clay-orange)]"
            }`}
          >
            Include lottery hunts
          </button>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--stone-200)] bg-[var(--stone-50)] px-3 py-2 text-xs font-medium uppercase tracking-wide text-[var(--stone-600)]">
            <SlidersHorizontal className="h-4 w-4" /> Smart defaults enabled
          </span>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[360px,1fr]">
        <BetaMap areas={filtered} />
        <div className="space-y-4">
          {filtered.map((entry) => (
            <BetaWMACard key={entry.wma.id} area={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}
