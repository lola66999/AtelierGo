import { useQuery } from "@tanstack/react-query";
import { getCategories, getTailorById, getTailors } from "@/services/tailors";
import { TailorFilters } from "@/services/types";

export const useTailors = (filters: TailorFilters = {}) =>
  useQuery({
    queryKey: ["tailors", filters],
    queryFn: () => getTailors(filters),
  });

export const useTailor = (id: string) =>
  useQuery({
    queryKey: ["tailor", id],
    queryFn: () => getTailorById(id),
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });