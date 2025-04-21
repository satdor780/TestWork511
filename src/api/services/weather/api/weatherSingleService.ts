import { weatherApi } from '@/api/instance';
import { CustomApiError } from '@/api/interceptors';
import { logError } from '@/hooks/logError';
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomApiError;
      const message = customError.message;

      logError('Weather API Error', {
        city,
        message,
        status: customError.status,
        data: customError.data,
      });

      throw customError;
    }

    const message = 'Неизвестная ошибка';
    logError(message, { city });
    throw new Error(message);
  }
};
