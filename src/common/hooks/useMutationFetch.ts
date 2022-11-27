import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { axiosInstance } from '../utils/axios';

export const useMutationFetch = async <T>(config: AxiosRequestConfig) => {
  try {
    const { data } = await axiosInstance.request<T>(config);

    return { data, error: false };
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    return {
      data: undefined,
      error: axiosError.response?.data.errorMessage as string,
    };
  }
};
