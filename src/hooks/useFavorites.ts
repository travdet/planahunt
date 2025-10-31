"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "favorite_wmas";

type Listener = (favorites: string[]) => void;

const listeners = new Set<Listener>();

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch (error) {
    console.warn("Failed to parse favorites", error);
    return [];
  }
}

function writeFavorites(next: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener(next));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readFavorites());

  useEffect(() => {
    const listener: Listener = (next) => setFavorites(next);
    listeners.add(listener);
    setFavorites(readFavorites());
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggleFavorite = (wmaId: string) => {
    setFavorites((current) => {
      const exists = current.includes(wmaId);
      const next = exists ? current.filter((id) => id !== wmaId) : [...current, wmaId];
      writeFavorites(next);
      return next;
    });
  };

  const isFavorite = (wmaId: string) => favorites.includes(wmaId);

  return { favorites, toggleFavorite, isFavorite };
}
