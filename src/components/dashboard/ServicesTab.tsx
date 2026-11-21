"use client";

import { Plus, Trash2 } from "lucide-react";
import { Service, Tailor } from "@/services/types";

type Props = {
  draft: Tailor;
  update: (patch: Partial<Tailor>) => void;
};

const input =
  "rounded-xl border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-brand-500";

export default function ServicesTab({ draft, update }: Props) {
  const setService = (i: number, patch: Partial<Service>) =>
    update({
      services: draft.services.map((s, idx) =>
        idx === i ? { ...s, ...patch } : s
      ),
    });

  return (
    <div className="space-y-3">
      {draft.services.length === 0 && (
        <p className="rounded-2xl bg-brand-50 p-5 text-sm text-brand-800">
          Hali xizmat qo'shilmagan. Masalan: "Ko'ylak tikish: 250 000 so'm".
        </p>
      )}

      {draft.services.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={s.name}
            onChange={(e) => setService(i, { name: e.target.value })}
            placeholder="Xizmat nomi"
            className={`${input} flex-1`}
          />
          <input
            type="number"
            min={0}
            value={s.price || ""}
            onChange={(e) => setService(i, { price: Number(e.target.value) })}
            placeholder="Narx (so'm)"
            className={`${input} w-36`}
          />
          <button
            onClick={() =>
              update({ services: draft.services.filter((_, idx) => idx !== i) })
            }
            aria-label="O'chirish"
            className="rounded-xl p-3 text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}

      <button
        onClick={() =>
          update({ services: [...draft.services, { name: "", price: 0 }] })
        }
        className="flex items-center gap-2 rounded-full border border-brand-700 px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" />
        Xizmat qo'shish
      </button>
    </div>
  );
}