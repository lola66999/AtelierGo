"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart, MapPin, Phone, Send, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { formatDistance } from "@/lib/distance";
import { categories } from "@/data/categories";
import { TailorWithDistance } from "@/services/types";
import OpenBadge from "@/components/tailors/OpenBadge";

export default function TailorCard({ tailor }: { tailor: TailorWithDistance }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(tailor.id);

  const chips = tailor.categories
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="flex gap-4 rounded-2xl border border-cream-dark bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link href={`/tailors/${tailor.id}`} className="shrink-0">
        <Image
          src={tailor.avatar}
          alt={tailor.name}
          width={112}
          height={112}
          className="h-28 w-28 rounded-xl object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/tailors/${tailor.id}`}
            className="flex items-center gap-1 truncate font-heading text-lg font-semibold text-ink hover:text-brand-700"
          >
            {tailor.name}
            {tailor.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
            )}
          </Link>
          <button
            onClick={() => toggle(tailor.id)}
            aria-label="Sevimlilarga qo'shish"
            className="rounded-full p-1.5 hover:bg-brand-50"
          >
            <Heart
              className={`h-5 w-5 ${
                fav ? "fill-brand-600 text-brand-600" : "text-brand-400"
              }`}
            />
          </button>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/70">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {tailor.reviewsCount ? (
              <>
                <b className="text-ink">{tailor.rating.toFixed(1)}</b>
                <span>({tailor.reviewsCount})</span>
              </>
            ) : (
              <span>Yangi</span>
            )}
          </span>
          {tailor.distanceKm !== undefined && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-brand-600" />
              {formatDistance(tailor.distanceKm)}
            </span>
          )}
           <OpenBadge hours={tailor.workingHours} />
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-ink/60">
          {tailor.address}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs text-brand-700"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`tel:${tailor.phone}`}
            className="flex items-center gap-1.5 rounded-full bg-brand-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-800"
          >
            <Phone className="h-4 w-4" />
            Qo'ng'iroq
          </a>
          {tailor.telegram && (
            <a
              href={`https://t.me/${tailor.telegram}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-brand-700 px-4 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
