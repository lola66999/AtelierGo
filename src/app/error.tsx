"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <TriangleAlert className="h-12 w-12 text-brand-500" />
      <h1 className="mt-4 font-heading text-3xl font-bold text-brand-900">
        Nimadir xato ketdi
      </h1>
      <p className="mt-3 text-ink/70">
        Kutilmagan xatolik yuz berdi. Qayta urinib ko'ring.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-brand-700 px-6 py-2.5 font-medium text-white hover:bg-brand-800"
      >
        Qayta urinish
      </button>
    </div>
  );
}