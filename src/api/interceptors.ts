import { AxiosError } from 'axios';

import api from './instance';

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      'Произошла ошибка при получении данных';
    return Promise.reject(new Error(message));
  },
);
