import { Box, Typography, Chip, List, ListItem, ListItemButton, Divider, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { LocationOn, Business, People } from '@mui/icons-material';
import type { Property } from '../../types';
import { formatPrice, getCompetitionColor } from '../../utils/formatters';

interface PropertiesListProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property | null) => void;
}

const PropertiesList: React.FC<PropertiesListProps> = ({
  properties,
  selectedProperty,
  onPropertySelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Scroll to selected property when it changes
  useEffect(() => {
    if (selectedProperty) {
      const propertyElement = document.getElementById(`property-button-${selectedProperty.id}`);
      if (propertyElement) {
        propertyElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [selectedProperty]);

  const getStatusBadge = (status: string) => {
    const statusColors: { [key: string]: 'success' | 'warning' | 'info' | 'default' } = {
      'פתוח להרשמה': 'success',
      'בביצוע': 'warning',
      'בתהליכי הגרלה': 'info',
      'הסתיים': 'default'
    };
    
    return statusColors[status] || 'default';
  };

  if (properties.length === 0) {
    return (
      <Box id="properties-empty-container" sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Box id="properties-empty-header" sx={{ 
          p: isMobile ? 1.5 : 2, 
          borderBottom: 1, 
          borderColor: 'grey.200',
          bgcolor: 'grey.50'
        }}>
          <Typography id="properties-empty-title" variant={isMobile ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600, color: 'text.primary' }}>
            רשימת פרוייקטים
          </Typography>
          <Typography id="properties-empty-count" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mt: 0.5 }}>
            0 פרוייקטים נמצאו
          </Typography>
        </Box>
        <Box id="properties-empty-content" sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: isMobile ? 2 : 3,
          textAlign: 'center',
          color: 'text.secondary'
        }}>
          <Box id="properties-empty-message">
            <Typography id="properties-empty-main-message" variant={isMobile ? 'subtitle1' : 'h6'} sx={{ mb: 1 }}>
              לא נמצאו פרוייקטים
            </Typography>
            <Typography id="properties-empty-sub-message" variant={isMobile ? 'caption' : 'body2'}>
              נסה לשנות את המסננים או החיפוש
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box id="properties-main-container" sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 1,
      minHeight: 0
    }}>
      <Box id="properties-header" sx={{ 
        p: isMobile ? 1.5 : 2, 
        borderBottom: 1, 
        borderColor: 'grey.200',
        bgcolor: 'grey.50',
        flexShrink: 0
      }}>
        <Typography id="properties-header-title" variant={isMobile ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600, color: 'text.primary' }}>
          רשימת פרוייקטים
        </Typography>
        <Typography id="properties-header-count" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mt: 0.5 }}>
          {properties.length} פרוייקטים נמצאו
        </Typography>
      </Box>
      
      <List id="properties-list" sx={{ 
        flex: 1, 
        overflow: 'auto',
        minHeight: 0,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#a8a8a8',
        },
      }}>
        {properties.map((property, index) => (
          <Box key={property.id} id={`property-item-${property.id}`}>
            <ListItem id={`property-list-item-${property.id}`} disablePadding sx={{ minHeight: isMobile ? 100 : 120 }}>
              <ListItemButton
                id={`property-button-${property.id}`}
                onClick={() => onPropertySelect(selectedProperty?.id === property.id ? null : property)}
                selected={selectedProperty?.id === property.id}
                sx={{
                  p: isMobile ? 1.5 : 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.50',
                    borderRight: 3,
                    borderColor: 'primary.main',
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease-in-out'
                  },
                  '&:hover': {
                    bgcolor: 'grey.50',
                    transform: 'scale(1.01)',
                    transition: 'all 0.2s ease-in-out'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                                  <Box id={`property-content-${property.id}`} sx={{ width: '100%' }}>
                    {/* Property Header */}
                    <Box id={`property-header-${property.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box id={`property-title-section-${property.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography id={`property-name-${property.id}`} variant={isMobile ? 'body2' : 'subtitle1'} sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {property.name}
                        </Typography>
                        {selectedProperty?.id === property.id && (
                          <Box id={`property-selected-indicator-${property.id}`} sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'primary.main',
                            animation: 'pulse 2s infinite'
                          }} />
                        )}
                      </Box>
                      <Chip
                        id={`property-status-${property.id}`}
                        label={property.status}
                        color={getStatusBadge(property.status)}
                        size={isMobile ? 'small' : 'small'}
                        variant="outlined"
                      />
                    </Box>

                  {/* Location */}
                  <Box id={`property-location-${property.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LocationOn id={`property-location-icon-${property.id}`} sx={{ fontSize: isMobile ? 14 : 16, color: 'text.secondary' }} />
                    <Typography id={`property-location-text-${property.id}`} variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary' }}>
                      {property.city} - {property.neighborhood}
                    </Typography>
                  </Box>

                  {/* Key Stats */}
                  <Box id={`property-stats-${property.id}`} sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: isSmallMobile ? '1fr' : '1fr 1fr', 
                    gap: isMobile ? 0.5 : 1, 
                    mb: 1 
                  }}>
                    <Box id={`property-units-${property.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Business id={`property-units-icon-${property.id}`} sx={{ fontSize: isMobile ? 14 : 16, color: 'text.secondary' }} />
                      <Typography id={`property-units-text-${property.id}`} variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary' }}>
                        {property.totalUnits} יחידות
                      </Typography>
                    </Box>
                    <Box id={`property-subscribers-${property.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <People id={`property-subscribers-icon-${property.id}`} sx={{ fontSize: isMobile ? 14 : 16, color: 'text.secondary' }} />
                      <Typography id={`property-subscribers-text-${property.id}`} variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary' }}>
                        {property.totalSubscribers.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price and Competition */}
                  <Box id={`property-price-competition-${property.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography id={`property-price-${property.id}`} variant={isMobile ? 'subtitle2' : 'h6'} sx={{ fontWeight: 700, color: 'primary.main' }}>
                      ₪{formatPrice(property.pricePerMeter)}
                    </Typography>
                    <Chip
                      id={`property-competition-${property.id}`}
                      label={`${property.competitionRatio.toFixed(1)}:1`}
                      size={isMobile ? 'small' : 'small'}
                      sx={{
                        bgcolor: getCompetitionColor(property.competitionRatio),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
            {index < properties.length - 1 && <Divider id={`property-divider-${property.id}`} />}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default PropertiesList;
