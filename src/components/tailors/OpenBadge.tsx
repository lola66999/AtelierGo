"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { WorkingHours } from "@/services/types";

export default function OpenBadge({ hours }: { hours?: WorkingHours }) {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    if (!hours) return;
    const tick = () => setStatus(getOpenStatus(hours));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [hours]);

  if (!hours || !status) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status.open
          ? "bg-green-100 text-green-800"
          : "bg-cream-dark text-ink/60"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status.open ? "bg-green-600" : "bg-ink/30"
        }`}
      />
      {status.label}
    </span>
  );
}