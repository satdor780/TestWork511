'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (city: string) => void;
  isFavorite: (name: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (city: string) =>
        set((state) => {
          const cityLower = city.toLowerCase();
          const isAlreadyFavorite = state.favorites.some((fav) => fav.toLowerCase() === cityLower);
          if (isAlreadyFavorite) {
            return {
              favorites: state.favorites.filter((fav) => fav.toLowerCase() !== cityLower),
            };
          }
          return {
            favorites: [...state.favorites, city],
          };
        }),
      isFavorite: (name: string) =>
        get().favorites.some((fav) => fav.toLowerCase() === name.toLowerCase()),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
