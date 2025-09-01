import { GEOCODING_CONFIG } from '../config/geocoding';

export interface Coordinates {
  longitude: number;
  latitude: number;
  isCityLevel?: boolean;
}

const ISRAELI_CITY_COORDINATES: { [city: string]: [number, number] } = {
  'תל אביב-יפו': [32.0853, 34.7818],
  'ירושלים': [31.7683, 35.2137],
  'חיפה': [32.7940, 34.9896],
  'ראשון לציון': [31.9640, 34.8016],
  'פתח תקווה': [32.0849, 34.8720],
  'אשדוד': [31.8000, 34.6500],
  'נתניה': [32.3300, 34.8600],
  'באר שבע': [31.2500, 34.7900],
  'חולון': [32.0200, 34.7800],
  'רמת גן': [32.0700, 34.8100],
  'הרצליה': [32.1700, 34.8400],
  'כפר סבא': [32.1700, 34.9000],
  'רחובות': [31.8900, 34.8100],
  'אשקלון': [31.6700, 34.5700],
  'קריית גת': [31.6100, 34.7600],
  'בית שמש': [31.7500, 35.0000],
  'קריית ביאליק': [32.8300, 35.0800],
  'קריית מוצקין': [32.8300, 35.0800],
  'קריית ים': [32.8300, 35.0800],
  'קריית אתא': [32.8300, 35.0800],
  'קריית שמונה': [33.2100, 35.5700],
  'טבריה': [32.7900, 35.5300],
  'צפת': [32.9700, 35.4900],
  'עכו': [32.9300, 35.0800],
  'נצרת': [32.7000, 35.3000],
  'אום אל-פחם': [32.5200, 35.1500],
  'נצרת עילית': [32.7000, 35.3000],
  'אריאל': [32.1000, 35.1000],
  'ביתר עילית': [31.7000, 35.1000],
  'מודיעין עילית': [31.7000, 35.1000],
  'אלעד': [32.0500, 34.9500],
  'אור יהודה': [32.0300, 34.8500],
  'יהוד-מונוסון': [32.0300, 34.8500],
  'גבעת שמואל': [32.0300, 34.8500],
  'גבעתיים': [32.0700, 34.8100],
  'קריית אונו': [32.0300, 34.8500],
  'קריית מלאכי': [31.7300, 34.7600]
};

export const getCityCoordinates = async (city: string): Promise<[number, number]> => {
  if (ISRAELI_CITY_COORDINATES[city]) {
    return ISRAELI_CITY_COORDINATES[city];
  }

  try {
    const searchQuery = `${city}, ישראל`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1&countrycodes=il`;
    
    const response = await fetch(url, {
      headers: GEOCODING_CONFIG.API_HEADERS
    });

    if (response.ok) {
      const results = await response.json();
      if (results && Array.isArray(results) && results.length > 0 && results[0]) {
        return [parseFloat(results[0].lon), parseFloat(results[0].lat)];
      }
    }
  } catch {
    // Continue to fallback
  }

  return [35.2137, 31.7683];
};


