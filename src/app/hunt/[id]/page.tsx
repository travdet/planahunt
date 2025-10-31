import wmas from "@/data/wmas.json";
import rulesData from "@/data/seasons.json";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";

type Props = { params: { id: string } };

export default function HuntPage({ params }: Props){
  const wma = (wmas as WMA[]).find(w => w.id === params.id);
  if (!wma) return <div className="p-6">Not found</div>;
  const items = (rulesData as SeasonRule[]).filter(r => r.wma_id === wma.id);

  const groups = new Map<string, SeasonRule[]>();
  for (const r of items) {
    const k = `${r.species}|${r.weapon}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(r);
  }

  return (
    <div className="space-y-4">
      <div className="hcard p-4">
        <div className="text-2xl font-semibold">{wma.name}</div>
        <div className="text-sm text-slate-600">{wma.region} • {wma.counties.join(", ")} {wma.acreage?`• ${wma.acreage.toLocaleString()} acres`:""}</div>
      </div>

      <div className="hcard p-4 overflow-x-auto">
        <table className="w-full text-sm table">
          <thead>
            <tr>
              <th>Species / Weapon</th>
              <th>Dates</th>
              <th>Access</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(groups.entries()).map(([k, arr]) => (
              <tr key={k} className="border-t align-top">
                <td className="py-2">{k.replace("|"," • ")}</td>
                <td className="py-2">
                  {arr.sort((a,b)=> a.start_date.localeCompare(b.start_date)).map(r => (
                    <div key={r.id}>{fmtMDY(r.start_date)} – {fmtMDY(r.end_date)}</div>
                  ))}
                </td>
                <td className="py-2">
                  <div className="flex gap-1 flex-wrap">
                    {arr.some(r=>!r.quota_required) && <span className="badge">General</span>}
                    {arr.some(r=> r.quota_required) && <span className="badge">Quota</span>}
                    {arr.some(r=> r.buck_only) && <span className="badge">Buck-only</span>}
                    {arr.flatMap(r=>r.tags||[]).slice(0,3).map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                </td>
                <td className="py-2">{arr.find(r=>r.notes_short)?.notes_short||""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
