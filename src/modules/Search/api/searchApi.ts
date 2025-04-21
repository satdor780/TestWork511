import { geoApi } from '@/api/instance';
import { CustomApiError } from '@/api/interceptors';
import { logError } from '@/hooks/logError';
import { ISearchData } from '@/modules/Search/types';
import { ApiResponse } from '@/types';

export const searchCities = async (search: string): Promise<ApiResponse<ISearchData>> => {
  try {
    const response = await geoApi.get('/directs', {
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
    if (error instanceof Error) {
      const customError = error as CustomApiError;
      const message = customError.message;

      logError('Search API Error', {
        message,
        status: customError.status,
        data: customError.data,
      });

      throw customError;
    }

    const message = 'Неизвестная ошибка';
    logError(message, { search });
    throw new Error(message);
  }
};
