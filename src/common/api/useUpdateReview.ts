import { ReviewUpdate } from "@/common/types";
import { useMutationFetch } from "../hooks/useMutationFetch";

export const useUpdateReview = () => (data: ReviewUpdate) =>
  useMutationFetch({ url: "/review", method: "put", data });
