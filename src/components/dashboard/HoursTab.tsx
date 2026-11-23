"use client";

import { defaultHours, dayNames } from "@/lib/hours";
// import type { DaySchedule, Tailor } from "/types";

import { Tailor, DaySchedule } from "@/services/types";

type Props = {
  draft: Tailor;
  update: (patch: Partial<Tailor>) => void;
};

const timeInput =
  "rounded-xl border border-cream-dark bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 disabled:opacity-40";

export default function HoursTab({ draft, update }: Props) {
  const hours = draft.workingHours ?? defaultHours();

  const setDay = (i: number, patch: Partial<DaySchedule>) =>
    update({
      workingHours: hours.map((d, idx) => (idx === i ? { ...d, ...patch } : d)),
    });

  // Dushanbadagi vaqtni barcha ish kunlariga qo'llash
  const copyMonday = () =>
    update({
      workingHours: hours.map((d, i) =>
        i === 0 || !d.open ? d : { ...d, from: hours[0].from, to: hours[0].to }
      ),
    });

  return (
    <div>
      <p className="mb-4 text-sm text-ink/60">
        Mijozlar ish vaqtingizni ko'radi, profilingizda "Ochiq" yoki "Yopiq"
        belgisi chiqadi. Vaqtlarni tekshirib chiqing.
      </p>

      <ul className="space-y-2">
        {hours.map((d, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-cream-dark p-3"
          >
            <label className="flex w-40 cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={d.open}
                onChange={(e) => setDay(i, { open: e.target.checked })}
                className="h-4 w-4 accent-[#962544]"
              />
              {dayNames[i]}
            </label>

            {d.open ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={d.from}
                  onChange={(e) => setDay(i, { from: e.target.value })}
                  className={timeInput}
                />
                <span className="text-ink/50">–</span>
                <input
                  type="time"
                  value={d.to}
                  onChange={(e) => setDay(i, { to: e.target.value })}
                  className={timeInput}
                />
              </div>
            ) : (
              <span className="text-sm text-ink/50">Dam olish kuni</span>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={copyMonday}
        className="mt-4 rounded-full border border-brand-700 px-5 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
      >
        Dushanbadagi vaqtni barcha ish kunlariga qo'llash
      </button>
    </div>
  );
}