import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Property, FilterState } from '../types';
import { filterProperties, getFilterStats } from '../utils/filters';
import { searchPropertiesByCity, searchPropertiesByQuery, getDefaultCityProperties } from '../services/api';
import { transformApiPropertiesToProperties } from '../utils/transformers';

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
  const [apiProperties, setApiProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadDefaultCity = async () => {
      setIsLoading(true);
      try {
        const defaultData = await getDefaultCityProperties();
        const transformedProperties = await transformApiPropertiesToProperties(defaultData);
        setApiProperties(transformedProperties);
      } catch (error) {
        console.error('Failed to load default city:', error);
        // If API fails, use the sample properties
        setApiProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultCity();
  }, []);

  const filteredProperties = useMemo(() => {
    const allProperties = apiProperties.length > 0 ? apiProperties : properties;
    return filterProperties(allProperties, filters);
  }, [properties, apiProperties, filters]);

  const stats = useMemo(() => {
    const baseProperties = apiProperties.length > 0 ? apiProperties : properties;
    return getFilterStats(baseProperties, filteredProperties);
  }, [properties, apiProperties, filteredProperties]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = useCallback(async () => {
    setFilters({
      selectedCity: '',
      maxPrice: '',
      selectedStatus: [],
      selectedConstructionPermits: [],
      selectedEligibilityTypes: [],
      searchQuery: ''
    });
    
    // Reset to default city properties instead of clearing completely
    setIsLoading(true);
    try {
      const defaultData = await getDefaultCityProperties();
      const transformedProperties = await transformApiPropertiesToProperties(defaultData);
      setApiProperties(transformedProperties);
    } catch (error) {
      console.error('Failed to load default city:', error);
      // If API fails, use the sample properties
      setApiProperties([]);
    } finally {
      setIsLoading(false);
    }
    
    setCurrentSearchQuery('');
  }, []);

  const selectProperty = (property: Property | null) => {
    setSelectedProperty(property);
  };

  const handleSearchSubmit = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      let apiData;
      
      if (query.includes('תל אביב') || query.includes('ירושלים') || query.includes('חיפה') || 
          query.includes('באר שבע') || query.includes('אשדוד') || query.includes('נתניה')) {
        apiData = await searchPropertiesByCity(query);
      } else {
        apiData = await searchPropertiesByQuery(query);
      }
      
      const transformedProperties = await transformApiPropertiesToProperties(apiData);
      setApiProperties(transformedProperties);
      // Clear search query filter to avoid double-filtering
      setFilters(prev => ({ 
        ...prev, 
        searchQuery: '',
        selectedCity: '',
        selectedStatus: [],
        selectedConstructionPermits: [],
        selectedEligibilityTypes: []
      }));
      setCurrentSearchQuery(query);
    } catch (error) {
      console.error('Search failed:', error);
      // If search fails, use the sample properties
      setApiProperties([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    filters,
    filteredProperties,
    selectedProperty,
    stats,
    isLoading,
    currentSearchQuery,
    updateFilters,
    clearFilters,
    selectProperty,
    handleSearchSubmit
  };
};
