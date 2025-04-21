'use client';

import { FC, useEffect } from 'react';

import { useSingleWeatherStore } from '@/api/services/weather';
import { Emptiness } from '@/components/shared/Emptiness';
import { WeatherCard, WeatherCardSkeleton } from '@/components/shared/WeatherCard';
import { Forecast } from '@/modules/DetailedForecast/components/Forecast';
import { useWeatherStore } from '@/modules/DetailedForecast/store/weatherStore';
import { Title } from '@/UI/Title/Title';
import { cleanCityName } from '@/utils/cleanCityName';

export const DetailedForecast: FC<{
  city: string;
}> = ({ city }) => {
  const fetchWeather = useSingleWeatherStore((state) => state.fetchWeather);
  const currentWeather = useSingleWeatherStore((state) => state.currentWeather);
  const weatherLoading = useSingleWeatherStore((state) => state.isLoading);
  const weatherError = useSingleWeatherStore((state) => state.error);

  const forecast = useWeatherStore((state) => state.forecast);
  const fetchForecast = useWeatherStore((state) => state.fetchWeather);
  const forecastLoading = useWeatherStore((state) => state.isLoading);
  const forecastError = useWeatherStore((state) => state.error);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, [city, fetchWeather, fetchForecast]);

  const isLoading = weatherLoading || forecastLoading;

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title={`Погода в ${cleanCityName(city)}`} />
        <WeatherCardSkeleton />
      </div>
    );
  }

  if (weatherError || !currentWeather) {
    return (
      <div className="d-flex flex-column gap-3 p-3">
        <Title title={`Погода в ${cleanCityName(city)}`} />
        <Emptiness
          title="Ошибка"
          subtitle={
            weatherError?.message ? weatherError.message : 'Не удалось загрузить данные о погоде.'
          }
        />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <Title title={`Погода в ${currentWeather.name}`} />
      <WeatherCard weather={currentWeather} />
      {forecast.length === 0 || forecastError ? (
        <Emptiness
          title="Ошибка"
          subtitle={
            forecastError?.message ? forecastError.message : 'Не удалось загрузить данные о погоде.'
          }
        />
      ) : (
        <Forecast forecast={forecast} />
      )}
    </div>
  );
};
