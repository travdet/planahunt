'use client';

import Link from 'next/link';
import { PublicLand, HuntingSeason, QuotaHunt } from '@/lib/types';

interface LandCardProps {
  land: PublicLand;
  seasons: HuntingSeason[];
  quotaHunts: QuotaHunt[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
  isSelected: boolean;
  distance?: number;
}

const TYPE_COLORS: Record<string, string> = {
  WMA: '#3d6b35',
  'National Forest': '#2d5a8e',
  'State Game Land': '#6b3d35',
  'National Wildlife Refuge': '#5a6b2d',
};

function formatAcreage(acres: number): string {
  if (acres >= 1000) {
    return `${(acres / 1000).toFixed(1)}k ac`;
  }
  return `${acres.toLocaleString()} ac`;
}

function isSeasonOpen(season: HuntingSeason): boolean {
  const today = new Date();
  const start = new Date(season.start_date);
  const end = new Date(season.end_date);
  return today >= start && today <= end;
}

export default function LandCard({
  land,
  seasons,
  quotaHunts,
  isFavorite,
  onToggleFavorite,
  onClick,
  isSelected,
  distance,
}: LandCardProps) {
  const openSeasons = seasons.filter(isSeasonOpen);
  const typeColor = TYPE_COLORS[land.type] ?? '#3d6b35';
  const hasQuota = quotaHunts.length > 0;

  const statParts: string[] = [];
  if (land.acreage) statParts.push(formatAcreage(land.acreage));
  if (land.counties.length > 0) {
    const label = land.counties.slice(0, 2).join(', ') + (land.counties.length > 2 ? ` +${land.counties.length - 2}` : '') + ' Co.';
    statParts.push(label);
  }
  if (distance != null) statParts.push(`${distance.toFixed(1)} mi`);

  return (
    <div
      onClick={onClick}
      className="block group cursor-pointer rounded-xl transition-all duration-200 animate-slide-in-up"
      style={{
        background: isSelected ? '#2a3226' : '#222820',
        border: `1px solid ${isSelected ? '#3d6b35' : '#2d342a'}`,
        boxShadow: isSelected ? '0 0 0 1px #3d6b35, 0 4px 16px rgba(61,107,53,0.15)' : 'none',
      }}
    >
      <div className="px-3 py-2.5">
        {/* Header: badges + name + favorite */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="text-[10px] font-semibold px-1.5 py-px rounded-full"
                style={{ background: `${typeColor}22`, color: typeColor, border: `1px solid ${typeColor}44` }}
              >
                {land.type}
              </span>
              <span className="text-[10px] font-medium px-1 py-px rounded" style={{ color: '#6e6b5e', background: '#252b21' }}>
                {land.state}
              </span>
              {hasQuota && (
                <span className="text-[10px] font-semibold px-1.5 py-px rounded-full" style={{ color: '#c4923a', background: 'rgba(196,146,58,0.12)', border: '1px solid rgba(196,146,58,0.25)' }}>
                  Quota
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <h3
                className="font-semibold text-sm leading-tight transition-colors group-hover:text-white truncate"
                style={{ color: '#e8e4d4' }}
              >
                {land.name}
              </h3>
              {openSeasons.length > 0 && (
                <span className="flex items-center gap-1 flex-shrink-0 text-[11px]" style={{ color: '#5fad52' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#5fad52' }} />
                  {openSeasons.length} open
                </span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(land.id);
            }}
            className="flex-shrink-0 p-0.5 rounded-full transition-colors mt-0.5"
            style={{ color: isFavorite ? '#c4923a' : '#4a5046' }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Stats row: plain text with dot separators */}
        {statParts.length > 0 && (
          <p className="text-xs mb-1.5" style={{ color: '#6e6b5e' }}>
            {statParts.join(' \u00b7 ')}
          </p>
        )}

        {/* View Details link */}
        <Link
          href={`/hunt/${land.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-block text-xs font-medium transition-colors hover:opacity-100 opacity-60"
          style={{ color: '#5fad52' }}
        >
          View Full Details &rarr;
        </Link>
      </div>
    </div>
  );
}
