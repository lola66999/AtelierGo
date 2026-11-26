"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutGrid,
  Ruler,
  Scissors,
  Search,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { useCategories } from "@/hooks/useTailors";
import { useLang } from "@/context/LanguageContext";
import Dropdown from "@/components/ui/Dropdown";
import type { TKey } from "@/i18n/dictionary";

type Slide = {
  image: string;
  gradient: string;
  Icon: LucideIcon;
  title: TKey;
  text: TKey;
  cta?: { href: string; label: TKey };
};

const slides: Slide[] = [
  {
    image: "/banners/banner-1.jpg",
    gradient: "from-brand-100 via-cream-dark to-brand-200",
    Icon: Scissors,
    title: "hero.title",
    text: "hero.subtitle",
  },
  {
    image: "/banners/banner-2.jpg",
    gradient: "from-cream-dark via-brand-100 to-brand-300/60",
    Icon: Shirt,
    title: "hero.s2.title",
    text: "hero.s2.text",
    cta: { href: "/tailors", label: "nav.tailors" },
  },
  {
    image: "/banners/banner-3.jpg",
    gradient: "from-brand-200 via-brand-100 to-cream-dark",
    Icon: ClipboardList,
    title: "hero.s3.title",
    text: "hero.s3.text",
  },
  {
    image: "/banners/banner-4.jpg",
    gradient: "from-brand-100 via-brand-200 to-brand-300/70",
    Icon: Ruler,
    title: "hero.s4.title",
    text: "hero.s4.text",
    cta: { href: "/register?role=tailor", label: "nav.becomeTailor" },
  },
];

const INTERVAL = 5500;

export default function Hero() {
  const router = useRouter();
  const { t } = useLang();
  const { data: categories = [] } = useCategories();

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => setIndex((i + slides.length) % slides.length),
    [],
  );

  // Avtomatik almashish (qo'lda almashtirilganda taymer qayta boshlanadi)
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [paused, index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

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
      <div
        className="relative overflow-hidden rounded-3xl bg-brand-100"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slaydlar: balandlik qat'iy, uzun matn bannerni cho'zmaydi */}
        <div className="relative h-[400px] md:h-[420px]">
          {slides.map((s, i) => (
            <div
              key={s.image}
              inert={i !== index}
              aria-hidden={i !== index}
              className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${s.gradient} transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Matn */}
              <div className="h-full px-6 pb-4 pt-14 md:w-1/2 md:px-12 md:pb-0 md:pt-10">
                <p className="font-script text-3xl text-brand-600">AtelierGo</p>
                <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-brand-900 md:text-5xl">
                  {t(s.title)}
                </h1>
                <p className="mt-4 max-w-md text-sm text-ink/70 md:text-base">
                  {t(s.text)}
                </p>
                {s.cta && (
                  <Link
                    href={s.cta.href}
                    className="mt-5 inline-block rounded-full bg-brand-700 px-7 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
                  >
                    {t(s.cta.label)}
                  </Link>
                )}
              </div>

              {/* O'ng tomon: bezaklar va (bo'lsa) rasm kartochkasi */}
              <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
                <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-brand-300/40" />
                <div className="absolute bottom-24 right-24 h-40 w-40 rounded-full bg-brand-500/30" />
                <s.Icon className="absolute right-20 top-1/2 h-44 w-44 -translate-y-[60%] -rotate-12 text-brand-700/80" />

                <div
                  className={`absolute bottom-24 left-10 right-10 top-10 overflow-hidden rounded-[2rem] border-4 border-white/70 shadow-xl transition-opacity duration-500 ${
                    loaded[s.image] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1280px) 45vw, 560px"
                    className="object-cover"
                    onLoad={(e) => {
                      // Rasm haqiqatan yuklangan bo'lsagina ramka ko'rinadi
                      if (e.currentTarget.naturalWidth > 0) {
                        setLoaded((l) => ({ ...l, [s.image]: true }));
                      }
                    }}
                    onError={() =>
                      setLoaded((l) => ({ ...l, [s.image]: false }))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boshqaruv: strelkalar va nuqtalar bitta kapsulada */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/70 px-1.5 py-1 shadow-sm backdrop-blur">
          <button
            onClick={() => go(index - 1)}
            aria-label={t("hero.prev")}
            className="rounded-full p-1 text-brand-700 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            {slides.map((s, i) => (
              <button
                key={s.image}
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${slides.length}`}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-brand-700"
                    : "w-2 bg-brand-700/30 hover:bg-brand-700/60"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(index + 1)}
            aria-label={t("hero.next")}
            className="rounded-full p-1 text-brand-700 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Qidiruv paneli: telefonda banner ostida, kompyuterda banner ichida pastda */}
        <form
          onSubmit={onSubmit}
          className="relative z-20 m-3 flex flex-col gap-2 rounded-2xl bg-white p-3 shadow-lg md:absolute md:inset-x-12 md:bottom-4 md:m-0 md:flex-row md:items-center"
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
