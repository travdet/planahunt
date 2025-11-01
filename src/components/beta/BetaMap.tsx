"use client";

import type { WMAWithRules } from "@/lib/types";
import { MapPin } from "lucide-react";

export type BetaMapProps = {
  areas: (WMAWithRules & { primaryAccess?: string; openToday?: boolean })[];
};

export default function BetaMap({ areas }: BetaMapProps) {
  return (
    <div className="relative flex flex-col gap-3 rounded-3xl border-2 border-[var(--stone-200)] bg-white p-6 shadow-sm">
      <div className="paper-texture-light pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
      <div className="relative z-10 space-y-2">
        <h2 className="text-xl font-semibold text-[var(--forest-dark)]">Map preview</h2>
        <p className="text-sm text-[var(--stone-600)]">
          Interactive map coming soon. For now, we summarise the access mix for these WMAs.
        </p>
        <div className="rounded-2xl border border-dashed border-[var(--stone-300)] bg-[var(--stone-50)] p-6 text-center text-sm text-[var(--stone-600)]">
          <MapPin className="mx-auto mb-3 h-8 w-8 text-[var(--forest-primary)]" />
          {areas.length === 0 ? (
            <span>No areas match the current filters yet.</span>
          ) : (
            <ul className="space-y-1 text-left">
              <li>
                <span className="font-semibold text-[var(--forest-primary)]">
                  {areas.filter((area) => area.primaryAccess === "general").length}
                </span>{" "}
                walk-on WMAs
              </li>
              <li>
                <span className="font-semibold text-[var(--clay-dark)]">
                  {areas.filter((area) => area.primaryAccess === "quota").length}
                </span>{" "}
                lottery WMAs
              </li>
              <li>
                <span className="font-semibold text-[var(--stone-700)]">
                  {areas.filter((area) => area.primaryAccess === "mixed").length}
                </span>{" "}
                mixed-access WMAs
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
