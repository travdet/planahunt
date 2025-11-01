import wmas from "@/data/wmas.json";
import rulesRaw from "@/data/seasons.json";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import AccessCalendar from "@/components/AccessCalendar";

export default function HuntDetail({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const wma = (wmas as WMA[]).find(w => w.id === id);
  if (!wma) return <div className="p-6">WMA not found.</div>;
  const rules = (rulesRaw as SeasonRule[]).filter(r => r.wma_id === id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 rounded-2xl bg-emerald-700 px-6 py-4 text-white">
        <h1 className="text-2xl font-semibold">{wma.name}{wma.tract_name ? ` — ${wma.tract_name}` : ""}</h1>
        <p className="text-sm opacity-90">
          {wma.counties.join(", ")}
          {wma.acreage ? ` • ${wma.acreage.toLocaleString()} ac` : ""}
          {wma.phone ? ` • ${wma.phone}` : ""}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Windows</h2>
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
          <h2 className="mb-2 text-lg font-semibold">Calendar</h2>
          <AccessCalendar rules={rules} />
        </div>
      </div>
    </main>
  );
}
