import { OrderStatus } from "@/services/types";

export const statusLabel: Record<OrderStatus, string> = {
  new: "Yangi",
  accepted: "Qabul qilingan",
  rejected: "Rad etilgan",
  done: "Bajarilgan",
};

export const statusStyle: Record<OrderStatus, string> = {
  new: "bg-amber-100 text-amber-800",
  accepted: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-700",
  done: "bg-green-100 text-green-800",
};