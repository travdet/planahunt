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
import { HuntingSeason, PublicLand } from '@/lib/types';

// ---------- helpers ----------

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isSeasonOpen(season: HuntingSeason): boolean {
  const today = new Date();
  const start = new Date(season.start_date);
  const end = new Date(season.end_date);
  return today >= start && today <= end;
}

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

const WEAPON_COLORS: Record<string, string> = {
  Archery: '#5a8e2d',
  Rifle: '#8e2d2d',
  Muzzleloader: '#8e6b2d',
  Shotgun: '#2d5a8e',
  Firearms: '#8e2d2d',
};

function parseSemanticTags(season: HuntingSeason): string[] {
  const tags: string[] = [];
  if (season.quota_required) tags.push('Quota');
  if (season.buck_only === true) tags.push('Buck Only');
  if (season.buck_only === false) tags.push('Either Sex');
  const notes = (season.notes ?? '').toLowerCase();
  if (notes.includes('bonus')) tags.push('Bonus');
  if (notes.includes('specialty')) tags.push('Specialty');
  if (notes.includes('youth')) tags.push('Youth');
  if (notes.includes('mobility') || notes.includes('impaired')) tags.push('Mobility-Impaired');
  return tags;
}

// ---------- component ----------

export default function HuntDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

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
  const fishingRegs = FISHING_REGULATIONS.filter((r) => r.state === land.state);

  // Group seasons by species + weapon_type
  const groupedSeasons = seasons.reduce<Record<string, HuntingSeason[]>>((acc, s) => {
    const key = `${s.species} (${s.weapon_type})`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

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

  return (
    <div className="min-h-screen" style={{ background: '#1a1f16' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ---------- Header ---------- */}
        <header className="mb-8">
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

          {/* Meta */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3">
            {land.region && (
              <span className="text-sm" style={{ color: '#6e6b5e' }}>{land.region}</span>
            )}
            {land.counties.length > 0 && (
              <span className="text-sm" style={{ color: '#a8a490' }}>
                {land.counties.join(', ')} {land.counties.length === 1 ? 'County' : 'Counties'}
              </span>
            )}
            {land.acreage && (
              <span className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>
                {land.acreage.toLocaleString()} acres
              </span>
            )}
          </div>

          {land.phone && (
            <div className="mt-2">
              <a href={`tel:${land.phone}`} className="text-sm font-medium" style={{ color: '#4d8542' }}>
                {land.phone}
              </a>
            </div>
          )}

          {/* Tags */}
          {land.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {land.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full capitalize"
                  style={{ background: '#252b21', color: '#6e6b5e', border: '1px solid #333830' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* ---------- Hunt Groups ---------- */}
        {Object.keys(groupedSeasons).length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#a8a490' }}>
              Hunting Seasons
            </h2>
            <div className="space-y-4">
              {Object.entries(groupedSeasons).map(([groupKey, groupSeasons]) => {
                const sample = groupSeasons[0];
                const weaponColor = WEAPON_COLORS[sample.weapon_type] ?? '#3d6b35';
                const semanticTags = parseSemanticTags(sample);

                return (
                  <div
                    key={groupKey}
                    className="rounded-xl overflow-hidden"
                    style={{ background: '#252b21', border: '1px solid #2d342a' }}
                  >
                    {/* Group header */}
                    <div className="px-4 py-3 flex flex-wrap items-center gap-2" style={{ borderBottom: '1px solid #2d342a' }}>
                      <span className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>
                        {groupKey}
                      </span>
                      {semanticTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: tag === 'Quota' ? 'rgba(196,146,58,0.15)' : `${weaponColor}22`,
                            color: tag === 'Quota' ? '#c4923a' : weaponColor,
                            border: `1px solid ${tag === 'Quota' ? 'rgba(196,146,58,0.3)' : `${weaponColor}44`}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Season rows */}
                    <div className="divide-y" style={{ borderColor: '#2d342a' }}>
                      {groupSeasons.map((season) => {
                        const open = isSeasonOpen(season);
                        return (
                          <div key={season.id} className="px-4 py-3">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-sm" style={{ color: '#a8a490' }}>
                                {formatDate(season.start_date)} &ndash; {formatDate(season.end_date)}
                              </p>
                              {open && (
                                <span className="flex items-center gap-1 text-xs" style={{ color: '#5fad52' }}>
                                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                  Open Now
                                </span>
                              )}
                            </div>
                            {season.bag_limit && (
                              <p className="text-xs mt-0.5" style={{ color: '#6e6b5e' }}>
                                Bag limit: {season.bag_limit}
                              </p>
                            )}
                            {season.notes && (
                              <p className="text-xs mt-1" style={{ color: '#6e6b5e' }}>
                                {season.notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ---------- Quota Hunts ---------- */}
        {quotaHunts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#a8a490' }}>
              Quota Hunts
            </h2>
            <div className="space-y-4">
              {quotaHunts.map((hunt) => (
                <div
                  key={hunt.id}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(196,146,58,0.06)', border: '1px solid rgba(196,146,58,0.2)' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>
                        {hunt.species} &mdash; {hunt.hunt_type}
                      </p>
                      {hunt.weapon_type && (
                        <p className="text-xs mt-0.5" style={{ color: '#a8a490' }}>{hunt.weapon_type}</p>
                      )}
                    </div>
                    {hunt.quota_size && (
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(196,146,58,0.2)', color: '#c4923a' }}>
                        {hunt.quota_size} permits
                      </span>
                    )}
                  </div>
                  {hunt.dates && (
                    <p className="text-xs" style={{ color: '#a8a490' }}>{hunt.dates}</p>
                  )}
                  {hunt.application_deadline && (
                    <p className="text-xs mt-1" style={{ color: '#c4923a' }}>
                      Deadline: {formatDate(hunt.application_deadline)}
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
                      Apply Now
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Fishing Regulations ---------- */}
        {fishingRegs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#a8a490' }}>
              Fishing Regulations ({land.state})
            </h2>
            <div className="space-y-3">
              {fishingRegs.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-xl p-4"
                  style={{ background: '#252b21', border: '1px solid #2d342a' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>{reg.species}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full capitalize flex-shrink-0"
                      style={{
                        background: reg.water_type === 'saltwater' ? 'rgba(45,90,142,0.2)' : 'rgba(61,107,53,0.2)',
                        color: reg.water_type === 'saltwater' ? '#5a90c4' : '#5fad52',
                      }}
                    >
                      {reg.water_type}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {reg.bag_limit && (
                      <p className="text-xs" style={{ color: '#a8a490' }}>Bag limit: {reg.bag_limit}</p>
                    )}
                    {reg.size_limit && (
                      <p className="text-xs" style={{ color: '#a8a490' }}>Size limit: {reg.size_limit}</p>
                    )}
                    {reg.season && (
                      <p className="text-xs" style={{ color: '#a8a490' }}>Season: {reg.season}</p>
                    )}
                    {reg.notes && (
                      <p className="text-xs mt-1" style={{ color: '#6e6b5e' }}>{reg.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Special Rules ---------- */}
        {land.special_rules && (
          <section className="mb-8">
            <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(196,146,58,0.08)', border: '1px solid rgba(196,146,58,0.2)' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <svg className="w-4 h-4" style={{ color: '#c4923a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-semibold" style={{ color: '#c4923a' }}>Special Rules</span>
              </div>
              <p className="text-sm" style={{ color: '#a8a490' }}>{land.special_rules}</p>
            </div>
          </section>
        )}

        {/* ---------- Nearby WMAs ---------- */}
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

        {/* ---------- Disclaimer ---------- */}
        <div className="px-4 py-3 rounded-xl mb-6" style={{ background: '#1a1f16', border: '1px solid #252b21' }}>
          <p className="text-xs" style={{ color: '#4a5046' }}>
            Season data sourced from official state agency regulations (2025&ndash;2026). Dates and rules may change &mdash; always verify with your state wildlife agency before hunting.
          </p>
        </div>
      </div>
    </div>
  );
}
