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
  if (ac >= 1000) return `${(ac / 1000).toFixed(1)}k ac`;
  return `${ac.toLocaleString()} ac`;
}

export default function DetailPanel({
  land,
  seasons,
  quotaHunts,
  fishingRegs,
  isFavorite,
  onToggleFavorite,
  onClose,
}: DetailPanelProps) {
  // Build the compact stats line
  const statParts: string[] = [];
  if (land.acreage) statParts.push(formatAcreage(land.acreage));
  if (land.counties.length > 0) statParts.push(land.counties.join(', '));

  return (
    <div
      className="flex flex-col h-full animate-slide-in-right"
      style={{ background: '#1e2419', borderLeft: '1px solid #2d342a' }}
    >
      {/* Compact Header */}
      <div className="px-5 py-4" style={{ borderBottom: '1px solid #2d342a' }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Name + badges on one line */}
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold leading-snug" style={{ color: '#e8e4d4' }}>
                {land.name}
              </h2>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: 'rgba(61,107,53,0.25)', color: '#5fad52', border: '1px solid rgba(61,107,53,0.4)' }}
              >
                {land.type}
              </span>
              <span
                className="text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ color: '#6e6b5e', background: '#252b21' }}
              >
                {land.state}
              </span>
            </div>

            {/* Stats line with dot separators */}
            <p className="text-xs mt-1.5" style={{ color: '#a8a490' }}>
              {statParts.join(' \u00B7 ')}
              {land.phone && (
                <>
                  {statParts.length > 0 && ' \u00B7 '}
                  <a href={`tel:${land.phone}`} style={{ color: '#5fad52' }}>
                    {land.phone}
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Favorite + Close */}
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
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

        {/* Season Matrix — always show */}
        {(() => {
          const isStatewideSeasons = seasons.length > 0 && seasons.every((s) => !s.land_id);
          return (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#a8a490' }}>
                Hunting Seasons
              </h3>
              {isStatewideSeasons && (
                <p className="text-xs mb-2" style={{ color: '#6e6b5e' }}>
                  Statewide {land.state} seasons apply — zone/area rules in special rules below
                </p>
              )}
              {seasons.length > 0 ? (
                <SeasonMatrix seasons={seasons} />
              ) : (
                <p className="text-xs px-3 py-2.5 rounded-lg" style={{ color: '#6e6b5e', background: '#252b21' }}>
                  {land.hunting_allowed === false
                    ? 'Hunting not permitted on this property.'
                    : 'No hunting season data available — check agency website.'}
                </p>
              )}
            </div>
          );
        })()}

        {/* Quota Hunts Preview */}
        {quotaHunts.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#c4923a' }}>
              Quota Hunts ({quotaHunts.length})
            </h3>
            <div className="space-y-1.5">
              {quotaHunts.map((hunt) => (
                <div
                  key={hunt.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(196,146,58,0.06)', border: '1px solid rgba(196,146,58,0.15)' }}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: '#e8e4d4' }}>
                      {hunt.species} — {hunt.hunt_type}
                    </p>
                    {hunt.dates && (
                      <p className="text-xs truncate" style={{ color: '#a8a490' }}>{hunt.dates}</p>
                    )}
                  </div>
                  {hunt.quota_size && (
                    <span className="text-xs flex-shrink-0" style={{ color: '#c4923a' }}>
                      {hunt.quota_size} permits
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fishing Regs Preview — filtered for location, grouped by water type */}
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
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#5a90c4' }}>
                Fishing Regulations ({relevantRegs.length})
              </h3>
              <p className="text-xs mb-2" style={{ color: '#6e6b5e' }}>
                Statewide {land.state} regulations
              </p>
              {[...byWater.entries()].map(([waterType, regs]) => (
                <div key={waterType} className="mb-2">
                  <div
                    className="px-3 py-2 rounded-lg"
                    style={{ background: '#252b21', border: '1px solid #2d342a' }}
                  >
                    <p className="text-xs font-medium capitalize mb-1" style={{ color: waterType === 'saltwater' ? '#5a90c4' : '#5fad52' }}>
                      {waterType === 'saltwater' ? '🌊' : '🐟'} {waterType}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#a8a490' }}>
                      {regs.map((r) => r.species).join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Special Rules */}
        {land.special_rules && (
          <div
            className="px-3 py-2 rounded-lg text-xs"
            style={{ background: 'rgba(196,146,58,0.08)', border: '1px solid rgba(196,146,58,0.2)' }}
          >
            <span className="font-semibold" style={{ color: '#c4923a' }}>
              {'\u26A0'} Special Rules
            </span>
            <p className="mt-1" style={{ color: '#a8a490' }}>{land.special_rules}</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid #2d342a' }}>
        <Link
          href={`/hunt/${land.id}`}
          className="flex items-center justify-center gap-2 w-full text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          style={{ background: '#3d6b35', color: '#e8e4d4' }}
        >
          View Full Details
          <span style={{ fontSize: '1rem' }}>{'\u2192'}</span>
        </Link>
      </div>
    </div>
  );
}
