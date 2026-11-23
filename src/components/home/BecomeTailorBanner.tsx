"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function BecomeTailorBanner() {
  const { user, ready } = useAuth();

  // Mijoz va adminga ko'rsatilmaydi
  if (ready && user && user.role !== "tailor") return null;

  const isTailor = user?.role === "tailor";

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6">
      <div className="rounded-3xl bg-brand-800 p-8 text-white md:flex md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {isTailor ? "Profilingizni yangilang" : "Siz tikuvchimisiz?"}
          </h2>
          <p className="mt-2 max-w-lg text-brand-200">
            {isTailor
              ? "Yangi ishlar va narxlarni qo'shing, mijozlar sizni tezroq topadi."
              : "Profil yarating, ishlaringiz portfoliosini joylang va yangi mijozlar toping."}
          </p>
        </div>
        <Link
          href={isTailor ? "/dashboard" : "/register?role=tailor"}
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-medium text-brand-800 hover:bg-brand-100 md:mt-0"
        >
          {isTailor ? "Kabinetga o'tish" : "Tikuvchi bo'lish"}
        </Link>
      </div>
    </section>
  );
}