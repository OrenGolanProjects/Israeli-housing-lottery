import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon, Map as LeafletMap } from 'leaflet';
import { Box, Paper, Typography, Avatar, useMediaQuery, useTheme, Chip } from '@mui/material';
import { LocationOn, Layers, Info, ZoomIn, ZoomOut } from '@mui/icons-material';
import type { Property } from '../../types';
import { getCompetitionTextColor, getCompetitionHexColor } from '../../utils/formatters';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property | null) => void;
}

const Map: React.FC<MapProps> = ({
  properties,
  selectedProperty,
  onPropertySelect
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const mapRef = useRef<LeafletMap>(null);

  const israelCenter: [number, number] = [31.7683, 35.2137];
  const israelBounds: [[number, number], [number, number]] = [
    [29.5, 34.2], // Southwest
    [33.5, 35.7]  // Northeast
  ];

  // Effect to handle property selection and zoom
  useEffect(() => {
    if (selectedProperty && mapRef.current) {
      // Ensure the map is ready before zooming
      setTimeout(() => {
        if (mapRef.current) {
          // Focus the map container to ensure it's visible
          const mapContainer = document.getElementById('map-leaflet-container');
          if (mapContainer) {
            mapContainer.focus();
          }
          
          mapRef.current.setView(
            selectedProperty.coordinates,
            15, // Zoom level for property detail view
            {
              animate: true,
              duration: 1.5,
              easeLinearity: 0.25
            }
          );
        }
      }, 100); // Small delay to ensure map is fully rendered
    } else if (!selectedProperty && mapRef.current) {
      // Reset to Israel view when no property is selected
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.fitBounds(israelBounds, { padding: [20, 20] });
        }
      }, 100);
    }
  }, [selectedProperty]);

  const createCustomMarker = (property: Property) => {
    const hexColor = getCompetitionHexColor(property.competitionRatio);
    const ratio = property.competitionRatio.toFixed(0);
    const isSelected = selectedProperty?.id === property.id;
    
    // Get complementary colors that work well together
    const getMarkerColors = (bgColor: string, isSelected: boolean) => {
      switch (bgColor) {
        case '#10b981': // Green - low competition
          return {
            background: isSelected ? '#059669' : '#10b981', // Darker green when selected
            border: isSelected ? '#047857' : '#059669',
            text: '#ffffff',
            shadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
          };
        case '#f59e0b': // Yellow - medium competition
          return {
            background: isSelected ? '#d97706' : '#f59e0b', // Darker yellow when selected
            border: isSelected ? '#b45309' : '#d97706',
            text: '#ffffff',
            shadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
          };
        case '#f97316': // Coral - high competition
          return {
            background: isSelected ? '#ea580c' : '#f97316', // Darker coral when selected
            border: isSelected ? '#c2410c' : '#ea580c',
            text: '#ffffff',
            shadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
          };
        default: // Gray
          return {
            background: isSelected ? '#6b7280' : '#9ca3af',
            border: isSelected ? '#4b5563' : '#6b7280',
            text: '#ffffff',
            shadow: '0 4px 12px rgba(156, 163, 175, 0.4)'
          };
      }
    };
    
    const colors = getMarkerColors(hexColor, isSelected);
    
    return new DivIcon({
      html: `
        <div style="
          background: ${colors.background};
          color: ${colors.text};
          width: ${isSelected ? '48px' : '40px'};
          height: ${isSelected ? '48px' : '40px'};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: ${isSelected ? '16px' : '14px'};
          border: 3px solid ${colors.border};
          box-shadow: ${colors.shadow};
          cursor: pointer;
          transition: all 0.3s ease;
          transform: ${isSelected ? 'scale(1.1)' : 'scale(1)'};
          text-shadow: 0 1px 2px rgba(0,0,0,0.8);
          position: relative;
        " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='${isSelected ? 'scale(1.1)' : 'scale(1)'}'">
          <span style="
            position: relative;
            z-index: 2;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
          ">${ratio}</span>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [isSelected ? 48 : 40, isSelected ? 48 : 40],
      iconAnchor: [isSelected ? 24 : 20, isSelected ? 48 : 40],
      popupAnchor: [0, isSelected ? -48 : -40]
    });
  };

  const handleMarkerClick = (property: Property) => {
    if (selectedProperty?.id === property.id) {
      onPropertySelect(null);
      // Reset to Israel view when deselecting
      if (mapRef.current) {
        mapRef.current.fitBounds(israelBounds, { padding: [20, 20] });
      }
    } else {
      onPropertySelect(property);
      // Zoom to the selected property immediately with smooth animation
      if (mapRef.current) {
        mapRef.current.setView(
          property.coordinates,
          15,
          {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
          }
        );
        
        // Add a subtle bounce effect to the marker
        const markerElement = document.querySelector(`[data-property-id="${property.id}"]`) as HTMLElement;
        if (markerElement) {
          markerElement.style.animation = 'bounce 0.6s ease-in-out';
          setTimeout(() => {
            if (markerElement) {
              markerElement.style.animation = '';
            }
          }, 600);
        }
      }
    }
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds(israelBounds);
    }
    // Clear property selection when resetting view
    onPropertySelect(null);
  };

  return (
    <Box id="map-main-container" sx={{ 
      flex: 1, 
      bgcolor: 'blue.50', 
      position: 'relative', 
      overflow: 'hidden',
      p: isMobile ? 2 : 3,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box id="map-content-wrapper" sx={{ 
        position: 'relative', 
        zIndex: 10, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: 0,
        flex: 1
      }}>
        <Box id="map-header" sx={{ p: isMobile ? 2 : 3, textAlign: 'center', flexShrink: 0 }}>
          <Paper 
            id="map-header-paper"
            elevation={0}
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: isMobile ? 1 : 1.5, 
              bgcolor: 'rgba(255,255,255,0.9)', 
              px: isMobile ? 2 : 3, 
              py: isMobile ? 1.5 : 2, 
              borderRadius: 3, 
              boxShadow: 3, 
              border: 1, 
              borderColor: 'grey.200' 
            }}
          >
            <Avatar id="map-header-avatar" sx={{ 
              width: isMobile ? 48 : 64, 
              height: isMobile ? 48 : 64, 
              bgcolor: 'primary.main' 
            }}>
              <LocationOn id="map-header-location-icon" sx={{ fontSize: isMobile ? 24 : 32 }} />
            </Avatar>
            <Box id="map-header-text">
              <Typography id="map-header-title" variant={isMobile ? 'h6' : 'h4'} sx={{ fontWeight: 700, color: 'text.primary' }}>
                מפת ישראל - הגרלות דיור
              </Typography>
              <Typography id="map-header-subtitle" variant={isMobile ? 'body2' : 'body1'} sx={{ color: 'text.secondary', fontWeight: 500 }}>
                מציג {properties.length} פרוייקטים
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box id="map-container-wrapper" sx={{ 
          flex: 1, 
          position: 'relative', 
          px: isMobile ? 2 : 3, 
          pb: isMobile ? 2 : 3,
          minHeight: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Paper 
            id="map-paper"
            elevation={0}
            sx={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%', 
              bgcolor: 'white', 
              borderRadius: 4, 
              border: 1, 
              borderColor: 'grey.300', 
              boxShadow: 4,
              minHeight: 0,
              flex: 1,
              overflow: 'hidden'
            }}
          >
            <MapContainer
              id="map-leaflet-container"
              ref={mapRef}
              center={israelCenter}
              zoom={7}
              style={{ height: '100%', width: '100%', minHeight: '400px' }}
              bounds={israelBounds}
              boundsOptions={{ padding: [20, 20] }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                id="map-tile-layer"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {properties.map((property) => (
                <Marker
                  key={`${property.id}-${selectedProperty?.id === property.id ? 'selected' : 'normal'}`}
                  position={property.coordinates}
                  icon={createCustomMarker(property)}
                  eventHandlers={{
                    click: () => handleMarkerClick(property)
                  }}
                  data-property-id={property.id}
                >
                  <Popup>
                    <Box id={`map-popup-content-${property.id}`} sx={{ p: 1, minWidth: 200 }}>
                      <Typography id={`map-popup-title-${property.id}`} variant="h6" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                        {property.name}
                      </Typography>
                      <Typography id={`map-popup-location-${property.id}`} variant="body2" sx={{ color: 'text.secondary', mb: 1, textAlign: 'center' }}>
                        {property.city} - {property.neighborhood}
                      </Typography>
                      <Box id={`map-popup-stats-${property.id}`} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 1 }}>
                        <Box id={`map-popup-price-${property.id}`} sx={{ textAlign: 'center' }}>
                          <Typography id={`map-popup-price-value-${property.id}`} variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            ₪{property.pricePerMeter.toLocaleString('he-IL')}
                          </Typography>
                          <Typography id={`map-popup-price-label-${property.id}`} variant="caption" sx={{ color: 'text.secondary' }}>
                            למ״ר
                          </Typography>
                        </Box>
                        <Box id={`map-popup-competition-${property.id}`} sx={{ textAlign: 'center' }}>
                          <Typography 
                            id={`map-popup-competition-value-${property.id}`}
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 700, 
                              color: getCompetitionTextColor(property.competitionRatio) 
                            }}
                          >
                            {property.competitionRatio.toFixed(1)}:1
                          </Typography>
                          <Typography id={`map-popup-competition-label-${property.id}`} variant="caption" sx={{ color: 'text.secondary' }}>
                            תחרותיות
                          </Typography>
                        </Box>
                      </Box>
                      <Box id={`map-popup-chips-${property.id}`} sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          id={`map-popup-status-${property.id}`}
                          label={property.status} 
                          size="small" 
                          color={property.status === 'פתוח להרשמה' ? 'success' : 'default'}
                        />
                        <Chip 
                          id={`map-popup-units-${property.id}`}
                          label={`${property.totalUnits} יחידות`} 
                          size="small" 
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <Box id="map-zoom-controls" sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1 
            }}>
              <Paper 
                id="map-zoom-in"
                elevation={3}
                sx={{ 
                  p: 1, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                }}
                onClick={handleZoomIn}
              >
                <ZoomIn />
              </Paper>
              <Paper 
                id="map-zoom-out"
                elevation={3}
                sx={{ 
                  p: 1, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                }}
                onClick={handleZoomOut}
              >
                <ZoomOut />
              </Paper>
            </Box>

            <Box id="map-reset-view" sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16 
            }}>
              <Paper 
                id="map-reset-button"
                elevation={3}
                sx={{ 
                  p: 1.5, 
                  borderRadius: 2, 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
                }}
                onClick={handleResetView}
              >
                <Typography id="map-reset-text" variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  חזרה לתצוגת ישראל
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Box>

        <Box id="map-legend" sx={{ 
          position: 'absolute', 
          bottom: isMobile ? 16 : 24, 
          right: isMobile ? 16 : 24 
        }}>
          <Paper 
            id="map-legend-paper"
            elevation={0}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.9)', 
              p: isMobile ? 1.5 : 2, 
              borderRadius: 3, 
              boxShadow: 3, 
              border: 1, 
              borderColor: 'grey.200' 
            }}
          >
            <Box id="map-legend-header" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: isMobile ? 1 : 1.5 }}>
              <Layers id="map-legend-icon" color="action" />
              <Typography id="map-legend-title" variant={isMobile ? 'caption' : 'subtitle2'} sx={{ fontWeight: 700, color: 'text.primary' }}>
                מקרא תחרותיות
              </Typography>
            </Box>
            <Box id="map-legend-items" sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0.5 : 1 }}>
              <Box id="map-legend-low" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography id="map-legend-low-text" variant="caption" sx={{ color: 'text.secondary' }}>
                  נמוכה (עד 6)
                </Typography>
                <Box id="map-legend-low-dot" sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, bgcolor: 'success.main', borderRadius: '50%', boxShadow: 1 }} />
              </Box>
              <Box id="map-legend-medium" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography id="map-legend-medium-text" variant="caption" sx={{ color: 'text.secondary' }}>
                  בינונית (6-8)
                </Typography>
                <Box id="map-legend-medium-dot" sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, bgcolor: 'warning.main', borderRadius: '50%', boxShadow: 1 }} />
              </Box>
              <Box id="map-legend-high" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography id="map-legend-high-text" variant="caption" sx={{ color: 'text.secondary' }}>
                  גבוהה (8+)
                </Typography>
                <Box id="map-legend-high-dot" sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, bgcolor: '#f97316', borderRadius: '50%', boxShadow: 1 }} />
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box id="map-info" sx={{ 
          position: 'absolute', 
          bottom: isMobile ? 16 : 24, 
          left: isMobile ? 16 : 24 
        }}>
          <Paper 
            id="map-info-paper"
            elevation={0}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.9)', 
              p: isMobile ? 1 : 1.5, 
              borderRadius: 3, 
              boxShadow: 3, 
              border: 1, 
              borderColor: 'grey.200' 
            }}
          >
            <Box id="map-info-content" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <Info id="map-info-icon" sx={{ fontSize: isMobile ? 14 : 16 }} />
              <Typography id="map-info-text" variant="caption" sx={{ fontWeight: 500 }}>
                {selectedProperty ? 'לחץ על סימון לסגירה' : 'לחץ על סימון לראות פרטים'}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Map;
