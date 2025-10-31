const WEAPON_COLOR_MAP: Record<string, string> = {
  archery: "#10b981",
  bow: "#10b981",
  crossbow: "#8b5cf6",
  firearms: "#ef4444",
  firearm: "#ef4444",
  gun: "#ef4444",
  primitive: "#f59e0b",
  muzzleloader: "#f59e0b",
  shotgun: "#f97316",
  small: "#0ea5e9",
  waterfowl: "#0ea5e9",
  dove: "#38bdf8",
  youth: "#14b8a6"
};

const SPECIES_ICON_MAP: Record<string, string> = {
  deer: "🦌",
  "deer/bear": "🦌",
  bear: "🐻",
  turkey: "🦃",
  dove: "🕊️",
  coyote: "🦊",
  waterfowl: "🦆",
  small: "🐇",
  squirrel: "🐿️",
  rabbit: "🐇",
  hog: "🐗",
  bobwhite: "🦆"
};

function normalizeToken(value: string) {
  return (value || "").toLowerCase();
}

export function getWeaponColor(token: string) {
  const normalized = normalizeToken(token);
  for (const key of Object.keys(WEAPON_COLOR_MAP)) {
    if (normalized.includes(key)) {
      return WEAPON_COLOR_MAP[key];
    }
  }
  return "#6b7280"; // slate-500 fallback
}

export function getSpeciesIcon(species: string) {
  const normalized = normalizeToken(species);
  for (const key of Object.keys(SPECIES_ICON_MAP)) {
    if (normalized.includes(key)) {
      return SPECIES_ICON_MAP[key];
    }
  }
  return "🎯";
}
