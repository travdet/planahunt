'use client';

import { useEffect, useRef, useCallback } from 'react';
import { PublicLand } from '@/lib/types';
import {
  LayerCategory,
  CATEGORY_STYLES,
  LAYER_REGISTRY,
  getVisibleStates,
  getLayerFiles,
  GeoJSONLayerDef,
} from '@/lib/mapLayers';

interface MapViewProps {
  lands: PublicLand[];
  selectedLandId: string | null;
  onSelectLand: (id: string) => void;
  enabledLayers: Record<LayerCategory, boolean>;
}

// SVG pin shape — traditional teardrop with inner circle
const PIN_SVG_NORMAL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 38" width="28" height="38">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24S28 24.5 28 14C28 6.268 21.732 0 14 0z"
        fill="#3d6b35" stroke="#5fad52" stroke-width="1.5"/>
  <circle cx="14" cy="13" r="5" fill="white" opacity="0.92"/>
</svg>`;

const PIN_SVG_SELECTED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 38" width="28" height="38">
  <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 24 14 24S28 24.5 28 14C28 6.268 21.732 0 14 0z"
        fill="#c4923a" stroke="#f0c060" stroke-width="2"/>
  <circle cx="14" cy="13" r="5" fill="white" opacity="0.95"/>
</svg>`;

function loadMapboxImage(map: any, id: string, svg: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const w = 28, h = 38;
    const img = new Image(w, h);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, w, h);
      map.addImage(id, { width: w, height: h, data });
      resolve();
    };
    img.onerror = reject;
    img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  });
}

function buildGeoJSON(lands: PublicLand[]) {
  return {
    type: 'FeatureCollection' as const,
    features: lands
      .filter((l) => l.lat && l.lng)
      .map((l) => ({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [l.lng!, l.lat!] },
        properties: {
          id: l.id,
          name: l.name,
          type: l.type,
          state: l.state,
          acreage: l.acreage ?? null,
        },
      })),
  };
}

// ── GeoJSON data cache ──
const dataCache = new Map<string, any>();

async function fetchGeoJSON(file: string): Promise<any> {
  if (dataCache.has(file)) return dataCache.get(file);
  const res = await fetch(`/data/${file}`);
  if (!res.ok) return null;
  const data = await res.json();
  dataCache.set(file, data);
  return data;
}

// ── Source/layer ID helpers ──
function sourceId(def: GeoJSONLayerDef) {
  return def.file.replace('.geojson', '');
}

function layerId(def: GeoJSONLayerDef, suffix: string) {
  return `${sourceId(def)}-${suffix}`;
}

