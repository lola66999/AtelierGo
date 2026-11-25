"use client";

import { useLang } from "@/context/LanguageContext";
import { LANGS } from "@/i18n/dictionary";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex rounded-full border border-cream-dark bg-white p-0.5">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
            lang === l
              ? "bg-brand-700 text-white"
              : "text-ink/60 hover:text-brand-700"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}