import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { axiosInstance } from '../utils/axios';

type Props = AxiosRequestConfig;

export const useMutationFetch = async <T>(config: Props) => {
  try {
    const { data } = await axiosInstance.request<T>(config);

    return { data, error: null };
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    return {
      data: undefined,
      error: axiosError.response?.data.errorMessage as string,
    };
  }
};
