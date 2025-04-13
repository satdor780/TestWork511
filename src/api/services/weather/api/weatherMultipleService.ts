import { CustomApiError } from '@/api/interceptors';
import { weatherSingleService } from '@/api/services/weather/api/';
import { ApiResponse, IweatherData } from '@/types';

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
    } catch (error) {
      if (error instanceof Error) {
        const apiError = error as CustomApiError;
        console.error('API Error:', {
          message: apiError.message,
          status: apiError.status,
          data: apiError.data,
        });
      }
    }
  });

  const results = await Promise.allSettled(requests);

  const successful: ApiResponse<IweatherData>[] = [];
  const failed: { city: string; error: string }[] = [];

  results?.forEach((result) => {
    if (result.status === 'fulfilled') {
      if (result.value?.value) {
        successful.push(result.value.value);
      }
    } else {
      failed.push(result.reason);
    }
  });

  return { successful, failed };
};
