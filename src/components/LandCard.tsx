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

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  WMA:                       { bg: 'rgba(61,107,53,0.1)',  text: '#3d6b35', border: 'rgba(61,107,53,0.25)' },
  'National Forest':         { bg: 'rgba(45,90,142,0.1)', text: '#2d5a8e', border: 'rgba(45,90,142,0.25)' },
  'National Wildlife Refuge':{ bg: 'rgba(90,107,45,0.1)', text: '#5a6b2d', border: 'rgba(90,107,45,0.25)' },
  'State Forest':            { bg: 'rgba(61,107,53,0.1)',  text: '#3d6b35', border: 'rgba(61,107,53,0.25)' },
};

function formatAcreage(acres: number): string {
  if (acres >= 1000) return `${(acres / 1000).toFixed(1)}k ac`;
  return `${acres.toLocaleString()} ac`;
}

function isSeasonOpen(season: HuntingSeason): boolean {
  const today = new Date();
  return today >= new Date(season.start_date) && today <= new Date(season.end_date);
}

export default function LandCard({
  land, seasons, quotaHunts, isFavorite, onToggleFavorite, onClick, isSelected, distance,
}: LandCardProps) {
  const openSeasons = seasons.filter(isSeasonOpen);
  const typeStyle = TYPE_COLORS[land.type] ?? { bg: 'rgba(61,107,53,0.1)', text: '#3d6b35', border: 'rgba(61,107,53,0.25)' };
  const hasQuota = quotaHunts.length > 0;

  const statParts: string[] = [];
  if (land.acreage) statParts.push(formatAcreage(land.acreage));
  if (land.counties.length > 0) {
    statParts.push(land.counties.slice(0, 2).join(', ') + (land.counties.length > 2 ? ` +${land.counties.length - 2}` : '') + ' Co.');
  }
  if (distance != null) statParts.push(`${distance.toFixed(1)} mi`);

  return (
    <div
      onClick={onClick}
      className="block group cursor-pointer rounded-xl transition-all duration-200 animate-slide-in-up"
      style={{
        background: isSelected ? '#f0f7ee' : '#ffffff',
        border: `1px solid ${isSelected ? '#3d6b35' : '#e7e8e9'}`,
        borderBottom: `2px solid ${isSelected ? '#3d6b35' : typeStyle.text}`,
        boxShadow: isSelected
          ? '0 0 0 1px #3d6b35, 0 2px 12px rgba(61,107,53,0.1)'
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div className="px-3 py-3">
        {/* Badges + title */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-semibold px-1.5 py-px rounded-full" style={{ background: typeStyle.bg, color: typeStyle.text, border: `1px solid ${typeStyle.border}` }}>
                {land.type}
              </span>
              <span className="text-[10px] font-medium px-1.5 py-px rounded-md" style={{ color: '#717977', background: '#f1f4f5' }}>
                {land.state}
              </span>
              {hasQuota && (
                <span className="text-[10px] font-semibold px-1.5 py-px rounded-full" style={{ color: '#c4923a', background: 'rgba(196,146,58,0.1)', border: '1px solid rgba(196,146,58,0.2)' }}>
                  Quota
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-sm leading-tight truncate" style={{ fontFamily: 'var(--font-manrope)', color: '#191c1d' }}>
                {land.name}
              </h3>
              {openSeasons.length > 0 && (
                <span className="flex items-center gap-1 flex-shrink-0 text-[11px] font-medium" style={{ color: '#3d6b35' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#5fad52' }} />
                  {openSeasons.length} open
                </span>
              )}
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(land.id); }}
            className="flex-shrink-0 p-0.5 rounded-full transition-colors mt-0.5"
            style={{ color: isFavorite ? '#c4923a' : '#c1c8c6' }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {statParts.length > 0 && (
          <p className="text-xs mb-1.5" style={{ color: '#717977' }}>
            {statParts.join(' · ')}
          </p>
        )}

        <Link
          href={`/hunt/${land.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-block text-xs font-medium transition-opacity opacity-60 hover:opacity-100"
          style={{ color: '#3d6b35' }}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
