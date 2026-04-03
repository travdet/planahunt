'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import {
  PUBLIC_LANDS,
  HUNTING_SEASONS,
  QUOTA_HUNTS,
  FISHING_REGULATIONS,
} from '@/data/sample';
import { PublicLand, HuntingSeason, FishingRegulation } from '@/lib/types';
import {
  groupSeasons,
  fmtShort,
  fmtFull,
  isSeasonOpen,
  WEAPON_COLORS,
  SPECIES_ICONS,
  parseSemanticTags,
  filterFishingRegs,
} from '@/lib/seasonUtils';

// ---------- helpers ----------

function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const toRad = (n: number) => (n * Math.PI) / 180;
  return (
    Math.acos(
      Math.sin(toRad(lat1)) * Math.sin(toRad(lat2)) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lng2) - toRad(lng1)),
    ) * 3959
  );
}

/** Returns true if notes contain info beyond what semantic tags already convey */
function hasExtraInfo(season: HuntingSeason): boolean {
  if (!season.notes) return false;
  const notes = season.notes.toLowerCase().trim();
  // Strip out phrases already captured by semantic tags
  let stripped = notes
    .replace(/buck only\.?/gi, '')
    .replace(/either sex\.?/gi, '')
    .replace(/quota\.?/gi, '')
    .replace(/bonus\.?/gi, '')
    .replace(/youth\.?/gi, '')
    .replace(/mobility[- ]impaired\.?/gi, '')
    .trim();
  // If nothing meaningful remains, skip
  return stripped.length > 2;
}

type Tab = 'seasons' | 'quota' | 'fishing' | 'rules';

// ---------- component ----------

