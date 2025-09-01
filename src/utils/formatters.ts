export const formatPrice = (price: number): string => {
  return price.toLocaleString('he-IL');
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('he-IL');
};

export const formatCompetitionRatio = (ratio: number): string => {
  return `${ratio.toFixed(1)}:1`;
};

export const getCompetitionLevel = (ratio: number): 'low' | 'medium' | 'high' => {
  if (ratio <= 6) return 'low';
  if (ratio <= 8) return 'medium';
  return 'high';
};

export const getCompetitionColor = (ratio: number): string => {
  const level = getCompetitionLevel(ratio);
  switch (level) {
    case 'low': return 'bg-green-500';
    case 'medium': return 'bg-yellow-500';
    case 'high': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const getCompetitionHexColor = (ratio: number): string => {
  const level = getCompetitionLevel(ratio);
  switch (level) {
    case 'low': return '#10b981'; // green-500
    case 'medium': return '#f59e0b'; // yellow-500
    case 'high': return '#f97316'; // coral-500 (much nicer than red!)
    default: return '#6b7280'; // gray-500
  }
};

export const getCompetitionTextColor = (ratio: number): string => {
  const level = getCompetitionLevel(ratio);
  switch (level) {
    case 'low': return 'text-green-600';
    case 'medium': return 'text-yellow-600';
    case 'high': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

export const getCompetitionBgColor = (ratio: number): string => {
  const level = getCompetitionLevel(ratio);
  switch (level) {
    case 'low': return 'bg-green-50';
    case 'medium': return 'bg-yellow-50';
    case 'high': return 'bg-red-50';
    default: return 'bg-gray-50';
  }
};

export const calculateSuccessRate = (winners: number, subscribers: number): number => {
  if (subscribers === 0) return 0;
  return (winners / subscribers) * 100;
};

/**
 * Safely parse a string to a number with fallback
 */
export const safeParseFloat = (value: string | number | null | undefined, fallback: number = 0): number => {
  if (typeof value === 'number') return value;
  if (!value || typeof value !== 'string') return fallback;
  
  try {
    const parsed = parseFloat(value.replace(/,/g, ''));
    return isNaN(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
};

/**
 * Safely parse an integer with fallback
 */
export const safeParseInt = (value: string | number | null | undefined, fallback: number = 0): number => {
  if (typeof value === 'number') return Math.floor(value);
  if (!value || typeof value !== 'string') return fallback;
  
  try {
    const parsed = parseInt(value.replace(/,/g, ''), 10);
    return isNaN(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
};
