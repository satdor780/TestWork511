'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import { Emptiness } from '@/components/Emptiness/Emptiness';
import { DetailedForecast } from '@/modules/DetailedForecast';

const DEFAULT_CITY = 'amsterdam';

const CityPage: FC = () => {
  const params = useParams();
  const city = (typeof params.city === 'string' ? params.city : DEFAULT_CITY).toLowerCase();

  if (!city || city.trim().length === 0) {
    return (
      <Emptiness title="Данные отсутствуют" subtitle="Не удалось загрузить данные о погоде." />
    );
  }

  return <DetailedForecast city={city} />;
};

export default CityPage;
