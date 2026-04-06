'use client';

import Link from 'next/link';
import { PublicLand, HuntingSeason, QuotaHunt, FishingRegulation } from '@/lib/types';
import SeasonMatrix from '@/components/SeasonMatrix';
import { filterFishingRegs } from '@/lib/seasonUtils';

interface DetailPanelProps {
  land: PublicLand;
  seasons: HuntingSeason[];
  quotaHunts: QuotaHunt[];
  fishingRegs: FishingRegulation[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

function formatAcreage(ac: number): string {
  if (ac >= 1000) return `${(ac / 1000).toFixed(1)}k`;
  return ac.toLocaleString();
}

function isSeasonOpen(season: HuntingSeason): boolean {
  const today = new Date();
  return today >= new Date(season.start_date) && today <= new Date(season.end_date);
}

export default function DetailPanel({
  land, seasons, quotaHunts, fishingRegs, isFavorite, onToggleFavorite, onClose,
}: DetailPanelProps) {
  const openSeasons = seasons.filter(isSeasonOpen);
  const openSpecies = [...new Set(openSeasons.map((s) => s.species))];

  return (
    <div
      className="flex flex-col h-full animate-slide-in-right"
      style={{ background: '#f8f9fa', borderLeft: '1px solid #e1e3e4' }}
    >
      {/* Hero header band */}
      <div className="relative flex-shrink-0 px-5 pt-5 pb-4" style={{ background: 'linear-gradient(135deg, #0f2d29 0%, #1a3f38 100%)' }}>
        {/* Close + Favorite floating top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => onToggleFavorite(land.id)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)', color: isFavorite ? '#f0c060' : 'rgba(255,255,255,0.6)' }}
          >
            <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Badge + Title */}
        <span
          className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] rounded-sm mb-2"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
        >
          {land.type} &bull; {land.state}
        </span>
        <h2
          className="text-xl font-extrabold tracking-tight leading-tight text-white"
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          {land.name}
        </h2>
        {land.phone && (
          <a href={`tel:${land.phone}`} className="text-xs mt-1.5 block" style={{ color: 'rgba(173,205,199,0.8)' }}>
            {land.phone}
          </a>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Bento stat grid */}
        <div className="grid grid-cols-2 gap-0">
          <div className="px-4 py-3" style={{ borderBottom: '2px solid #3d6b35', borderRight: '1px solid #e1e3e4' }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] block" style={{ color: '#717977' }}>Acreage</span>
            <span className="text-xl font-bold tracking-tight block mt-0.5" style={{ fontFamily: 'var(--font-manrope)', color: '#191c1d' }}>
              {land.acreage ? formatAcreage(land.acreage) : '—'}
            </span>
          </div>
          <div className="px-4 py-3" style={{ borderBottom: '2px solid #3d6b35' }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] block" style={{ color: '#717977' }}>Counties</span>
            <span className="text-sm font-bold tracking-tight block mt-1" style={{ fontFamily: 'var(--font-manrope)', color: '#191c1d' }}>
              {land.counties.length > 0 ? land.counties.slice(0, 2).join(', ') : '—'}
              {land.counties.length > 2 && <span style={{ color: '#717977' }}> +{land.counties.length - 2}</span>}
            </span>
          </div>
        </div>

        {/* Season status card */}
        {openSeasons.length > 0 ? (
          <div className="mx-4 mt-4 px-4 py-4 rounded-xl relative overflow-hidden" style={{ background: '#0f2d29' }}>
            <div className="relative z-10">
              <h3 className="font-bold text-sm text-white mb-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                {openSpecies.length === 1 ? `${openSpecies[0]} Season Open` : `${openSeasons.length} Seasons Open`}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(173,205,199,0.7)' }}>
                {openSpecies.join(', ')} {openSeasons.some((s) => s.weapon_type) ? `— ${[...new Set(openSeasons.map((s) => s.weapon_type))].join(', ')}` : ''}
              </p>
            </div>
            {/* Decorative icon */}
            <svg className="absolute -right-2 -bottom-2 w-16 h-16 opacity-5" fill="white" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
        ) : (
          <div className="mx-4 mt-4 px-4 py-3 rounded-xl" style={{ background: '#f1f4f5', border: '1px solid #e1e3e4' }}>
            <p className="text-xs font-medium" style={{ color: '#717977' }}>
              No seasons currently open at this location.
            </p>
          </div>
        )}

        <div className="px-4 pt-5 pb-4 space-y-5">
          {/* Area highlights from tags */}
          {land.tags && land.tags.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] flex items-center gap-2 mb-3" style={{ color: '#414847' }}>
                <span className="w-5 h-[2px] inline-block" style={{ background: '#3d6b35' }} /> Area Features
              </h4>
              <div className="space-y-1">
                {land.tags.slice(0, 8).map((tag) => (
                  <div key={tag} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group" style={{ background: '#ffffff', border: '1px solid #ebeef0' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform" style={{ background: '#e7f0e5' }}>
                      <span className="text-sm">{getTagIcon(tag)}</span>
                    </div>
                    <span className="text-sm font-medium capitalize" style={{ color: '#191c1d' }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hunting Seasons */}
          {(() => {
            const isStatewide = seasons.length > 0 && seasons.every((s) => !s.land_id);
            return (
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] flex items-center gap-2 mb-3" style={{ color: '#414847' }}>
                  <span className="w-5 h-[2px] inline-block" style={{ background: '#3d6b35' }} /> Hunting Seasons
                </h4>
                {isStatewide && (
                  <p className="text-xs mb-2" style={{ color: '#717977' }}>
                    Statewide {land.state} seasons — check special rules for zone details
                  </p>
                )}
                {seasons.length > 0 ? (
                  <SeasonMatrix seasons={seasons} />
                ) : (
                  <p className="text-xs px-3 py-2.5 rounded-lg" style={{ color: '#717977', background: '#ffffff', border: '1px solid #ebeef0' }}>
                    {land.hunting_allowed === false ? 'Hunting not permitted.' : 'No season data — check agency website.'}
                  </p>
                )}
              </div>
            );
          })()}

          {/* Quota Hunts */}
          {quotaHunts.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] flex items-center gap-2 mb-3" style={{ color: '#c4923a' }}>
                <span className="w-5 h-[2px] inline-block" style={{ background: '#c4923a' }} /> Quota Hunts ({quotaHunts.length})
              </h4>
              <div className="space-y-1.5">
                {quotaHunts.map((hunt) => (
                  <div key={hunt.id} className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg" style={{ background: '#ffffff', border: '1px solid rgba(196,146,58,0.2)' }}>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: '#191c1d' }}>{hunt.species} — {hunt.hunt_type}</p>
                      {hunt.dates && <p className="text-xs truncate" style={{ color: '#717977' }}>{hunt.dates}</p>}
                    </div>
                    {hunt.quota_size && (
                      <span className="text-[10px] flex-shrink-0 font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ color: '#c4923a', background: 'rgba(196,146,58,0.08)' }}>
                        {hunt.quota_size}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fishing Regs */}
          {(() => {
            const relevantRegs = filterFishingRegs(fishingRegs, land);
            if (relevantRegs.length === 0) return null;
            const byWater = new Map<string, FishingRegulation[]>();
            for (const reg of relevantRegs) {
              const key = reg.water_type ?? 'other';
              if (!byWater.has(key)) byWater.set(key, []);
              byWater.get(key)!.push(reg);
            }
            return (
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] flex items-center gap-2 mb-3" style={{ color: '#2d5a8e' }}>
                  <span className="w-5 h-[2px] inline-block" style={{ background: '#2d5a8e' }} /> Fishing Regs ({relevantRegs.length})
                </h4>
                <p className="text-xs mb-2" style={{ color: '#717977' }}>Statewide {land.state} regulations</p>
                {[...byWater.entries()].map(([waterType, regs]) => (
                  <div key={waterType} className="mb-2 px-3 py-2 rounded-lg" style={{ background: '#ffffff', border: '1px solid #ebeef0' }}>
                    <p className="text-xs font-medium capitalize mb-1" style={{ color: waterType === 'saltwater' ? '#2d5a8e' : '#3d6b35' }}>
                      {waterType === 'saltwater' ? '🌊' : '🐟'} {waterType}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#717977' }}>{regs.map((r) => r.species).join(' · ')}</p>
                  </div>
                ))}
              </div>
            );
          })()}

          {/* Special Rules */}
          {land.special_rules && (
            <div className="px-3 py-3 rounded-lg" style={{ background: 'rgba(196,146,58,0.05)', border: '1px solid rgba(196,146,58,0.15)' }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: '#c4923a' }}>⚠ Special Rules</span>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#414847' }}>{land.special_rules}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex-shrink-0 px-5 py-4" style={{ borderTop: '1px solid #e1e3e4', background: '#ffffff' }}>
        <Link
          href={`/hunt/${land.id}`}
          className="flex items-center justify-center gap-2 w-full text-[11px] font-bold uppercase tracking-[0.15em] py-3.5 rounded-xl transition-all active:scale-[0.98]"
          style={{ background: '#191c1d', color: '#ffffff', boxShadow: '0 2px 0 0 rgba(0,0,0,0.15)' }}
        >
          View Full Details
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <p className="text-center text-[10px] mt-2.5 italic font-medium" style={{ color: '#c1c8c6' }}>
          Boundaries from DNR GIS datasets.
        </p>
      </div>
    </div>
  );
}

function getTagIcon(tag: string): string {
  const icons: Record<string, string> = {
    deer: '🦌', turkey: '🦃', bear: '🐻', duck: '🦆', dove: '🕊️',
    quail: '🐦', 'feral hog': '🐗', bass: '🐟', trout: '🎣', catfish: '🐱',
    archery: '🏹', rifle: '🎯', muzzleloader: '💨', shotgun: '🔫',
    hiking: '🥾', camping: '⛺', fishing: '🎣', boating: '🚣',
    waterfowl: '🦆', alligator: '🐊', elk: '🫎',
  };
  return icons[tag.toLowerCase()] ?? '🌿';
}
