import type { Property, FilterState } from '../types';

export const filterProperties = (properties: Property[], filters: FilterState): Property[] => {
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  return properties.filter((property) => {
    if (!property) return false;

    const matchesCity = !filters.selectedCity || property.city === filters.selectedCity;
    
    const matchesPrice = !filters.maxPrice || 
      (property.pricePerMeter && property.pricePerMeter <= parseInt(filters.maxPrice));
    
    const matchesStatus = filters.selectedStatus.length === 0 || 
      (property.status && filters.selectedStatus.includes(property.status));
    
    const matchesConstructionPermit = filters.selectedConstructionPermits.length === 0 || 
      (property.constructionPermit && filters.selectedConstructionPermits.includes(property.constructionPermit));
    
    const matchesEligibility = filters.selectedEligibilityTypes.length === 0 || 
      (property.eligibility && filters.selectedEligibilityTypes.includes(property.eligibility));
    
    const matchesSearch = !filters.searchQuery || 
      (property.name && property.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) || 
      (property.city && property.city.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
      (property.neighborhood && property.neighborhood.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
      (filters.searchQuery.toLowerCase().includes(property.city?.toLowerCase() || '')) ||
      (filters.searchQuery.toLowerCase().includes(property.name?.toLowerCase() || ''));
    
    return matchesCity && matchesPrice && matchesStatus && 
           matchesConstructionPermit && matchesEligibility && matchesSearch;
  });
};

export const getFilterStats = (properties: Property[], filteredProperties: Property[]) => {
  if (!properties || !Array.isArray(properties)) {
    return {
      totalProjects: 0,
      totalUnits: 0,
      totalSubscribers: 0,
      totalWinners: 0,
      averagePrice: 0,
      averageCompetitionRatio: 0,
      filteredCount: 0
    };
  }

  const validProperties = properties.filter(p => p && typeof p === 'object');
  
  if (validProperties.length === 0) {
    return {
      totalProjects: 0,
      totalUnits: 0,
      totalSubscribers: 0,
      totalWinners: 0,
      averagePrice: 0,
      averageCompetitionRatio: 0,
      filteredCount: filteredProperties?.length || 0
    };
  }

  const totalProjects = validProperties.length;
  const totalUnits = validProperties.reduce((sum, p) => sum + (p.totalUnits || 0), 0);
  const totalSubscribers = validProperties.reduce((sum, p) => sum + (p.totalSubscribers || 0), 0);
  const totalWinners = validProperties.reduce((sum, p) => sum + (p.totalWinners || 0), 0);
  
  const totalPrice = validProperties.reduce((sum, p) => sum + (p.pricePerMeter || 0), 0);
  const averagePrice = totalPrice / totalProjects;
  
  const totalCompetitionRatio = validProperties.reduce((sum, p) => sum + (p.competitionRatio || 0), 0);
  const averageCompetitionRatio = totalCompetitionRatio / totalProjects;

  return {
    totalProjects,
    totalUnits,
    totalSubscribers,
    totalWinners,
    averagePrice: isNaN(averagePrice) ? 0 : averagePrice,
    averageCompetitionRatio: isNaN(averageCompetitionRatio) ? 0 : averageCompetitionRatio,
    filteredCount: filteredProperties?.length || 0
  };
};

export const getUniqueValues = (properties: Property[], key: keyof Property): string[] => {
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  const validProperties = properties.filter(p => p && typeof p === 'object');
  const values = validProperties
    .map(p => p[key])
    .filter(value => value !== null && value !== undefined && value !== '')
    .map(value => String(value));
  
  return Array.from(new Set(values));
};
