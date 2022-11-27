import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axios';

export const useGetFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse>();

  useEffect(() => {
    execute();
  }, [url]);

  useEffect(() => {
    revalidate();
  });

  const revalidate = async () => {
    const { data: newData } = await axiosInstance.get<T>(url);
    const isChanged = JSON.stringify(data) !== JSON.stringify(newData);
    if (isChanged) setData(newData);
  };

  const execute = async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      const { data: responseData } = await axiosInstance.get<T>(url);
      setData(responseData);
    } catch (error) {
      const axiosError = error as AxiosError;
      setError(axiosError.response);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, revalidate };
};
