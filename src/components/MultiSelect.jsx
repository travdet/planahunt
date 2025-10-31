"use client";

import { useEffect, useRef, useState } from "react";

export default function MultiSelect({ label, options, values, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  function toggle(v) {
    if (values.includes(v)) onChange(values.filter(x => x !== v));
    else onChange([...values, v]);
  }

  const labelText = values.length ? `${values.length} selected` : "Any";

  return (
    <div className="mb-3" ref={ref}>
      <label className="block text-[11px] font-semibold text-slate-600 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded border border-slate-300 px-2 py-1 text-sm bg-white text-left"
      >
        {labelText}
      </button>

      {open && (
        <div className="mt-1 rounded border border-slate-300 bg-white shadow max-h-64 overflow-auto">
          {options.map((o) => (
            <label key={o.value} className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-slate-50">
              <input
                type="checkbox"
                checked={values.includes(o.value)}
                onChange={() => toggle(o.value)}
              />
              <span>{o.label ?? o.value}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
