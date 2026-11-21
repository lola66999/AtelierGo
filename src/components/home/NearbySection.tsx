"use client";

import Link from "next/link";
import { useState } from "react";
import { LocateFixed } from "lucide-react";
import { useTailors } from "@/hooks/useTailors";
import TailorCard from "@/components/tailors/TailorCard";

// Standart markaz: Toshkent
const TASHKENT = { lat: 41.3111, lng: 69.2797 };

export default function NearbySection() {
  const [coords, setCoords] = useState(TASHKENT);
  const [located, setLocated] = useState(false);
  const [error, setError] = useState("");

  const { data, isLoading } = useTailors({
    lat: coords.lat,
    lng: coords.lng,
    sortBy: "distance",
  });

  const locate = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("Brauzeringiz lokatsiyani qo'llab-quvvatlamaydi");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocated(true);
      },
      () => setError("Lokatsiyaga ruxsat berilmadi"),
      { timeout: 10000 }
    );
  };

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-bold text-brand-900 md:text-3xl">
            Yaqin atelyelar
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            {located
              ? "Sizning joylashuvingizga eng yaqin tikuvchilar"
              : "Toshkent markaziga nisbatan masofa ko'rsatilgan"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={locate}
            className="flex items-center gap-2 rounded-full border border-brand-700 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            <LocateFixed className="h-4 w-4" />
            Joylashuvimni aniqlash
          </button>
          <Link
            href="/tailors"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Barchasini ko'rish →
          </Link>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl bg-cream-dark" />
          ))}
        {data?.slice(0, 4).map((t) => (
          <TailorCard key={t.id} tailor={t} />
        ))}
      </div>
    </section>
  );
}