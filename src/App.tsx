import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sampleProperties, cities, statuses, constructionPermits, eligibilityTypes } from './data';
import { useAppState } from './hooks/useAppState';
import { useBrowserDimensions } from './hooks/useBrowserDimensions';
import type { Property, FilterState, ProjectStats } from './types';
import TopBar from './components/layout/TopBar';
import FiltersPanel from './components/filters/FiltersPanel';
import PropertiesList from './components/filters/PropertiesList';
import Map from './components/map/Map';
import PropertyDetailsPanel from './components/ui/PropertyDetailsPanel';
import Stats from './components/ui/Stats';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Heebo, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    h1: { fontSize: '1.75rem' },
    h2: { fontSize: '1.5rem' },
    h3: { fontSize: '1.25rem' },
    h4: { fontSize: '1.125rem' },
    h5: { fontSize: '1rem' },
    h6: { fontSize: '0.875rem' },
    subtitle1: { fontSize: '0.875rem' },
    subtitle2: { fontSize: '0.75rem' },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.75rem' },
    button: { fontSize: '0.75rem' },
    caption: { fontSize: '0.625rem' },
    overline: { fontSize: '0.625rem' },
  },
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

interface ResponsiveLayoutProps {
  filters: FilterState;
  filteredProperties: Property[];
  selectedProperty: Property | null;
  stats: ProjectStats;
  updateFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  selectProperty: (property: Property | null) => void;
  cities: string[];
  statuses: string[];
  constructionPermits: string[];
  eligibilityTypes: string[];
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  filters,
  filteredProperties,
  selectedProperty,
  stats,
  updateFilters,
  clearFilters,
  selectProperty,
  cities,
  statuses,
  constructionPermits,
  eligibilityTypes
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

  // Helper function to calculate active filters
  const getActiveFilterInfo = () => {
    const hasActiveFilters = 
      (filters.selectedCity && filters.selectedCity.trim() !== '') ||
      (filters.maxPrice && filters.maxPrice.trim() !== '') ||
      filters.selectedStatus.length > 0 ||
      filters.selectedConstructionPermits.length > 0 ||
      filters.selectedEligibilityTypes.length > 0 ||
      (filters.searchQuery && filters.searchQuery.trim() !== '');
    
    let activeFilterCount = 0;
    if (filters.selectedCity && filters.selectedCity.trim() !== '') activeFilterCount++;
    if (filters.maxPrice && filters.maxPrice.trim() !== '') activeFilterCount++;
    if (filters.selectedStatus.length > 0) activeFilterCount++;
    if (filters.selectedConstructionPermits.length > 0) activeFilterCount++;
    if (filters.selectedEligibilityTypes.length > 0) activeFilterCount++;
    if (filters.searchQuery && filters.searchQuery.trim() !== '') activeFilterCount++;
    
    return { hasActiveFilters: Boolean(hasActiveFilters), activeFilterCount };
  };

  const { hasActiveFilters, activeFilterCount } = getActiveFilterInfo();

  const layoutConfig = {
    stacked: isMobile || isTablet,
    leftWidth: isMobile ? '100%' : isTablet ? '100%' : isLaptop ? 260 : 280,
    rightWidth: isMobile ? '100%' : isTablet ? '100%' : isLaptop ? 320 : 360,
    mapHeight: isMobile ? '50vh' : isTablet ? '60vh' : '100%',
    padding: isMobile ? 2 : 3
  };

  if (layoutConfig.stacked) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar
          searchQuery={filters.searchQuery}
          onSearchChange={(query) => updateFilters({ searchQuery: query })}
          filteredCount={stats.filteredCount}
          totalCount={stats.totalProjects}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
          onClearFilters={clearFilters}
        />
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Box sx={{ 
            width: layoutConfig.leftWidth,
            bgcolor: 'white',
            borderBottom: 1,
            borderColor: 'grey.200',
            p: layoutConfig.padding
          }}>
            <FiltersPanel
              filters={filters}
              onFilterChange={updateFilters}
              cities={cities}
              statuses={statuses}
              constructionPermits={constructionPermits}
              eligibilityTypes={eligibilityTypes}
            />
            <Stats stats={stats} />
          </Box>
          <Box sx={{ height: layoutConfig.mapHeight, bgcolor: 'white' }}>
            <Map
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={selectProperty}
            />
          </Box>
          <Box sx={{ 
            width: layoutConfig.rightWidth,
            bgcolor: 'white',
            borderTop: 1,
            borderColor: 'grey.200',
            position: 'relative'
          }}>
            <PropertiesList
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={selectProperty}
            />
            <PropertyDetailsPanel 
              selectedProperty={selectedProperty} 
              onClearSelection={() => selectProperty(null)}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => updateFilters({ searchQuery: query })}
        filteredCount={stats.filteredCount}
        totalCount={stats.totalProjects}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearFilters={clearFilters}
      />
      <Box sx={{ 
        display: 'flex', 
        flex: 1, 
        height: 'calc(100vh - 88px)', 
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          width: layoutConfig.leftWidth, 
          bgcolor: 'white', 
          borderRight: 1, 
          borderColor: 'grey.200', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%',
          flexShrink: 0
        }}>
          <Box sx={{ flexShrink: 0 }}>
            <FiltersPanel
              filters={filters}
              onFilterChange={updateFilters}
              cities={cities}
              statuses={statuses}
              constructionPermits={constructionPermits}
              eligibilityTypes={eligibilityTypes}
            />
          </Box>
          <Box sx={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <Stats stats={stats} />
          </Box>
        </Box>
        <Box sx={{ 
          flex: 1, 
          minWidth: 0, 
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Map
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            onPropertySelect={selectProperty}
          />
        </Box>
        <Box sx={{ 
          width: layoutConfig.rightWidth, 
          bgcolor: 'white', 
          borderLeft: 1, 
          borderColor: 'grey.200', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%',
          flexShrink: 0
        }}>
          <Box sx={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <PropertiesList
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={selectProperty}
            />
          </Box>
          <PropertyDetailsPanel 
            selectedProperty={selectedProperty} 
            onClearSelection={() => selectProperty(null)}
          />
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  useBrowserDimensions();
  
  const {
    filters,
    filteredProperties,
    selectedProperty,
    stats,
    updateFilters,
    clearFilters,
    selectProperty
  } = useAppState({ properties: sampleProperties });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveLayout
        filters={filters}
        filteredProperties={filteredProperties}
        selectedProperty={selectedProperty}
        stats={stats}
        updateFilters={updateFilters}
        clearFilters={clearFilters}
        selectProperty={selectProperty}
        cities={cities}
        statuses={statuses}
        constructionPermits={constructionPermits}
        eligibilityTypes={eligibilityTypes}
      />
    </ThemeProvider>
  );
}

export default App;