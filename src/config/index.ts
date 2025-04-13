import Joi from 'joi';

const schema = Joi.object({
  WEATHER_API_URL: Joi.string().required(),
  GEO_API_URL: Joi.string().required(),
  API_KEY: Joi.string().required(),
});

const { value, error } = schema.validate(
  {
    WEATHER_API_URL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
    GEO_API_URL: process.env.NEXT_PUBLIC_GEO_API_URL,
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
  { stripUnknown: true },
);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  weatherApiUrl: value.WEATHER_API_URL,
  geoApiUrl: value.GEO_API_URL,
  apiKey: value.API_KEY,
};
