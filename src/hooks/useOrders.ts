import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  getClientOrders,
  getTailorOrders,
  updateOrderStatus,
} from "@/services/orders";
import { User,  OrderPayload, OrderStatus,} from "@/services/types";

export const useTailorOrders = (tailorId?: string) =>
  useQuery({
    queryKey: ["orders", "tailor", tailorId],
    queryFn: () => getTailorOrders(tailorId!),
    enabled: !!tailorId,
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 5000, // har 5 soniyada tekshiradi
  });

export const useClientOrders = (clientId?: string) =>
  useQuery({
    queryKey: ["orders", "client", clientId],
    queryFn: () => getClientOrders(clientId!),
    enabled: !!clientId,
    staleTime: 0,
    refetchOnMount: "always",
    refetchInterval: 5000,
  });

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ user, payload }: { user: User; payload: OrderPayload }) =>
      createOrder(user, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}