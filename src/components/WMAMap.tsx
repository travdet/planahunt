'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getInfrastructureAPI, InfrastructureFeatureCollection } from '@/lib/ga-dnr-api';

const DEFAULT_CENTER: [number, number] = [-83.5, 32.8];
const DEFAULT_ZOOM = 6;
const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  'pk.eyJ1IjoidHJhdmRldCIsImEiOiJjbWhlNmMzMXYwN2N5MnNwd2IwZWJjc20zIn0.WxziVb9nSzPYoPuQPpGbXA';

export interface WMASelection {
  id: string | number;
  name: string;
  region?: string | null;
  propertyName?: string | null;
  acres?: number | null;
}

export interface WMAMapProps {
  selectedWMAName?: string;
  onWMASelect?: (selection: WMASelection) => void;
  userLocation?: { lat: number; lon: number } | null;
}

const INFRASTRUCTURE_CONFIG = [
  {
    id: 'parking',
    color: '#2563eb',
    size: 6,
    label: 'Parking Area',
    loader: (name?: string) => getInfrastructureAPI().getParking(name)
  },
  {
    id: 'campgrounds',
    color: '#f97316',
    size: 6,
    label: 'Campground',
    loader: (name?: string) => getInfrastructureAPI().getCampgrounds(name)
  },
  {
    id: 'boatRamps',
    color: '#0ea5e9',
    size: 5,
    label: 'Boat Ramp',
    loader: (name?: string) => getInfrastructureAPI().getBoatRamps(name)
  },
  {
    id: 'openings',
    color: '#22c55e',
    size: 4,
    label: 'Wildlife Opening',
    loader: (name?: string) => getInfrastructureAPI().getWildlifeOpenings(name)
  }
] as const;

function geometryToBounds(geometry: GeoJSON.Geometry): mapboxgl.LngLatBoundsLike | null {
  const bounds = new mapboxgl.LngLatBounds();

  const extend = (coords: any): void => {
    if (!coords) return;
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      bounds.extend([coords[0], coords[1]] as [number, number]);
      return;
    }
    if (Array.isArray(coords)) {
      coords.forEach((child) => extend(child));
    }
  };

  extend((geometry as any).coordinates);
  return bounds.isEmpty() ? null : bounds;
}

function updateSource(map: mapboxgl.Map, id: string, data: InfrastructureFeatureCollection) {
  const source = map.getSource(id);
  if (source && 'setData' in source) {
    (source as mapboxgl.GeoJSONSource).setData(data as any);
    return;
  }

  map.addSource(id, {
    type: 'geojson',
    data
  });
}

function addInfrastructureLayer(
  map: mapboxgl.Map,
  id: string,
  color: string,
  size: number,
  label: string
) {
  const layerId = `${id}-layer`;
  if (map.getLayer(layerId)) return;

  map.addLayer({
    id: layerId,
    type: 'circle',
    source: id,
    paint: {
      'circle-radius': size,
      'circle-color': color,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#1f2937'
    }
  });

  map.on('click', layerId, (event) => {
    const feature = event.features?.[0];
    if (!feature) return;
    const properties = feature.properties || {};
    const name = (properties.Name as string) || (properties.PropName as string) || label;
    new mapboxgl.Popup()
      .setLngLat(event.lngLat)
      .setHTML(`<strong>${label}</strong><div>${name}</div>`)
      .addTo(map);
  });
}

