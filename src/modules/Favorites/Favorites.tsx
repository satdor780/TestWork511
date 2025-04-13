'use client';

import { FC, useEffect } from 'react';

import { useMultipleWeatherStore } from '@/api/services/weather/';
import { Emptiness } from '@/components/Emptiness/Emptiness';
import { WeatherCard, WeatherCardSkeleton } from '@/components/WeatherCard';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { Title } from '@/UI/Title/Title';

export const Favorites: FC = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isLoading = useMultipleWeatherStore((state) => state.isLoading);
  const fetchWeather = useMultipleWeatherStore((state) => state.fetchMultipleWeathers);
  const weatherData = useMultipleWeatherStore((state) => state.weatherData);
  const error = useMultipleWeatherStore((state) => state.error);

  useEffect(() => {
    fetchWeather(favorites);
  }, [fetchWeather]);

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title="Featured Cities" />
        {favorites.map((city) => (
          <WeatherCardSkeleton key={city} />
        ))}
      </div>
    );
  }

  if (error || weatherData.length === 0) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title="Featured Cities" />
        <Emptiness
          title={weatherData.length === 0 ? 'Данные недоступны' : 'Ошибка'}
          subtitle={error || 'Не удалось загрузить погоду. Попробуйте позже.'}
        />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <Title title="Featured Cities" />
      {weatherData.map((weather) => (
        <WeatherCard key={weather.id} weather={weather} />
      ))}
    </div>
  );
};
