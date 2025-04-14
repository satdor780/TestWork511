import Joi from 'joi';

const schema = Joi.object({
  NEXT_PUBLIC_WEATHER_API_URL: Joi.string().required().uri(),
  NEXT_PUBLIC_GEO_API_URL: Joi.string().required().uri(),
  NEXT_PUBLIC_API_KEY: Joi.string().required(),
});

const { value, error } = schema.validate(
  {
    NEXT_PUBLIC_WEATHER_API_URL:
      process.env.NEXT_PUBLIC_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
    NEXT_PUBLIC_GEO_API_URL:
      process.env.NEXT_PUBLIC_GEO_API_URL || 'https://api.openweathermap.org/geo/1.0',
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || '12ec3237653c969992ec83fda3d19fbe',
  },
  { stripUnknown: true },
); // fix me

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  weatherApiUrl: value.NEXT_PUBLIC_WEATHER_API_URL,
  geoApiUrl: value.NEXT_PUBLIC_GEO_API_URL,
  apiKey: value.NEXT_PUBLIC_API_KEY,
};
