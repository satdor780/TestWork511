import { AxiosError } from 'axios';

import { geoApi } from '@/api/instance';
import { CustomApiError } from '@/api/interceptors';
import { ISearchData } from '@/modules/Search/types';
import { ApiResponse } from '@/types';

export const searchCities = async (search: string): Promise<ApiResponse<ISearchData>> => {
  try {
    const response = await geoApi.get('/direct', {
      params: {
        q: search,
        limit: 5,
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