export default function HuntDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [activeTab, setActiveTab] = useState<Tab>('seasons');

  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('planahunt-favorites');
        if (stored) return new Set(JSON.parse(stored) as string[]);
      } catch { /* ignore */ }
    }
    return new Set<string>();
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem('planahunt-favorites', JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  };

  const land = PUBLIC_LANDS.find((l) => l.id === slug);

  if (!land) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#1a1f16' }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#e8e4d4' }}>Land not found</h1>
        <p className="text-sm mb-6" style={{ color: '#6e6b5e' }}>
          No public land matches the ID &ldquo;{slug}&rdquo;.
        </p>
        <Link
          href="/"
          className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ background: '#252b21', color: '#5fad52', border: '1px solid #2d342a' }}
        >
          &larr; Browse all lands
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.has(land.id);

  // Data for this land
  const seasons = HUNTING_SEASONS.filter((s) => s.land_id === land.id);
  const quotaHunts = QUOTA_HUNTS.filter((q) => q.land_id === land.id);
  const fishingRegs = filterFishingRegs(FISHING_REGULATIONS, land);
  const seasonGroups = groupSeasons(seasons);

  // Nearby lands
  const nearbyLands: (PublicLand & { distance: number })[] =
    land.lat != null && land.lng != null
      ? PUBLIC_LANDS
          .filter((l) => l.id !== land.id && l.lat != null && l.lng != null)
          .map((l) => ({
            ...l,
            distance: haversineDistance(land.lat!, land.lng!, l.lat!, l.lng!),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5)
      : [];

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'seasons', label: 'Seasons', count: seasons.length },
    { key: 'quota', label: 'Quota', count: quotaHunts.length },
    { key: 'fishing', label: 'Fishing', count: fishingRegs.length },
    { key: 'rules', label: 'Rules & Info', count: 0 },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#1a1f16' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ---------- Header ---------- */}
        <header className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium mb-4 transition-colors"
            style={{ color: '#5fad52' }}
          >
            &larr; Browse
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(61,107,53,0.25)', color: '#5fad52', border: '1px solid rgba(61,107,53,0.4)' }}
            >
              {land.type}
            </span>
            <span
              className="text-xs font-medium px-1.5 py-0.5 rounded"
              style={{ color: '#6e6b5e', background: '#252b21' }}
            >
              {land.state}
            </span>
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: '#e8e4d4' }}>
              {land.name}
            </h1>
            <button
              onClick={() => toggleFavorite(land.id)}
              className="p-2.5 rounded-lg transition-colors flex-shrink-0"
              style={{
                background: isFavorite ? 'rgba(196,146,58,0.15)' : '#252b21',
                color: isFavorite ? '#c4923a' : '#4a5046',
                border: `1px solid ${isFavorite ? 'rgba(196,146,58,0.3)' : '#333830'}`,
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Stats line */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-3 text-sm" style={{ color: '#a8a490' }}>
            {land.region && (
              <>
                <span>{land.region}</span>
                <span style={{ color: '#6e6b5e' }}>&middot;</span>
              </>
            )}
            {land.counties.length > 0 && (
              <>
                <span>
                  {land.counties.join(', ')} {land.counties.length === 1 ? 'County' : 'Counties'}
                </span>
                <span style={{ color: '#6e6b5e' }}>&middot;</span>
              </>
            )}
            {land.acreage && (
              <>
                <span className="font-semibold" style={{ color: '#e8e4d4' }}>
                  {land.acreage.toLocaleString()} acres
                </span>
                {land.phone && <span style={{ color: '#6e6b5e' }}>&middot;</span>}
              </>
            )}
            {land.phone && (
              <a href={`tel:${land.phone}`} className="font-medium" style={{ color: '#4d8542' }}>
                {land.phone}
              </a>
            )}
          </div>
        </header>

        {/* ---------- Tabs ---------- */}
        <nav
          className="flex gap-0 mb-6 overflow-x-auto"
          style={{ borderBottom: '1px solid #2d342a' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  color: isActive ? '#e8e4d4' : '#6e6b5e',
                  background: 'transparent',
                }}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span
                    className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? 'rgba(61,107,53,0.25)' : '#252b21',
                      color: isActive ? '#5fad52' : '#6e6b5e',
                    }}
                  >
                    {tab.count}
                  </span>
                )}
                {/* Underline indicator */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: '#5fad52' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* ---------- Seasons Tab ---------- */}
        {activeTab === 'seasons' && (
          <section className="mb-8">
            {seasonGroups.length === 0 ? (
              <EmptyTab message="No hunting season data available for this property." />
            ) : (
              <div className="space-y-2">
                {seasonGroups.map((group) => (
                  <SpeciesAccordion key={group.species} group={group} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ---------- Quota Hunts Tab ---------- */}
        {activeTab === 'quota' && (
          <section className="mb-8">
            {quotaHunts.length === 0 ? (
              <EmptyTab message="No quota hunts listed for this property." />
            ) : (
              <div className="space-y-3">
                {quotaHunts.map((hunt) => (
                  <div
                    key={hunt.id}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(196,146,58,0.06)', border: '1px solid rgba(196,146,58,0.2)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>
                        {hunt.species} &mdash; {hunt.hunt_type}
                      </p>
                      {hunt.quota_size && (
                        <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(196,146,58,0.2)', color: '#c4923a' }}>
                          {hunt.quota_size} permits
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs" style={{ color: '#a8a490' }}>
                      {hunt.weapon_type && <span>{hunt.weapon_type}</span>}
                      {hunt.dates && <span>{hunt.dates}</span>}
                    </div>
                    {hunt.application_deadline && (
                      <p className="text-xs mt-2 font-medium" style={{ color: '#c4923a' }}>
                        Deadline: {fmtFull(hunt.application_deadline)}
                      </p>
                    )}
                    {hunt.notes && (
                      <p className="text-xs mt-1" style={{ color: '#6e6b5e' }}>{hunt.notes}</p>
                    )}
                    {hunt.application_url && (
                      <a
                        href={hunt.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: '#c4923a', color: '#1a1f16' }}
                      >
                        Apply
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ---------- Fishing Tab ---------- */}
        {activeTab === 'fishing' && (
          <section className="mb-8">
            {fishingRegs.length === 0 ? (
              <EmptyTab message="No fishing regulation data available." />
            ) : (
              <>
                {/* Statewide disclaimer */}
                <div
                  className="rounded-lg px-4 py-3 mb-4 flex items-start gap-2"
                  style={{ background: 'rgba(45,90,142,0.08)', border: '1px solid rgba(45,90,142,0.2)' }}
                >
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#5a90c4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs" style={{ color: '#5a90c4' }}>
                    Statewide {land.state} Fishing Regulations &mdash; these apply statewide, not just to this property.
                  </p>
                </div>

                <FishingAccordionList regs={fishingRegs} />
              </>
            )}
          </section>
        )}

        {/* ---------- Rules & Info Tab ---------- */}
        {activeTab === 'rules' && (
          <section className="mb-8 space-y-4">
            {/* Special rules warning */}
            {land.special_rules && (
              <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(196,146,58,0.08)', border: '1px solid rgba(196,146,58,0.2)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <svg className="w-4 h-4" style={{ color: '#c4923a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: '#c4923a' }}>Special Rules</span>
                </div>
                <p className="text-sm" style={{ color: '#a8a490' }}>{land.special_rules}</p>
              </div>
            )}

            {/* Managing agency */}
            {land.managing_agency && (
              <div
                className="rounded-xl p-4"
                style={{ background: '#252b21', border: '1px solid #2d342a' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6e6b5e' }}>
                  Managing Agency
                </p>
                <p className="text-sm" style={{ color: '#e8e4d4' }}>{land.managing_agency}</p>
              </div>
            )}

            {/* Contact info */}
            {(land.phone || land.website) && (
              <div
                className="rounded-xl p-4"
                style={{ background: '#252b21', border: '1px solid #2d342a' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#6e6b5e' }}>
                  Contact
                </p>
                <div className="space-y-2">
                  {land.phone && (
                    <a href={`tel:${land.phone}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#4d8542' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {land.phone}
                    </a>
                  )}
                  {land.website && (
                    <a
                      href={land.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium"
                      style={{ color: '#4d8542' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Official Website
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="px-4 py-3 rounded-xl" style={{ background: '#1a1f16', border: '1px solid #252b21' }}>
              <p className="text-xs" style={{ color: '#4a5046' }}>
                Season data sourced from official state agency regulations (2025&ndash;2026). Dates and rules may change &mdash; always verify with your state wildlife agency before hunting.
              </p>
            </div>

            {/* Show something if no special rules, no agency, no contacts */}
            {!land.special_rules && !land.managing_agency && !land.phone && !land.website && (
              <EmptyTab message="No additional rules or property information available." />
            )}
          </section>
        )}

        {/* ---------- Nearby WMAs (always visible) ---------- */}
        {nearbyLands.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#a8a490' }}>
              Nearby Public Lands
            </h2>
            <div className="space-y-2">
              {nearbyLands.map((nearby) => (
                <Link
                  key={nearby.id}
                  href={`/hunt/${nearby.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors"
                  style={{ background: '#252b21', border: '1px solid #2d342a' }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#e8e4d4' }}>
                      {nearby.name}
                    </p>
                    <p className="text-xs" style={{ color: '#6e6b5e' }}>
                      {nearby.counties[0] && `${nearby.counties[0]} County`}
                      {nearby.state && ` \u00b7 ${nearby.state}`}
                    </p>
                  </div>
                  <span className="text-xs font-medium flex-shrink-0" style={{ color: '#a8a490' }}>
                    {nearby.distance.toFixed(1)} mi
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ---------- Sub-components ----------

function EmptyTab({ message }: { message: string }) {
  return (
    <div
      className="rounded-xl px-6 py-10 text-center"
      style={{ background: '#252b21', border: '1px solid #2d342a' }}
    >
      <p className="text-sm" style={{ color: '#6e6b5e' }}>{message}</p>
    </div>
  );
}

function SpeciesAccordion({ group }: { group: ReturnType<typeof groupSeasons>[number] }) {
  const [expanded, setExpanded] = useState(group.isOpen);

  // Collect all unique weapon types for badge display
  const weaponTypes = group.weapons.map((w) => w.weapon);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#252b21', border: '1px solid #2d342a' }}
    >
      {/* Accordion header */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full px-4 py-3 flex items-center gap-3 text-left"
        style={{ background: expanded ? '#252b21' : 'transparent' }}
      >
        {/* Species icon + name */}
        <span className="text-base">{SPECIES_ICONS[group.species] ?? '🎯'}</span>
        <span className="text-sm font-semibold flex-1 min-w-0" style={{ color: '#e8e4d4' }}>
          {group.species}
        </span>

        {/* Weapon badges */}
        <div className="flex flex-wrap gap-1">
          {weaponTypes.map((weapon) => {
            const color = WEAPON_COLORS[weapon] ?? '#3d6b35';
            return (
              <span
                key={weapon}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: `${color}22`,
                  color,
                  border: `1px solid ${color}44`,
                }}
              >
                {weapon}
              </span>
            );
          })}
        </div>

        {/* Open/closed indicator */}
        {group.isOpen ? (
          <span className="flex items-center gap-1 text-xs flex-shrink-0" style={{ color: '#5fad52' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#5fad52' }} />
            Open
          </span>
        ) : (
          <span className="text-xs flex-shrink-0" style={{ color: '#6e6b5e' }}>Closed</span>
        )}

        {/* Chevron */}
        <svg
          className="w-4 h-4 flex-shrink-0 transition-transform"
          style={{ color: '#6e6b5e', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ borderTop: '1px solid #2d342a' }}>
          {group.weapons.map((weaponGroup) => (
            <div key={weaponGroup.weapon} className="px-4 py-3" style={{ borderBottom: '1px solid #2d342a' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: WEAPON_COLORS[weaponGroup.weapon] ?? '#a8a490' }}>
                {weaponGroup.weapon}
              </p>
              <div className="space-y-1">
                {weaponGroup.segments.map((season) => {
                  const tags = parseSemanticTags(season);
                  const open = isSeasonOpen(season);
                  const showNotes = hasExtraInfo(season);

                  return (
                    <div key={season.id} className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
                      {/* Date range */}
                      <span style={{ color: open ? '#e8e4d4' : '#a8a490' }}>
                        {fmtShort(season.start_date)} &ndash; {fmtShort(season.end_date)}
                      </span>

                      {/* Semantic tags */}
                      {tags.map((tag) => (
                        <span key={tag} className="text-xs" style={{ color: '#6e6b5e' }}>
                          &middot; {tag}
                        </span>
                      ))}

                      {/* Bag limit */}
                      {season.bag_limit && (
                        <span className="text-xs" style={{ color: '#6e6b5e' }}>
                          &middot; Limit: {season.bag_limit}
                        </span>
                      )}

                      {/* Extra notes (only if not redundant with tags) */}
                      {showNotes && (
                        <span className="text-xs" style={{ color: '#6e6b5e' }}>
                          &middot; {season.notes}
                        </span>
                      )}

                      {/* Open indicator */}
                      {open && (
                        <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: '#5fad52' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FishingAccordionList({ regs }: { regs: FishingRegulation[] }) {
  // Group by water type
  const grouped = new Map<string, FishingRegulation[]>();
  for (const reg of regs) {
    const key = reg.water_type ?? 'other';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(reg);
  }

  const WATER_COLORS: Record<string, { bg: string; text: string }> = {
    freshwater: { bg: 'rgba(61,107,53,0.2)', text: '#5fad52' },
    saltwater: { bg: 'rgba(45,90,142,0.2)', text: '#5a90c4' },
    other: { bg: '#252b21', text: '#a8a490' },
  };

  return (
    <div className="space-y-2">
      {[...grouped.entries()].map(([waterType, waterRegs]) => (
        <FishingWaterGroup
          key={waterType}
          waterType={waterType}
          regs={waterRegs}
          colors={WATER_COLORS[waterType] ?? WATER_COLORS.other}
        />
      ))}
    </div>
  );
}

function FishingWaterGroup({
  waterType,
  regs,
  colors,
}: {
  waterType: string;
  regs: FishingRegulation[];
  colors: { bg: string; text: string };
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#252b21', border: '1px solid #2d342a' }}
    >
      {/* Group header — always visible */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full px-4 py-3 flex items-center gap-3 text-left"
      >
        <span className="text-base">{waterType === 'saltwater' ? '🌊' : '🐟'}</span>
        <span className="text-sm font-semibold flex-1 capitalize" style={{ color: '#e8e4d4' }}>
          {waterType}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: colors.bg, color: colors.text }}
        >
          {regs.length} species
        </span>
        <svg
          className="w-4 h-4 flex-shrink-0 transition-transform"
          style={{ color: '#6e6b5e', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Summary row when collapsed — show species names */}
      {!expanded && (
        <div className="px-4 pb-3 -mt-1">
          <p className="text-xs" style={{ color: '#6e6b5e' }}>
            {regs.map((r) => r.species).join(' · ')}
          </p>
        </div>
      )}

      {/* Expanded species list */}
      {expanded && (
        <div style={{ borderTop: '1px solid #2d342a' }}>
          {regs.map((reg) => (
            <FishingRow key={reg.id} reg={reg} />
          ))}
        </div>
      )}
    </div>
  );
}

function FishingRow({ reg }: { reg: FishingRegulation }) {
  const [open, setOpen] = useState(false);

  // Build compact summary parts
  const summaryParts: string[] = [];
  if (reg.bag_limit) summaryParts.push(`Limit: ${reg.bag_limit}`);
  if (reg.size_limit) summaryParts.push(`Size: ${reg.size_limit}`);

  const hasDetails = !!(reg.season || reg.notes || reg.special_areas?.length);

  return (
    <div style={{ borderBottom: '1px solid #2d342a' }}>
      <button
        onClick={() => hasDetails && setOpen((prev) => !prev)}
        className={`w-full px-4 py-2.5 flex items-center gap-2 text-left ${hasDetails ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <span className="text-sm font-medium flex-1 min-w-0" style={{ color: '#e8e4d4' }}>
          {reg.species}
        </span>
        {summaryParts.length > 0 && (
          <span className="text-xs flex-shrink-0" style={{ color: '#a8a490' }}>
            {summaryParts.join(' · ')}
          </span>
        )}
        {hasDetails && (
          <svg
            className="w-3.5 h-3.5 flex-shrink-0 transition-transform"
            style={{ color: '#6e6b5e', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {/* Expanded details */}
      {open && hasDetails && (
        <div className="px-4 pb-3 space-y-1">
          {reg.season && (
            <p className="text-xs" style={{ color: '#a8a490' }}>Season: {reg.season}</p>
          )}
          {reg.special_areas && reg.special_areas.length > 0 && (
            <p className="text-xs" style={{ color: '#a8a490' }}>
              Special areas: {reg.special_areas.join(', ')}
            </p>
          )}
          {reg.notes && (
            <p className="text-xs" style={{ color: '#6e6b5e' }}>{reg.notes}</p>
          )}
        </div>
      )}
    </div>
  );
}
