import { create } from 'zustand';

import { searchCities } from '@/modules/Search/api/searchApi';
import { City, ISearchData, SearchState } from '@/modules/Search/types';
import { ApiResponse } from '@/types';
import {CustomApiError} from "@/api/interceptors";

const defaultPopularCities: City[] = [
  {
    name: 'Moscow',
    local_names: { ru: 'Москва' },
    lat: 55.7558,
    lon: 37.6173,
    country: 'RU',
  },
  {
    name: 'London',
    local_names: { ru: 'Лондон' },
    lat: 51.5074,
    lon: -0.1278,
    country: 'GB',
  },
  {
    name: 'New York',
    local_names: { ru: 'Нью-Йорк' },
    lat: 40.7128,
    lon: -74.006,
    country: 'US',
  },
  {
    name: 'Tokyo',
    local_names: { ru: 'Токио', ja: '東京' },
    lat: 35.6762,
    lon: 139.6503,
    country: 'JP',
  },
  {
    name: 'Paris',
    local_names: { ru: 'Париж', fr: 'Paris' },
    lat: 48.8566,
    lon: 2.3522,
    country: 'FR',
  },
];

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  results: defaultPopularCities,
  isLoading: false,
  error: null,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  fetchCities: async (query: string) => {
    if (!query.trim()) {
      set({ results: [], error: null });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response: ApiResponse<ISearchData> = await searchCities(query);
      set({
        results: response.data,
        isLoading: false,
        error: null,
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

  clearResults: () => set({ results: defaultPopularCities, error: null }),
}));
