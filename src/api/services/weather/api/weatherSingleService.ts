import { weatherApi } from '@/api/instance';
import { ApiResponse, IweatherData } from '@/types';

export const weatherSingleService = async (city: string): Promise<ApiResponse<IweatherData>> => {
  try {
    const response = await weatherApi.get('/weather', {
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
  } catch (error: any) {
    const message =
      error.response?.data?.message === 'city not found'
        ? 'Город не найден'
        : error.message || 'Не удалось получить данные о погоде';
    throw new Error(message);
  }
};
