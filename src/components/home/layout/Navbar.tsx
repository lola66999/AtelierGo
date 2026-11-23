"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { Heart, MapPin, Menu, Scissors, X } from "lucide-react";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/tailors", label: "Atelyelar" },
  { href: "/map", label: "Xarita" },
  { href: "/favorites", label: "Sevimlilar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, ready, logout } = useAuth();
  const navLinks =
  user?.role === "client"
    ? [...links, { href: "/orders", label: "Buyurtmalar" }]
    : links;
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-dark bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Scissors className="h-7 w-7 text-brand-700" />
          <div className="leading-tight">
            <span className="block font-heading text-2xl font-bold text-brand-800">
              Atelier<span className="text-brand-500">Go</span>
            </span>
            <span className="hidden text-[10px] text-ink/60 sm:block">
              Tikuvchilar va atelyelar
            </span>
          </div>
        </Link>

        {/* Desktop menyu */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-brand-700 text-white"
                  : "text-ink/80 hover:bg-brand-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* O'ng tomon */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm text-ink/80 hover:bg-brand-100 sm:flex">
            <MapPin className="h-4 w-4 text-brand-700" />
            Toshkent
          </button>

          <Link
            href="/favorites"
            aria-label="Sevimlilar"
            className="rounded-full p-2 text-brand-700 hover:bg-brand-100"
          >
            <Heart className="h-5 w-5" />
          </Link>

          {ready &&
            (user ? (
              <div className="flex items-center gap-1">
                <Link
                  href={
                    user.role === "tailor"
                      ? "/dashboard"
                      : user.role === "admin"
                        ? "/admin"
                        : "/favorites"
                  }
                  className="hidden rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800 sm:block"
                >
                  {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  aria-label="Chiqish"
                  className="rounded-full p-2 text-brand-700 hover:bg-brand-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-brand-700 px-5 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-700 hover:text-white"
              >
                Kirish
              </Link>
            ))}

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menyu"
            className="rounded-full p-2 text-brand-700 hover:bg-brand-100 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      {open && (
        <nav className="border-t border-cream-dark bg-cream px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                isActive(l.href)
                  ? "bg-brand-700 text-white"
                  : "text-ink/80 hover:bg-brand-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
