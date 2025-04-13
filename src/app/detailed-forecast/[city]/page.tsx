import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { DetailedForecast } from '@/modules/DetailedForecast';

export const Page = () => {
  const router = useRouter();
  const { city } = router.query;
  const [cityName, setCityName] = useState<string>('amsterdam'); // Дефолтное значение

  useEffect(() => {
    if (router.isReady) {
      setCityName(typeof city === 'string' ? city : 'amsterdam');
    }
  }, [router.isReady, city]);

  return <DetailedForecast city={cityName} />;
};
