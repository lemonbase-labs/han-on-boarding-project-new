import { ID, Review } from "@/common/types";
import { useGetFetch } from "../hooks/useGetFetch";

export const useReview = (id: ID) => useGetFetch<Review>(`/review?id=${id}`);
