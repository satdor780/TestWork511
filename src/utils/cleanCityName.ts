export const cleanCityName = (city: string): string => {
  return decodeURIComponent(city).replace(/%20/g, ' ').replace(/\s+/g, ' ').trim();
};
