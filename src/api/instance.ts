import axios, { AxiosInstance } from 'axios';

import { config } from '@/config/';

const createApiInstance = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 10000,
    params: {
      appid: config.apiKey,
    },
  });
};

export const weatherApi = createApiInstance(config.weatherApiUrl);
export const geoApi = createApiInstance(config.geoApiUrl);
