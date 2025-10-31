"use client";

import Link from "next/link";
import type { SeasonWithMeta, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import AccessCalendar from "./AccessCalendar";
import { getUpcomingWindows, groupBySpecies } from "@/lib/rules";

type Props = {
  wma: WMA;
  rules: SeasonWithMeta[];
  onClose: () => void;
};

export default function WMAModal({ wma, rules, onClose }: Props) {
  const upcoming = getUpcomingWindows(rules, 8);
  const grouped = groupBySpecies(rules);
  const initialMonth = rules.length ? rules[0].start_date.slice(0, 7) : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4">
      <div className="mt-10 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {wma.name}
              {wma.tract_name ? ` — ${wma.tract_name}` : ""}
            </h3>
            <p className="text-sm text-slate-600">
              {wma.counties.join(", ")}
              {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
              {wma.phone ? ` • ${wma.phone}` : ""}
            </p>
            {wma.tags && wma.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                {wma.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#E6DFC8] px-2 py-1 text-xs text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link
              href={`/hunt/${encodeURIComponent(wma.id)}`}
              className="rounded-md border border-emerald-600 px-3 py-2 text-emerald-700 hover:bg-emerald-50"
            >
              Open full details
            </Link>
            <button className="rounded-md border px-3 py-2" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,320px]">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Upcoming windows
              </h4>
              <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                {upcoming.length ? (
                  upcoming.map((window) => (
                    <div key={window.id} className="flex flex-wrap justify-between gap-2">
                      <span className="font-medium text-slate-800">
                        {window.species} — {window.weapon}
                      </span>
                      <span className={window.access === "general" ? "text-emerald-700" : "text-amber-700"}>
                        {window.access === "general" ? "General" : "Quota"}
                      </span>
                      <span className="w-full text-slate-600">
                        {fmtMDY(window.start)} – {fmtMDY(window.end)}
                        {window.notes ? ` • ${window.notes}` : ""}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No upcoming seasons posted.</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                All hunt windows
              </h4>
              <div className="space-y-4">
                {grouped.map((group) => (
                  <div key={group.species} className="rounded-xl border border-slate-200 p-3">
                    <h5 className="text-sm font-semibold text-slate-800">{group.species}</h5>
                    <table className="mt-2 w-full text-xs text-slate-600">
                      <thead>
                        <tr className="text-left uppercase tracking-wide text-[10px] text-slate-500">
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
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Calendar
            </h4>
            <AccessCalendar rules={rules} initialMonth={initialMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}
