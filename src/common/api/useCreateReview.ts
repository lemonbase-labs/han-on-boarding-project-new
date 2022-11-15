import { Review, ReviewAdd } from "@/common/types";
import { useMutationFetch } from "../hooks/useMutationFetch";

export const useCreateReview = () => (data: ReviewAdd) =>
  useMutationFetch<Review>({ url: "review", method: "post", data });
