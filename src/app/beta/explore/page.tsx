import { Suspense } from "react";
import BetaExplorePageContent from "@/components/beta/BetaExplorePageContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BetaExplorePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BetaExplorePageContent />
    </Suspense>
  );
}
