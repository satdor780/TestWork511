'use client';

import { create } from 'zustand/index';

import { weatherMultipleService } from '@/api/services/weather/api/';
import { IweatherData } from '@/types';

interface WeatherState {
  weatherData: IweatherData[];
  isLoading: boolean;
  error: { message: string; status?: number; failedCities?: string[] } | null;
  fetchMultipleWeathers: (cities: string[]) => Promise<void>;
  clearWeatherData: () => void;
}

export const useMultipleWeatherStore = create<WeatherState>((set) => ({
  weatherData: [],
  isLoading: true,
  error: null,

  fetchMultipleWeathers: async (cities: string[]) => {
    if (!cities.length || cities.every((city) => !city.trim())) {
      set({
        error: { message: 'Укажите хотя бы один город' },
        isLoading: false,
        weatherData: [],
      });
      return;
    }

    const { successful, failed } = await weatherMultipleService(cities);

    if (successful.length > 0) {
      set({
        weatherData: successful.map((res) => res.data),
        isLoading: false,
        error: null,
      });
    } else {
      const failedCities = failed.map((f) => f.city);
      let message = `Не удалось загрузить погоду для: ${failedCities.join(', ')}`;
      let status: number | undefined;

      const statuses = failed.map((f) => f.status).filter((s): s is number => s !== undefined);
      if (statuses.length > 0 && statuses.every((s) => s === statuses[0])) {
        status = statuses[0];
        switch (status) {
          case 404:
            message = `Города не найдены: ${failedCities.join(', ')}`;
            break;
          case 401:
            message = 'Ошибка авторизации: проверьте API-ключ';
            break;
          case 429:
            message = 'Превышен лимит запросов';
            break;
          default:
            message = `Ошибка сервера: код ${status}, мы уже работаем над этим`;
        }
      } // блок выполняется если все запросы завершились ошибкой

      set({
        weatherData: [],
        isLoading: false,
        error: { message, status, failedCities },
      });
    } // end else
  },

  clearWeatherData: () => {
    set({ weatherData: [], error: null });
  },
}));