// ── Add layers for a GeoJSON file ──
function addOverlayLayers(map: any, def: GeoJSONLayerDef, data: any, beforeLayer?: string) {
  const src = sourceId(def);
  const style = CATEGORY_STYLES[def.category];

  if (map.getSource(src)) return; // already added

  const sourceOpts: any = { type: 'geojson', data };
  if (def.geometryType === 'point' && style.clusterAt) {
    sourceOpts.cluster = true;
    sourceOpts.clusterMaxZoom = 12;
    sourceOpts.clusterRadius = 50;
  }
  map.addSource(src, sourceOpts);

  if (def.geometryType === 'polygon') {
    map.addLayer({
      id: layerId(def, 'fill'),
      type: 'fill',
      source: src,
      minzoom: style.minzoom,
      paint: {
        'fill-color': style.color,
        'fill-opacity': ['interpolate', ['linear'], ['zoom'],
          style.minzoom, 0.05, style.minzoom + 3, 0.15, style.minzoom + 6, 0.25],
      },
    }, beforeLayer);

    map.addLayer({
      id: layerId(def, 'outline'),
      type: 'line',
      source: src,
      minzoom: style.minzoom,
      paint: {
        'line-color': style.color,
        'line-width': ['interpolate', ['linear'], ['zoom'], style.minzoom, 0.5, style.minzoom + 3, 1.5, style.minzoom + 6, 2],
        'line-opacity': ['interpolate', ['linear'], ['zoom'], style.minzoom, 0.3, style.minzoom + 3, 0.6, style.minzoom + 6, 0.8],
      },
    }, beforeLayer);

    map.addLayer({
      id: layerId(def, 'label'),
      type: 'symbol',
      source: src,
      minzoom: 10,
      layout: {
        'text-field': ['coalesce', ['get', def.nameProperty], ''],
        'text-size': 11,
        'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-transform': 'uppercase',
        'text-letter-spacing': 0.05,
        'text-max-width': 8,
      },
      paint: {
        'text-color': style.color,
        'text-halo-color': 'rgba(255, 255, 255, 0.85)',
        'text-halo-width': 1.5,
        'text-opacity': 0.8,
      },
    }, beforeLayer);
  } else if (def.geometryType === 'line') {
    map.addLayer({
      id: layerId(def, 'line'),
      type: 'line',
      source: src,
      minzoom: style.minzoom,
      paint: {
        'line-color': style.color,
        'line-width': ['interpolate', ['linear'], ['zoom'], 9, 1, 13, 2.5],
        'line-opacity': 0.7,
      },
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
    }, beforeLayer);
  } else {
    // Point layer
    if (style.clusterAt) {
      // Cluster circles
      map.addLayer({
        id: layerId(def, 'cluster'),
        type: 'circle',
        source: src,
        filter: ['has', 'point_count'],
        minzoom: style.minzoom,
        paint: {
          'circle-color': style.color,
          'circle-radius': ['step', ['get', 'point_count'], 12, 50, 16, 200, 20],
          'circle-opacity': 0.7,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#ffffff',
        },
      }, beforeLayer);

      map.addLayer({
        id: layerId(def, 'cluster-count'),
        type: 'symbol',
        source: src,
        filter: ['has', 'point_count'],
        minzoom: style.minzoom,
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
          'text-size': 11,
        },
        paint: { 'text-color': '#fff' },
      }, beforeLayer);

      // Unclustered points
      map.addLayer({
        id: layerId(def, 'point'),
        type: 'circle',
        source: src,
        filter: ['!', ['has', 'point_count']],
        minzoom: style.minzoom,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], style.minzoom, 3, 14, 6],
          'circle-color': style.color,
          'circle-opacity': 0.85,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#ffffff',
        },
      }, beforeLayer);
    } else {
      map.addLayer({
        id: layerId(def, 'point'),
        type: 'circle',
        source: src,
        minzoom: style.minzoom,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], style.minzoom, 3, 14, 6],
          'circle-color': style.color,
          'circle-opacity': 0.85,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#ffffff',
        },
      }, beforeLayer);
    }
  }
}

// ── Set visibility for all layers of a file ──
function setOverlayVisibility(map: any, def: GeoJSONLayerDef, visible: boolean) {
  const vis = visible ? 'visible' : 'none';
  const suffixes = def.geometryType === 'polygon'
    ? ['fill', 'outline', 'label']
    : def.geometryType === 'line'
      ? ['line']
      : CATEGORY_STYLES[def.category].clusterAt
        ? ['cluster', 'cluster-count', 'point']
        : ['point'];

  for (const s of suffixes) {
    const id = layerId(def, s);
    if (map.getLayer(id)) {
      map.setLayoutProperty(id, 'visibility', vis);
    }
  }
}

