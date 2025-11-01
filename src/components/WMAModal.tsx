"use client";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import AccessCalendar from "./AccessCalendar";

export default function WMAModal({
  wma,
  rules,
  onClose,
}:{
  wma: WMA | null;
  rules: SeasonRule[];
  onClose: ()=>void;
}) {
  if (!wma) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4">
      <div className="mt-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{wma.name}{wma.tract_name ? ` — ${wma.tract_name}` : ""}</h3>
            <p className="text-sm text-slate-600">
              {wma.counties.join(", ")}
              {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
              {wma.phone ? ` • ${wma.phone}` : ""}
            </p>
          </div>
          <button className="rounded-md border px-3 py-1" onClick={onClose}>Close</button>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-semibold">Windows</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-1">Species</th>
                  <th className="py-1">Weapon</th>
                  <th className="py-1">Access</th>
                  <th className="py-1">Dates</th>
                </tr>
              </thead>
              <tbody>
                {rules.map(r=>(
                  <tr key={r.id} className="border-t">
                    <td className="py-1">{r.species}</td>
                    <td className="py-1">{String(r.weapon)}</td>
                    <td className="py-1">{r.quota_required ? "Quota" : "General"}</td>
                    <td className="py-1">{fmtMDY(r.start_date)} – {fmtMDY(r.end_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Calendar</h4>
            <AccessCalendar rules={rules} />
          </div>
        </div>
      </div>
    </div>
  );
}
