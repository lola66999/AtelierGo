"use client";

import { Star } from "lucide-react";

type Props = {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
};

export default function StarRating({ value, onChange, size = 20 }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Star
            style={{ width: size, height: size }}
            className={
              n <= Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "text-amber-300"
            }
          />
        );
        return onChange ? (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} yulduz`}
          >
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}