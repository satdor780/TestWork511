import { create } from 'zustand';

import { CustomApiError } from '@/api/interceptors';
import { fetchForecast } from '@/modules/DetailedForecast/api/forecastApi';
import { WeatherState } from '@/modules/DetailedForecast/types';

const getUserFriendlyMessage = (error: CustomApiError): string => {
  switch (error.status) {
    case 404:
      return 'Город не найден';
    case 401:
      return 'Ошибка авторизации: проверьте API-ключ';
    case 429:
      return 'Превышен лимит запросов. Попробуйте позже';
    default:
      return `Ошибка сервера: код ${error.status}, мы уже работаем над этим`;
  }
};

export const useWeatherStore = create<WeatherState>((set) => ({
  forecast: [],
  city: '',
  isLoading: true,
  error: null,

  fetchWeather: async (city: string) => {
    if (!city.trim()) return;
    try {
      const forecastResponse = await fetchForecast(city);
      set({
        forecast: forecastResponse.data.list,
        city,
        isLoading: false,
      });
    } catch (error: unknown) {
      let errorMessage = 'Произошла неизвестная ошибка';
      let errorStatus: number | undefined;

      if (error instanceof Error) {
        const customError = error as CustomApiError;
        errorMessage = getUserFriendlyMessage(error);
        errorStatus = customError.status;
      }
      set({
        error: { message: errorMessage, status: errorStatus },
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),

  setCity: (city: string) => set({ city }),
}));
