import { create } from 'zustand/index';

import { weatherMultipleService } from '@/api/services/api/weatherMultipleService';
import { IweatherData } from '@/types';

interface WeatherState {
  weatherData: IweatherData[];
  isLoading: boolean;
  error: string | null;
  fetchMultipleWeathers: (cities: string[]) => Promise<void>;
  clearWeatherData: () => void;
}

export const useMultipleWeatherStore = create<WeatherState>((set) => ({
  weatherData: [],
  isLoading: false,
  error: null,

  fetchMultipleWeathers: async (cities: string[]) => {
    set({ isLoading: true, error: null });

    try {
      const { successful, failed } = await weatherMultipleService(cities);

      const errorMessage =
        failed.length > 0
          ? `Не удалось загрузить погоду для: ${failed.map((f) => f.city).join(', ')}`
          : null;

      set({
        weatherData: successful.map((res) => res.data),
        isLoading: false,
        error: errorMessage,
      });
    } catch (error: any) {
      set({
        weatherData: [],
        isLoading: false,
        error: error.message || 'Произошла непредвиденная ошибка при загрузке погоды',
      });
    }
  },

  clearWeatherData: () => {
    set({ weatherData: [], error: null });
  },
}));
