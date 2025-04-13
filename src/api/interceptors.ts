import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { weatherApi, geoApi } from './instance';

interface CustomApiError extends Error {
  status?: number;
  data?: unknown;
}

interface ErrorResponseData {
  message?: string;
  error?: string;
  errors?: unknown;
}

const getErrorMessage = (error: AxiosError<ErrorResponseData | undefined>): string => {
  if (error.response?.data) {
    const { message, error: errorMsg, errors } = error.response.data;
    return (
      message ||
      errorMsg ||
      (typeof errors === 'string' ? errors : undefined) ||
      `API error: ${error.response.status}`
    );
  }
  return error.message || 'An unexpected error occurred';
};

const createCustomError = (message: string, error: AxiosError): CustomApiError => {
  const customError = new Error(message) as CustomApiError;
  customError.status = error.response?.status;
  customError.data = error.response?.data;
  return customError;
};

const setupInterceptors = (apiInstance: typeof weatherApi | typeof geoApi) => {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError): Promise<never> => {
      const message = error.message || 'Request setup failed';
      return Promise.reject(createCustomError(message, error));
    },
  );

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ErrorResponseData>): Promise<never> => {
      const message = getErrorMessage(error);
      return Promise.reject(createCustomError(message, error));
    },
  );
};

setupInterceptors(weatherApi);
setupInterceptors(geoApi);

export type { CustomApiError };
