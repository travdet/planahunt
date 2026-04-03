'use client';

import Link from 'next/link';
import { PublicLand, HuntingSeason, QuotaHunt, FishingRegulation } from '@/lib/types';

interface DetailPanelProps {
  land: PublicLand;
  seasons: HuntingSeason[];
  quotaHunts: QuotaHunt[];
  fishingRegs: FishingRegulation[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

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

const WEAPON_COLORS: Record<string, string> = {
  Archery: '#5a8e2d',
  Rifle: '#8e2d2d',
  Muzzleloader: '#8e6b2d',
  Shotgun: '#2d5a8e',
};

export default function DetailPanel({
  land,
  seasons,
  quotaHunts,
  fishingRegs,
  isFavorite,
  onToggleFavorite,
  onClose,
}: DetailPanelProps) {
  const groupedSeasons = seasons.reduce<Record<string, HuntingSeason[]>>((acc, s) => {
    if (!acc[s.species]) acc[s.species] = [];
    acc[s.species].push(s);
    return acc;
  }, {});

  return (
    <div
      className="flex flex-col h-full animate-slide-in-right"
      style={{ background: '#1e2419', borderLeft: '1px solid #2d342a' }}
    >
      {/* Header */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid #2d342a' }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(61,107,53,0.25)', color: '#5fad52', border: '1px solid rgba(61,107,53,0.4)' }}
              >
                {land.type}
              </span>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ color: '#6e6b5e', background: '#252b21' }}>
                {land.state}
              </span>
            </div>
            <h2 className="text-base font-bold leading-snug" style={{ color: '#e8e4d4' }}>
              {land.name}
            </h2>
            {land.region && (
              <p className="text-xs mt-1" style={{ color: '#6e6b5e' }}>{land.region}</p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onToggleFavorite(land.id)}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: isFavorite ? 'rgba(196,146,58,0.15)' : '#252b21',
                color: isFavorite ? '#c4923a' : '#4a5046',
                border: `1px solid ${isFavorite ? 'rgba(196,146,58,0.3)' : '#333830'}`,
              }}
            >
              <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ background: '#252b21', color: '#6e6b5e', border: '1px solid #333830' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* View full page link */}
        <Link
          href={`/hunt/${land.id}`}
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: '#3d6b35', color: '#e8e4d4' }}
        >
          View Full Details
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-4 mt-3">
          {land.acreage && (
            <div>
              <p className="text-xs" style={{ color: '#6e6b5e' }}>Acreage</p>
              <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>{land.acreage.toLocaleString()} ac</p>
            </div>
          )}
          {land.counties.length > 0 && (
            <div>
              <p className="text-xs" style={{ color: '#6e6b5e' }}>Counties</p>
              <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>{land.counties.join(', ')}</p>
            </div>
          )}
          {land.phone && (
            <div>
              <p className="text-xs" style={{ color: '#6e6b5e' }}>Phone</p>
              <a href={`tel:${land.phone}`} className="text-sm font-semibold" style={{ color: '#4d8542' }}>{land.phone}</a>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

        {/* Managing agency */}
        {land.managing_agency && (
          <div className="text-xs px-3 py-2.5 rounded-lg" style={{ background: '#252b21', color: '#a8a490' }}>
            Managed by {land.managing_agency}
          </div>
        )}

        {/* Special rules */}
        {land.special_rules && (
          <div className="px-3 py-2.5 rounded-lg" style={{ background: 'rgba(196,146,58,0.08)', border: '1px solid rgba(196,146,58,0.2)' }}>
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-3.5 h-3.5" style={{ color: '#c4923a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#c4923a' }}>Special Rules</span>
            </div>
            <p className="text-xs" style={{ color: '#a8a490' }}>{land.special_rules}</p>
          </div>
        )}

        {/* Hunting seasons */}
        {Object.keys(groupedSeasons).length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#a8a490' }}>
              Hunting Seasons
            </h3>
            <div className="space-y-3">
              {Object.entries(groupedSeasons).map(([species, speciesSeasons]) => (
                <div key={species} className="rounded-xl overflow-hidden" style={{ border: '1px solid #2d342a' }}>
                  <div className="px-3 py-2" style={{ background: '#252b21' }}>
                    <span className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>{species}</span>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#2d342a' }}>
                    {speciesSeasons.map((season) => {
                      const open = isSeasonOpen(season);
                      const weaponColor = WEAPON_COLORS[season.weapon_type] ?? '#3d6b35';
                      return (
                        <div key={season.id} className="px-3 py-2.5">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: `${weaponColor}22`, color: weaponColor, border: `1px solid ${weaponColor}44` }}
                            >
                              {season.weapon_type}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {open && (
                                <span className="flex items-center gap-1 text-xs" style={{ color: '#5fad52' }}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                  Open
                                </span>
                              )}
                              {season.quota_required && (
                                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(196,146,58,0.15)', color: '#c4923a' }}>
                                  Quota
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs" style={{ color: '#a8a490' }}>
                            {formatDate(season.start_date)} – {formatDate(season.end_date)}
                          </p>
                          {season.bag_limit && (
                            <p className="text-xs mt-0.5" style={{ color: '#6e6b5e' }}>Bag limit: {season.bag_limit}</p>
                          )}
                          {season.notes && (
                            <p className="text-xs mt-1" style={{ color: '#6e6b5e' }}>{season.notes}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quota hunts */}
        {quotaHunts.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#a8a490' }}>
              Quota Hunts
            </h3>
            <div className="space-y-3">
              {quotaHunts.map((hunt) => (
                <div
                  key={hunt.id}
                  className="rounded-xl p-3"
                  style={{ background: 'rgba(196,146,58,0.06)', border: '1px solid rgba(196,146,58,0.2)' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>
                        {hunt.species} — {hunt.hunt_type}
                      </p>
                      {hunt.weapon_type && (
                        <p className="text-xs mt-0.5" style={{ color: '#a8a490' }}>{hunt.weapon_type}</p>
                      )}
                    </div>
                    {hunt.quota_size && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(196,146,58,0.2)', color: '#c4923a' }}>
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
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: '#c4923a', color: '#1a1f16' }}
                      onClick={(e) => e.stopPropagation()}
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
          </div>
        )}

        {/* Fishing regs */}
        {fishingRegs.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#a8a490' }}>
              Fishing Regulations
            </h3>
            <div className="space-y-3">
              {fishingRegs.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-xl p-3"
                  style={{ background: '#252b21', border: '1px solid #2d342a' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold" style={{ color: '#e8e4d4' }}>{reg.species}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full capitalize"
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
          </div>
        )}

        {/* Tags */}
        {land.tags.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
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
          </div>
        )}
        {/* Data source disclaimer */}
        <div className="px-3 py-2.5 rounded-lg" style={{ background: '#1a1f16', border: '1px solid #252b21' }}>
          <p className="text-xs" style={{ color: '#4a5046' }}>
            Season data sourced from official state agency regulations (2025–2026). Dates and rules may change — always verify with your state wildlife agency before hunting.
          </p>
        </div>
      </div>
    </div>
  );
}
