import {
  Review,
  ReviewAdd,
  ReviewUpdate,
  ReviewListItem,
  ID,
} from '@/common/types';
import { useMutationFetch } from '../hooks/useMutationFetch';
import { useGetFetch } from '../hooks/useGetFetch';

const BASE_ENDPOINT = '/review';

export const useCreateReview = () => (data: ReviewAdd) =>
  useMutationFetch<Review>({ url: BASE_ENDPOINT, method: 'post', data });

export const useDeleteReview = () => (id: ID) =>
  useMutationFetch<Review[]>({
    url: `${BASE_ENDPOINT}?id=${id}`,
    method: 'delete',
  });

export const useReview = (id: ID) =>
  useGetFetch<Review>(`${BASE_ENDPOINT}?id=${id}`);

export const useReviews = () => useGetFetch<ReviewListItem[]>('/reviews');

export const useUpdateReview = () => (data: ReviewUpdate) =>
  useMutationFetch({ url: BASE_ENDPOINT, method: 'put', data });
