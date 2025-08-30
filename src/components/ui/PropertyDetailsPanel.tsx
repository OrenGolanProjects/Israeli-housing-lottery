import { useState, useEffect } from 'react';
import { Box, Paper, Typography, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { FolderOpen, Close } from '@mui/icons-material';
import type { Property } from '../../types';

interface PropertyDetailsPanelProps {
  selectedProperty: Property | null;
  onClearSelection?: () => void;
}

const PropertyDetailsPanel: React.FC<PropertyDetailsPanelProps> = ({ 
  selectedProperty, 
  onClearSelection
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (selectedProperty && !currentProperty) {
      // OPENING: Set property, start opening animation
      setCurrentProperty(selectedProperty);
      setIsVisible(true);
      setIsOpening(true);
      setIsClosing(false);
      
      // After opening animation completes, reset opening state
      setTimeout(() => {
        setIsOpening(false);
      }, 400);
    } else if (!selectedProperty && currentProperty) {
      // CLOSING: Start closing animation, then hide after delay
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentProperty(null);
        setIsClosing(false);
      }, 400);
    }
  }, [selectedProperty, currentProperty]);

  const handleClose = () => {
    if (onClearSelection) {
      onClearSelection();
    }
  };

  if (!isVisible || !currentProperty) {
    return null;
  }

  return (
    <Paper id="property-details-panel" elevation={8} sx={{ 
      position: 'fixed',
      top: '88px',
      right: 0,
      width: isMobile ? '100%' : 400,
      height: 'calc(100vh - 88px)',
      zIndex: 1000,
      borderRadius: 0,
      overflow: 'auto',
      bgcolor: 'white',
      borderLeft: 1,
      borderColor: 'grey.200',
      transform: isClosing ? 'translateX(100%)' : isOpening ? 'translateX(100%)' : 'translateX(0)',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isClosing ? 0.8 : isOpening ? 0.8 : 1
    }}>
      <Box id="property-details-content" sx={{ 
        p: isMobile ? 2 : 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box id="property-details-header" sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: isMobile ? 2 : 3,
          flexShrink: 0
        }}>
          <Box id="property-details-title-section" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FolderOpen id="property-details-folder-icon" color="primary" />
            <Typography id="property-details-title" variant={isMobile ? 'subtitle1' : 'h6'} sx={{ fontWeight: 700, color: 'text.primary' }}>
              פרטי פרוייקט
            </Typography>
          </Box>
          <IconButton
            id="property-details-close-button"
            onClick={handleClose}
            size="small"
            sx={{ 
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            <Close id="property-details-close-icon" />
          </IconButton>
        </Box>

        <Box id="property-details-body" sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: isMobile ? 1.5 : 2,
          flex: 1,
          overflow: 'auto'
        }}>
          <Typography id="property-details-name" variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 700, color: 'text.primary' }}>
            {currentProperty.name}
          </Typography>
          
          <Typography id="property-details-location" variant={isMobile ? 'body2' : 'body1'} sx={{ color: 'text.secondary' }}>
            {currentProperty.city} - {currentProperty.neighborhood}
          </Typography>

          <Box id="property-details-stats-grid" sx={{ 
            display: 'grid', 
            gridTemplateColumns: isSmallMobile ? '1fr' : '1fr 1fr', 
            gap: isMobile ? 1 : 2,
            mt: isMobile ? 1 : 2
          }}>
            <Box id="property-details-units-box" sx={{ 
              p: isMobile ? 1.5 : 2, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: 1,
              borderColor: 'grey.200'
            }}>
              <Typography id="property-details-units-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
                יחידות דיור
              </Typography>
              <Typography id="property-details-units-value" variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 700, color: 'primary.main' }}>
                {currentProperty.totalUnits}
              </Typography>
            </Box>

            <Box id="property-details-price-box" sx={{ 
              p: isMobile ? 1.5 : 2, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: 1,
              borderColor: 'grey.200'
            }}>
              <Typography id="property-details-price-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
                מחיר למ״ר
              </Typography>
              <Typography id="property-details-price-value" variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 700, color: 'success.main' }}>
                ₪{currentProperty.pricePerMeter.toLocaleString()}
              </Typography>
            </Box>

            <Box id="property-details-competition-box" sx={{ 
              p: isMobile ? 1.5 : 2, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: 1,
              borderColor: 'grey.200'
            }}>
              <Typography id="property-details-competition-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
                תחרותיות
              </Typography>
              <Typography id="property-details-competition-value" variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 700, color: 'warning.main' }}>
                {currentProperty.competitionRatio.toFixed(1)}:1
              </Typography>
            </Box>

            <Box id="property-details-status-box" sx={{ 
              p: isMobile ? 1.5 : 2, 
              bgcolor: 'grey.50', 
              borderRadius: 2,
              border: 1,
              borderColor: 'grey.200'
            }}>
              <Typography id="property-details-status-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
                סטטוס
              </Typography>
              <Typography id="property-details-status-value" variant={isMobile ? 'h6' : 'h5'} sx={{ fontWeight: 700, color: 'info.main' }}>
                {currentProperty.status}
              </Typography>
            </Box>
          </Box>

          <Box id="property-details-eligibility-section" sx={{ mt: isMobile ? 1.5 : 2 }}>
            <Typography id="property-details-eligibility-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
              זכאות
            </Typography>
            <Typography id="property-details-eligibility-value" variant={isMobile ? 'body2' : 'body1'} sx={{ fontWeight: 500 }}>
              {currentProperty.eligibility}
            </Typography>
          </Box>

          <Box id="property-details-construction-permit-section" sx={{ mt: isMobile ? 1.5 : 2 }}>
            <Typography id="property-details-construction-permit-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
              היתר בנייה
            </Typography>
            <Typography id="property-details-construction-permit-value" variant={isMobile ? 'body2' : 'body1'} sx={{ fontWeight: 500 }}>
              {currentProperty.constructionPermit}
            </Typography>
          </Box>

          <Box id="property-details-marketing-method-section" sx={{ mt: isMobile ? 1.5 : 2 }}>
            <Typography id="property-details-marketing-method-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
              שיטת שיווק
            </Typography>
            <Typography id="property-details-marketing-method-value" variant={isMobile ? 'body2' : 'body1'} sx={{ fontWeight: 500 }}>
              {currentProperty.marketingMethod}
            </Typography>
          </Box>

          <Box id="property-details-provider-section" sx={{ mt: isMobile ? 1.5 : 2 }}>
            <Typography id="property-details-provider-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
              ספק
            </Typography>
            <Typography id="property-details-provider-value" variant={isMobile ? 'body2' : 'body1'} sx={{ fontWeight: 500 }}>
              {currentProperty.provider}
            </Typography>
          </Box>

          <Box id="property-details-lottery-date-section" sx={{ mt: isMobile ? 1.5 : 2 }}>
            <Typography id="property-details-lottery-date-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
              תאריך הגרלה
            </Typography>
            <Typography id="property-details-lottery-date-value" variant={isMobile ? 'body2' : 'body1'} sx={{ fontWeight: 500 }}>
              {currentProperty.lotteryDate}
            </Typography>
          </Box>

          <Box id="property-details-signup-deadline-section" sx={{ mt: isMobile ? 1.5 : 2 }}>
            <Typography id="property-details-signup-deadline-label" variant={isMobile ? 'caption' : 'body2'} sx={{ color: 'text.secondary', mb: 0.5 }}>
              תאריך סיום הרשמה
            </Typography>
            <Typography id="property-details-signup-deadline-value" variant={isMobile ? 'body2' : 'body1'} sx={{ fontWeight: 500 }}>
              {currentProperty.signupDeadline}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PropertyDetailsPanel;
