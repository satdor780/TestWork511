'use client';

import { FC, useEffect } from 'react';

import { useMultipleWeatherStore } from '@/api/services/weather';
import { Emptiness } from '@/components/shared/Emptiness';
import { WeatherCard, WeatherCardSkeleton } from '@/components/shared/WeatherCard';
import { Title } from '@/UI/Title/Title';

const defaultPopularCities: string[] = ['Moscow', 'Paris', 'Tokyo', 'Amsterdam', 'Berlin'];

export const Home: FC = () => {
  const isLoading = useMultipleWeatherStore((state) => state.isLoading);
  const fetchWeather = useMultipleWeatherStore((state) => state.fetchMultipleWeathers);
  const weather = useMultipleWeatherStore((state) => state.weatherData);
  const error = useMultipleWeatherStore((state) => state.error);

  useEffect(() => {
    fetchWeather(defaultPopularCities);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3">
        <WeatherCardSkeleton />
        <WeatherCardSkeleton />
        <WeatherCardSkeleton />
      </div>
    );
  }

  if (error || !weather.length) {
    return (
      <Emptiness
        title="Не удалось загрузить погоду"
        subtitle={error?.message ? error.message : 'Неизвестная ошибка'}
      />
    );
  }

  return (
    <>
      <Title title="Top 10 sities" />
      <div className="d-flex flex-column gap-3">
        {weather.map((city) => (
          <WeatherCard key={city.id} weather={city} />
        ))}
      </div>
    </>
  );
};
