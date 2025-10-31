import type { SeasonWithMeta } from "./types";
import { isRuleActiveOnDate } from "./rules";
import { todayISO } from "./util";

type SeasonStatus =
  | { type: "open" }
  | { type: "upcoming"; message: string; color: "yellow" | "gray"; daysUntil: number }
  | { type: "closed" };

export function computeSeasonStatus(rules: SeasonWithMeta[], referenceDate: Date = new Date()): SeasonStatus {
  if (!rules.length) return { type: "closed" };

  const today = todayISO(referenceDate);
  const open = rules.some((rule) => isRuleActiveOnDate(rule, today));
  if (open) {
    return { type: "open" };
  }

  const upcomingDates = rules
    .map((rule) => rule.start_date)
    .filter((start) => start > today)
    .sort((a, b) => a.localeCompare(b));

  if (!upcomingDates.length) {
    return { type: "closed" };
  }

  const nextDate = new Date(upcomingDates[0]);
  const now = referenceDate;
  const diffMs = nextDate.getTime() - now.getTime();
  const daysUntil = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  if (daysUntil === 0) {
    return { type: "open" };
  }

  if (daysUntil === 1) {
    return { type: "upcoming", message: "Opens tomorrow", color: "yellow", daysUntil };
  }

  if (daysUntil <= 7) {
    return { type: "upcoming", message: `Opens in ${daysUntil} days`, color: "yellow", daysUntil };
  }

  if (daysUntil <= 30) {
    const weeks = Math.round(daysUntil / 7);
    return {
      type: "upcoming",
      message: `Opens in ${weeks} week${weeks > 1 ? "s" : ""}`,
      color: "gray",
      daysUntil
    };
  }

  return {
    type: "upcoming",
    message: `Opens ${formatMonthDay(nextDate)}`,
    color: "gray",
    daysUntil
  };
}

function formatMonthDay(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}
