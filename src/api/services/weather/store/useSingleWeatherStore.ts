import { create } from 'zustand';

import { weatherSingleService } from '@/api/services/weather/api/';
import { WeatherState } from '@/api/services/weather/types';

export const useSingleWeatherStore = create<WeatherState>((set) => ({
  currentWeather: null,
  forecast: [],
  city: '',
  isLoading: false,
  error: null,
  fetchWeather: async (city: string) => {
    if (!city.trim()) return;
    set({ isLoading: true, error: null });
    try {
      const weatherResponse = await weatherSingleService(city);
      set({
        currentWeather: weatherResponse.data,
        city,
        isLoading: false,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, isLoading: false });
    }
  },
  clearError: () => set({ error: null }),
  setCity: (city: string) => set({ city }),
}));
