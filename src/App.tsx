import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sampleProperties, cities, statuses, constructionPermits, eligibilityTypes } from './data';
import { useBrowserDimensions } from './hooks/useBrowserDimensions';
import type { Property, FilterState, ProjectStats } from './types';
import TopBar from './components/layout/TopBar';
import FiltersPanel from './components/filters/FiltersPanel';
import PropertiesList from './components/filters/PropertiesList';
import Map from './components/map/Map';
import PropertyDetailsPanel from './components/ui/PropertyDetailsPanel';
import Stats from './components/ui/Stats';
import { useAppState } from './hooks/useAppState';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Heebo, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    // Larger, more professional font sizes
    h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    h6: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    subtitle1: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
    button: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    overline: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 },
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
  clearFilters: () => Promise<void>;
  selectProperty: (property: Property | null) => void;
  handleSearchSubmit: (query: string) => void;
  isLoading: boolean;
  currentSearchQuery: string;
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
  handleSearchSubmit,
  isLoading,
  currentSearchQuery,
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
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        mx: { xs: 2, sm: 3, md: 4 }
      }}>
        <TopBar
          searchQuery={filters.searchQuery}
          onSearchChange={(query) => updateFilters({ searchQuery: query })}
          onSearchSubmit={handleSearchSubmit}
          isLoading={isLoading}
          filteredCount={stats?.filteredCount || 0}
          totalCount={stats?.totalProjects || 0}
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
            p: layoutConfig.padding,
            mx: 'auto'
          }}>
            <FiltersPanel
              filters={filters}
              onFilterChange={updateFilters}
              cities={cities}
              statuses={statuses}
              constructionPermits={constructionPermits}
              eligibilityTypes={eligibilityTypes}
            />
            <Stats stats={stats || {}} />
          </Box>
          <Box sx={{ 
            height: layoutConfig.mapHeight, 
            bgcolor: 'white',
            mx: { xs: 1, sm: 2 },
            my: 1
          }}>
            <Map
              properties={filteredProperties || []}
              selectedProperty={selectedProperty}
              onPropertySelect={selectProperty}
            />
          </Box>
          <Box sx={{ 
            width: layoutConfig.rightWidth,
            bgcolor: 'white',
            borderTop: 1,
            borderColor: 'grey.200',
            mx: 'auto'
          }}>
            <PropertiesList
              properties={filteredProperties || []}
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
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      mx: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 }
    }}>
      <TopBar
        searchQuery={filters.searchQuery}
        onSearchChange={(query) => updateFilters({ searchQuery: query })}
        onSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
        filteredCount={stats?.filteredCount || 0}
        totalCount={stats?.totalProjects || 0}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
        onClearFilters={clearFilters}
      />
      <Box sx={{ 
        display: 'flex', 
        flex: 1, 
        height: 'calc(100vh - 88px)', 
        minHeight: 0,
        overflow: 'hidden',
        gap: { xs: 1, sm: 2, md: 3, lg: 4 }
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
            <Stats stats={stats || {}} />
          </Box>
        </Box>
        <Box sx={{ 
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Map
            properties={filteredProperties || []}
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
              properties={filteredProperties || []}
              selectedProperty={selectedProperty}
              onPropertySelect={selectProperty}
              currentSearchQuery={currentSearchQuery}
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
    isLoading,
    currentSearchQuery,
    updateFilters,
    clearFilters,
    selectProperty,
    handleSearchSubmit
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
        handleSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
        currentSearchQuery={currentSearchQuery}
        cities={cities}
        statuses={statuses}
        constructionPermits={constructionPermits}
        eligibilityTypes={eligibilityTypes}
      />
    </ThemeProvider>
  );
}

export default App;