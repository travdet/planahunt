"use client";

import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

type Props = {
  wmaId: string;
  className?: string;
};

export default function FavoriteButton({ wmaId, className = "" }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(wmaId);

  return (
    <button
      type="button"
      className={`rounded-full p-2 transition-colors hover:bg-slate-100 ${className}`}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(wmaId);
      }}
    >
      <Star
        className={active ? "h-5 w-5 fill-yellow-400 text-yellow-500" : "h-5 w-5 text-slate-400"}
        aria-hidden
      />
    </button>
  );
}
