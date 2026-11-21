// import type { LoginPayload, RegisterPayload, User } from "@/types";
 
import { LoginPayload, User, RegisterPayload } from "./types";

const USERS_KEY = "ateliergo:users";
const SESSION_KEY = "ateliergo:session";

type StoredUser = User & { password: string };

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const toPublic = (u: StoredUser): User => ({
  id: u.id,
  name: u.name,
  phone: u.phone,
  role: u.role,
});

const ADMIN: StoredUser = {
  id: "admin-1",
  name: "Admin",
  phone: "+998900000000",
  role: "admin",
  password: "admin123",
};

const ensureAdmin = () => {
  const users = readUsers();
  if (!users.some((u) => u.id === ADMIN.id)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, ADMIN]));
  }
};

export async function registerUser(payload: RegisterPayload): Promise<User> {
  await delay();
  // BACKEND ULANGANDA:
  // const { data } = await api.post<{ user: User; token: string }>("/auth/register", payload);
  // localStorage.setItem("token", data.token); return data.user;

  const users = readUsers();
  if (users.some((u) => u.phone === payload.phone)) {
    throw new Error("Bu telefon raqam allaqachon ro'yxatdan o'tgan");
  }
  const stored: StoredUser = {
    id: crypto.randomUUID(),
    name: payload.name,
    phone: payload.phone,
    role: payload.role,
    password: payload.password,
  };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, stored]));
  const user = toPublic(stored);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export async function loginUser(payload: LoginPayload): Promise<User> {
  await delay();
  ensureAdmin();
  // BACKEND ULANGANDA:
  // const { data } = await api.post<{ user: User; token: string }>("/auth/login", payload);
  // localStorage.setItem("token", data.token); return data.user;

  const found = readUsers().find(
    (u) => u.phone === payload.phone && u.password === payload.password
  );
  if (!found) throw new Error("Telefon raqam yoki parol noto'g'ri");
  const user = toPublic(found);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export async function logoutUser(): Promise<void> {
  // await api.post("/auth/logout");
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): User | null {
  // BACKEND ULANGANDA: GET /auth/me so'rovi bilan almashtiriladi
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}
export function getAllUsers(): User[] {
  ensureAdmin();
  return readUsers().map(toPublic);
}