import { create } from 'zustand';

import { weatherSingleService } from '@/api/services/api/weatherSingleService';
import { WeatherState } from '@/modules/DetailedForecast/types';

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
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  clearError: () => set({ error: null }),
  setCity: (city: string) => set({ city }),
}));
