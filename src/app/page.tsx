import { Suspense } from "react";
import HomePageContent from "@/components/HomePageContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePageContent />
    </Suspense>
  );
}
