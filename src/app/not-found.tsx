import { Suspense } from "react";
import NotFoundContent from "@/components/NotFoundContent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function NotFound() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NotFoundContent />
    </Suspense>
  );
}
