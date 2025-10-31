"use client";

import { Star } from "lucide-react";

import type { SeasonWithMeta, WMA } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";
import WMACard from "./WMACard";

type Props = {
  wmas: { wma: WMA; rules: SeasonWithMeta[] }[];
  onOpen: (id: string) => void;
};

export default function FavoritesSection({ wmas, onOpen }: Props) {
  const { favorites } = useFavorites();
  if (!favorites.length) return null;

  const favoriteCards = wmas.filter((entry) => favorites.includes(entry.wma.id));
  if (!favoriteCards.length) return null;

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden />
        <h2 className="text-xl font-semibold text-slate-800">My favorites</h2>
        <span className="text-sm text-slate-500">({favoriteCards.length})</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {favoriteCards.map((entry) => (
          <WMACard
            key={entry.wma.id}
            wma={entry.wma}
            matchingRules={entry.rules}
            allRules={entry.rules}
            selectedDate={null}
            distanceMi={null}
            driveMinutes={null}
            onOpen={() => onOpen(entry.wma.id)}
            compact
          />
        ))}
      </div>
    </section>
  );
}
