import Image from 'next/image';
import { FC } from 'react';

import { ForecastData } from '@/modules/DetailedForecast/types';

const processForecast = (
  forecast: [] | ForecastData[],
): { date: string; data: ForecastData[] }[] => {
  if (forecast.length === 0) {
    return [];
  }

  const groupedForecast = forecast.reduce(
    (acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, ForecastData[]>,
  );

  const today = new Date().toISOString().split('T')[0];

  const forecastDays = Object.keys(groupedForecast)
    .filter((date) => date > today)
    .sort()
    .slice(0, 5);

  return forecastDays.map((date) => ({ date, data: groupedForecast[date] }));
};

export const Forecast: FC<{
  forecast: [] | ForecastData[];
}> = ({ forecast }) => {
  const forecastDays = processForecast(forecast);
  return (
    <div className="mt-4">
      <h3 className="gothic-font">Forecast for 5 days</h3>
      {forecastDays.length === 0 ? (
        <p>Нет данных о прогнозе</p>
      ) : (
        <div className="row gap-3">
          {forecastDays.map(({ date, data }) => {
            const dayData = data.find((f) => f.dt_txt.includes('12:00')) || data[0];
            return (
              <div
                key={date}
                className="col bg-default-background p-3 rounded-4 d-flex flex-column align-items-center"
                style={{ width: '200px' }}
              >
                <p className="fw-bold text-center" style={{ height: '40px' }}>
                  {new Date(date).toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
                <Image
                  src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`}
                  alt={dayData.weather[0].description}
                  width={70}
                  height={70}
                />
                <p className="fs-3 fw-bold pb-2">
                  {dayData.main.temp < 1
                    ? `-${dayData.main.temp.toFixed()}°`
                    : `+${dayData.main.temp.toFixed()}°`}
                </p>
                <p
                  className="text-capitalize text-center pb-2"
                  style={{ height: '40px', fontSize: '15px' }}
                >
                  {dayData.weather[0].description}
                </p>
                <p>Ветер: {dayData.wind.speed} м/с</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
