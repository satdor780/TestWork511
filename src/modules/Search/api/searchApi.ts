import { geoApi } from '@/api/instance';
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
  } catch (error: any) {
    const message =
      error.response?.data?.message === 'city not found'
        ? 'Город не найден'
        : error.message || 'Не удалось получить данные о погоде';
    throw new Error(message);
  }
};
