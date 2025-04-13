import { DetailedForecast } from '@/modules/DetailedForecast';

export default function CityPage({ params: { city = 'amsterdam' } }: { params: { city: string } }) {
  return <DetailedForecast city={city} />;
}
