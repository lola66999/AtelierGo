export type GeoResult = { lat: number; lng: number; approx: boolean };


// Toshkent atrofi: natijalarni shu yerga yaqinlashtiradi
const TASHKENT_VIEWBOX = "69.10,41.45,69.45,41.15";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function search(q: string): Promise<{ lat: number; lng: number } | null> {
  const params = new URLSearchParams({
    q,
    format: "json",
    limit: "1",
    countrycodes: "uz",
    viewbox: TASHKENT_VIEWBOX,
    bounded: "0",
  });
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`
  );
  if (!res.ok) throw new Error("Geocoding xatosi");
  const data: { lat: string; lon: string }[] = await res.json();
  if (data.length === 0) return null;
  return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
}

// "tuman", "ko'chasi" kabi so'zlarni olib tashlaydi
const ADMIN = /(tumani|tuman|ko['‘’`ʻʼ]?chasi|ko['‘’`ʻʼ]?cha|mfy|mahallasi|massivi|dahasi|район|улица)/gi;
const clean = (s: string) => s.replace(ADMIN, " ").replace(/\s+/g, " ").trim();
// uy raqamlarini olib tashlaydi: "30", "12a", "5/2"
const stripNumbers = (s: string) =>
  s.replace(/\b\d+[a-zA-Zа-я]?([/-]\d+)?\b/g, " ").replace(/\s+/g, " ").trim();
const withCity = (s: string) =>
  /toshkent|ташкент/i.test(s) ? s : `${s}, Toshkent`;

export async function geocodeAddress(address: string): Promise<GeoResult | null> {
  // BACKEND ULANGANDA: backend orqali Yandex/Google geocoding chaqiriladi
  const full = address.trim();
  if (full.length < 4) return null;

  // "Yakkasaroy tumani Shota Rustaveli 30" -> "Yakkasaroy tumani, Shota Rustaveli 30"
  const normalized = full.replace(/(tumani|tuman|район)\s*,?\s*/gi, "$1, ");
  const parts = normalized.split(",").map((p) => p.trim()).filter(Boolean);

  // [qidiruv matni, taxminiymi]
  const tries: [string, boolean][] = [
    [withCity(full), false],
    [withCity(stripNumbers(full)), false],
  ];

  // Oxirgi qism odatda ko'cha, birinchisi tuman: ko'chadan tumanga qarab
  for (let i = parts.length - 1; i >= 0; i--) {
    const isDistrict = /tuman|район/i.test(parts[i]);
    const c = clean(stripNumbers(parts[i]));
    if (c.length >= 3) tries.push([withCity(c), isDistrict]);
  }

  // Takrorlarni olib tashlab, ko'pi bilan 4 ta urinish
  const seen = new Set<string>();
  const unique = tries.filter(([q]) => {
    const key = q.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  for (let i = 0; i < Math.min(unique.length, 4); i++) {
    if (i > 0) await sleep(1100); // Nominatim: sekundiga 1 ta so'rov
    const [q, approx] = unique[i];
    const found = await search(q);
    if (found) return { ...found, approx };
  }
  return null;
}