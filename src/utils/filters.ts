import type { Property, FilterState } from '../types';

export const filterProperties = (properties: Property[], filters: FilterState): Property[] => {
  return properties.filter((property) => {
    const matchesCity = !filters.selectedCity || property.city === filters.selectedCity;
    
    const matchesPrice = !filters.maxPrice || 
      property.pricePerMeter <= parseInt(filters.maxPrice);
    
    const matchesStatus = filters.selectedStatus.length === 0 || 
      filters.selectedStatus.includes(property.status);
    
    const matchesConstructionPermit = filters.selectedConstructionPermits.length === 0 || 
      filters.selectedConstructionPermits.includes(property.constructionPermit);
    
    const matchesEligibility = filters.selectedEligibilityTypes.length === 0 || 
      filters.selectedEligibilityTypes.includes(property.eligibility);
    
    const matchesSearch = !filters.searchQuery || 
      property.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
      property.city.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      property.neighborhood.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesCity && matchesPrice && matchesStatus && 
           matchesConstructionPermit && matchesEligibility && matchesSearch;
  });
};

export const getFilterStats = (properties: Property[], filteredProperties: Property[]) => {
  const totalProjects = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + p.totalUnits, 0);
  const totalSubscribers = properties.reduce((sum, p) => sum + p.totalSubscribers, 0);
  const totalWinners = properties.reduce((sum, p) => sum + p.totalWinners, 0);
  const averagePrice = properties.reduce((sum, p) => sum + p.pricePerMeter, 0) / totalProjects;
  const averageCompetitionRatio = properties.reduce((sum, p) => sum + p.competitionRatio, 0) / totalProjects;

  return {
    totalProjects,
    totalUnits,
    totalSubscribers,
    totalWinners,
    averagePrice: isNaN(averagePrice) ? 0 : averagePrice,
    averageCompetitionRatio: isNaN(averageCompetitionRatio) ? 0 : averageCompetitionRatio,
    filteredCount: filteredProperties.length
  };
};

export const getUniqueValues = (properties: Property[], key: keyof Property): string[] => {
  return Array.from(new Set(properties.map(p => p[key] as string)));
};