export default function WMAMap({ selectedWMAName, onWMASelect, userLocation }: WMAMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const boundariesRef = useRef<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM
    });

    mapRef.current = map;

    map.on('load', async () => {
      setMapLoaded(true);
      try {
        const response = await fetch('/data/wma-boundaries.geojson');
        const data: GeoJSON.FeatureCollection = await response.json();
        boundariesRef.current = data;

        if (!map.getSource('wma-boundaries')) {
          map.addSource('wma-boundaries', {
            type: 'geojson',
            data,
            promoteId: 'id'
          });
        }

        if (!map.getLayer('wma-fill')) {
          map.addLayer({
            id: 'wma-fill',
            type: 'fill',
            source: 'wma-boundaries',
            paint: {
              'fill-color': '#047857',
              'fill-opacity': 0.15
            }
          });
        }

        if (!map.getLayer('wma-outline')) {
          map.addLayer({
            id: 'wma-outline',
            type: 'line',
            source: 'wma-boundaries',
            paint: {
              'line-color': '#047857',
              'line-width': 1.5
            }
          });
        }

        if (!map.getLayer('wma-highlight')) {
          map.addLayer({
            id: 'wma-highlight',
            type: 'line',
            source: 'wma-boundaries',
            paint: {
              'line-color': '#f97316',
              'line-width': 3
            },
            filter: ['==', ['get', 'name'], '__no-selection__']
          });
        }

        map.on('mouseenter', 'wma-fill', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'wma-fill', () => {
          map.getCanvas().style.cursor = '';
        });

        map.on('click', 'wma-fill', (event) => {
          const feature = event.features?.[0] as mapboxgl.MapboxGeoJSONFeature | undefined;
          if (!feature) return;

          const props = feature.properties as Record<string, unknown>;
          const id = (props?.id as string | number | undefined) ?? feature.id ?? '';
          const name = (props?.name as string) || 'Unknown WMA';
          const region = props?.region as string | null | undefined;
          const propertyName = props?.propertyName as string | null | undefined;
          const acresValue = props?.acres as number | string | null | undefined;
          const acres = typeof acresValue === 'number' ? acresValue : Number(acresValue) || null;

          onWMASelect?.({
            id: id ?? name,
            name,
            region: region ?? null,
            propertyName: propertyName ?? null,
            acres
          });
        });

        const bounds = new mapboxgl.LngLatBounds();
        data.features.forEach((feature) => {
          const geometryBounds = geometryToBounds(feature.geometry);
          if (geometryBounds) {
            bounds.extend(geometryBounds as mapboxgl.LngLatBoundsLike);
          }
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 40 });
        }
      } catch (error) {
        console.error('Failed to load WMA boundaries', error);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
      userMarkerRef.current = null;
      setMapLoaded(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    let cancelled = false;

    (async () => {
      try {
        const collections = await Promise.all(
          INFRASTRUCTURE_CONFIG.map((config) => config.loader())
        );
        if (cancelled) return;

        collections.forEach((collection, index) => {
          const { id, color, size, label } = INFRASTRUCTURE_CONFIG[index];
          updateSource(map, id, collection);
          addInfrastructureLayer(map, id, color, size, label);
        });
      } catch (error) {
        console.error('Failed to load infrastructure data', error);
      }
    })();

    return () => {
      cancelled = true;
      INFRASTRUCTURE_CONFIG.forEach((config) => {
        const layerId = `${config.id}-layer`;
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(config.id)) {
          map.removeSource(config.id);
        }
      });
    };
  }, [mapLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer('wma-highlight')) return;
    const filterValue = selectedWMAName || '__no-selection__';
    map.setFilter('wma-highlight', ['==', ['get', 'name'], filterValue]);

    if (selectedWMAName && boundariesRef.current) {
      const feature = boundariesRef.current.features.find(
        (item) => (item.properties as any)?.name === selectedWMAName
      );
      if (feature) {
        const bounds = geometryToBounds(feature.geometry);
        if (bounds) {
          map.fitBounds(bounds, { padding: 40, maxZoom: 12 });
        }
      }
    }
  }, [selectedWMAName]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      return;
    }

    if (!userMarkerRef.current) {
      userMarkerRef.current = new mapboxgl.Marker({ color: '#1d4ed8' });
    }

    userMarkerRef.current
      .setLngLat([userLocation.lon, userLocation.lat])
      .addTo(map);
  }, [userLocation]);

  return <div ref={containerRef} className="h-[520px] w-full rounded-lg overflow-hidden" />;
}
