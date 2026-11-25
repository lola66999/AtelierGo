"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Scissors, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/services/types";
import { useSearchParams } from "next/navigation";
import { normalizePhone } from "@/lib/phone";

// "90 123 45 67" -> "+998901234567"
// const normalizePhone = (value: string) => {
//   const digits = value.replace(/\D/g, "");
//   return "+998" + digits.slice(-9);
// };

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const { login, register } = useAuth();
  const isRegister = mode === "register";
  const params = useSearchParams();
  const [role, setRole] = useState<UserRole>(
    params.get("role") === "tailor" ? "tailor" : "client",
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const normalized = normalizePhone(phone);
  if (!normalized) {
    setError("Telefon raqamni to'liq kiriting (masalan, 90 123 45 67)");
    return;
  }
  if (password.length < 6) {
    setError("Parol kamida 6 ta belgidan iborat bo'lsin");
    return;
  }
  if (isRegister && name.trim().length < 2) {
    setError("Ismingizni kiriting");
    return;
  }

  setLoading(true);
  try {
    const user = isRegister
      ? await register({ name: name.trim(), phone: normalized, password, role })
      : await login({ phone: normalized, password });
    router.push(
      user.role === "tailor" ? "/dashboard" : user.role === "admin" ? "/admin" : "/"
    );
  } catch (err) {
    setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full rounded-xl border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-brand-500";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-3xl bg-white p-6 shadow-sm md:p-8">
        <h1 className="font-heading text-3xl font-bold text-brand-900">
          {isRegister ? "Ro'yxatdan o'tish" : "Kirish"}
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          {isRegister
            ? role === "tailor"
              ? "Tikuvchi profilini yarating va yangi mijozlar toping"
              : "AtelierGo'da hisob yarating"
            : "Hisobingizga kiring"}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {isRegister && (
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { value: "client", label: "Mijoz", Icon: UserIcon },
                  { value: "tailor", label: "Tikuvchi", Icon: Scissors },
                ] as const
              ).map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition ${
                    role === value
                      ? "border-brand-700 bg-brand-700 text-white"
                      : "border-cream-dark hover:bg-brand-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          )}

          {isRegister && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ism familiya"
              className={inputClass}
            />
          )}

          <div className="flex items-center rounded-xl border border-cream-dark bg-white focus-within:border-brand-500">
            <span className="pl-4 text-sm text-ink/60">+998</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="numeric"
              placeholder="90 123 45 67"
              className="w-full rounded-xl px-3 py-3 text-sm outline-none"
            />
          </div>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Parol"
            className={inputClass}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 font-medium text-white hover:bg-brand-800 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isRegister ? "Ro'yxatdan o'tish" : "Kirish"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-ink/60">
          {isRegister ? "Hisobingiz bormi?" : "Hisobingiz yo'qmi?"}{" "}
          <Link
            href={isRegister ? "/login" : "/register"}
            className="font-medium text-brand-700 hover:underline"
          >
            {isRegister ? "Kirish" : "Ro'yxatdan o'tish"}
          </Link>
        </p>
      </div>
    </div>
  );
}
