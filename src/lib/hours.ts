import { WorkingHours } from "@/services/types";

export const dayNames = [
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
  "Yakshanba",
];

// Dushanba-Shanba 09:00-18:00, yakshanba dam olish
export const defaultHours = (): WorkingHours =>
  dayNames.map((_, i) => ({ open: i < 6, from: "09:00", to: "18:00" }));

const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
};

// JS'da yakshanba = 0, bizda dushanba = 0
export const todayIndex = (now = new Date()) => (now.getDay() + 6) % 7;

export type OpenStatus = { open: boolean; label: string };

export function getOpenStatus(
  hours: WorkingHours,
  now = new Date()
): OpenStatus {
  const day = hours[todayIndex(now)];
  if (!day || !day.open) return { open: false, label: "Bugun dam olish kuni" };

  const minutes = now.getHours() * 60 + now.getMinutes();
  if (minutes < toMinutes(day.from)) {
    return { open: false, label: `Yopiq · ${day.from} da ochiladi` };
  }
  if (minutes >= toMinutes(day.to)) {
    return { open: false, label: "Yopiq · bugun ish tugadi" };
  }
  return { open: true, label: `Ochiq · ${day.to} gacha` };
}