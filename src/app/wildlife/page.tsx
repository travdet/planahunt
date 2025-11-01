'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { getSeasonStatus, getCWDInfo } from '@/lib/seasons';
import type { WMASelection } from '@/components/WMAMap';
import wmas from '@/data/wmas.json';

const WMAMap = dynamic(() => import('@/components/WMAMap'), { ssr: false });

type Coordinates = { lat: number; lon: number };

type SeasonStatus = ReturnType<typeof getSeasonStatus>;

type WMARecord = (typeof wmas)[number];

export default function WildlifePage() {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedWMA, setSelectedWMA] = useState<WMASelection | null>(null);
  const [currentCounty, setCurrentCounty] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        setLocationError(error.message);
      }
    );
  }, []);

  const selectedWMARecord: WMARecord | undefined = useMemo(() => {
    if (!selectedWMA) return undefined;
    return wmas.find((entry) => entry.name.toLowerCase() === selectedWMA.name.toLowerCase());
  }, [selectedWMA]);

  useEffect(() => {
    if (selectedWMARecord?.counties?.length) {
      setCurrentCounty(selectedWMARecord.counties[0]);
    } else {
      setCurrentCounty('');
    }
  }, [selectedWMARecord]);

  const deerArchery = getSeasonStatus('deer', 'archery', currentCounty || undefined);
  const deerFirearms = getSeasonStatus('deer', 'firearms', currentCounty || undefined);
  const turkeySpring = getSeasonStatus('turkey', 'spring');
  const cwdInfo = currentCounty ? getCWDInfo(currentCounty) : { inZone: false };

  const selectedCounties = selectedWMARecord?.counties ?? [];

  const handleWMASelect = (selection: WMASelection) => {
    setSelectedWMA(selection);
  };

  return (
    <div className="min-h-screen bg-parkPaper">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-parkInk">Georgia Wildlife &amp; Hunting</h1>
          <p className="mt-2 text-gray-600">WMAs, seasons, CWD info, infrastructure, and more.</p>
          {locationError && (
            <p className="mt-2 text-sm text-red-600">Location unavailable: {locationError}</p>
          )}
        </header>

        {cwdInfo.inZone && (
          <section className="mb-6 rounded-md border-l-4 border-red-500 bg-red-100 p-4">
            <h2 className="text-sm font-semibold text-red-800">{cwdInfo.warning}</h2>
            <ul className="mt-2 list-inside list-disc text-sm text-red-700">
              {cwdInfo.restrictions?.map((restriction, index) => (
                <li key={index}>{restriction}</li>
              ))}
            </ul>
            {cwdInfo.moreInfo && (
              <a
                href={cwdInfo.moreInfo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-red-800 underline"
              >
                More Info →
              </a>
            )}
          </section>
        )}

        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SeasonCard season={deerArchery} title="Deer - Archery" />
          <SeasonCard season={deerFirearms} title="Deer - Firearms" />
          <SeasonCard season={turkeySpring} title="Spring Turkey" />
        </section>

        <section className="mb-6 rounded-lg bg-white p-4 shadow-lg">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-parkInk">Wildlife Management Areas</h2>
              <p className="text-sm text-gray-600">
                Tap a WMA to view region details and highlight it on the map.
              </p>
            </div>
            {selectedWMA && (
              <div className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                Viewing: <span className="font-medium">{selectedWMA.name}</span>
              </div>
            )}
          </div>
          <WMAMap
            selectedWMAName={selectedWMA?.name}
            onWMASelect={handleWMASelect}
            userLocation={userLocation}
          />
        </section>

        {selectedWMA && (
          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-parkInk">Selected WMA</h3>
              <dl className="mt-2 space-y-1 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <dt className="font-medium">Name</dt>
                  <dd>{selectedWMA.name}</dd>
                </div>
                {selectedWMA.region && (
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Region</dt>
                    <dd>{selectedWMA.region}</dd>
                  </div>
                )}
                {selectedWMA.propertyName && (
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Property</dt>
                    <dd>{selectedWMA.propertyName}</dd>
                  </div>
                )}
                {selectedCounties.length > 0 && (
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Counties</dt>
                    <dd>{selectedCounties.join(', ')}</dd>
                  </div>
                )}
                {selectedWMA.acres && (
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Acres</dt>
                    <dd>{selectedWMA.acres.toLocaleString()}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-parkInk">CWD &amp; Local Info</h3>
              {currentCounty ? (
                <p className="text-sm text-gray-700">
                  Primary county: <span className="font-medium">{currentCounty}</span>
                </p>
              ) : (
                <p className="text-sm text-gray-500">Select a WMA to see county-specific guidance.</p>
              )}
              {cwdInfo.inZone ? (
                <p className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-700">
                  This WMA falls within a CWD management county. Follow special transport rules and
                  consider voluntary testing.
                </p>
              ) : (
                <p className="mt-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">
                  No current CWD restrictions for {currentCounty || 'this area'}.
                </p>
              )}
            </div>
          </section>
        )}

        <section className="rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4 text-sm text-blue-700">
          <p>
            <strong>Data Sources:</strong> WMA boundaries and CWD data served from static GeoJSON files. Parking,
            camping, boat ramps, and wildlife openings load in real time from the GA DNR ArcGIS REST API.
          </p>
        </section>
      </div>
    </div>
  );
}

function SeasonCard({ season, title }: { season: SeasonStatus; title: string }) {
  const currentSeason = season.season;
  return (
    <div
      className={`rounded-lg border-l-4 p-4 shadow-sm ${
        season.open ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      <h3 className="text-lg font-semibold text-parkInk">{title}</h3>
      {season.open && currentSeason ? (
        <div className="mt-2 text-sm text-gray-700">
          <p className="font-medium text-green-700">✓ OPEN</p>
          <p>
            Ends {new Date(currentSeason.end).toLocaleDateString()} · {season.daysLeft} days remaining
          </p>
        </div>
      ) : currentSeason ? (
        <div className="mt-2 text-sm text-gray-600">
          <p className="font-medium">Opens {new Date(currentSeason.start).toLocaleDateString()}</p>
          {season.daysUntil && <p>{season.daysUntil} days away</p>}
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-500">No season scheduled.</p>
      )}
    </div>
  );
}
