import { Review, ReviewPayload, User } from "./types";


const KEY = "ateliergo:reviews";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export function readReviews(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

const write = (list: Review[]) =>
  localStorage.setItem(KEY, JSON.stringify(list));

export async function getReviews(tailorId: string): Promise<Review[]> {
  await delay();
  // BACKEND ULANGANDA: GET /tailors/:id/reviews
  return readReviews()
    .filter((r) => r.tailorId === tailorId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addReview(
  user: User,
  payload: ReviewPayload
): Promise<Review> {
  await delay(400);
  // BACKEND ULANGANDA: POST /tailors/:id/reviews { rating, comment }
  const review: Review = {
    id: crypto.randomUUID(),
    tailorId: payload.tailorId,
    userId: user.id,
    userName: user.name,
    rating: payload.rating,
    comment: payload.comment.trim(),
    createdAt: new Date().toISOString(),
  };
  // Bir mijoz - bir tikuvchiga bitta sharh
  const others = readReviews().filter(
    (r) => !(r.tailorId === payload.tailorId && r.userId === user.id)
  );
  write([review, ...others]);
  return review;
}

export async function deleteReview(id: string): Promise<void> {
  await delay(200);
  // BACKEND ULANGANDA: DELETE /reviews/:id
  write(readReviews().filter((r) => r.id !== id));
}