"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, LogOut, MapPin, Menu, Scissors, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import type { TKey } from "@/i18n/dictionary";

const links: { href: string; key: TKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/tailors", key: "nav.tailors" },
  { href: "/map", key: "nav.map" },
  { href: "/favorites", key: "nav.favorites" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, ready, logout } = useAuth();
  const { t } = useLang();

  const navLinks =
    user?.role === "client"
      ? [...links, { href: "/orders", key: "nav.orders" as TKey }]
      : links;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const accountHref =
    user?.role === "tailor"
      ? "/dashboard"
      : user?.role === "admin"
      ? "/admin"
      : "/favorites";

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="h-7 w-7 text-brand-700" />
          <div className="leading-tight">
            <span className="block font-heading text-2xl font-bold text-brand-800">
              Atelier<span className="text-brand-500">Go</span>
            </span>
            <span className="hidden text-[10px] text-ink/60 sm:block">
              {t("nav.tagline")}
            </span>
          </div>
        </Link>

        {/* Desktop menyu */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-brand-700 text-white"
                  : "text-ink/80 hover:bg-brand-100"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        {/* O'ng tomon */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden items-center gap-1 px-2 py-2 text-sm text-ink/70 lg:flex">
            <MapPin className="h-4 w-4 text-brand-700" />
            {t("nav.city")}
          </span>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link
            href="/favorites"
            aria-label={t("nav.favorites")}
            className="rounded-full p-2 text-brand-700 hover:bg-brand-100"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {ready && !user && (
            <Link
              href="/register?role=tailor"
              className="hidden text-sm font-medium text-brand-700 hover:underline xl:block"
            >
              {t("nav.becomeTailor")}
            </Link>
          )}

          {ready &&
            (user ? (
              <div className="flex items-center gap-1">
                <Link
                  href={accountHref}
                  className="hidden rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 sm:block"
                >
                  {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  aria-label={t("nav.logout")}
                  className="rounded-full p-2 text-brand-700 hover:bg-brand-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-brand-700 px-5 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-700 hover:text-white"
              >
                {t("nav.login")}
              </Link>
            ))}

          <button
            onClick={() => setOpen(!open)}
            aria-label={t("nav.menu")}
            className="rounded-full p-2 text-brand-700 hover:bg-brand-100 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      {open && (
        <nav className="border-t border-cream-dark bg-cream px-4 py-3 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                isActive(l.href)
                  ? "bg-brand-700 text-white"
                  : "text-ink/80 hover:bg-brand-100"
              }`}
            >
              {t(l.key)}
            </Link>
          ))}

          {ready && !user && (
            <Link
              href="/register?role=tailor"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-brand-700 hover:bg-brand-100"
            >
              {t("nav.becomeTailor")}
            </Link>
          )}

          <div className="mt-3 flex justify-center sm:hidden">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}