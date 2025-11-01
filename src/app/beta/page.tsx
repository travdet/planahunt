import { Suspense } from "react";
import BetaHomePageContent from "@/components/beta/BetaHomePageContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BetaHomePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BetaHomePageContent />
    </Suspense>
  );
}
