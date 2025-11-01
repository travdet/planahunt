"use client";

import Link from "next/link";
import { Calendar, Heart, MapPin, Navigation, Target, Trees } from "lucide-react";
import { useMemo, useState } from "react";
import type { WMAWithRules } from "@/lib/types";
import { daysUntil } from "@/lib/util";

export type BetaCardProps = {
  area: WMAWithRules & {
    primaryAccess?: "general" | "quota" | "mixed" | "none";
    openToday?: boolean;
  };
};

export default function BetaWMACard({ area }: BetaCardProps) {
  const { wma, rules, primaryAccess } = area;
  const [favorite, setFavorite] = useState(false);

  const nextHunt = useMemo(() => {
    const sorted = [...rules].sort((a, b) => a.start_date.localeCompare(b.start_date));
    return sorted.find((rule) => rule.end_date >= new Date().toISOString().slice(0, 10));
  }, [rules]);

  const accessBadge = useMemo(() => {
    if (primaryAccess === "quota") {
      return { label: "Lottery required", className: "bg-[var(--beta-access-quota-bg)] text-[var(--clay-dark)]" };
    }
    if (primaryAccess === "mixed") {
      return { label: "Mixed access", className: "bg-[var(--stone-100)] text-[var(--stone-700)]" };
    }
    if (primaryAccess === "general") {
      return { label: "Walk-on access", className: "bg-[var(--beta-access-general-bg)] text-[var(--moss-green)]" };
    }
    return null;
  }, [primaryAccess]);

  return (
    <article className="relative flex flex-col gap-4 rounded-3xl border-2 border-[var(--stone-200)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="paper-texture-vintage pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
      <div className="relative flex items-start gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--forest-primary)] to-[var(--forest-light)]" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {accessBadge && (
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${accessBadge.className}`}>
                {accessBadge.label}
              </span>
            )}
            {area.openToday && (
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Open today</span>
            )}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--forest-dark)]">{wma.name}</h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-[var(--stone-600)]">
            <MapPin className="h-4 w-4" /> {wma.counties.join(", ") || "Georgia"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFavorite((prev) => !prev)}
          className={`rounded-full border border-[var(--stone-200)] p-2 transition hover:border-[var(--rust-red)] ${
            favorite ? "text-[var(--rust-red)]" : "text-[var(--stone-500)]"
          }`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={favorite ? "fill-current" : ""} />
        </button>
      </div>

      <div className="relative grid grid-cols-3 gap-4 rounded-2xl border border-[var(--stone-200)] bg-[var(--stone-50)] p-4 text-sm">
        <StatBlock label="Distance" icon={<Navigation className="h-4 w-4" />} value="—" />
        <StatBlock label="Acreage" icon={<Trees className="h-4 w-4" />} value={wma.acreage ? `${wma.acreage.toLocaleString()} ac` : "—"} />
        <StatBlock label="Hunt types" icon={<Target className="h-4 w-4" />} value={`${new Set(rules.map((r) => r.species)).size}`} />
      </div>

      {nextHunt && (
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--forest-light)] bg-[var(--forest-light)]/10 px-4 py-3 text-sm text-[var(--forest-dark)]">
          <Calendar className="h-4 w-4" />
          <span>
            Next: {nextHunt.species} · {nextHunt.weapon} on {nextHunt.start_date}
            {(() => {
              const days = daysUntil(nextHunt.start_date ?? "");
              if (days === null) return null;
              if (days <= 0) return " (ongoing)";
              if (days === 1) return " (tomorrow)";
              return ` (${days} days)`;
            })()}
          </span>
        </div>
      )}

      <div className="flex justify-end">
        <Link
          href={`/beta/wma/${wma.id}`}
          className="rounded-lg border border-[var(--forest-primary)] bg-[var(--forest-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--forest-light)]"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

type StatBlockProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function StatBlock({ label, value, icon }: StatBlockProps) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="flex items-center gap-1 text-xs uppercase tracking-wide text-[var(--stone-500)]">
        {icon}
        {label}
      </span>
      <span className="text-base font-semibold text-[var(--stone-800)]">{value}</span>
    </div>
  );
}
