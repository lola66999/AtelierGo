const onlyDigits = (v: string) => v.replace(/\D/g, "");

// "+998 90 123 45 67", "90 123 45 67", "998901234567" -> "+998901234567"
export function normalizePhone(value: string): string | null {
  let d = onlyDigits(value);
  if (d.startsWith("998") && d.length === 12) d = d.slice(3);
  if (d.length !== 9) return null;
  return "+998" + d;
}

export const isValidPhone = (v: string) => normalizePhone(v) !== null;

// "+998901234567" -> "+998 90 123 45 67"
export function formatPhone(value: string): string {
  const n = normalizePhone(value);
  if (!n) return value;
  return `+998 ${n.slice(4, 6)} ${n.slice(6, 9)} ${n.slice(9, 11)} ${n.slice(11)}`;
}

export const isValidTelegram = (v: string) => /^[A-Za-z0-9_]{5,32}$/.test(v);