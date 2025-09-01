import { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { DivIcon, Map as LeafletMap } from 'leaflet';
import { Box, Paper, Typography, Avatar, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import { LocationOn, ZoomIn, ZoomOut } from '@mui/icons-material';
import type { Property } from '../../types';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in React
import L from 'leaflet';
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom CSS for city banner markers
const cityBannerStyles = `
  .city-banner-marker {
    transition: all 0.3s ease;
  }
  
  .city-banner-marker:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3) !important;
  }
  
  .city-banner-marker div {
    transition: all 0.3s ease;
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = cityBannerStyles;
  document.head.appendChild(styleElement);
}

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
  const [isFetchingCoordinates, setIsFetchingCoordinates] = useState(false);
  const [usingPreciseCoordinates, setUsingPreciseCoordinates] = useState(false);

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

  const fetchPropertyCoordinates = async (property: Property): Promise<[number, number]> => {
    setIsFetchingCoordinates(true);
    setUsingPreciseCoordinates(false);
    
    try {
      // Try to get precise coordinates using property name + neighborhood + city
      const searchQuery = `${property.name}, ${property.neighborhood}, ${property.city}, Israel`;
      const encodedQuery = encodeURIComponent(searchQuery);
      const url = `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&limit=1&countrycodes=il`;
      
      const response = await fetch(url, {
        headers: { 'User-Agent': 'IsraeliHousingLottery/1.0' }
      });
      
      if (response.ok) {
        const results = await response.json();
        if (results && results.length > 0) {
          const preciseCoords: [number, number] = [parseFloat(results[0].lat), parseFloat(results[0].lon)];
          console.log('📍 Found precise coordinates for property:', property.name, 'at:', preciseCoords);
          setUsingPreciseCoordinates(true);
          return preciseCoords;
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch precise coordinates for property:', property.name, error);
    }
    
    // Fallback to city coordinates
    console.log('📍 Using city coordinates for property:', property.name);
    setUsingPreciseCoordinates(false);
    return property.coordinates;
  };

  const handlePropertySelect = async (property: Property) => {
    if (selectedProperty?.id === property.id) {
      onPropertySelect(null);
      setUsingPreciseCoordinates(false);
      // Reset to Israel view when deselecting
      if (mapRef.current) {
        mapRef.current.fitBounds(israelBounds, { padding: [20, 20] });
      }
    } else {
      onPropertySelect(property);
      
      // Fetch precise coordinates and zoom to property
      const preciseCoords = await fetchPropertyCoordinates(property);
      
      if (mapRef.current) {
        mapRef.current.setView(
          preciseCoords,
          16, // Higher zoom for property detail view
          {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
          }
        );
      }
    }
    setIsFetchingCoordinates(false);
  };

  // Filter out properties with invalid coordinates
  const validProperties = properties.filter(prop => 
    prop.coordinates && 
    prop.coordinates[0] !== 0 && 
    prop.coordinates[1] !== 0 &&
    !isNaN(prop.coordinates[0]) && 
    !isNaN(prop.coordinates[1])
  );

  if (validProperties.length === 0) {
    return (
      <Box sx={{ 
        flex: 1, 
        bgcolor: 'blue.50', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 3
      }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'white' }}>
          <Typography variant="h6" color="text.secondary">
            אין נתונים זמינים למפה
          </Typography>
        </Paper>
      </Box>
    );
  }

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
                נמצאו {validProperties.length} פרוייקטים
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
              
              {(() => {
                const cityGroups = validProperties.reduce((groups, property) => {
                  const city = property.city;
                  if (!groups[city]) {
                    groups[city] = [];
                  }
                  groups[city].push(property);
                  return groups;
                }, {} as Record<string, Property[]>);

                return Object.entries(cityGroups).map(([city, cityProperties]) => {
                  const firstProperty = cityProperties[0];
                  const coordinates = firstProperty.coordinates;
                  
                  return (
                    <Marker
                      key={`city-${city}`}
                      position={coordinates}
                      icon={new DivIcon({
                        html: `
                          <div style="
                            background: rgba(25, 118, 210, 0.9);
                            color: white;
                            padding: 8px 12px;
                            border-radius: 20px;
                            font-weight: 600;
                            font-size: 14px;
                            white-space: nowrap;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                            border: 2px solid white;
                            text-align: center;
                            min-width: 80px;
                          ">
                            נמצאו ${cityProperties.length} נכסים
                          </div>
                        `,
                        className: 'city-banner-marker',
                        iconSize: [120, 40],
                        iconAnchor: [60, 20]
                      })}
                      eventHandlers={{
                        click: () => {
                          if (cityProperties.length === 1) {
                            handlePropertySelect(cityProperties[0]);
                          } else {
                            // Zoom to city view
                            if (mapRef.current) {
                              mapRef.current.setView(coordinates, 12, {
                                animate: true,
                                duration: 1.5
                              });
                            }
                          }
                        }
                      }}
                    />
                  );
                });
              })()}
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
              <Typography id="map-legend-title" variant={isMobile ? 'caption' : 'subtitle2'} sx={{ fontWeight: 700, color: 'text.primary' }}>
                מקרא מפה
              </Typography>
            </Box>
            <Box id="map-legend-content" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box id="map-legend-banner" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography id="map-legend-banner-text" variant="caption" sx={{ color: 'text.secondary' }}>
                  באנר עיר
                </Typography>
                <Box id="map-legend-banner-example" sx={{ 
                  width: isMobile ? 60 : 80, 
                  height: isMobile ? 20 : 25, 
                  bgcolor: 'rgba(25, 118, 210, 0.9)', 
                  borderRadius: 2, 
                  boxShadow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="caption" sx={{ color: 'white', fontSize: '10px', fontWeight: 600 }}>
                    3 נכסים
                  </Typography>
                </Box>
              </Box>
              <Typography id="map-legend-info" variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                לחץ על באנר לראות פרטי הפרוייקטים
              </Typography>
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
              borderRadius: 2, 
              boxShadow: 2, 
              border: 1, 
              borderColor: 'grey.200' 
            }}
          >
            <Box id="map-info-content" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <Typography id="map-info-text" variant="caption" sx={{ fontWeight: 500 }}>
                {isFetchingCoordinates ? 'מחפש מיקום מדויק...' : 
                 selectedProperty ? 
                   (usingPreciseCoordinates ? 'מיקום מדויק נמצא - לחץ על באנר לסגירה' : 'מיקום עיר - לחץ על באנר לסגירה') : 
                   'לחץ על באנר לראות פרטי הפרוייקטים'}
              </Typography>
              {isFetchingCoordinates && (
                <CircularProgress size={16} color="primary" />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Map;
