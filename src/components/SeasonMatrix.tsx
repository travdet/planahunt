'use client';

import { HuntingSeason } from '@/lib/types';
import { buildSeasonMatrix, WEAPON_COLORS, SPECIES_ICONS } from '@/lib/seasonUtils';

interface SeasonMatrixProps {
  seasons: HuntingSeason[];
}

export default function SeasonMatrix({ seasons }: SeasonMatrixProps) {
  const { rows, weapons } = buildSeasonMatrix(seasons);

  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th
              className="text-left py-1.5 px-2 font-semibold sticky left-0"
              style={{ color: '#6e6b5e', background: '#1e2419' }}
            >
              Species
            </th>
            {weapons.map(w => (
              <th
                key={w}
                className="text-center py-1.5 px-2 font-semibold"
                style={{ color: WEAPON_COLORS[w] ?? '#6e6b5e', minWidth: 80 }}
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr
              key={row.species}
              style={{ borderTop: '1px solid #2d342a' }}
            >
              <td
                className="py-2 px-2 font-medium whitespace-nowrap sticky left-0"
                style={{ color: row.isOpen ? '#e8e4d4' : '#a8a490', background: '#1e2419' }}
              >
                <span className="flex items-center gap-1.5">
                  {row.isOpen && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  )}
                  <span>{SPECIES_ICONS[row.species] ?? ''}</span>
                  <span>{row.species}</span>
                </span>
              </td>
              {row.cells.map(cell => (
                <td
                  key={cell.weapon}
                  className="py-2 px-2 text-center"
                  style={{
                    color: cell.segmentCount === 0 ? '#333830' : cell.isOpen ? '#e8e4d4' : '#a8a490',
                    background: cell.isOpen ? 'rgba(61,107,53,0.08)' : 'transparent',
                  }}
                >
                  {cell.segmentCount === 0 ? (
                    <span style={{ color: '#333830' }}>—</span>
                  ) : (
                    <div>
                      <div className="whitespace-nowrap">{cell.dateRange}</div>
                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        {cell.segmentCount > 1 && (
                          <span style={{ color: '#6e6b5e' }}>{cell.segmentCount} seg</span>
                        )}
                        {cell.hasQuota && (
                          <span style={{ color: '#c4923a' }}>Q</span>
                        )}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
