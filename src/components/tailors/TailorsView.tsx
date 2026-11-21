"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LocateFixed, Map as MapIcon, List, Search } from "lucide-react";
import { useCategories, useTailors } from "@/hooks/useTailors";
import TailorCard from "@/components/tailors/TailorCard";
import TailorsMap from "../map/TailorMapLoader";
const TASHKENT = { lat: 41.3111, lng: 69.2797 };

export default function TailorsView() {
  const params = useSearchParams();
  const { data: categories = [] } = useCategories();

  const [searchInput, setSearchInput] = useState(params.get("search") ?? "");
  const [search, setSearch] = useState(searchInput);
  const [category, setCategory] = useState(params.get("category") ?? "");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");
  const [coords, setCoords] = useState(TASHKENT);
  const [located, setLocated] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");

  // Qidiruv matnini 400ms kutib yuboramiz (har harfda so'rov ketmasligi uchun)
  useEffect(() => {
    const id = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(id);
  }, [searchInput]);

  const { data, isLoading } = useTailors({
    search: search || undefined,
    category: category || undefined,
    minRating: minRating || undefined,
    lat: coords.lat,
    lng: coords.lng,
    sortBy,
  });

  const locate = () => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocated(true);
      },
      () => alert("Lokatsiyaga ruxsat berilmadi"),
      { timeout: 10000 }
    );
  };

  const selectClass =
    "rounded-xl border border-cream-dark bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-900">
        Atelyelar
      </h1>

      {/* Filtr paneli */}
      <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-cream-dark px-3 focus-within:border-brand-500">
          <Search className="h-4 w-4 text-brand-600" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Ism, xizmat yoki manzil bo'yicha qidiring"
            className="w-full py-2.5 text-sm outline-none"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "distance" | "rating")}
          className={selectClass}
        >
          <option value="distance">Masofa bo'yicha</option>
          <option value="rating">Reyting bo'yicha</option>
        </select>

        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className={selectClass}
        >
          <option value={0}>Barcha reyting</option>
          <option value={4}>4+ reyting</option>
          <option value={4.5}>4.5+ reyting</option>
        </select>

        <button
          onClick={locate}
          className="flex items-center justify-center gap-2 rounded-xl border border-brand-700 px-4 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
        >
          <LocateFixed className="h-4 w-4" />
          Menga yaqin
        </button>
      </div>

      {/* Kategoriya chiplari */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {[{ id: "", name: "Barchasi" }, ...categories].map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition ${
              category === c.id
                ? "bg-brand-700 text-white"
                : "bg-white text-ink/80 hover:bg-brand-100"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Telefon uchun almashtirgich */}
      <div className="mt-4 flex gap-2 lg:hidden">
        <button
          onClick={() => setView("list")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium ${
            view === "list" ? "bg-brand-700 text-white" : "bg-white"
          }`}
        >
          <List className="h-4 w-4" /> Ro'yxat
        </button>
        <button
          onClick={() => setView("map")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium ${
            view === "map" ? "bg-brand-700 text-white" : "bg-white"
          }`}
        >
          <MapIcon className="h-4 w-4" /> Xarita
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Ro'yxat */}
        <div className={view === "map" ? "hidden lg:block" : ""}>
          <p className="mb-3 text-sm text-ink/60">
            {isLoading ? "Yuklanmoqda..." : `${data?.length ?? 0} ta atelye topildi`}
            {located && " · sizning joylashuvingiz bo'yicha"}
          </p>

          <div className="space-y-4">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl bg-cream-dark" />
              ))}

            {!isLoading && data?.length === 0 && (
              <div className="rounded-2xl bg-white p-10 text-center text-ink/60">
                Hech narsa topilmadi. Filtrlarni o'zgartirib ko'ring.
              </div>
            )}

            {data?.map((t) => (
              <TailorCard key={t.id} tailor={t} />
            ))}
          </div>
        </div>

        {/* Xarita */}
        <div
          className={`h-[70vh] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] ${
            view === "list" ? "hidden lg:block" : ""
          }`}
        >
          <TailorsMap
            key={view}
            tailors={data ?? []}
            center={[coords.lat, coords.lng]}
            user={located ? coords : null}
          />
        </div>
      </div>
    </div>
  );
}