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

const SPECIES_ICONS: Record<string, string> = {
  Deer: '🦌',
  Turkey: '🦃',
  Bear: '🐻',
  Duck: '🦆',
  Dove: '🕊️',
  Quail: '🐦',
  'Feral Hog': '🐗',
  Alligator: '🐊',
  Bass: '🐟',
  Trout: '🎣',
  Catfish: '🐠',
  Crappie: '🐡',
  'Red Drum': '🎣',
  Flounder: '🐟',
};

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

function getUniqueSpecies(seasons: HuntingSeason[]): string[] {
  return [...new Set(seasons.map((s) => s.species))].slice(0, 6);
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
  const species = getUniqueSpecies(seasons);
  const openSeasons = seasons.filter(isSeasonOpen);
  const typeColor = TYPE_COLORS[land.type] ?? '#3d6b35';
  const hasQuota = quotaHunts.length > 0;

  return (
    <Link
      href={`/hunt/${land.id}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="block group cursor-pointer rounded-xl transition-all duration-200 animate-slide-in-up"
      style={{
        background: isSelected ? '#2a3226' : '#222820',
        border: `1px solid ${isSelected ? '#3d6b35' : '#2d342a'}`,
        boxShadow: isSelected ? '0 0 0 1px #3d6b35, 0 4px 16px rgba(61,107,53,0.15)' : 'none',
        textDecoration: 'none',
      }}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${typeColor}22`, color: typeColor, border: `1px solid ${typeColor}44` }}
              >
                {land.type}
              </span>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ color: '#6e6b5e', background: '#252b21' }}>
                {land.state}
              </span>
            </div>
            <h3
              className="font-semibold text-sm leading-snug transition-colors group-hover:text-white"
              style={{ color: '#e8e4d4' }}
            >
              {land.name}
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(land.id);
            }}
            className="flex-shrink-0 p-1 rounded-full transition-colors"
            style={{ color: isFavorite ? '#c4923a' : '#4a5046' }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: '#6e6b5e' }}>
          {land.acreage && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              {formatAcreage(land.acreage)}
            </span>
          )}
          {distance != null && (
            <span className="flex items-center gap-1" style={{ color: '#c4923a' }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {distance.toFixed(1)} mi
            </span>
          )}
          {land.counties.length > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {land.counties.slice(0, 2).join(', ')}{land.counties.length > 2 ? ` +${land.counties.length - 2}` : ''} Co.
            </span>
          )}
          {hasQuota && (
            <span
              className="flex items-center gap-1 font-medium"
              style={{ color: '#c4923a' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Quota
            </span>
          )}
        </div>

        {/* Open season indicator */}
        {openSeasons.length > 0 && (
          <div
            className="flex items-center gap-1.5 text-xs mb-3 px-2.5 py-1.5 rounded-lg"
            style={{ background: 'rgba(61,107,53,0.15)', color: '#5fad52' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-medium">Open now:</span>
            <span>{openSeasons.slice(0, 2).map((s) => `${s.species} (${s.weapon_type})`).join(', ')}</span>
          </div>
        )}

        {/* Species tags */}
        {species.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {species.map((sp) => (
              <span
                key={sp}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: '#252b21', color: '#a8a490', border: '1px solid #333830' }}
              >
                {SPECIES_ICONS[sp] ?? ''} {sp}
              </span>
            ))}
          </div>
        )}

        {/* View Details link */}
        <div
          className="flex items-center gap-1 mt-3 pt-2 text-xs font-medium transition-colors group-hover:opacity-100 opacity-60"
          style={{ borderTop: '1px solid #2d342a', color: '#5fad52' }}
        >
          View Details
          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
