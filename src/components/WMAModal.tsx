"use client";
import type { SeasonRule, WMA } from "@/lib/types";
import { fmtMDY } from "@/lib/util";
import Link from "next/link";

export default function WMAModal({ wma, rules, onClose }:{ wma: WMA|null, rules: SeasonRule[], onClose: ()=>void }){
  if (!wma) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <div className="text-lg font-semibold">{wma.name}</div>
            <div className="text-sm text-slate-600">{wma.region} • {wma.counties.join(", ")} {wma.acreage?`• ${wma.acreage.toLocaleString()} acres`:""}</div>
            <div className="mt-1 flex gap-1 flex-wrap">{(wma.tags||[]).map(t => <span key={t} className="badge">{t}</span>)}</div>
          </div>
          <button onClick={onClose} className="pill">Close</button>
        </div>
        <div className="p-4">
          <table className="w-full text-sm table">
            <thead>
              <tr>
                <th>Species</th>
                <th>Weapon</th>
                <th>Dates</th>
                <th>Access</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {rules.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="py-1">{r.species}</td>
                  <td className="py-1">{r.weapon}</td>
                  <td className="py-1">{fmtMDY(r.start_date)} – {fmtMDY(r.end_date)}</td>
                  <td className="py-1">
                    <div className="flex gap-1 flex-wrap">
                      {!r.quota_required && <span className="badge">General</span>}
                      {r.quota_required && <span className="badge">Quota</span>}
                      {r.buck_only && <span className="badge">Buck-only</span>}
                      {r.tags?.map(t => <span key={t} className="badge">{t}</span>)}
                    </div>
                  </td>
                  <td className="py-1">{r.notes_short||""}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex gap-3">
            {wma.phone && <a className="pill" href={`tel:${wma.phone}`}>Call Office</a>}
            {wma.source_url && <a target="_blank" className="pill" href={wma.source_url}>DNR Source</a>}
            <Link className="pill" href={`/hunt/${encodeURIComponent(wma.id)}`}>Open Full Page →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
