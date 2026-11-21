"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useTailors } from "@/hooks/useTailors";
import TailorCard from "@/components/tailors/TailorCard";

export default function FavoritesView() {
  const { ids, ready } = useFavorites();
  const { data, isLoading } = useTailors();

  const favorites = data?.filter((t) => ids.includes(t.id)) ?? [];
  const loading = !ready || isLoading;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-900">
        Sevimlilar
      </h1>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {loading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl bg-cream-dark" />
          ))}

        {!loading && favorites.length === 0 && (
          <div className="col-span-full rounded-3xl bg-white p-12 text-center">
            <Heart className="mx-auto h-10 w-10 text-brand-300" />
            <p className="mt-3 text-ink/70">
              Hali sevimli atelyelar yo'q. Yoqqan tikuvchini yurakcha bilan
              belgilang.
            </p>
            <Link
              href="/tailors"
              className="mt-5 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-white hover:bg-brand-800"
            >
              Atelyelarni ko'rish
            </Link>
          </div>
        )}

        {favorites.map((t) => (
          <TailorCard key={t.id} tailor={t} />
        ))}
      </div>
    </div>
  );
}