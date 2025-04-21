import { IweatherData } from '@/types';

export interface WeatherState {
  currentWeather: IweatherData | null;
  city: string;
  isLoading: boolean;
  forecast: ForecastData[] | [];
  error: { message: string; status?: number } | null;
  fetchWeather: (city: string) => Promise<void>;
  clearError: () => void;
  setCity: (city: string) => void;
}

export interface ForecastData {
  dt: number;
  dt_txt: string;
  visibility: number;
  pop: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  sys: {
    pod: string;
  };
}
