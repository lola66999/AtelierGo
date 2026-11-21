"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { categories } from "@/data/categories";
import { fileToDataUrl } from "@/lib/image";
import LocationPicker from "@/components/dashboard/LocationPickerLoader";
import { Tailor } from "@/services/types";
type Props = {
  draft: Tailor;
  update: (patch: Partial<Tailor>) => void;
};

const input =
  "w-full rounded-xl border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-brand-500";

export default function ProfileTab({ draft, update }: Props) {
  const onAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) update({ avatar: await fileToDataUrl(file, 400) });
  };

  const toggleCategory = (id: string) =>
    update({
      categories: draft.categories.includes(id)
        ? draft.categories.filter((c) => c !== id)
        : [...draft.categories, id],
    });

  return (
    <div className="space-y-6">
      {/* Rasm */}
      <div className="flex items-center gap-4">
        <label className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-2xl bg-cream-dark">
          {draft.avatar ? (
            <Image
              src={draft.avatar}
              alt="Profil rasmi"
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-brand-500">
              <Camera className="h-8 w-8" />
            </span>
          )}
          <input type="file" accept="image/*" onChange={onAvatar} className="hidden" />
        </label>
        <p className="text-sm text-ink/60">
          Profil rasmini yuklang. Rasmsiz profil ro'yxatda ko'rinmaydi.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-ink/70">Ism familiya</span>
          <input
            value={draft.name}
            onChange={(e) => update({ name: e.target.value })}
            className={input}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink/70">Telefon</span>
          <input
            value={draft.phone}
            onChange={(e) => update({ phone: e.target.value })}
            className={input}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink/70">Telegram (@ belgisiz)</span>
          <input
            value={draft.telegram ?? ""}
            onChange={(e) => update({ telegram: e.target.value.replace("@", "") })}
            className={input}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-ink/70">Tajriba (yil)</span>
          <input
            type="number"
            min={0}
            value={draft.experienceYears}
            onChange={(e) => update({ experienceYears: Number(e.target.value) })}
            className={input}
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/70">Manzil</span>
        <input
          value={draft.address}
          onChange={(e) => update({ address: e.target.value })}
          placeholder="Tuman, ko'cha, uy"
          className={input}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-ink/70">O'zingiz haqingizda</span>
        <textarea
          value={draft.bio}
          onChange={(e) => update({ bio: e.target.value })}
          rows={4}
          className={input}
        />
      </label>

      <div>
        <p className="mb-2 text-sm text-ink/70">Yo'nalishlar</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleCategory(c.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                draft.categories.includes(c.id)
                  ? "bg-brand-700 text-white"
                  : "bg-brand-50 text-brand-800 hover:bg-brand-100"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm text-ink/70">
          Atelyeingiz joylashuvi: xaritada joyni bosing
        </p>
        <div className="h-72">
          <LocationPicker
            lat={draft.lat}
            lng={draft.lng}
            onChange={(lat, lng) => update({ lat, lng })}
          />
        </div>
      </div>
    </div>
  );
}