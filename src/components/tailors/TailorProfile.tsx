"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Heart,
  MapPin,
  Phone,
  Send,
  Star,
} from "lucide-react";
import { useTailor } from "@/hooks/useTailors";
import ReviewsSection from "@/components/tailors/ReviewsSection";
import { useFavorites } from "@/hooks/useFavorites";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import PortfolioGallery from "@/components/tailors/PortfolioGallery";
import TailorsMap from "../map/TailorMapLoader";
import OpenBadge from "@/components/tailors/OpenBadge";
import WorkingHoursCard from "@/components/tailors/WorkingHoursCard";
import OrderButton from "@/components/orders/OrderButton";
import ShareButton from "@/components/tailors/ShareButton";

export default function TailorProfile({ id }: { id: string }) {
  const { data: tailor, isLoading } = useTailor(id);
  const { isFavorite, toggle } = useFavorites();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-8 md:px-6">
        <div className="h-48 animate-pulse rounded-3xl bg-cream-dark" />
        <div className="h-64 animate-pulse rounded-3xl bg-cream-dark" />
      </div>
    );
  }

  if (!tailor) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-900">
          Tikuvchi topilmadi
        </h1>
        <Link
          href="/tailors"
          className="mt-6 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-white"
        >
          Atelyelar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const fav = isFavorite(tailor.id);
  const chips = tailor.categories
    .map((cid) => categories.find((c) => c.id === cid)?.name)
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
      <Link
        href="/tailors"
        className="inline-flex items-center gap-1 text-sm text-brand-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Atelyelar
      </Link>

      {/* Yuqori karta */}
      <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row">
          <Image
            src={tailor.avatar}
            alt={tailor.name}
            width={160}
            height={160}
            className="h-36 w-36 shrink-0 rounded-2xl object-cover sm:h-40 sm:w-40"
          />

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <h1 className="flex items-center gap-2 font-heading text-3xl font-bold text-brand-900">
                {tailor.name}
                {tailor.verified && (
                  <BadgeCheck className="h-6 w-6 text-brand-600" />
                )}
              </h1>
              <div className="flex items-center gap-2">
                <ShareButton id={tailor.id} name={tailor.name} />
                <button
                  onClick={() => toggle(tailor.id)}
                  aria-label="Sevimlilarga qo'shish"
                  className="rounded-full border border-cream-dark p-2.5 hover:bg-brand-50"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      fav ? "fill-brand-600 text-brand-600" : "text-brand-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink/70">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <b className="text-ink">{tailor.rating.toFixed(1)}</b>
                {tailor.reviewsCount !== undefined && (
                  <span>({tailor.reviewsCount} sharh)</span>
                )}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-brand-600" />
                {tailor.experienceYears} yillik tajriba
              </span>
              <OpenBadge hours={tailor.workingHours} />
            </div>

            <p className="mt-2 flex items-start gap-1 text-sm text-ink/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {tailor.address}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`tel:${tailor.phone}`}
                className="flex items-center gap-2 rounded-full bg-brand-700 px-6 py-2.5 font-medium text-white hover:bg-brand-800"
              >
                <Phone className="h-4 w-4" />
                {tailor.phone}
              </a>
              {tailor.telegram && (
                <a
                  href={`https://t.me/${tailor.telegram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-brand-700 px-6 py-2.5 font-medium text-brand-700 hover:bg-brand-50"
                >
                  <Send className="h-4 w-4" />
                  Telegram
                </a>
              )}
              <OrderButton
                tailorId={tailor.id}
                tailorName={tailor.name}
                services={tailor.services}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-cream-dark pt-5">
          <h2 className="font-heading text-xl font-semibold text-brand-900">
            Tikuvchi haqida
          </h2>
          <p className="mt-2 text-ink/75">{tailor.bio}</p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Portfolio */}
        <section className="lg:col-span-3">
          <h2 className="mb-3 font-heading text-2xl font-bold text-brand-900">
            Portfolio
          </h2>
          <PortfolioGallery images={tailor.portfolio} name={tailor.name} />
          <ReviewsSection tailorId={tailor.id} />
        </section>
        {/* Narxlar va xarita */}
        <aside className="space-y-6 lg:col-span-2">
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-brand-900">
              Xizmatlar va narxlar
            </h2>
            {tailor.workingHours && (
              <WorkingHoursCard hours={tailor.workingHours} />
            )}
            <ul className="mt-3 divide-y divide-cream-dark">
              {tailor.services.map((s) => (
                <li
                  key={s.name}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <span className="text-ink/80">{s.name}</span>
                  <b className="shrink-0 text-brand-700">
                    {formatPrice(s.price)}
                  </b>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-ink/50">
              Yakuniy narx buyurtma murakkabligiga qarab o'zgarishi mumkin.
            </p>
          </section>

          <section className="rounded-3xl bg-white p-3 shadow-sm">
            <h2 className="px-2 pb-2 pt-2 font-heading text-xl font-bold text-brand-900">
              Joylashuv
            </h2>
            <div className="h-64">
              <TailorsMap
                tailors={[tailor]}
                center={[tailor.lat, tailor.lng]}
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${tailor.lat},${tailor.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block rounded-xl bg-brand-50 py-2.5 text-center text-sm font-medium text-brand-700 hover:bg-brand-100"
            >
              Yo'nalishni ochish
            </a>
          </section>
        </aside>
      </div>
    </div>
  );
}
