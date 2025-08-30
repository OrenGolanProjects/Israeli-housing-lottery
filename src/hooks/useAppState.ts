import { useState, useMemo } from 'react';
import type { Property, FilterState } from '../types';
import { filterProperties, getFilterStats } from '../utils/filters';

interface UseAppStateProps {
  properties: Property[];
}

export const useAppState = ({ properties }: UseAppStateProps) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedCity: '',
    maxPrice: '',
    selectedStatus: [],
    selectedConstructionPermits: [],
    selectedEligibilityTypes: [],
    searchQuery: ''
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    return filterProperties(properties, filters);
  }, [properties, filters]);

  const stats = useMemo(() => {
    return getFilterStats(properties, filteredProperties);
  }, [properties, filteredProperties]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      selectedCity: '',
      maxPrice: '',
      selectedStatus: [],
      selectedConstructionPermits: [],
      selectedEligibilityTypes: [],
      searchQuery: ''
    });
  };

  const selectProperty = (property: Property | null) => {
    setSelectedProperty(property);
  };

  return {
    filters,
    filteredProperties,
    selectedProperty,
    stats,
    updateFilters,
    clearFilters,
    selectProperty
  };
};
