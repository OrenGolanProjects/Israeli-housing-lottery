import { getPropertyCoordinates } from '../services/api';
import type { ApiProperty, Property } from '../types';
import { safeParseFloat } from './formatters';

/**
 * Extract clean city name from LamasName field
 * Handles cases like "תל אביב -יפו" -> "תל אביב"
 * and "אלעד ישראל מגורים בע"מ" -> "אלעד"
 * Also handles escaped characters from API response
 * @param lamasName - Raw LamasName from API
 * @returns Clean city name
 */
export const extractCleanCityName = (lamasName: string): string => {
  if (!lamasName) return 'Unknown City';
  
  // First, clean up escaped characters from API response
  let cleanName = lamasName
    .replace(/\\"/g, '"')        // Replace \" with "
    .replace(/\\n/g, ' ')        // Replace \n with space
    .replace(/\\t/g, ' ')        // Replace \t with space
    .replace(/\\r/g, ' ')        // Replace \r with space
    .replace(/\\\\/g, '\\')      // Replace \\ with \
    .replace(/\\'/g, "'")        // Replace \' with '
    .trim();                     // Remove extra whitespace
  
  // Remove common separators and extra information
  // Common patterns: "תל אביב -יפו", "ירושלים - מזרח", etc.
  cleanName = cleanName
    .split(/[-–—]/)[0]  // Take part before first dash/hyphen
    .split('(')[0]       // Remove parentheses content
    .split('[')[0]       // Remove bracket content
    .split('"')[0]       // Remove quoted content
    .split("'")[0]       // Remove single quoted content
    .trim();             // Remove extra whitespace
  
  // Handle cases like "אלעד ישראל מגורים בע"מ" -> "אלעד"
  // Look for common Hebrew words that indicate company/business names
  const businessIndicators = [
    'ישראל', 'מגורים', 'בע"מ', 'בעל', 'חברה', 'עמותה', 'קרן', 'אגודה',
    'ישראלית', 'מגורים בע"מ', 'בנייה', 'פיתוח', 'השקעות', 'נדל"ן',
    'ק.', 'קריית', 'שכונה', 'מתחם', 'אזור', 'מרכז', 'מזרח', 'מערב',
    'צפון', 'דרום', 'חדשה', 'ישנה', 'תעשייה', 'מסחר', 'מגורים'
  ];
  
  // If the clean name contains business indicators, try to extract just the city part
  if (businessIndicators.some(indicator => cleanName.includes(indicator))) {
    // Try to find the first word that looks like a city name
    const words = cleanName.split(/\s+/);
    for (const word of words) {
      // Skip very short words and business indicators
      if (word.length >= 2 && !businessIndicators.includes(word)) {
        cleanName = word;
        break;
      }
    }
  }
  
  // Final cleanup: remove any remaining special characters
  cleanName = cleanName
    .replace(/[^\u0590-\u05FF\u0020-\u007F]/g, '') // Keep only Hebrew, English, and basic punctuation
    .replace(/\s+/g, ' ')                            // Normalize multiple spaces to single space
    .trim();
  
  return cleanName || lamasName;
};

export const transformApiPropertiesToProperties = async (apiProperties: ApiProperty[]): Promise<Property[]> => {
  const uniqueCities = [...new Set(apiProperties.map(p => extractCleanCityName(p.LamasName)))];
  const cityCoordinates = new Map<string, [number, number]>();
  
  for (const city of uniqueCities) {
    const coords = await getPropertyCoordinates(city);
    cityCoordinates.set(city, [coords.latitude, coords.longitude]);
  }
  
  return apiProperties.map(apiProperty => {
    const city = extractCleanCityName(apiProperty.LamasName);
    const coordinates = cityCoordinates.get(city) || [31.7683, 35.2137];
    
    return {
      id: apiProperty.ProjectId,
      name: apiProperty.ProjectName || 'Unnamed Project',
      city,
      neighborhood: apiProperty.Neighborhood || 'Unknown Neighborhood',
      pricePerMeter: safeParseFloat(apiProperty.PriceForMeter, 0),
      totalUnits: apiProperty.LotteryHousingUnits || 0,
      totalSubscribers: apiProperty.Subscribers || 0,
      totalWinners: apiProperty.Winners || 0,
      competitionRatio: (apiProperty.Subscribers || 0) / (apiProperty.Winners || 1),
      status: apiProperty.ProjectStatus || 'Unknown',
      provider: apiProperty.ProviderName || 'Unknown Provider',
      lotteryDate: apiProperty.LotteryExecutionDate || '',
      signupDeadline: apiProperty.LotteryEndSignupDate || '',
      constructionPermit: apiProperty.ConstructionPermitName || 'Unknown',
      eligibility: apiProperty.Eligibility || 'Unknown',
      marketingMethod: apiProperty.MarketingMethodDesc || 'Unknown',
      coordinates
    };
  });
};
