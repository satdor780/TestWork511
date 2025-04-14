'use client';

import { create } from 'zustand/index';

import { CustomApiError } from '@/api/interceptors';
import { weatherMultipleService } from '@/api/services/weather/api/';
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
  },

  clearWeatherData: () => {
    set({ weatherData: [], error: null });
  },
}));
