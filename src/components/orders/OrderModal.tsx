"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCreateOrder } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/format";
import { Service } from "@/services/types";
type Props = {
  tailorId: string;
  tailorName: string;
  services: Service[];
  onClose: () => void;
};

const OTHER = "Boshqa xizmat";
const input =
  "w-full rounded-xl border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-brand-500";

export default function OrderModal({
  tailorId,
  tailorName,
  services,
  onClose,
}: Props) {
  const { user } = useAuth();
  const create = useCreateOrder();

  const [service, setService] = useState(services[0]?.name ?? OTHER);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (description.trim().length < 10) {
      setError("Nima kerakligini batafsilroq yozing (kamida 10 ta belgi)");
      return;
    }
    setError("");
    create.mutate(
      {
        user,
        payload: {
          tailorId,
          tailorName,
          service,
          description: description.trim(),
          budget: budget ? Number(budget) : undefined,
          dueDate: dueDate || undefined,
        },
      },
      { onSuccess: () => setSent(true) }
    );
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-heading text-2xl font-bold text-brand-900">
            Buyurtma berish
          </h2>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="rounded-full p-1.5 hover:bg-brand-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <p className="mt-3 font-medium text-ink">So'rov yuborildi!</p>
            <p className="mt-1 text-sm text-ink/60">
              {tailorName} javob bergach, holatini "Buyurtmalar" bo'limida
              ko'rasiz.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-brand-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
            >
              Yopish
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <p className="text-sm text-ink/60">Tikuvchi: {tailorName}</p>

            <label className="block text-sm">
              <span className="mb-1 block text-ink/70">Xizmat</span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={input}
              >
                {services.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({formatPrice(s.price)})
                  </option>
                ))}
                <option value={OTHER}>{OTHER}</option>
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-ink/70">Nima kerak?</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Masalan: to'y uchun atlas ko'ylak, rasm bor, o'lchamlarim 46"
                className={input}
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm">
                <span className="mb-1 block text-ink/70">Byudjet (so'm)</span>
                <input
                  type="number"
                  min={0}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ixtiyoriy"
                  className={input}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-ink/70">Kerakli sana</span>
                <input
                  type="date"
                  min={today}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={input}
                />
              </label>
            </div>

            <p className="text-xs text-ink/50">
              Tikuvchi sizning ismingiz va telefon raqamingizni ko'radi.
            </p>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={create.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 font-medium text-white hover:bg-brand-800 disabled:opacity-60"
            >
              {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              So'rov yuborish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}