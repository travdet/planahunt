import wmas from "@/data/wmas.json";
import rulesRaw from "@/data/seasons.json";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import AccessCalendar from "@/components/AccessCalendar";
import statewide from "@/data/statewide.json";
import { resolveStatewide } from "@/lib/rules";

export default function HuntDetail({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const wma = (wmas as WMA[]).find(w => w.wma_id === id);
  
  if (!wma) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="p-6 text-center">WMA not found.</div>
      </main>
    );
  }
  
  const rules = (rulesRaw as SeasonRule[])
    .filter(r => r.wma_id === id)
    .map(r => resolveStatewide(r, wma, statewide));

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 rounded-2xl bg-emerald-700 px-6 py-4 text-white">
        <h1 className="text-2xl font-semibold">{wma.name}</h1>
        <p className="text-sm opacity-90">
          {wma.counties?.join(", ")}
          {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
          {wma.phone ? ` • ${wma.phone}` : ""}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Seasons</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-1 pr-2">Species</th>
                  <th className="py-1 pr-2">Weapon</th>
                  <th className="py-1 pr-2">Access</th>
                  <th className="py-1">Dates</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1 pr-2">{r.species}</td>
                    <td className="py-1 pr-2">{r.weapon}</td>
                    <td className="py-1 pr-2">{r.quota_required ? "Quota" : "General"}</td>
                    <td className="py-1">{`${fmtMDY(r.start_date)} – ${fmtMDY(r.end_date)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">Calendar</h2>
          <AccessCalendar rules={rules} />
        </div>
      </div>
    </main>
  );
}
