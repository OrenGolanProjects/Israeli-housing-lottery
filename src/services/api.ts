import type { ApiProperty } from '../types';

const API_BASE_URL = 'https://data.gov.il/api/3/action/datastore_search';
const RESOURCE_ID = '7c8255d0-49ef-49db-8904-4cf917586031';

const coordinateCache = new Map<string, [number, number]>();

interface ApiResponse {
  success: boolean;
  result: {
    records: ApiProperty[];
    total: number;
    limit: number;
    q: string;
  };
}

export const getPropertyCoordinates = async (city: string): Promise<{ longitude: number; latitude: number }> => {
  const cacheKey = city.toLowerCase();
  if (coordinateCache.has(cacheKey)) {
    const cached = coordinateCache.get(cacheKey)!;
    return { longitude: cached[0], latitude: cached[1] };
  }

  try {
    const searchQuery = `${city}, Israel`;
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=1&countrycodes=il`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'IsraeliHousingLottery/1.0' }
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const results = await response.json();
    
    if (results && results.length > 0) {
      const coordinates: [number, number] = [parseFloat(results[0].lon), parseFloat(results[0].lat)];
      coordinateCache.set(cacheKey, coordinates);
      return { longitude: coordinates[0], latitude: coordinates[1] };
    }
    
    const fallbackCoords: [number, number] = [31.7683, 35.2137];
    coordinateCache.set(cacheKey, fallbackCoords);
    return { longitude: fallbackCoords[0], latitude: fallbackCoords[1] };
    
  } catch {
    const fallbackCoords: [number, number] = [31.7683, 35.2137];
    coordinateCache.set(cacheKey, fallbackCoords);
    return { longitude: fallbackCoords[0], latitude: fallbackCoords[1] };
  }
};

export const searchPropertiesByCity = async (cityName: string): Promise<ApiProperty[]> => {
  const encodedCity = encodeURIComponent(cityName);
  const url = `${API_BASE_URL}?resource_id=${RESOURCE_ID}&limit=1000&q=${encodedCity}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data: ApiResponse = await response.json();
  if (!data.success) throw new Error('API request failed');
  
  return data.result.records || [];
};

export const searchPropertiesByQuery = async (query: string): Promise<ApiProperty[]> => {
  const encodedQuery = encodeURIComponent(query);
  const url = `${API_BASE_URL}?resource_id=${RESOURCE_ID}&limit=1000&q=${encodedQuery}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  
  const data: ApiResponse = await response.json();
  if (!data.success) throw new Error('API request failed');
  
  return data.result.records || [];
};

export const getDefaultCityProperties = async (): Promise<ApiProperty[]> => {
  return searchPropertiesByCity('תל אביב');
};
