"use client";
import { useMemo, useState } from "react";
import type { FilterState, WMA, SeasonRule } from "@/lib/types";

export default function Filters({ value, onChange, wmas, rules }:{ value: FilterState, onChange:(v:FilterState)=>void, wmas: WMA[], rules: SeasonRule[] }){
  const [q, setQ] = useState(value.query||"");
  const regions = useMemo(()=> Array.from(new Set(wmas.map(w=>w.region))).sort(), [wmas]);
  const counties = useMemo(()=> Array.from(new Set(wmas.flatMap(w=>w.counties))).sort(), [wmas]);
  const tags = useMemo(()=> Array.from(new Set([...(wmas.flatMap(w=>w.tags||[])), ...(rules.flatMap(r=>r.tags||[]))])).sort(), [wmas, rules]);
  const speciesOptions = useMemo(()=> Array.from(new Set(rules.map(r=>r.species))).sort(), [rules]);
  const weaponOptions = useMemo(()=> Array.from(new Set(rules.map(r=>r.weapon))).sort(), [rules]);

  const toggle = (arr: string[], item: string) => {
    const set = new Set(arr||[]);
    set.has(item) ? set.delete(item) : set.add(item);
    return Array.from(set);
  };

  return (
    <aside className="space-y-4">
      <div className="hcard p-3">
        <div className="label mb-1">Search</div>
        <input value={q} onChange={e=>setQ(e.target.value)} onBlur={()=>onChange({...value, query:q})}
               placeholder="Name, county, species..." className="w-full rounded-md border px-3 py-2"/>
      </div>

      <div className="hcard p-3">
        <div className="label mb-2">Species</div>
        <div className="flex flex-wrap gap-2">
          {speciesOptions.map(s => (
            <button key={s} className={"pill "+(value.species.includes(s)?"bg-parkGreen text-parkPaper border-parkGreen":"")}
              onClick={()=>onChange({...value, species: toggle(value.species, s)})}>{s}</button>
          ))}
        </div>
      </div>

      <div className="hcard p-3">
        <div className="label mb-2">Weapons</div>
        <div className="flex flex-wrap gap-2">
          {weaponOptions.map(w => (
            <button key={w} className={"pill "+(value.weapons.includes(w)?"bg-parkGreen text-parkPaper border-parkGreen":"")}
              onClick={()=>onChange({...value, weapons: toggle(value.weapons, w)})}>{w}</button>
          ))}
        </div>
      </div>

      <div className="hcard p-3 grid grid-cols-2 gap-3">
        <div>
          <div className="label mb-1">Access Type</div>
          <select value={value.accessType} onChange={e=>onChange({...value, accessType: e.target.value as any})}
                  className="w-full rounded-md border px-2 py-1">
            {["any","general","quota"].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <div className="label mb-1">Sex</div>
          <select value={value.sex} onChange={e=>onChange({...value, sex: e.target.value as any})}
                  className="w-full rounded-md border px-2 py-1">
            {["any","buck","either","doe"].map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <div className="label mb-1">Open on date</div>
          <input type="date" value={value.date||""} onChange={e=>onChange({...value, date: e.target.value||null})}
                 className="w-full rounded-md border px-2 py-1"/>
        </div>
      </div>

      <div className="hcard p-3">
        <div className="label mb-2">Region</div>
        <div className="flex flex-wrap gap-2">
          {regions.map(r => (
            <button key={r} className={"pill "+(value.regions.includes(r)?"bg-parkGreen text-parkPaper border-parkGreen":"")}
              onClick={()=>onChange({...value, regions: toggle(value.regions, r)})}>{r}</button>
          ))}
        </div>
      </div>

      <div className="hcard p-3">
        <div className="label mb-2">Counties</div>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-auto">
          {counties.map(c => (
            <button key={c} className={"pill "+(value.counties.includes(c)?"bg-parkGreen text-parkPaper border-parkGreen":"")}
              onClick={()=>onChange({...value, counties: toggle(value.counties, c)})}>{c}</button>
          ))}
        </div>
      </div>

      <div className="hcard p-3">
        <div className="label mb-2">Tags</div>
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <button key={t} className={"pill "+(value.tags.includes(t)?"bg-parkGreen text-parkPaper border-parkGreen":"")}
              onClick={()=>onChange({...value, tags: toggle(value.tags, t)})}>{t}</button>
          ))}
        </div>
      </div>

      <div className="hcard p-3 grid gap-2">
        <div className="label">Distance from Home</div>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" step="any" placeholder="Lat" className="rounded-md border px-2 py-1"
            value={value.home?.lat ?? ""}
            onChange={e=>onChange({...value, home: { lat: parseFloat(e.target.value||"0"), lng: value.home?.lng ?? 0 }})}/>
          <input type="number" step="any" placeholder="Lng" className="rounded-md border px-2 py-1"
            value={value.home?.lng ?? ""}
            onChange={e=>onChange({...value, home: { lat: value.home?.lat ?? 0, lng: parseFloat(e.target.value||"0") }})}/>
        </div>
        <input type="number" placeholder="Max miles"
          className="rounded-md border px-2 py-1"
          value={value.maxDistanceMi ?? ""}
          onChange={e=>onChange({...value, maxDistanceMi: e.target.value? parseFloat(e.target.value): null})}/>
      </div>
    </aside>
  );
}
