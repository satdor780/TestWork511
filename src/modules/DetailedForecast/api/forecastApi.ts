import { isAxiosError } from 'axios';

import { weatherApi } from '@/api/instance';
import { IForecastList } from '@/modules/DetailedForecast/types';
import { ApiResponse, IApiError } from '@/types';

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
    if (isAxiosError<IApiError>(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};
