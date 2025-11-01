import { Suspense } from "react";
import BetaCalendarPageContent from "@/components/beta/BetaCalendarPageContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function BetaCalendarPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BetaCalendarPageContent />
    </Suspense>
  );
}
