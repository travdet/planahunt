"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

type Props = {
  wmaId: string;
  wmaName: string;
};

export default function ShareButton({ wmaId, wmaName }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/hunt/${encodeURIComponent(wmaId)}`;
    const payload = {
      title: wmaName,
      text: `Plan a hunt at ${wmaName}`,
      url
    };

    if (navigator.share && navigator.canShare?.(payload)) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn("Share failed", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden /> : <Share2 className="h-4 w-4" aria-hidden />}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
