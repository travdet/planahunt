import { notFound } from "next/navigation";
import { AREAS_WITH_RULES } from "@/lib/data";
import { fmtMDY, todayISO, daysUntil } from "@/lib/util";
import AccessCalendar from "@/components/AccessCalendar";
import Mapbox from "@/components/Mapbox";
import FavoriteButton from "@/components/FavoriteButton";
import PrintButton from "@/components/PrintButton";
import ShareButton from "@/components/ShareButton";
import QuotaReminder from "@/components/QuotaReminder";
import { getUpcomingWindows, groupBySpecies, summarizeAccessProfile } from "@/lib/rules";
import { getAreaCategoryStyle, getSpeciesIcon, getWeaponColor, getAccessBadgeStyle } from "@/lib/palette";

type Params = { params: { id: string } };

export default function HuntDetail({ params }: Params) {
  const id = decodeURIComponent(params.id);
  const entry = AREAS_WITH_RULES.find((area) => area.wma.id === id);
  if (!entry) return notFound();

  const { wma, rules } = entry;
  const grouped = groupBySpecies(rules);
  const upcoming = getUpcomingWindows(rules, 10);
  const categoryStyle = getAreaCategoryStyle(wma.area_category);
  const accessProfile = summarizeAccessProfile(rules);
  const accessBadge = getAccessBadgeStyle(accessProfile);
  const propertyWarnings = Array.from(
    new Set(
      rules.flatMap((rule) => (rule.important_notes ?? []).filter((note): note is string => !!note))
    )
  ).sort((a, b) => a.localeCompare(b));
  const requiresSignIn = rules.some((rule) => rule.sign_in_required);
  const quotaRules = rules.filter((rule) => rule.access === "quota");
  const amenityChips = [
    { icon: "🏕️", label: "Camping", allowed: !!wma.camping_allowed },
    { icon: "🏍️", label: "ATVs", allowed: !!wma.atv_allowed }
  ];
  const mapPoints =
    typeof wma.lat === "number" && typeof wma.lng === "number"
      ? [
          {
            id: wma.id,
            name: wma.name,
            lat: wma.lat,
            lng: wma.lng,
            counties: wma.counties,
            region: wma.region ?? null,
            acreage: wma.acreage ?? null,
            areaCategory: wma.area_category ?? "WMA",
            campingAllowed: !!wma.camping_allowed,
            atvAllowed: !!wma.atv_allowed,
            accessProfile,
            accessLabel: accessBadge.label,
            accessIcon: accessBadge.icon
          }
        ]
      : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="print-only mb-6 text-center">
        <h1 className="text-2xl font-bold">{wma.name}</h1>
        <p>Georgia Hunting Regulations 2025-2026</p>
        <p>Printed: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: accessBadge.bgColor, color: accessBadge.textColor }}
              >
                <span aria-hidden>{accessBadge.icon}</span>
                {accessBadge.label}
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{ backgroundColor: `${categoryStyle.color}1A`, color: categoryStyle.color }}
              >
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: categoryStyle.color }} aria-hidden />
                {categoryStyle.label}
              </span>
              <h1 className="text-2xl font-semibold text-slate-900">{wma.name}</h1>
            </div>
            <p className="text-sm text-slate-600">
              {wma.managing_agency ? `${wma.managing_agency} • ` : ""}
              {wma.counties.length ? wma.counties.join(", ") : "County pending"}
              {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
              {wma.phone ? ` • ${wma.phone}` : ""}
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              {amenityChips.map((chip) => (
                <span
                  key={chip.label}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${
                    chip.allowed ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <span aria-hidden>{chip.icon}</span>
                  {chip.label}: {chip.allowed ? "Allowed" : "Not allowed"}
                </span>
              ))}
            </div>
            {wma.tags && wma.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                {wma.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#E6DFC8] px-2 py-1 text-xs text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-2 no-print">
              <FavoriteButton wmaId={wma.id} />
              <ShareButton wmaId={wma.id} wmaName={wma.name} />
              <PrintButton />
            </div>
            {wma.source_url && (
              <a
                href={wma.source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-slate-700 transition hover:bg-slate-50"
              >
                View official regulations
              </a>
            )}
          </div>
        </div>
      </div>

      {propertyWarnings.length > 0 && (
        <div className="mt-6 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex items-center gap-2 font-semibold">
            <span aria-hidden>⚠️</span>
            Important property notes
          </div>
          <ul className="mt-2 space-y-1 list-disc pl-5">
            {propertyWarnings.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr),minmax(0,0.85fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Property overview</h2>
            <div className="mt-4 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Counties</p>
                <p className="mt-1">{wma.counties.length ? wma.counties.join(", ") : "TBD"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Region</p>
                <p className="mt-1">{wma.region || "TBD"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Acreage</p>
                <p className="mt-1">{wma.acreage ? `${wma.acreage.toLocaleString()} acres` : "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact</p>
                <p className="mt-1">{wma.phone || "—"}</p>
              </div>
            </div>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              {wma.directions && wma.directions.trim().length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Directions</p>
                  <p className="mt-1 leading-relaxed">{wma.directions}</p>
                </div>
              )}
          {wma.area_notes && wma.area_notes.trim().length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Area notes</p>
              <p className="mt-1 leading-relaxed">{wma.area_notes}</p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Requirements & check-in</h2>
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          {requiresSignIn && (
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <span className="text-xl" aria-hidden>
                ⚠️
              </span>
              <div>
                <p className="font-semibold text-amber-800">Sign-in required</p>
                <p className="text-amber-800">
                  Check in at the kiosk or online before hunting. Keep confirmation on your phone or printed in case staff asks.
                </p>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Harvest reporting</p>
            <p className="mt-1">
              All harvests must be reported within 24 hours via the Go Outdoors Georgia app or website.
            </p>
            <a
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
              href="https://gooutdoorsgeorgia.com"
              target="_blank"
              rel="noreferrer"
            >
              Report harvest →
            </a>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Required licenses</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Valid Georgia hunting license</li>
              <li>WMA license or lands pass</li>
              {wma.area_category === "Federal" && <li>Check refuge permit requirements</li>}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Regulations</p>
            <p className="mt-1">Always review the official regulations before your trip.</p>
            <a
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
              href={wma.source_url || "https://georgiawildlife.com/hunting/wma"}
              target="_blank"
              rel="noreferrer"
            >
              View official WMA rules →
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Upcoming windows</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          {upcoming.length ? (
            upcoming.map((window) => {
              const deadline = window.applicationDeadline ?? null;
              const daysRemaining = deadline ? daysUntil(deadline, todayISO()) : null;
              const quota = window.access === "quota";
              return (
                <div key={window.id} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-slate-800">
                      {window.species} · {window.weapon}
                    </span>
                    <span className={quota ? "text-amber-700" : "text-emerald-700"}>
                      {quota ? "Quota" : "General"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {fmtMDY(window.start)} – {fmtMDY(window.end)}
                    {window.notes ? ` • ${window.notes}` : ""}
                  </p>
                  {quota && (deadline || window.spotsAvailable || window.estimatedApplicants) && (
                    <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                      {deadline && (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-1 text-amber-800">
                          <span aria-hidden>⏰</span>
                          Apply by {fmtMDY(deadline)}
                          {typeof daysRemaining === "number" && daysRemaining >= 0 && (
                            <span className="font-semibold">
                              {daysRemaining === 0
                                ? " • Deadline today"
                                : daysRemaining === 1
                                ? " • 1 day left"
                                : ` • ${daysRemaining} days left`}
                            </span>
                          )}
                        </span>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {window.spotsAvailable != null && <span>Spots: {window.spotsAvailable}</span>}
                        {window.estimatedApplicants != null && (
                          <span>Last year: ~{window.estimatedApplicants} applications</span>
                        )}
                      </div>
                    </div>
                  )}
                  {quota && deadline && (
                    <div className="mt-3">
                      <QuotaReminder
                        huntId={window.id}
                        wmaName={wma.name}
                        label={`${window.species} — ${window.weapon}`}
                        applicationDeadline={deadline}
                        applicationUrl={window.applicationUrl}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-600">No upcoming seasons published yet.</p>
          )}
        </div>
      </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">All hunt opportunities</h2>
            <div className="mt-4 space-y-4">
              {grouped.map((group) => (
                <div key={group.species} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden>
                      {getSpeciesIcon(group.species)}
                    </span>
                    <h3 className="text-base font-semibold text-slate-800">{group.species}</h3>
                  </div>
                  <div className="mt-3 space-y-3">
                    {group.entries.map((entry) => {
                      const warnings = entry.important_notes ?? [];
                      const color = getWeaponColor(String(entry.weapon));
                      const isQuota = entry.access === "quota";
                      const deadline = entry.application_deadline ?? null;
                      const daysRemaining = deadline ? daysUntil(deadline, todayISO()) : null;
                      return (
                        <div
                          key={entry.id}
                          className={`rounded-lg border border-slate-200 px-4 py-3 ${isQuota ? "bg-amber-50" : "bg-slate-50"}`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: color }} aria-hidden />
                                {String(entry.weapon)}
                                {entry.weapon_subcategory && (
                                  <span className="rounded-full border border-slate-300 px-2 py-0.5 text-xs text-slate-600">
                                    {entry.weapon_subcategory}
                                  </span>
                                )}
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                    isQuota ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {isQuota ? "Quota" : "General"}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600">
                                {fmtMDY(entry.start_date)} – {fmtMDY(entry.end_date)}
                                {entry.weekdaysNormalized && entry.weekdaysNormalized.length > 0
                                  ? ` • ${entry.weekdaysNormalized
                                      .map((dow) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dow])
                                      .join(", ")}`
                                  : ""}
                              </div>
                              <div className="flex flex-wrap gap-2 text-[11px] text-slate-600">
                                {entry.activity_type && <span>Activity: {entry.activity_type}</span>}
                                {entry.bag_limit && <span>Bag limit: {entry.bag_limit}</span>}
                                {entry.antler_restrictions && <span>{entry.antler_restrictions}</span>}
                                {entry.shooting_hours_restriction && (
                                  <span>Shooting hours: {entry.shooting_hours_restriction}</span>
                                )}
                                {entry.notes_short && <span>{entry.notes_short}</span>}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 text-xs text-slate-600">
                              {warnings.length > 0 && (
                                <ul className="ml-4 list-disc text-left">
                                  {warnings.map((warning) => (
                                    <li key={warning}>{warning}</li>
                                  ))}
                                </ul>
                              )}
                              {isQuota && (deadline || entry.quota_details) && (
                                <div className="space-y-1 text-right">
                                  {deadline && (
                                    <p className="font-semibold text-amber-700">
                                      Apply by {fmtMDY(deadline)}
                                      {typeof daysRemaining === "number" && daysRemaining >= 0 &&
                                        (daysRemaining === 0
                                          ? " • Deadline today"
                                          : daysRemaining === 1
                                          ? " • 1 day left"
                                          : ` • ${daysRemaining} days left`)}
                                    </p>
                                  )}
                                  {entry.quota_details ? <p>{entry.quota_details}</p> : null}
                                </div>
                              )}
                            </div>
                          </div>
                          {isQuota && deadline && (
                            <div className="mt-3">
                              <QuotaReminder
                                huntId={entry.id}
                                wmaName={wma.name}
                                label={`${entry.species} — ${String(entry.weapon)}`}
                                applicationDeadline={deadline}
                                applicationUrl={entry.application_url}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Access calendar</h2>
            <div className="mt-4">
              <AccessCalendar rules={rules} initialMonth={rules[0]?.start_date.slice(0, 7)} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Map</h2>
            {mapPoints.length ? (
              <div className="mt-3">
                <Mapbox points={mapPoints} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-600">Coordinates not yet available for this property.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
