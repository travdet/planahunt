"use client";

import { Calendar, MapPin, Mountain, Target } from "lucide-react";
import { useMemo } from "react";
import { AREAS_WITH_RULES } from "@/lib/data";
import { todayISO } from "@/lib/util";

function countOpenToday() {
  const today = todayISO();
  const ids = new Set<string>();
  for (const entry of AREAS_WITH_RULES) {
    const open = entry.rules.some((rule) => today >= rule.start_date && today <= rule.end_date);
    if (open) ids.add(entry.wma.id);
  }
  return ids.size;
}

export default function BetaHomePage() {
  const openToday = useMemo(() => countOpenToday(), []);
  const isWeekend = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 || day === 6;
  }, []);

  return (
    <div className="beta-home pb-16">
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--forest-dark)] to-[var(--forest-primary)] py-16 text-white">
        <div className="paper-texture-light pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {isWeekend ? "Ready for a weekend hunt?" : "Planning your next adventure?"}
          </h1>
          <p className="text-base text-white/80">
            Preview the new Plan-A-Hunt experience. Choose how you want to plan and we will show the best next step.
          </p>
          <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-wide text-white/80">
            <MapPin className="h-4 w-4" />
            Georgia WMAs · {new Date().toLocaleDateString()}
          </div>
        </div>
      </section>

      <section className="-mt-12 px-4">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <ArticleCard
            icon={<Target className="h-12 w-12" />}
            title="Hunt Today"
            description="See walk-on opportunities that are open right now."
            badge={`${openToday} areas open`}
            href="/beta/explore?filter=today"
          />
          <ArticleCard
            icon={<Mountain className="h-12 w-12" />}
            title="Pick a Species"
            description="Start with what you want to hunt and explore matching WMAs."
            href="/beta/explore?filter=species"
            actions={[
              { label: "🦌 Deer", href: "/beta/explore?species=deer" },
              { label: "🦃 Turkey", href: "/beta/explore?species=turkey" },
              { label: "🕊️ Dove", href: "/beta/explore?species=dove" }
            ]}
          />
          <ArticleCard
            icon={<Calendar className="h-12 w-12" />}
            title="Plan Ahead"
            description="Check quota deadlines and upcoming hunt windows."
            href="/beta/calendar"
            badge="Quota planner"
          />
        </div>
      </section>
    </div>
  );
}

type ArticleCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  badge?: string;
  actions?: { label: string; href: string }[];
};

function ArticleCard({ icon, title, description, badge, href, actions }: ArticleCardProps) {
  return (
    <div className="relative flex h-full flex-col gap-4 rounded-3xl border-2 border-[var(--stone-200)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="paper-texture-vintage pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
      <div className="relative flex flex-col gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--forest-primary)] to-[var(--forest-light)] text-white shadow-md">
          {icon}
        </div>
        <div>
          {badge && (
            <span className="inline-flex items-center rounded-full border border-[var(--stone-200)] bg-[var(--stone-50)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--stone-600)]">
              {badge}
            </span>
          )}
          <h2 className="mt-2 text-2xl font-semibold text-[var(--forest-dark)]">{title}</h2>
          <p className="mt-1 text-sm text-[var(--stone-600)]">{description}</p>
        </div>
      </div>
      {actions ? (
        <div className="relative mt-auto grid grid-cols-2 gap-2 text-sm">
          {actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="rounded-lg border border-[var(--stone-200)] bg-white px-3 py-2 text-center font-medium text-[var(--stone-700)] transition hover:border-[var(--forest-primary)] hover:text-[var(--forest-primary)]"
            >
              {action.label}
            </a>
          ))}
          <a
            href={href}
            className="col-span-2 mt-2 flex items-center justify-center rounded-lg border border-[var(--forest-primary)] bg-[var(--forest-primary)] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[var(--forest-light)]"
          >
            Explore more
          </a>
        </div>
      ) : (
        <a
          href={href}
          className="relative mt-auto inline-flex items-center justify-center rounded-lg border border-[var(--forest-primary)] bg-[var(--forest-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--forest-light)]"
        >
          Explore more
        </a>
      )}
    </div>
  );
}