export default function MapView({ lands, selectedLandId, onSelectLand, enabledLayers }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const popupRef = useRef<any>(null);
  const layersReadyRef = useRef(false);
  const loadedSourcesRef = useRef(new Set<string>());
  const enabledRef = useRef(enabledLayers);
  enabledRef.current = enabledLayers;

  // ── Load overlay layers for visible states ──
  const syncOverlayLayers = useCallback(async () => {
    const map = mapRef.current;
    if (!map || !layersReadyRef.current) return;

    const b = map.getBounds();
    const visibleStates = getVisibleStates({
      west: b.getWest(),
      south: b.getSouth(),
      east: b.getEast(),
      north: b.getNorth(),
    });

    const enabled = enabledRef.current;
    const categories = Object.keys(enabled) as LayerCategory[];

    for (const cat of categories) {
      const files = getLayerFiles(cat, visibleStates);
      for (const def of files) {
        const src = sourceId(def);
        if (enabled[cat]) {
          if (!loadedSourcesRef.current.has(src)) {
            // Need to fetch and add
            const data = await fetchGeoJSON(def.file);
            if (data && mapRef.current) {
              addOverlayLayers(map, def, data, 'lands-pins');
              loadedSourcesRef.current.add(src);
            }
          } else {
            setOverlayVisibility(map, def, true);
          }
        } else if (loadedSourcesRef.current.has(src)) {
          setOverlayVisibility(map, def, false);
        }
      }
    }

    // Also hide layers for states no longer in view
    for (const def of LAYER_REGISTRY) {
      const src = sourceId(def);
      if (loadedSourcesRef.current.has(src) && !visibleStates.includes(def.state)) {
        setOverlayVisibility(map, def, false);
      }
    }
  }, []);

  // ── Initial map + layers ──
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !mapContainer.current || mapRef.current) return;

    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = token;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-83.5, 32.5],
        zoom: 6.5,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'bottom-right');
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left');

      mapRef.current = map;

      // Hover popup (singleton, reused)
      const popup = new mapboxgl.default.Popup({
        offset: [0, -36],
        closeButton: false,
        closeOnClick: false,
        maxWidth: '220px',
      });
      popupRef.current = popup;

      map.on('load', async () => {
        // Load pin images
        await Promise.all([
          loadMapboxImage(map, 'pin-normal', PIN_SVG_NORMAL),
          loadMapboxImage(map, 'pin-selected', PIN_SVG_SELECTED),
        ]);

        // GeoJSON source for land pins
        map.addSource('lands', {
          type: 'geojson',
          data: buildGeoJSON(lands),
        });

        const noSelection = selectedLandId ?? '';

        map.addLayer({
          id: 'lands-pins',
          type: 'symbol',
          source: 'lands',
          filter: ['!=', ['get', 'id'], noSelection],
          layout: {
            'icon-image': 'pin-normal',
            'icon-size': 0.75,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
          },
        });

        map.addLayer({
          id: 'lands-pins-selected',
          type: 'symbol',
          source: 'lands',
          filter: ['==', ['get', 'id'], noSelection],
          layout: {
            'icon-image': 'pin-selected',
            'icon-size': 0.95,
            'icon-anchor': 'bottom',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
          },
        });

        layersReadyRef.current = true;

        // ── Click ──
        map.on('click', 'lands-pins', (e: any) => {
          const id = e.features?.[0]?.properties?.id;
          if (id) onSelectLand(id);
        });
        map.on('click', 'lands-pins-selected', (e: any) => {
          const id = e.features?.[0]?.properties?.id;
          if (id) onSelectLand(id);
        });

        // ── Hover popup for land pins ──
        const showPinPopup = (e: any, accentColor: string) => {
          map.getCanvas().style.cursor = 'pointer';
          const f = e.features?.[0];
          if (!f) return;
          const { name, type, acreage, state } = f.properties;
          const [lng, lat] = (f.geometry as any).coordinates;
          popup
            .setLngLat([lng, lat])
            .setHTML(`
              <div style="font-family:system-ui,sans-serif;padding:6px 2px 2px;">
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${accentColor};margin-bottom:3px;">${type}</div>
                <div style="font-size:13px;font-weight:600;color:#191c1d;line-height:1.3;">${name}</div>
                ${acreage ? `<div style="font-size:11px;color:#717977;margin-top:3px;">${Number(acreage).toLocaleString()} acres · ${state}</div>` : `<div style="font-size:11px;color:#717977;margin-top:3px;">${state}</div>`}
              </div>
            `)
            .addTo(map);
        };

        map.on('mouseenter', 'lands-pins', (e: any) => showPinPopup(e, '#5fad52'));
        map.on('mouseleave', 'lands-pins', () => { map.getCanvas().style.cursor = ''; popup.remove(); });
        map.on('mouseenter', 'lands-pins-selected', (e: any) => showPinPopup(e, '#f0c060'));
        map.on('mouseleave', 'lands-pins-selected', () => { map.getCanvas().style.cursor = ''; popup.remove(); });

        // ── Hover popup for overlay point layers ──
        map.on('mousemove', (e: any) => {
          if (!layersReadyRef.current) return;
          // Check if hovering a land pin — skip overlay popup
          const pinFeatures = map.queryRenderedFeatures(e.point, { layers: ['lands-pins', 'lands-pins-selected'] });
          if (pinFeatures.length > 0) return;

          // Check overlay point layers
          const overlayPointLayers = Array.from(loadedSourcesRef.current)
            .map((src) => `${src}-point`)
            .filter((id) => map.getLayer(id));

          if (overlayPointLayers.length === 0) return;

          const features = map.queryRenderedFeatures(e.point, { layers: overlayPointLayers });
          if (features.length > 0) {
            const f = features[0];
            const def = LAYER_REGISTRY.find((d) => sourceId(d) === f.source);
            if (!def) return;
            const style = CATEGORY_STYLES[def.category];
            const name = f.properties?.[def.nameProperty] || def.category;
            const coords = f.geometry.type === 'Point' ? f.geometry.coordinates : [e.lngLat.lng, e.lngLat.lat];

            map.getCanvas().style.cursor = 'pointer';
            popup
              .setOffset([0, -6])
              .setLngLat(coords as [number, number])
              .setHTML(`
                <div style="font-family:system-ui,sans-serif;padding:6px 2px 2px;">
                  <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${style.color};margin-bottom:3px;">${style.label}</div>
                  <div style="font-size:12px;font-weight:600;color:#191c1d;line-height:1.3;">${name}</div>
                </div>
              `)
              .addTo(map);
          } else {
            // Only remove if we're not hovering a pin
            const currentLayers = ['lands-pins', 'lands-pins-selected'];
            const pinCheck = map.queryRenderedFeatures(e.point, { layers: currentLayers.filter(l => map.getLayer(l)) });
            if (pinCheck.length === 0) {
              map.getCanvas().style.cursor = '';
              popup.remove();
            }
          }
        });

        // Load initial overlay layers
        syncOverlayLayers();

        // Re-sync on viewport change
        map.on('moveend', syncOverlayLayers);
      });
    });

    // Resize map when container changes
    const ro = new ResizeObserver(() => {
      if (mapRef.current) mapRef.current.resize();
    });
    ro.observe(mapContainer.current!);

    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && mapRef.current) mapRef.current.resize();
    });
    io.observe(mapContainer.current!);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layersReadyRef.current = false;
        loadedSourcesRef.current.clear();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Update GeoJSON source when lands list changes ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !layersReadyRef.current) return;
    const source = map.getSource('lands');
    if (source) source.setData(buildGeoJSON(lands));
  }, [lands]);

  // ── Update filters + fly when selection changes ──
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !layersReadyRef.current) return;

    const sel = selectedLandId ?? '';
    if (map.getLayer('lands-pins')) {
      map.setFilter('lands-pins', ['!=', ['get', 'id'], sel]);
    }
    if (map.getLayer('lands-pins-selected')) {
      map.setFilter('lands-pins-selected', ['==', ['get', 'id'], sel]);
    }

    if (selectedLandId) {
      const land = lands.find((l) => l.id === selectedLandId);
      if (land?.lat && land?.lng) {
        map.flyTo({ center: [land.lng, land.lat], zoom: 9, duration: 1200, essential: true });
      }
    }
  }, [selectedLandId, lands]);

  // ── Sync overlay visibility when enabledLayers changes ──
  useEffect(() => {
    syncOverlayLayers();
  }, [enabledLayers, syncOverlayLayers]);

  const noToken = !process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      {noToken && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: '#f1f4f5' }}
        >
          <svg className="w-12 h-12 mb-4" style={{ color: '#c1c8c6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-sm font-semibold mb-1" style={{ color: '#414847' }}>Map Unavailable</p>
          <p className="text-xs text-center max-w-xs px-4" style={{ color: '#717977' }}>
            Add <code className="px-1 py-0.5 rounded" style={{ background: '#ffffff', color: '#c4923a', border: '1px solid #e1e3e4' }}>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code>.env.local</code> to enable the map.
          </p>
        </div>
      )}
    </div>
  );
}
