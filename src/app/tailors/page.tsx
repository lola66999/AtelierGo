import { Suspense } from "react";
import TailorsView from "@/components/tailors/TailorsView";

export default function TailorsPage() {
  return (
    <Suspense fallback={null}>
      <TailorsView />
    </Suspense>
  );
}