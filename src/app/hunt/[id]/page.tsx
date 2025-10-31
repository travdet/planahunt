import { notFound } from "next/navigation";
import { AREAS_WITH_RULES } from "@/lib/data";
import { fmtMDY } from "@/lib/util";
import AccessCalendar from "@/components/AccessCalendar";
import Mapbox from "@/components/Mapbox";
import { getUpcomingWindows, groupBySpecies } from "@/lib/rules";

type Params = { params: { id: string } };

export default function HuntDetail({ params }: Params) {
  const id = decodeURIComponent(params.id);
  const entry = AREAS_WITH_RULES.find((area) => area.wma.id === id);
  if (!entry) return notFound();

  const { wma, rules } = entry;
  const grouped = groupBySpecies(rules);
  const upcoming = getUpcomingWindows(rules, 10);
  const mapPoints =
    typeof wma.lat === "number" && typeof wma.lng === "number"
      ? [{ id: wma.id, name: wma.name, lat: wma.lat, lng: wma.lng }]
      : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 rounded-2xl bg-emerald-700 px-6 py-5 text-white">
        <h1 className="text-2xl font-semibold">{wma.name}</h1>
        <p className="text-sm opacity-90">
          {wma.counties.join(", ")}
          {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
          {wma.phone ? ` • ${wma.phone}` : ""}
        </p>
        {wma.tags && wma.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {wma.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/20 px-2 py-1 text-white">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Upcoming windows</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {upcoming.length ? (
                upcoming.map((window) => (
                  <div key={window.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800">
                        {window.species} · {window.weapon}
                      </span>
                      <span className={window.access === "general" ? "text-emerald-700" : "text-amber-700"}>
                        {window.access === "general" ? "General" : "Quota"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {fmtMDY(window.start)} – {fmtMDY(window.end)}
                      {window.notes ? ` • ${window.notes}` : ""}
                    </p>
                  </div>
                ))
              ) : (
                <p>No upcoming seasons published yet.</p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">All hunt windows</h2>
            <div className="mt-4 space-y-4">
              {grouped.map((group) => (
                <div key={group.species} className="rounded-xl border border-slate-100 p-3">
                  <h3 className="text-base font-semibold text-slate-800">{group.species}</h3>
                  <table className="mt-2 w-full text-xs text-slate-600">
                    <thead>
                      <tr className="text-left text-[10px] uppercase tracking-wide text-slate-500">
                        <th className="py-1">Weapon</th>
                        <th className="py-1">Access</th>
                        <th className="py-1">Dates</th>
                        <th className="py-1">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.entries.map((entry) => (
                        <tr key={entry.id} className="border-t border-slate-100">
                          <td className="py-1">{String(entry.weapon)}</td>
                          <td className="py-1">{entry.access === "general" ? "General" : "Quota"}</td>
                          <td className="py-1">{fmtMDY(entry.start_date)} – {fmtMDY(entry.end_date)}</td>
                          <td className="py-1">{entry.notes_short || ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Access calendar</h2>
            <div className="mt-4">
              <AccessCalendar rules={rules} initialMonth={rules[0]?.start_date.slice(0, 7)} />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Map</h2>
            {mapPoints.length ? (
              <div className="mt-3">
                <Mapbox points={mapPoints} />
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-600">Coordinates not yet available for this WMA.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
