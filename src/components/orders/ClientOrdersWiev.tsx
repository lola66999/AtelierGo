"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ClipboardList } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useClientOrders } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/format";
import { statusLabel, statusStyle } from "@/lib/orderStatus";

export default function ClientOrdersView() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const { data: orders = [], isLoading } = useClientOrders(
    user?.role === "client" ? user.id : undefined
  );

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) return null;

  if (user.role !== "client") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-ink/70">Bu sahifa mijozlar uchun.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-900">
        Mening buyurtmalarim
      </h1>

      <div className="mt-6 space-y-3">
        {isLoading && <div className="h-28 animate-pulse rounded-2xl bg-cream-dark" />}

        {!isLoading && orders.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-brand-300" />
            <p className="mt-3 text-ink/70">Hali buyurtmalar yo'q.</p>
            <Link
              href="/tailors"
              className="mt-5 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-white hover:bg-brand-800"
            >
              Tikuvchi topish
            </Link>
          </div>
        )}

        {orders.map((o) => (
          <article key={o.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <Link
                href={`/tailors/${o.tailorId}`}
                className="font-medium text-ink hover:text-brand-700"
              >
                {o.tailorName}
              </Link>
              <span
                className={`rounded-full px-3 py-1 text-xs ${statusStyle[o.status]}`}
              >
                {statusLabel[o.status]}
              </span>
            </div>
            <p className="mt-2 text-sm">
              <b className="text-brand-800">{o.service}</b>
            </p>
            <p className="mt-1 text-sm text-ink/75">{o.description}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 text-xs text-ink/50">
              <span>{new Date(o.createdAt).toLocaleDateString("ru-RU")}</span>
              {o.budget !== undefined && <span>Byudjet: {formatPrice(o.budget)}</span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}