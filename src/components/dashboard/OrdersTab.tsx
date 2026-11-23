"use client";

import { Phone } from "lucide-react";
import { useUpdateOrder } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/format";
import { statusLabel, statusStyle } from "@/lib/orderStatus";
import { Order } from "@/services/types";

export default function OrdersTab({ orders }: { orders: Order[] }) {
  const update = useUpdateOrder();

  if (orders.length === 0) {
    return (
      <p className="rounded-2xl bg-brand-50 p-6 text-center text-sm text-brand-800">
        Hali so'rovlar yo'q. Profilingiz to'liq bo'lsa, mijozlar buyurtma
        berishni boshlaydi.
      </p>
    );
  }

  const btn = "rounded-full px-5 py-2 text-sm font-medium";

  return (
    <ul className="space-y-3">
      {orders.map((o) => (
        <li key={o.id} className="rounded-2xl border border-cream-dark p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-medium text-ink">{o.clientName}</p>
              <p className="text-xs text-ink/50">
                {new Date(o.createdAt).toLocaleDateString("ru-RU")}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs ${statusStyle[o.status]}`}
            >
              {statusLabel[o.status]}
            </span>
          </div>

          <p className="mt-3 text-sm">
            <b className="text-brand-800">{o.service}</b>
          </p>
          <p className="mt-1 text-sm text-ink/75">{o.description}</p>

          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/60">
            {o.budget !== undefined && <span>Byudjet: {formatPrice(o.budget)}</span>}
            {o.dueDate && (
              <span>
                Kerakli sana: {new Date(o.dueDate).toLocaleDateString("ru-RU")}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`tel:${o.clientPhone}`}
              className={`${btn} flex items-center gap-1.5 border border-brand-700 text-brand-700 hover:bg-brand-50`}
            >
              <Phone className="h-4 w-4" />
              {o.clientPhone}
            </a>

            {o.status === "new" && (
              <>
                <button
                  onClick={() => update.mutate({ id: o.id, status: "accepted" })}
                  className={`${btn} bg-brand-700 text-white hover:bg-brand-800`}
                >
                  Qabul qilish
                </button>
                <button
                  onClick={() => update.mutate({ id: o.id, status: "rejected" })}
                  className={`${btn} text-red-600 hover:bg-red-50`}
                >
                  Rad etish
                </button>
              </>
            )}

            {o.status === "accepted" && (
              <button
                onClick={() => update.mutate({ id: o.id, status: "done" })}
                className={`${btn} bg-green-600 text-white hover:bg-green-700`}
              >
                Bajarildi
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}