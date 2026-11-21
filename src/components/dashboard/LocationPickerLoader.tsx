"use client";

import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("./LocationPicker"), {
  ssr: false,
  loading: () => <div className="h-full animate-pulse rounded-2xl bg-cream-dark" />,
});

export default LocationPicker;