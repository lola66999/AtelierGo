# AtelierGo

Yaqin atrofdagi tikuvchi va atelyelarni topish platformasi. Mijoz o'ziga eng yaqin tikuvchini xaritadan topadi, portfolio va narxlar bilan tanishadi, telefon yoki Telegram orqali bog'lanadi. Tikuvchi esa o'z profilini, xizmatlarini va ishlarini joylaydi.

**Jonli demo:** https://SIZNING-LOYIHA.vercel.app

## Imkoniyatlar

- Bosh sahifa: qidiruv paneli, kategoriyalar, "Yaqin atelyelar"
- Qidiruv va filtrlar: kategoriya, reyting, masofa bo'yicha saralash
- "Menga yaqin": brauzer lokatsiyasi va masofa hisoblash (Haversine formulasi)
- Xarita ko'rinishi (Leaflet + OpenStreetMap), ro'yxat bilan sinxron
- Tikuvchi profili: portfolio galereyasi, xizmatlar va narxlar, joylashuv xaritasi
- Sevimlilar
- Ro'yxatdan o'tish va kirish (mijoz / tikuvchi / admin rollari)
- Tikuvchi kabineti: profil, xizmatlar, portfolio rasmlari, statistika, xaritadan joy tanlash
- Admin panel: tikuvchilarni tasdiqlash, o'chirish, foydalanuvchilar ro'yxati
- Responsive dizayn (telefon va kompyuter)

## Texnologiyalar

Next.js (App Router), TypeScript, Tailwind CSS, TanStack Query, React Leaflet, Axios, Lucide

## Arxitektura

Loyiha **backend ulanishiga tayyor** qilib yozilgan. Komponentlar ma'lumotni to'g'ridan-to'g'ri olmaydi:

```
Komponent  ->  hook (TanStack Query)  ->  service  ->  mock ma'lumot / API
```

Hozir `src/services/` ichidagi funksiyalar mock ma'lumot va `localStorage` bilan ishlaydi. Backend tayyor bo'lganda faqat service ichidagi izohli `axios` qatorlari yoqiladi, sahifalar va komponentlar o'zgarmaydi.

```
src/
  app/          sahifalar (/, /tailors, /tailors/[id], /dashboard, /admin ...)
  components/   UI komponentlar
  hooks/        TanStack Query hook'lari
  services/     API qatlami (hozircha mock)
  data/         namunaviy ma'lumotlar
  lib/          yordamchi funksiyalar
  types/        TypeScript turlari
```

## Ishga tushirish

```bash
git clone https://github.com/lola66999/ateliergo.git
cd ateliergo
npm install
npm run dev
```

Brauzerda `http://localhost:3000` ni oching.

## Demo hisoblar

Ma'lumotlar brauzer xotirasida (`localStorage`) saqlanadi, shuning uchun har bir tashrif buyuruvchi o'z ma'lumotini ko'radi.

- **Admin:** telefon `90 000 00 00`, parol `admin123`
- **Tikuvchi / Mijoz:** `/register` sahifasida o'zingiz hisob yarating

> Mock rejimdagi autentifikatsiya faqat ko'rgazma uchun. Haqiqiy loyihada parol va rollar serverda boshqariladi.

## Keyingi rejalar

- Backend va ma'lumotlar bazasini ulash
- Sharhlar va reyting tizimi
- Ko'p tillilik (uz / ru / en)
- PWA
