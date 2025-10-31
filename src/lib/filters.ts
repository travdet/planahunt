// src/lib/filters.ts
import type { FilterState, SeasonRule, WMA } from "@/lib/types";
import { rangeOverlaps } from "@/lib/rules";
import { haversineMi } from "@/lib/util";

// rows is a denormalized list for rendering/searching
export function applyFilters(
  rows: { wma: WMA; rule: SeasonRule }[],
  filters: FilterState
) {
  const q = (filters.query || "").trim().toLowerCase();

  return rows.filter(({ wma, rule }) => {
    // Query
    if (q) {
      const hay =
        `${wma.name} ${wma.tract_name || ""} ${wma.region} ${wma.counties.join(" ")} ${rule.species} ${rule.weapon}`
          .toLowerCase();
      if (!hay.includes(q)) return false;
    }

    // Species / Weapons (none selected => all)
    if (filters.species.length && !filters.species.includes(rule.species)) return false;
    if (filters.weapons.length && !filters.weapons.includes(rule.weapon)) return false;

    // Access Type
    if (filters.accessType !== "any") {
      const anyQuota = !!rule.includes?.some((w) => w.quota_required);
      if (filters.accessType === "quota" && !anyQuota) return false;
      if (filters.accessType === "general" && anyQuota) return false;
    }

    // Sex filter
    if (filters.sex !== "any") {
      const buckOnly = !!rule.buck_only;
      if (filters.sex === "buck" && !buckOnly) return false;
      if (filters.sex === "either" && buckOnly) return false;
      // if "doe" ever exists as an explicit flag, handle here;
      if (filters.sex === "doe") return false; // currently not supported
    }

    // Region / Counties
    if (filters.regions.length && !filters.regions.includes(wma.region)) return false;
    if (filters.counties.length && !wma.counties.some((c) => filters.counties.includes(c))) return false;

    // Tags
    if (filters.tags.length && !wma.tags?.some((t) => filters.tags.includes(t))) return false;

    // Hunt date(s)
    const needDate = filters.huntStart || filters.huntEnd;
    if (needDate) {
      const start = (filters.huntStart || filters.huntEnd)!;
      const end = (filters.huntEnd || filters.huntStart)!;
      const anyOpen = !!rule.includes?.some((w) => rangeOverlaps(start, end, w.start_date, w.end_date));
      if (!anyOpen) return false;
    }

    return true;
  });
}

// Optional helper to compute distance if home is set
export function decorateWithDistance<T extends { wma: WMA }>(
  rows: T[],
  home?: { lat?: number; lng?: number }
) {
  if (!home?.lat || !home?.lng) return rows;
  return rows.map((r) => {
    const miles =
      r.wma.lat && r.wma.lng ? haversineMi(home.lat!, home.lng!, r.wma.lat, r.wma.lng) : undefined;
    return { ...r, _miles: miles } as T & { _miles?: number };
  });
}
