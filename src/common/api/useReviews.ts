import { ReviewListItem } from "@/common/types";
import { useGetFetch } from "../hooks/useGetFetch";

export const useReviews = () => useGetFetch<ReviewListItem[]>("/reviews");
