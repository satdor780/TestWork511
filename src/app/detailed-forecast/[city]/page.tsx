import { FC } from 'react';

import { Emptiness } from '@/components/Emptiness/Emptiness';
import { DetailedForecast } from '@/modules/DetailedForecast';

interface CityPageProps {
  params: {
    city?: string;
  };
}

const DEFAULT_CITY = 'amsterdam';

const CityPage: FC<CityPageProps> = ({ params }) => {
  const city = params.city ?? DEFAULT_CITY;

  if (!city || city.trim().length === 0) {
    return (
      <Emptiness title="Данные отсутствуют" subtitle="Не удалось загрузить данные о погоде." />
    );
  }

  return <DetailedForecast city={city} />;
};

export default CityPage;
