"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  allCounties: string[];
  selectedCounties: string[];
  onChange: (selected: string[]) => void;
};

export default function CountyFilter({
  allCounties,
  selectedCounties,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCounties = useMemo(() => {
    if (!query) return allCounties.filter(c => !selectedCounties.includes(c));
    return allCounties.filter(
      (c) =>
        !selectedCounties.includes(c) &&
        c.toLowerCase().includes(query.toLowerCase())
    );
  }, [allCounties, selectedCounties, query]);

  function addCounty(county: string) {
    onChange([...selectedCounties, county]);
    setQuery("");
  }

  function removeCounty(county: string) {
    onChange(selectedCounties.filter((c) => c !== county));
  }

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-sm font-medium">Counties</label>
      {/* Pill Box */}
      <div
        className="mt-1 w-full rounded-md border bg-white px-3 py-2 min-h-[40px] flex flex-wrap gap-1 items-center"
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {selectedCounties.map((county) => (
          <span
            key={county}
            className="flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-sm text-white"
          >
            {county}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Don't open dropdown
                removeCounty(county);
              }}
              className="rounded-full hover:bg-emerald-700"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedCounties.length ? "" : "Select counties..."}
          className="flex-grow text-sm outline-none"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-auto">
          {filteredCounties.length > 0 ? (
            filteredCounties.map((county) => (
              <button
                key={county}
                type="button"
                className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
                onClick={() => {
                  addCounty(county);
                  setIsOpen(false);
                }}
              >
                {county}
              </button>
            ))
          ) : (
            <span className="block px-3 py-2 text-sm text-slate-500">
              No counties found.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
