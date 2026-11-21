"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  useAddReview,
  useDeleteReview,
  useReviews,
} from "@/hooks/useReviews";
import StarRating from "@/components/tailors/StarRating";

export default function ReviewsSection({ tailorId }: { tailorId: string }) {
  const { user } = useAuth();
  const { data: reviews = [], isLoading } = useReviews(tailorId);
  const add = useAddReview();
  const remove = useDeleteReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const isClient = user?.role === "client";
  const alreadyReviewed = reviews.some((r) => r.userId === user?.id);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) {
      setError("Yulduzchani tanlang");
      return;
    }
    if (comment.trim().length < 5) {
      setError("Izoh kamida 5 ta belgidan iborat bo'lsin");
      return;
    }
    setError("");
    add.mutate(
      { user, payload: { tailorId, rating, comment } },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
        },
      }
    );
  };

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-heading text-2xl font-bold text-brand-900">
        Sharhlar {reviews.length > 0 && `(${reviews.length})`}
      </h2>

      {/* Sharh qoldirish */}
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        {!user && (
          <p className="text-sm text-ink/70">
            Sharh qoldirish uchun{" "}
            <Link href="/login" className="font-medium text-brand-700 hover:underline">
              kiring
            </Link>{" "}
            yoki{" "}
            <Link href="/register" className="font-medium text-brand-700 hover:underline">
              ro'yxatdan o'ting
            </Link>
            .
          </p>
        )}

        {user && (!isClient || user.id === tailorId) && (
          <p className="text-sm text-ink/70">
            Sharhni faqat mijozlar qoldira oladi.
          </p>
        )}

        {isClient && user.id !== tailorId && (
          <form onSubmit={onSubmit} className="space-y-3">
            <p className="text-sm font-medium text-ink">
              {alreadyReviewed
                ? "Siz sharh qoldirgansiz. Yangisini yozsangiz, eskisi almashadi."
                : "Bu tikuvchiga baho bering"}
            </p>
            <StarRating value={rating} onChange={setRating} size={28} />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Ish sifati, muddat va muomala haqida yozing"
              className="w-full rounded-xl border border-cream-dark px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={add.isPending}
              className="flex items-center gap-2 rounded-full bg-brand-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-60"
            >
              {add.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Yuborish
            </button>
          </form>
        )}
      </div>

      {/* Ro'yxat */}
      <div className="mt-4 space-y-3">
        {isLoading && <div className="h-24 animate-pulse rounded-2xl bg-cream-dark" />}

        {!isLoading && reviews.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-ink/60">
            Hali sharhlar yo'q. Birinchi bo'lib baho bering.
          </p>
        )}

        {reviews.map((r) => (
          <article key={r.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-800">
                  {r.userName.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{r.userName}</p>
                  <p className="text-xs text-ink/50">
                    {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StarRating value={r.rating} size={16} />
                {(user?.id === r.userId || user?.role === "admin") && (
                  <button
                    onClick={() => remove.mutate(r.id)}
                    aria-label="Sharhni o'chirish"
                    className="rounded-full p-1.5 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="mt-3 text-sm text-ink/80">{r.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}