"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutGrid, Scissors, Search } from "lucide-react";
import { useCategories } from "@/hooks/useTailors";
import { useLang } from "@/context/LanguageContext";
import Dropdown from "@/components/ui/Dropdown";
import type { TKey } from "@/i18n/dictionary";

export default function Hero() {
  const router = useRouter();
  const { t } = useLang();
  const { data: categories = [] } = useCategories();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const options = [
    { value: "", label: t("hero.allCategories") },
    ...categories.map((c) => ({
      value: c.id,
      label: t(`cat.${c.id}` as TKey),
    })),
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search.trim()) params.set("search", search.trim());
    router.push(`/tailors?${params.toString()}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 via-cream-dark to-brand-200">
        <div className="grid items-center md:grid-cols-2">
          <div className="p-6 pb-28 md:p-12 md:pb-32">
            <p className="font-script text-3xl text-brand-600">AtelierGo</p>
            <h1 className="mt-2 font-heading text-4xl font-bold leading-tight text-brand-900 md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-md text-ink/70">{t("hero.subtitle")}</p>
          </div>

          <div className="relative hidden h-full min-h-[320px] md:block">
            <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-brand-300/40" />
            <div className="absolute bottom-10 right-24 h-40 w-40 rounded-full bg-brand-500/30" />
            <Scissors className="absolute right-20 top-1/2 h-44 w-44 -translate-y-1/2 -rotate-12 text-brand-700/80" />
          </div>
        </div>

        {/* Qidiruv paneli */}
        <form
          onSubmit={onSubmit}
          className="absolute inset-x-4 bottom-4 flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-lg md:inset-x-12 md:flex-row md:items-center"
        >
          <Dropdown
            value={category}
            onChange={setCategory}
            options={options}
            icon={<LayoutGrid className="h-4 w-4" />}
            placement="top"
            className="md:w-64"
          />

          <div className="flex flex-1 items-center gap-2 rounded-xl border border-cream-dark px-3 focus-within:border-brand-500">
            <Search className="h-4 w-4 text-brand-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("hero.searchPlaceholder")}
              className="w-full py-3 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-brand-700 px-8 py-3 text-sm font-medium text-white hover:bg-brand-800"
          >
            {t("hero.search")}
          </button>
        </form>
      </div>
    </section>
  );
}