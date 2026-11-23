"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  Check,
  Clock,
  Image as ImageIcon,
  Inbox,
  Loader2,
  Scissors,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTailorOrders } from "@/hooks/useOrders";
import { getMyProfile, saveMyProfile } from "@/services/dashboard";
import ProfileTab from "@/components/dashboard/ProfileTab";
import ServicesTab from "@/components/dashboard/ServicesTab";
import PortfolioTab from "@/components/dashboard/PortfolioTab";
import HoursTab from "./HoursTab";
import OrdersTab from "@/components/dashboard/OrdersTab";
import StatsTab from "@/components/dashboard/StatsTab";
import { Tailor } from "@/services/types";
const tabs = [
  { id: "profile", label: "Profil", Icon: UserIcon },
  { id: "services", label: "Xizmatlar", Icon: Scissors },
  { id: "portfolio", label: "Portfolio", Icon: ImageIcon },
  { id: "hours", label: "Ish vaqti", Icon: Clock },
  { id: "orders", label: "So'rovlar", Icon: Inbox },
  { id: "stats", label: "Statistika", Icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function DashboardView() {
  const router = useRouter();
  const qc = useQueryClient();
  const { user, ready } = useAuth();
  const [tab, setTab] = useState<TabId>("profile");
  const [draft, setDraft] = useState<Tailor | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  const { data } = useQuery({
    queryKey: ["my-profile", user?.id],
    queryFn: () => getMyProfile(user!),
    enabled: !!user && user.role === "tailor",
  });

  useEffect(() => {
    if (data) setDraft(data);
  }, [data]);

  const save = useMutation({
    mutationFn: saveMyProfile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tailors"] });
      qc.invalidateQueries({ queryKey: ["tailor"] });
      setSaved(true);
      setError("");
      setTimeout(() => setSaved(false), 2500);
    },
    onError: () =>
      setError(
        "Saqlab bo'lmadi. Rasmlar hajmi katta bo'lishi mumkin, ba'zilarini o'chirib ko'ring."
      ),
  });

  // Tikuvchiga kelgan so'rovlar (hook'lar early return'dan oldin turishi shart)
  const { data: orders = [] } = useTailorOrders(
    user?.role === "tailor" ? user.id : undefined
  );
  const newCount = orders.filter((o) => o.status === "new").length;

  if (!ready || (user && !draft && user.role === "tailor")) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="h-96 animate-pulse rounded-3xl bg-cream-dark" />
      </div>
    );
  }

  if (!user) return null;

  if (user.role !== "tailor") {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-900">
          Kabinet faqat tikuvchilar uchun
        </h1>
        <p className="mt-3 text-ink/70">
          Tikuvchi sifatida ro'yxatdan o'tish uchun yangi hisob yarating.
        </p>
        <Link
          href="/register?role=tailor"
          className="mt-6 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-white"
        >
          Ro'yxatdan o'tish
        </Link>
      </div>
    );
  }

  if (!draft) return null;

  const update = (patch: Partial<Tailor>) =>
    setDraft((d) => (d ? { ...d, ...patch } : d));

  const missing: string[] = [];
  if (!draft.avatar) missing.push("profil rasmi");
  if (!draft.address.trim()) missing.push("manzil");
  if (!draft.phone.trim()) missing.push("telefon");
  const published = missing.length === 0;

  // Saqlash tugmasi faqat tahrirlanadigan tablarda ko'rinadi
  const showSave = tab !== "stats" && tab !== "orders";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-900">
            Tikuvchi kabineti
          </h1>
          <p className="mt-1 text-sm text-ink/60">Salom, {user.name}!</p>
        </div>
        {published && (
          <Link
            href={`/tailors/${draft.id}`}
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Profilimni ko'rish →
          </Link>
        )}
      </div>

      {!published && (
        <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
          Profilingiz ro'yxatda ko'rinishi uchun to'ldiring:{" "}
          <b>{missing.join(", ")}</b>.
        </div>
      )}

      <div className="mt-6 flex gap-2 overflow-x-auto">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
              tab === id
                ? "bg-brand-700 text-white"
                : "bg-white text-ink/80 hover:bg-brand-100"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {id === "orders" && newCount > 0 && (
              <span className="rounded-full bg-amber-400 px-2 text-xs font-bold text-white">
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm md:p-8">
        {tab === "profile" && <ProfileTab draft={draft} update={update} />}
        {tab === "services" && <ServicesTab draft={draft} update={update} />}
        {tab === "portfolio" && <PortfolioTab draft={draft} update={update} />}
        {tab === "hours" && <HoursTab draft={draft} update={update} />}
        {tab === "orders" && <OrdersTab orders={orders} />}
        {tab === "stats" && <StatsTab />}
      </div>

      {showSave && (
        <div className="mt-5 flex items-center justify-end gap-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-700">
              <Check className="h-4 w-4" /> Saqlandi
            </span>
          )}
          <button
            onClick={() => save.mutate(draft)}
            disabled={save.isPending}
            className="flex items-center gap-2 rounded-full bg-brand-700 px-8 py-3 font-medium text-white hover:bg-brand-800 disabled:opacity-60"
          >
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Saqlash
          </button>
        </div>
      )}
    </div>
  );
}