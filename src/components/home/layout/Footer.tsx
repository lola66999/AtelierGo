"use client";

import Link from "next/link";
import { Scissors } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-16 border-t border-cream-dark bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6" />
            <span className="font-heading text-2xl font-bold text-white">
              Atelier<span className="text-brand-300">Go</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-brand-200">
            {t("footer.about")}
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white">{t("footer.pages")}</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/tailors" className="hover:text-white">
                {t("nav.tailors")}
              </Link>
            </li>
            <li>
              <Link href="/map" className="hover:text-white">
                {t("nav.map")}
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="hover:text-white">
                {t("nav.favorites")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white">
            {t("footer.forTailors")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/register?role=tailor" className="hover:text-white">
                {t("nav.becomeTailor")}
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-white">
                {t("footer.dashboard")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 py-4 text-center text-xs text-brand-300">
        © {new Date().getFullYear()} AtelierGo. {t("footer.rights")}
      </div>
    </footer>
  );
}