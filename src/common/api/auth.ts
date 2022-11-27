import { Login, PersonDisplay, Signup } from '@/common/types';
import { useMutationFetch } from '../hooks/useMutationFetch';
import { useGetFetch } from '../hooks/useGetFetch';

const BASE_ENDPOINT = '/auth';

export const useLogin = () => (data: Login) =>
  useMutationFetch<PersonDisplay>({
    url: BASE_ENDPOINT,
    method: 'post',
    data,
  });

export const usePeople = () => useGetFetch<PersonDisplay[]>('/people');

export const useSignup = () => (data: Signup) =>
  useMutationFetch<PersonDisplay>({
    url: `${BASE_ENDPOINT}/new`,
    method: 'post',
    data,
  });
