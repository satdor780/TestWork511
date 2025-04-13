import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Favorites, Humidity, TempMin, Waves, Wind } from '@/assets/icons';
import styles from '@/components/WeatherCard/DetailedForecast.module.scss';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { IweatherData } from '@/types';

export const WeatherCard: FC<{
  weather: IweatherData | null;
}> = ({ weather }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (!weather) return <p>loading...</p>;

  return (
    <>
      <Link
        href={`/detailed-forecast/${weather.name}`}
        className="bg-default-background p-3 rounded-4 d-flex gap-4 justify-content-between"
      >
        <div className="d-flex gap-3">
          <div className="d-flex gap-3 position-relative">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="пасмурно"
              width={80}
              height={80}
              className={styles['temp-img']}
            />
            <strong className={cn('font-weight-bold', styles.temp)}>
              {weather.main.temp < 1
                ? `- ${weather.main.temp.toFixed()}°`
                : `+${weather.main.temp.toFixed()}°`}
            </strong>
          </div>
          <div className="d-flex flex-column justify-content-center">
            {weather.weather.map((e) => (
              <p key={e.id} className="text-capitalize pb-1 fw-bold">
                {e.description}
              </p>
            ))}
            <p>Ощущается как {weather.main.feels_like.toFixed()}°</p>
          </div>
        </div>
        <div>
          <h2 className="fw-bold pe-4 d-block gothic-font text-end">{weather.name}</h2>
          <ul className="d-flex gap-3">
            <li className="d-flex gap-1 align-items-center">
              <div className={styles.icon}>
                <TempMin />
              </div>
              <span>{weather.main.temp_min} °</span>
            </li>
            <li className="d-flex gap-1 align-items-center">
              <div className={styles.icon}>
                <Humidity />
              </div>
              <span>{weather.main.humidity}%</span>
            </li>
            <li className="d-flex gap-1 align-items-center">
              <div className={styles.icon}>
                <Wind />
              </div>
              {weather.wind.speed} м/с
            </li>
            <li className="d-flex gap-1 align-items-center">
              <div className={styles.icon}>
                <Waves />
              </div>
              {weather.clouds.all} %
            </li>
          </ul>
          <div
            className={cn(
              'bg-background ms-auto rounded-3 d-flex align-items-center justify-content-center',
              isFavorite(weather.name) && 'bg-violet',
            )}
            style={{ height: '46px', width: '46px', minWidth: '46px' }}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(weather.name);
            }}
          >
            <Favorites />
          </div>
        </div>
      </Link>
    </>
  );
};
