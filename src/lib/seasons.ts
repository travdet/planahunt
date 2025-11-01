export interface Season {
  start: string;
  end: string;
  name: string;
  notes?: string;
}

export interface SeasonData {
  [species: string]: {
    [method: string]: Season | Season[];
  };
}

export const SEASONS_2025_2026: SeasonData = {
  deer: {
    archery: {
      start: '2025-09-13',
      end: '2026-01-11',
      name: 'Archery Season'
    },
    primitiveWeapons: {
      start: '2025-10-11',
      end: '2026-01-11',
      name: 'Primitive Weapons Season'
    },
    firearms: {
      start: '2025-10-18',
      end: '2026-01-01',
      name: 'Firearms Season'
    },
    specialAntlerless: {
      start: '2025-10-04',
      end: '2025-10-05',
      name: 'Special Antlerless Weekend'
    }
  },
  turkey: {
    spring: {
      start: '2026-03-28',
      end: '2026-05-15',
      name: 'Spring Turkey Season (Private Land)'
    },
    springPublic: {
      start: '2026-04-04',
      end: '2026-05-15',
      name: 'Spring Turkey Season (Public Land)'
    },
    youth: {
      start: '2026-03-21',
      end: '2026-03-22',
      name: 'Youth Turkey Season'
    }
  },
  bear: {
    northArchery: {
      start: '2025-09-13',
      end: '2025-12-31',
      name: 'North Georgia Bear - Archery'
    },
    northFirearms: {
      start: '2025-12-13',
      end: '2025-12-13',
      name: 'North Georgia Bear - Firearms'
    },
    centralFirearms: {
      start: '2025-12-20',
      end: '2025-12-20',
      name: 'Central Georgia Bear - Firearms'
    }
  },
  smallGame: {
    squirrel: { start: '2025-08-15', end: '2026-02-28', name: 'Squirrel Season' },
    rabbit: { start: '2025-11-11', end: '2026-02-28', name: 'Rabbit Season' },
    quail: { start: '2025-11-08', end: '2026-02-28', name: 'Quail Season' }
  },
  waterfowl: {
    earlyTeal: {
      start: '2025-09-13',
      end: '2025-09-21',
      name: 'Early Teal Season',
      notes: 'Shortened to 9 days due to slight decline in teal numbers'
    },
    ducks: [
      { start: '2025-11-22', end: '2025-11-30', name: 'Duck Season - Split 1' },
      { start: '2025-12-06', end: '2026-01-25', name: 'Duck Season - Split 2' }
    ]
  },
  hog: {
    public: {
      start: '2025-08-15',
      end: '2026-02-28',
      name: 'Hog Season (Public Land)'
    },
    private: {
      start: '2025-01-01',
      end: '2025-12-31',
      name: 'Hog Season (Private Land - Year Round)',
      notes: 'No closed season on private land'
    }
  }
};

export const EXTENDED_ARCHERY_COUNTIES = [
  'Baker', 'Barrow', 'Bibb', 'Chatham', 'Cherokee', 'Clarke', 'Clayton',
  'Cobb', 'Columbia', 'Decatur', 'DeKalb', 'Douglas', 'Early', 'Fayette',
  'Forsyth', 'Fulton', 'Grady', 'Gwinnett', 'Hall', 'Henry', 'Miller',
  'Mitchell', 'Muscogee', 'Paulding', 'Richmond', 'Rockdale', 'Seminole', 'Thomas'
];

export const CWD_COUNTIES = ['Lanier', 'Berrien', 'Lowndes'];

export function isSeasonOpen(
  species: string,
  method: string,
  date: Date,
  county?: string
): boolean {
  const seasonData = SEASONS_2025_2026[species]?.[method];
  if (!seasonData) return false;

  if (Array.isArray(seasonData)) {
    return seasonData.some((season) => {
      const start = new Date(season.start);
      const end = new Date(season.end);
      return date >= start && date <= end;
    });
  }

  if (species === 'deer' && method === 'archery' && county) {
    if (EXTENDED_ARCHERY_COUNTIES.includes(county)) {
      const end = new Date('2026-01-31');
      const start = new Date(seasonData.start);
      return date >= start && date <= end;
    }
  }

  const start = new Date(seasonData.start);
  const end = new Date(seasonData.end);
  return date >= start && date <= end;
}

export function getSeasonStatus(
  species: string,
  method: string,
  county?: string
): { open: boolean; season?: Season; daysUntil?: number; daysLeft?: number } {
  const now = new Date();
  const seasonData = SEASONS_2025_2026[species]?.[method];

  if (!seasonData) {
    return { open: false };
  }

  const seasons = Array.isArray(seasonData) ? seasonData : [seasonData];

  for (const season of seasons) {
    const start = new Date(season.start);
    const end = new Date(season.end);

    if (species === 'deer' && method === 'archery' && county && EXTENDED_ARCHERY_COUNTIES.includes(county)) {
      end.setMonth(0, 31);
    }

    if (now >= start && now <= end) {
      const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { open: true, season, daysLeft };
    }

    if (now < start) {
      const daysUntil = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return { open: false, season, daysUntil };
    }
  }

  return { open: false };
}

export function isInCWDZone(county: string): boolean {
  return CWD_COUNTIES.map((c) => c.toLowerCase()).includes(county.toLowerCase());
}

export function getCWDInfo(county: string) {
  if (isInCWDZone(county)) {
    return {
      inZone: true,
      warning: '⚠️ This county is in a CWD Management Area',
      restrictions: [
        'Whole carcasses cannot be transported out of zone',
        'CWD testing strongly recommended for all harvested deer',
        'Only boned-out meat, antlers, clean skulls, hides, and finished taxidermy can leave the zone'
      ],
      testingInfo: 'Free testing available at participating processors and self-serve freezers',
      moreInfo: 'https://georgiawildlife.com/cwd'
    };
  }
  return { inZone: false };
}
