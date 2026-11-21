"use client";

import dynamic from "next/dynamic";

const TailorsMap = dynamic(() => import("./TailorMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-100 animate-pulse rounded-2xl bg-cream-dark" />
  ),
});

export default TailorsMap;