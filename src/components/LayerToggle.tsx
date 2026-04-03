'use client';

import { useState } from 'react';
import { LayerCategory, CATEGORY_STYLES } from '@/lib/mapLayers';

interface LayerToggleProps {
  enabledLayers: Record<LayerCategory, boolean>;
  onToggle: (category: LayerCategory) => void;
}

const PRIMARY: LayerCategory[] = ['boundaries', 'boat-ramps', 'trails', 'campgrounds', 'fish-attractors'];
const SECONDARY: LayerCategory[] = ['lakes', 'entrances', 'dove-fields', 'ranges', 'other'];

export default function LayerToggle({ enabledLayers, onToggle }: LayerToggleProps) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const enabledCount = Object.values(enabledLayers).filter(Boolean).length;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
        style={{
          background: 'rgba(26,31,22,0.9)',
          backdropFilter: 'blur(12px)',
          color: '#a8a490',
          border: '1px solid #2d342a',
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        Layers
        {enabledCount > 0 && (
          <span
            className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
            style={{ background: '#3d6b35', color: '#e8e4d4' }}
          >
            {enabledCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className="rounded-xl overflow-hidden w-56"
      style={{
        background: 'rgba(26,31,22,0.95)',
        backdropFilter: 'blur(12px)',
        border: '1px solid #2d342a',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5" style={{ borderBottom: '1px solid #2d342a' }}>
        <span className="text-xs font-semibold" style={{ color: '#a8a490' }}>Map Layers</span>
        <button
          onClick={() => setOpen(false)}
          className="p-1 rounded transition-colors"
          style={{ color: '#6e6b5e' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Primary layers */}
      <div className="px-2 py-1.5 space-y-0.5">
        {PRIMARY.map((cat) => (
          <LayerRow key={cat} category={cat} enabled={enabledLayers[cat]} onToggle={onToggle} />
        ))}
      </div>

      {/* Secondary layers */}
      {showMore && (
        <div className="px-2 pb-1.5 space-y-0.5" style={{ borderTop: '1px solid #2d342a' }}>
          <div className="pt-1.5" />
          {SECONDARY.map((cat) => (
            <LayerRow key={cat} category={cat} enabled={enabledLayers[cat]} onToggle={onToggle} />
          ))}
        </div>
      )}

      <button
        onClick={() => setShowMore(!showMore)}
        className="w-full px-3 py-2 text-[11px] font-medium text-center transition-colors"
        style={{ color: '#6e6b5e', borderTop: '1px solid #2d342a' }}
      >
        {showMore ? 'Show less' : `More layers (${SECONDARY.length})`}
      </button>
    </div>
  );
}

function LayerRow({
  category,
  enabled,
  onToggle,
}: {
  category: LayerCategory;
  enabled: boolean;
  onToggle: (cat: LayerCategory) => void;
}) {
  const style = CATEGORY_STYLES[category];
  return (
    <button
      onClick={() => onToggle(category)}
      className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg transition-colors text-left"
      style={{
        background: enabled ? `${style.color}15` : 'transparent',
      }}
    >
      <div
        className="w-3 h-3 rounded-sm flex-shrink-0"
        style={{
          background: enabled ? style.color : '#333830',
          border: `1.5px solid ${enabled ? style.color : '#4a5046'}`,
        }}
      />
      <span className="text-xs" style={{ color: enabled ? '#e8e4d4' : '#6e6b5e' }}>
        {style.label}
      </span>
    </button>
  );
}
