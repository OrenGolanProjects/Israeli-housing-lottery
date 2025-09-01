import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Tune, Close } from '@mui/icons-material';
import { useState } from 'react';
import type { FilterState } from '../../types';

interface FiltersPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  cities: string[];
  statuses: string[];
  constructionPermits: string[];
  eligibilityTypes: string[];
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFilterChange,
  cities,
  statuses,
  constructionPermits,
  eligibilityTypes
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleOpenFilters = () => {
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  return (
    <>
      <Paper
        id="filters-main-panel"
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          borderBottom: 1,
          borderColor: 'grey.100',
          bgcolor: 'background.paper',
          flexShrink: 0,
          borderRadius: 0,
          background: 'linear-gradient(135deg, #fafbfc 0%, #f8fafc 100%)'
        }}
      >
        <Box id="filters-header" sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: { xs: 3, sm: 4, md: 5 }
        }}>
          <Box 
            id="filters-title-section" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-1px)'
              }
            }}
            onClick={handleOpenFilters}
          >
            <Box id="filters-icon-container" sx={{
              p: 1.5,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: 2.5,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)'
              }
            }}>
              <Tune id="filters-tune-icon" sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
            </Box>
            <Box id="filters-text-container">
              <Typography
                id="filters-main-title"
                variant={isMobile ? 'h5' : 'h4'}
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                  mb: 1,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                סינון פרוייקטים
              </Typography>
              <Typography
                id="filters-subtitle"
                variant={isMobile ? 'body1' : 'subtitle1'}
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  fontWeight: 500,
                  lineHeight: 1.4
                }}
              >
                מצא את הפרוייקט המושלם עבורך
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Filters Modal */}
      <Dialog
        id="filters-modal-dialog"
        open={isFiltersOpen}
        onClose={handleCloseFilters}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            maxHeight: '90vh',
            overflow: 'hidden'
          }
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)'
          }
        }}
      >
        <DialogTitle 
          id="filters-modal-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 3,
            p: 3,
            pb: 2,
            borderBottom: 2,
            borderColor: 'primary.100',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)'
            }
          }}
        >
          <Box id="filters-modal-header-content" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box id="filters-modal-header-icon" sx={{
              p: 1.5,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: 3,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05) rotate(5deg)',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)'
              }
            }}>
              <Tune id="filters-modal-tune-icon" sx={{ fontSize: 18 }} />
            </Box>
            <Box id="filters-modal-header-text">
              <Typography 
                id="filters-modal-main-title"
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'text.primary',
                  mb: 0.5,
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                מסננים
              </Typography>
              <Typography 
                id="filters-modal-subtitle"
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500,
                  opacity: 0.8
                }}
              >
                בחר את הקריטריונים לסינון הפרויקטים
              </Typography>
            </Box>
          </Box>
          <IconButton
            id="filters-modal-close-button"
            onClick={handleCloseFilters}
            sx={{
              color: 'text.secondary',
              p: 1.5,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'error.50',
                color: 'error.main',
                transform: 'scale(1.1) rotate(90deg)'
              }
            }}
          >
            <Close id="filters-modal-close-icon" />
          </IconButton>
        </DialogTitle>

        <DialogContent 
          id="filters-modal-content"
          sx={{ 
            p: 4,
            pt: 6, // Add more top padding
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f5f9',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
              borderRadius: '4px',
              '&:hover': {
                background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
              }
            }
          }}
        >
          <Box id="filters-modal-form-container" sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)'
            },
            gap: 4,
            minWidth: 0,
            '& > *': {
              minWidth: 0,
              width: '100%',
              maxWidth: '100%'
            },
            '& .MuiFormControl-root': {
              minWidth: 0,
              width: '100%'
            },
            '& .MuiTextField-root': {
              minWidth: 0,
              width: '100%'
            }
          }}>
            <FormControl id="filters-modal-city-control" fullWidth size="medium">
              <InputLabel 
                id="filters-modal-city-label" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 600,
                  '&.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 700
                  }
                }}
              >
                עיר
              </InputLabel>
              <Select
                id="filters-modal-city-select"
                value={filters.selectedCity || ''}
                label="עיר"
                onChange={(e) => onFilterChange({ selectedCity: e.target.value })}
                dir="rtl"
                displayEmpty
                renderValue={(value) => {
                  if (!value) return <span style={{ color: '#9ca3af' }}>בחר עיר</span>;
                  return value;
                }}
                sx={{
                  borderRadius: 3,
                  minWidth: 0,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                    borderWidth: 2,
                    borderRadius: 3
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2.5
                  },
                  '& .MuiSelect-select': {
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: 1.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontWeight: 500 }}>כל הערים</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city} sx={{ fontWeight: 500 }}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="filters-modal-max-price-input"
              label="מחיר מקסימלי למר"
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
              fullWidth
              size="medium"
              dir="rtl"
              placeholder="הכנס מחיר מקסימלי"
              InputProps={{
                startAdornment: (
                  <Box id="filters-modal-price-symbol" sx={{
                    color: 'primary.main',
                    mr: 1.5,
                    fontWeight: 700,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    ₪
                  </Box>
                )
              }}
              sx={{
                borderRadius: 3,
                minWidth: 0,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'grey.300',
                  borderWidth: 2,
                  borderRadius: 3
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: 2
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: 2.5
                },
                '& .MuiInputLabel-root': {
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 700
                  }
                },
                '& .MuiInputBase-input': {
                  fontWeight: 500,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  py: 1.5,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                },
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                }
              }}
            />

            <FormControl id="filters-modal-status-control" fullWidth size="medium">
              <InputLabel 
                id="filters-modal-status-label" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 600,
                  '&.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 700
                  }
                }}
              >
                סטטוס
              </InputLabel>
              <Select
                id="filters-modal-status-select"
                value={filters.selectedStatus[0] || ''}
                label="סטטוס"
                onChange={(e) => onFilterChange({ selectedStatus: [e.target.value] })}
                dir="rtl"
                displayEmpty
                renderValue={(value) => {
                  if (!value) return <span style={{ color: '#9ca3af' }}>בחר סטטוס</span>;
                  return value;
                }}
                sx={{
                  borderRadius: 3,
                  minWidth: 0,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                    borderWidth: 2,
                    borderRadius: 3
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2.5
                  },
                  '& .MuiSelect-select': {
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: 1.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontWeight: 500 }}>כל הסטטוסים</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status} sx={{ fontWeight: 500 }}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl id="filters-modal-construction-permit-control" fullWidth size="medium">
              <InputLabel 
                id="filters-modal-construction-permit-label" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 600,
                  '&.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 700
                  }
                }}
              >
                היתר בנייה
              </InputLabel>
              <Select
                id="filters-modal-construction-permit-select"
                value={filters.selectedConstructionPermits[0] || ''}
                label="היתר בנייה"
                onChange={(e) => onFilterChange({ selectedConstructionPermits: [e.target.value] })}
                dir="rtl"
                displayEmpty
                renderValue={(value) => {
                  if (!value) return <span style={{ color: '#9ca3af' }}>בחר היתר בנייה</span>;
                  return value;
                }}
                sx={{
                  borderRadius: 3,
                  minWidth: 0,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                    borderWidth: 2,
                    borderRadius: 3
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2.5
                  },
                  '& .MuiSelect-select': {
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: 1.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontWeight: 500 }}>כל ההיתרים</MenuItem>
                {constructionPermits.map((permit) => (
                  <MenuItem key={permit} value={permit} sx={{ fontWeight: 500 }}>{permit}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl id="filters-modal-eligibility-control" fullWidth size="medium">
              <InputLabel 
                id="filters-modal-eligibility-label" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  fontWeight: 600,
                  '&.Mui-focused': {
                    color: 'primary.main',
                    fontWeight: 700
                  }
                }}
              >
                זכאות
              </InputLabel>
              <Select
                id="filters-modal-eligibility-select"
                value={filters.selectedEligibilityTypes[0] || ''}
                label="זכאות"
                onChange={(e) => onFilterChange({ selectedEligibilityTypes: [e.target.value] })}
                dir="rtl"
                displayEmpty
                renderValue={(value) => {
                  if (!value) return <span style={{ color: '#9ca3af' }}>בחר זכאות</span>;
                  return value;
                }}
                sx={{
                  borderRadius: 3,
                  minWidth: 0,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                    borderWidth: 2,
                    borderRadius: 3
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2.5
                  },
                  '& .MuiSelect-select': {
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: 1.5,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  },
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <MenuItem value="" sx={{ fontWeight: 500 }}>כל הזכאויות</MenuItem>
                {eligibilityTypes.map((type) => (
                  <MenuItem key={type} value={type} sx={{ fontWeight: 500 }}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions 
          id="filters-modal-actions"
          sx={{ 
            p: 4, 
            pt: 2,
            gap: 3,
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            borderTop: 2,
            borderColor: 'grey.100',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
        >
          <Button
            id="filters-modal-close-action-button"
            variant="contained"
            color="primary"
            onClick={handleCloseFilters}
            size="large"
            sx={{
              borderRadius: 3,
              minWidth: { xs: '100%', sm: 180 },
              px: { xs: 4, sm: 5 },
              py: 2,
              fontWeight: 700,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textTransform: 'none',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              boxShadow: '0 6px 15px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 25px rgba(59, 130, 246, 0.4)',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
              }
            }}
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FiltersPanel;
