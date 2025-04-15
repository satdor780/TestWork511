import { isAxiosError } from 'axios';
import { create } from 'zustand';

import { fetchForecast } from '@/modules/DetailedForecast/api/forecastApi';
import { WeatherState } from '@/modules/DetailedForecast/types';
import { IApiError } from '@/types';

export const useWeatherStore = create<WeatherState>((set) => ({
  forecast: [],
  city: '',
  isLoading: false,
  error: null,

  fetchWeather: async (city: string) => {
    if (!city.trim()) return;
    set({ isLoading: true, error: null });
    try {
      const forecastResponse = await fetchForecast(city);
      set({
        forecast: forecastResponse.data.list,
        city,
        isLoading: false,
      });
    } catch (error: unknown) {
      let message = 'Не удалось получить данные о погоде';
      if (isAxiosError<IApiError>(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message || message;
      }
      set({ isLoading: false, error: message });
      throw new Error(message);
    }
  },

  clearError: () => set({ error: null }),

  setCity: (city: string) => set({ city }),
}));
