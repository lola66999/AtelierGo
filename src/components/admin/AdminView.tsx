"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BadgeCheck, Clock, Scissors, Trash2, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteTailor, getAdminData, setVerified } from "@/services/admin";

const roleLabel = { client: "Mijoz", tailor: "Tikuvchi", admin: "Admin" } as const;

export default function AdminView() {
  const qc = useQueryClient();
  const { user, ready } = useAuth();
  const [tab, setTab] = useState<"tailors" | "users">("tailors");
  const isAdmin = user?.role === "admin";

  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdminData,
    enabled: isAdmin,
  });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin"] });
    qc.invalidateQueries({ queryKey: ["tailors"] });
    qc.invalidateQueries({ queryKey: ["tailor"] });
  };

  const verify = useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) =>
      setVerified(id, value),
    onSuccess: refresh,
  });

  const remove = useMutation({ mutationFn: deleteTailor, onSuccess: refresh });

  if (!ready) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-96 animate-pulse rounded-3xl bg-cream-dark" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-900">
          Ruxsat yo'q
        </h1>
        <p className="mt-3 text-ink/70">Bu sahifa faqat admin uchun.</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-white"
        >
          Kirish
        </Link>
      </div>
    );
  }

  const real = data?.tailors.filter((t) => !t.demo) ?? [];
  const stats = [
    { label: "Jami tikuvchilar", value: data?.tailors.length ?? 0, Icon: Scissors },
    { label: "Tasdiqlangan", value: data?.tailors.filter((t) => t.verified).length ?? 0, Icon: BadgeCheck },
    { label: "Tasdiqlash kutilmoqda", value: real.filter((t) => !t.verified).length, Icon: Clock },
    { label: "Foydalanuvchilar", value: data?.users.length ?? 0, Icon: Users },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-900">
        Admin panel
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
            <Icon className="h-6 w-6 text-brand-600" />
            <p className="mt-3 font-heading text-3xl font-bold text-brand-900">
              {value}
            </p>
            <p className="mt-1 text-sm text-ink/70">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        {(
          [
            { id: "tailors", label: "Tikuvchilar" },
            { id: "users", label: "Foydalanuvchilar" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              tab === t.id
                ? "bg-brand-700 text-white"
                : "bg-white text-ink/80 hover:bg-brand-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl bg-white p-4 shadow-sm md:p-6">
        {!data && <div className="h-40 animate-pulse rounded-2xl bg-cream-dark" />}

        {data && tab === "tailors" && (
          <ul className="divide-y divide-cream-dark">
            {data.tailors.map((t) => (
              <li key={t.id} className="flex flex-wrap items-center gap-3 py-4">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/tailors/${t.id}`}
                    className="font-medium text-ink hover:text-brand-700"
                  >
                    {t.name || "Ismsiz"}
                  </Link>
                  <p className="truncate text-xs text-ink/60">
                    {t.address || "Manzil kiritilmagan"} · {t.phone}
                  </p>
                </div>

                {t.demo ? (
                  <span className="rounded-full bg-cream-dark px-3 py-1 text-xs text-ink/60">
                    Demo
                  </span>
                ) : (
                  <>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        t.verified
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {t.verified ? "Tasdiqlangan" : "Kutilmoqda"}
                    </span>
                    <button
                      onClick={() => verify.mutate({ id: t.id, value: !t.verified })}
                      className="rounded-full border border-brand-700 px-4 py-1.5 text-sm text-brand-700 hover:bg-brand-50"
                    >
                      {t.verified ? "Bekor qilish" : "Tasdiqlash"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`"${t.name}" profilini o'chirasizmi?`)) {
                          remove.mutate(t.id);
                        }
                      }}
                      aria-label="O'chirish"
                      className="rounded-full p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {data && tab === "users" && (
          <ul className="divide-y divide-cream-dark">
            {data.users.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-ink/60">{u.phone}</p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-800">
                  {roleLabel[u.role]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}