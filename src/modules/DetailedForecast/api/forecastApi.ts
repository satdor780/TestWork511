import { AxiosError } from 'axios';

import { weatherApi } from '@/api/instance';
import { CustomApiError } from '@/api/interceptors';
import { IForecastList } from '@/modules/DetailedForecast/types';
import { ApiResponse } from '@/types';

export const fetchForecast = async (city: string): Promise<ApiResponse<IForecastList>> => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        units: 'metric',
      },
    });
    const data = response.data;
    return {
      data,
      status: response.status,
    };
  } catch (error: unknown) {
    let message = 'Не удалось получить данные о погоде';
    let status: number | undefined;

    if (error instanceof AxiosError) {
      const customError = error as CustomApiError;
      message = customError.message || message;
      status = customError.status;
    } else if (error instanceof Error) {
      message = error.message || message;
    }

    console.error('Weather API Error:', {
      message,
      status,
      data: error instanceof AxiosError ? error.response?.data : undefined,
    });

    const newError = new Error(message) as CustomApiError;
    newError.status = status;
    throw newError;
  }
};
