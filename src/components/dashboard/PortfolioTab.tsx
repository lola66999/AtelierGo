"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { fileToDataUrl } from "@/lib/image";
import { Tailor } from "@/services/types";

type Props = {
  draft: Tailor;
  update: (patch: Partial<Tailor>) => void;
};

const MAX = 8;

export default function PortfolioTab({ draft, update }: Props) {
  const onFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      MAX - draft.portfolio.length
    );
    const urls = await Promise.all(files.map((f) => fileToDataUrl(f)));
    update({ portfolio: [...draft.portfolio, ...urls] });
    e.target.value = "";
  };

  return (
    <div>
      <p className="mb-4 text-sm text-ink/60">
        Ishlaringiz rasmlarini yuklang ({draft.portfolio.length}/{MAX}).
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {draft.portfolio.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream-dark"
          >
            <Image
              src={src}
              alt={`Ish ${i + 1}`}
              fill
              sizes="200px"
              className="object-cover"
            />
            <button
              onClick={() =>
                update({
                  portfolio: draft.portfolio.filter((_, idx) => idx !== i),
                })
              }
              aria-label="O'chirish"
              className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {draft.portfolio.length < MAX && (
          <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-300 text-brand-600 hover:bg-brand-50">
            <ImagePlus className="h-8 w-8" />
            <span className="text-sm">Rasm qo'shish</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onFiles}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}