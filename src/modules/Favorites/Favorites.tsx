'use client';

import { FC, useEffect } from 'react';

import { useMultipleWeatherStore } from '@/api/services/weather/';
import { Emptiness } from '@/components/Emptiness/Emptiness';
import { WeatherCard, WeatherCardSkeleton } from '@/components/WeatherCard';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { Title } from '@/UI/Title/Title';

export const Favorites: FC = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isHydrated = useFavoritesStore((state) => state.isHydrated);

  const isLoading = useMultipleWeatherStore((state) => state.isLoading);
  const fetchWeather = useMultipleWeatherStore((state) => state.fetchMultipleWeathers);
  const weathersData = useMultipleWeatherStore((state) => state.weatherData);
  const error = useMultipleWeatherStore((state) => state.error);

  useEffect(() => {
    if (isHydrated) {
      fetchWeather(favorites);
    }
  }, [fetchWeather, favorites]);

  if (isLoading || !isHydrated) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title="Featured Cities" />
        {Array.from({ length: 3 }).map((_, index) => (
          <WeatherCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (favorites.length === 0 && isHydrated) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title={`Featured Cities (${favorites.length})`} />
        <Emptiness
          title="У вас нету избранных городов"
          subtitle="Нажмите на ♡ чтобы города появились тут"
        />
      </div>
    );
  }

  if (error || weathersData.length === 0) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title={`Featured Cities (${favorites.length})`} />
        <Emptiness
          title={weathersData.length === 0 ? 'Данные недоступны' : 'Ошибка'}
          subtitle={error?.message || 'Не удалось загрузить погоду. Попробуйте позже.'}
        />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <Title title="Featured Cities" />
      {weathersData.map((weather) => (
        <WeatherCard key={weather.id} weather={weather} />
      ))}
    </div>
  );
};
