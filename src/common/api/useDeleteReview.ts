import { ID, Review } from "@/common/types";
import { useMutationFetch } from "../hooks/useMutationFetch";

export const useDeleteReview = () => (id: ID) =>
  useMutationFetch<Review[]>({ url: `/review?id=${id}`, method: "delete" });
