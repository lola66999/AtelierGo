import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addReview, deleteReview, getReviews } from "@/services/reviews";
import { ReviewPayload, User } from "@/services/types";

export const useReviews = (tailorId: string) =>
  useQuery({
    queryKey: ["reviews", tailorId],
    queryFn: () => getReviews(tailorId),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["reviews"] });
    qc.invalidateQueries({ queryKey: ["tailors"] });
    qc.invalidateQueries({ queryKey: ["tailor"] });
  };
}

export function useAddReview() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ user, payload }: { user: User; payload: ReviewPayload }) =>
      addReview(user, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteReview() {
  const invalidate = useInvalidate();
  return useMutation({ mutationFn: deleteReview, onSuccess: invalidate });
}