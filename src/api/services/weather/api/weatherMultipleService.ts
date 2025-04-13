import { isAxiosError } from 'axios';

import { weatherSingleService } from '@/api/services/weather/api/';
import { ApiResponse, IApiError, IweatherData } from '@/types';

export const weatherMultipleService = async (
  cities: string[],
): Promise<{
  successful: ApiResponse<IweatherData>[];
  failed: { city: string; error: string }[];
}> => {
  const requests = cities.map(async (city) => {
    try {
      const result = await weatherSingleService(city);
      return { status: 'fulfilled', value: result };
    } catch (error: unknown) {
      let message = 'Не удалось получить данные о погоде';
      if (isAxiosError<IApiError>(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message || message;
      }
      throw new Error(message);
    }
  });

  const results = await Promise.allSettled(requests);

  const successful: ApiResponse<IweatherData>[] = [];
  const failed: { city: string; error: string }[] = [];

  results?.forEach((result) => {
    if (result.status === 'fulfilled') {
      if (result.value.value) {
        successful.push(result.value.value);
      }
    } else {
      failed.push(result.reason);
    }
  });

  return { successful, failed };
};
