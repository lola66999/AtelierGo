import { Tailor, User } from "./types";

const KEY = "ateliergo:my-tailors";

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export function readStoredTailors(): Tailor[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export const emptyProfile = (user: User): Tailor => ({
  id: user.id,
  name: user.name,
  avatar: "",
  phone: user.phone,
  telegram: "",
  address: "",
  lat: 41.3111,
  lng: 69.2797,
  bio: "",
  experienceYears: 0,
  rating: 0,
  reviewsCount: 0,
  verified: false,
  categories: [],
  services: [],
  portfolio: [],
});

export async function getMyProfile(user: User): Promise<Tailor> {
  await delay(300);
  // BACKEND ULANGANDA: const { data } = await api.get<Tailor>("/tailors/me"); return data;
  return readStoredTailors().find((t) => t.id === user.id) ?? emptyProfile(user);
}

export async function saveMyProfile(profile: Tailor): Promise<Tailor> {
  await delay(500);
  // BACKEND ULANGANDA: const { data } = await api.put<Tailor>("/tailors/me", profile); return data;
  const others = readStoredTailors().filter((t) => t.id !== profile.id);
  localStorage.setItem(KEY, JSON.stringify([...others, profile]));
  return profile;
}
export function writeStoredTailors(list: Tailor[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}