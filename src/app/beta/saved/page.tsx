import { Suspense } from "react";
import BetaSavedPageContent from "@/components/beta/BetaSavedPageContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BetaSavedPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BetaSavedPageContent />
    </Suspense>
  );
}
