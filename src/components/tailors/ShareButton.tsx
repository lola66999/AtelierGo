"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Send, Share2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function ShareButton({ id, name }: { id: string; name: string }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tashqariga bosilsa, menyu yopiladi
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const url = () => `${window.location.origin}/tailors/${id}`;
  const text = t("share.text", { name });

  const toTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url())}&text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setOpen(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: name, text, url: url() });
    } catch {}
    setOpen(false);
  };

  const canNative = typeof navigator !== "undefined" && "share" in navigator;
  const item =
    "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-ink/80 hover:bg-brand-50";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label={t("share.button")}
        className="flex items-center gap-1.5 rounded-full border border-cream-dark px-3.5 py-2.5 text-sm text-brand-700 hover:bg-brand-50"
      >
        <Share2 className="h-5 w-5" />
        <span className="hidden sm:inline">{t("share.button")}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-2xl border border-cream-dark bg-white p-1.5 shadow-lg">
          <button onClick={toTelegram} className={item}>
            <Send className="h-4 w-4 text-brand-600" />
            Telegram
          </button>
          <button onClick={copy} className={item}>
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-brand-600" />
            )}
            {copied ? t("share.copied") : t("share.copy")}
          </button>
          {canNative && (
            <button onClick={nativeShare} className={item}>
              <Share2 className="h-4 w-4 text-brand-600" />
              {t("share.more")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}