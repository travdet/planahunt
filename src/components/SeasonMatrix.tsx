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
              style={{ color: '#717977', background: '#ffffff' }}
            >
              Species
            </th>
            {weapons.map((w) => (
              <th
                key={w}
                className="text-center py-1.5 px-2 font-semibold"
                style={{ color: WEAPON_COLORS[w] ?? '#717977', minWidth: 80 }}
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.species} style={{ borderTop: '1px solid #ebeef0' }}>
              <td
                className="py-2 px-2 font-medium whitespace-nowrap sticky left-0"
                style={{ color: row.isOpen ? '#191c1d' : '#414847', background: '#ffffff' }}
              >
                <span className="flex items-center gap-1.5">
                  {row.isOpen && (
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: '#5fad52' }} />
                  )}
                  <span>{SPECIES_ICONS[row.species] ?? ''}</span>
                  <span>{row.species}</span>
                </span>
              </td>
              {row.cells.map((cell) => (
                <td
                  key={cell.weapon}
                  className="py-2 px-2 text-center"
                  style={{
                    color: cell.segmentCount === 0 ? '#c1c8c6' : cell.isOpen ? '#191c1d' : '#717977',
                    background: cell.isOpen ? 'rgba(61,107,53,0.06)' : 'transparent',
                  }}
                >
                  {cell.segmentCount === 0 ? (
                    <span style={{ color: '#c1c8c6' }}>—</span>
                  ) : (
                    <div>
                      <div className="whitespace-nowrap">{cell.dateRange}</div>
                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        {cell.segmentCount > 1 && <span style={{ color: '#717977' }}>{cell.segmentCount} seg</span>}
                        {cell.hasQuota && <span style={{ color: '#c4923a' }}>Q</span>}
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
