/**
 * Geocoding service configuration
 */
export const GEOCODING_CONFIG = {
  NOMINATIM_URL: 'https://nominatim.openstreetmap.org',
  SEARCH_LIMIT: 1,
  COUNTRY_CODES: 'il',
  USER_AGENT: 'IsraeliHousingLottery/1.0',
  CACHE_ENABLED: true,
  API_HEADERS: {
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7',
    'User-Agent': 'IsraeliHousingLottery/1.0',
    'Origin': 'http://localhost:5173',
    'Referer': 'http://localhost:5173/'
  }
};

export const getGeocodingUrl = (): string => {
  return GEOCODING_CONFIG.NOMINATIM_URL;
};
