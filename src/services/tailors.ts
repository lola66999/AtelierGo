import { tailors } from "@/data/tailors";
import { categories } from "@/data/categories";
import { getDistanceKm } from "@/lib/distance";
import { readStoredTailors } from "@/services/dashboard";
// import type {
//   Category,
//   Tailor,
//   TailorFilters,
//   TailorWithDistance,
// } from "@/types";

import { Category, Tailor, TailorFilters, TailorWithDistance } from "./types";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

// Tayyor tikuvchilar + kabinetda saqlangan (to'ldirilgan) profillar
const allTailors = (): Tailor[] => [
  ...tailors,
  ...readStoredTailors().filter((t) => t.avatar && t.address && t.phone),
];

export async function getTailors(
  filters: TailorFilters = {},
): Promise<TailorWithDistance[]> {
  await delay();
  // BACKEND ULANGANDA shu qatorlar bilan almashtiriladi:
  // const { data } = await api.get<TailorWithDistance[]>("/tailors", { params: filters });
  // return data;

  let result: TailorWithDistance[] = allTailors().map((t) => ({ ...t }));

  const q = filters.search?.toLowerCase().trim();
  if (q) {
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q) ||
        t.services.some((s) => s.name.toLowerCase().includes(q)),
    );
  }
  if (filters.category) {
    result = result.filter((t) => t.categories.includes(filters.category!));
  }
  if (filters.minRating) {
    result = result.filter((t) => t.rating >= filters.minRating!);
  }
  if (filters.lat !== undefined && filters.lng !== undefined) {
    result = result.map((t) => ({
      ...t,
      distanceKm: getDistanceKm(filters.lat!, filters.lng!, t.lat, t.lng),
    }));
  }

  if (filters.sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (filters.sortBy === "distance" || filters.lat !== undefined) {
    result.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }

  return result;
}

export async function getTailorById(id: string): Promise<Tailor | undefined> {
  await delay(300);
  // BACKEND ULANGANDA: const { data } = await api.get<Tailor>(`/tailors/${id}`); return data;
  return allTailors().find((t) => t.id === id);
}

export async function getCategories(): Promise<Category[]> {
  // const { data } = await api.get<Category[]>("/categories"); return data;
  return categories;
}
