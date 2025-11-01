import type { AccessProfile } from "./types";

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

export function getAreaCategoryStyle(category: string) {
  switch (category) {
    case "WMA":
      return {
        color: "#22c55e",
        bgColor: "#dcfce7",
        textColor: "#166534",
        label: "WMA"
      } as const;
    case "Federal":
      return {
        color: "#3b82f6",
        bgColor: "#dbeafe",
        textColor: "#1e40af",
        label: "Federal"
      } as const;
    case "State Park":
      return {
        color: "#ef4444",
        bgColor: "#fee2e2",
        textColor: "#991b1b",
        label: "State Park"
      } as const;
    case "VPA":
      return {
        color: "#a855f7",
        bgColor: "#f3e8ff",
        textColor: "#6b21a8",
        label: "VPA"
      } as const;
    default:
      return {
        color: "#6b7280",
        bgColor: "#f3f4f6",
        textColor: "#374151",
        label: "Area"
      } as const;
  }
}

export function getAccessBadgeStyle(profile: AccessProfile) {
  switch (profile) {
    case "general":
      return {
        color: "#10B981",
        bgColor: "#D1FAE5",
        textColor: "#065F46",
        icon: "✓",
        label: "General access"
      } as const;
    case "quota":
      return {
        color: "#F59E0B",
        bgColor: "#FEF3C7",
        textColor: "#92400E",
        icon: "🎟️",
        label: "Quota hunt"
      } as const;
    case "mixed":
      return {
        color: "#6366F1",
        bgColor: "#E0E7FF",
        textColor: "#312E81",
        icon: "◐",
        label: "Mixed access"
      } as const;
    default:
      return {
        color: "#6B7280",
        bgColor: "#F3F4F6",
        textColor: "#374151",
        icon: "–",
        label: "No seasons"
      } as const;
  }
}
