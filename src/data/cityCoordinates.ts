/**
 * Predefined coordinates for major Israeli cities
 * Used as fallback when geocoding service fails
 * Coordinates are in [longitude, latitude] format
 */
export const ISRAELI_CITY_COORDINATES: Record<string, [number, number]> = {
  // Major cities
  'תל אביב': [34.7818, 32.0853],
  'ירושלים': [35.2137, 31.7683],
  'חיפה': [34.9896, 32.7940],
  'באר שבע': [34.7973, 31.2518],
  'אשדוד': [34.6500, 31.8000],
  'נתניה': [34.8600, 32.3300],
  'פתח תקווה': [34.8720, 32.0840],
  'ראשון לציון': [34.8000, 31.9500],
  'אשקלון': [34.5710, 31.6700],
  'רחובות': [34.8100, 31.8900],
  'קריית גת': [34.7600, 31.6100],
  'בית שמש': [35.0000, 31.7500],
  'קריית שמונה': [35.5700, 33.2000],
  'עכו': [35.0800, 32.9300],
  'טבריה': [35.5300, 32.7900],
  'צפת': [35.4900, 32.9700],
  'אריאל': [35.1900, 32.1000],
  'עפולה': [35.2900, 32.6100],
  'בית שאן': [35.5000, 32.5000],
  'נצרת': [35.3000, 32.7000],
  'ערד': [35.2100, 31.2600],
  'דימונה': [35.0300, 31.0700],
  'ירוחם': [34.9300, 30.9900],
  'מצפה רמון': [34.8000, 30.6100],
  'אילת': [34.9500, 29.5600],
  'אופקים': [34.6200, 31.2800],
  'שדרות': [34.6000, 31.5300],
  'נתיבות': [34.5900, 31.4200],
  'קריית מלאכי': [34.7500, 31.7300],
  'קריית אונו': [34.8600, 32.0600],
  'קריית ביאליק': [35.0800, 32.8300],
  'קריית מוצקין': [35.0800, 32.8300],
  'קריית ים': [35.0800, 32.8300],
  'קריית אתא': [35.0800, 32.8300],
  'קריית טבעון': [35.0800, 32.8300],
};

/**
 * Get predefined coordinates for a city
 * @param cityName - Hebrew city name
 * @returns Coordinates [longitude, latitude] or null if not found
 */
export const getPredefinedCityCoordinates = (cityName: string): [number, number] | null => {
  // Try exact match first
  if (ISRAELI_CITY_COORDINATES[cityName]) {
    return ISRAELI_CITY_COORDINATES[cityName];
  }
  
  // Try partial match (for cases where the API returns variations)
  const normalizedCityName = cityName.trim();
  for (const [key, coordinates] of Object.entries(ISRAELI_CITY_COORDINATES)) {
    if (key.includes(normalizedCityName) || normalizedCityName.includes(key)) {
      console.log('🗺️ Found partial city match:', cityName, '->', key);
      return coordinates;
    }
  }
  
  return null;
};
