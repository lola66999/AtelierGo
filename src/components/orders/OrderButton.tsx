"use client";

import Link from "next/link";
import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import OrderModal from "@/components/orders/OrderModal";
import { Service } from "@/services/types";

type Props = {
  tailorId: string;
  tailorName: string;
  services: Service[];
};

export default function OrderButton(props: Props) {
  const { user, ready } = useAuth();
  const [open, setOpen] = useState(false);

  if (!ready) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 rounded-full bg-brand-50 px-6 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-100"
      >
        <ClipboardList className="h-4 w-4" />
        Buyurtma berish uchun kiring
      </Link>
    );
  }

  // Tikuvchi va admin buyurtma bermaydi
  if (user.role !== "client") return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full bg-brand-50 px-6 py-2.5 font-medium text-brand-800 hover:bg-brand-100"
      >
        <ClipboardList className="h-4 w-4" />
        Buyurtma berish
      </button>
      {open && <OrderModal {...props} onClose={() => setOpen(false)} />}
    </>
  );
}