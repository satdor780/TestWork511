import { create } from 'zustand';

import { CustomApiError } from '@/api/interceptors';
import { searchCities } from '@/components/shared/Search/api/searchApi';
import { City, ISearchData, SearchState } from '@/components/shared/Search/types';
import { ApiResponse } from '@/types';

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

const getUserFriendlyMessage = (error: CustomApiError): string => {
  switch (error.status) {
    case 400:
      return 'Некорректный запрос. Проверьте правильность введенного названия города.';
    case 401:
      return 'Не удалось выполнить поиск. Пожалуйста, попробуйте позже.';
    case 403:
      return 'Доступ к данным ограничен. Попробуйте позже или свяжитесь с поддержкой.';
    case 404:
      return 'Город не найден. Проверьте правильность названия или попробуйте другой город.';
    case 429:
      return 'Слишком много запросов. Подождите немного и попробуйте снова.';
    case 500:
      return 'Произошла ошибка на сервере. Мы уже работаем над этим, попробуйте позже.';
    default:
      return 'Не удалось выполнить поиск. Пожалуйста, попробуйте снова позже.';
  }
};

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

  clearResults: () => set({ results: defaultPopularCities, error: null }),
}));
