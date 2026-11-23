"use client";

import { useEffect, useState } from "react";
import { dayNames, todayIndex } from "@/lib/hours";
import { WorkingHours } from "@/services/types";
export default function WorkingHoursCard({ hours }: { hours: WorkingHours }) {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => setToday(todayIndex()), []);

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="font-heading text-2xl font-bold text-brand-900">
        Ish vaqti
      </h2>
      <ul className="mt-3 divide-y divide-cream-dark">
        {hours.map((d, i) => (
          <li
            key={i}
            className={`flex justify-between py-2.5 text-sm ${
              today === i ? "font-semibold text-brand-800" : "text-ink/75"
            }`}
          >
            <span>{dayNames[i]}</span>
            <span>{d.open ? `${d.from} – ${d.to}` : "Dam olish"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}