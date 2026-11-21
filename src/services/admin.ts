import { tailors } from "@/data/tailors";
import { getAllUsers } from "@/services/auth";
import { readStoredTailors, writeStoredTailors } from "@/services/dashboard";
import { Tailor, User } from "./types";
export type AdminTailor = Tailor & { demo: boolean };

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getAdminData(): Promise<{
  tailors: AdminTailor[];
  users: User[];
}> {
  await delay();
  // BACKEND ULANGANDA: GET /admin/tailors va GET /admin/users
  return {
    tailors: [
      ...readStoredTailors().map((t) => ({ ...t, demo: false })),
      ...tailors.map((t) => ({ ...t, demo: true })),
    ],
    users: getAllUsers(),
  };
}

export async function setVerified(id: string, verified: boolean) {
  await delay(200);
  // BACKEND ULANGANDA: PATCH /admin/tailors/:id { verified }
  writeStoredTailors(
    readStoredTailors().map((t) => (t.id === id ? { ...t, verified } : t))
  );
}

export async function deleteTailor(id: string) {
  await delay(200);
  // BACKEND ULANGANDA: DELETE /admin/tailors/:id
  writeStoredTailors(readStoredTailors().filter((t) => t.id !== id));
}