"use client";

import { computeSeasonStatus } from "@/lib/seasonStatus";
import type { SeasonWithMeta } from "@/lib/types";

type Props = {
  rules: SeasonWithMeta[];
};

const STYLES = {
  open: "bg-emerald-100 text-emerald-800 border-emerald-300",
  yellow: "bg-amber-100 text-amber-800 border-amber-300",
  gray: "bg-slate-100 text-slate-600 border-slate-300"
} as const;

export default function SeasonBadge({ rules }: Props) {
  const status = computeSeasonStatus(rules);

  if (status.type === "open") {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${STYLES.open}`}>
        <span aria-hidden>🟢</span>
        Open now
      </span>
    );
  }

  if (status.type === "upcoming") {
    const colorClass = status.color === "yellow" ? STYLES.yellow : STYLES.gray;
    const icon = status.color === "yellow" ? "🟡" : "⚪";
    return (
      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${colorClass}`}>
        <span aria-hidden>{icon}</span>
        {status.message}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${STYLES.gray}`}>
      <span aria-hidden>⚪</span>
      Season closed
    </span>
  );
}
