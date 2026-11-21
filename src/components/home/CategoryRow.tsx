"use client";

import Link from "next/link";
import {
  Briefcase,
  Crown,
  Gem,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useCategories } from "@/hooks/useTailors";

const icons: Record<string, LucideIcon> = {
  Briefcase,
  Shirt,
  Sparkles,
  Crown,
  Ruler,
  Scissors,
  Gem,
};

export default function CategoryRow() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="mx-auto mt-8 max-w-7xl px-4 md:px-6">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {isLoading &&
          Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-cream-dark" />
          ))}

        {categories?.map((c) => {
          const Icon = icons[c.icon] ?? Scissors;
          return (
            <Link
              key={c.id}
              href={`/tailors?category=${c.id}`}
              className="flex flex-col items-center gap-3 rounded-2xl border border-cream-dark bg-white px-2 py-5 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
            >
              <span className="rounded-full bg-brand-50 p-3 text-brand-700">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-medium text-ink md:text-sm">
                {c.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}