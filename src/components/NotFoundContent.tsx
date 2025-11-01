'use client';

import { useRouter } from "next/navigation";
import { MapPinOff } from "lucide-react";

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <MapPinOff className="mx-auto h-16 w-16 text-gray-400" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Page not found</h1>
          <p className="text-gray-600">
            The page you are looking for may have been moved. Try exploring available WMAs or return to your previous page.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.push("/explore")}
            className="w-full sm:w-auto rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Browse areas
          </button>
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto rounded-lg border-2 border-stone-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-600"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
