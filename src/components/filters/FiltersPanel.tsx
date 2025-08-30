import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  TextField,
  useMediaQuery,
  useTheme,
  Chip,
  Stack
} from '@mui/material';
import { Clear, Tune } from '@mui/icons-material';
import type { FilterState } from '../../types';

interface FiltersPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  cities: string[];
  statuses: string[];
  constructionPermits: string[];
  eligibilityTypes: string[];
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  cities,
  statuses,
  constructionPermits,
  eligibilityTypes
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const hasActiveFilters = Object.values(filters).some(value =>
    value !== '' && value !== null && value !== undefined &&
    (Array.isArray(value) ? value.length > 0 : true)
  );

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.selectedCity) count++;
    if (filters.maxPrice) count++;
    if (filters.selectedStatus.length > 0) count++;
    if (filters.selectedConstructionPermits.length > 0) count++;
    if (filters.selectedEligibilityTypes.length > 0) count++;
    if (filters.searchQuery) count++;
    return count;
  };

  return (
    <Paper
      id="filters-main-panel"
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderBottom: 1,
        borderColor: 'grey.100',
        bgcolor: 'background.paper',
        flexShrink: 0,
        borderRadius: 0
      }}
    >
      <Box id="filters-header" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: { xs: 2, sm: 2.5, md: 3 }
      }}>
        <Box id="filters-title-section" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box id="filters-icon-container" sx={{
            p: 0.75,
            bgcolor: 'primary.50',
            borderRadius: 1.5,
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Tune id="filters-tune-icon" sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
          </Box>
          <Box id="filters-text-container">
            <Typography
              id="filters-main-title"
              variant={isMobile ? 'subtitle1' : 'h6'}
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 0.5,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              מסננים
            </Typography>
            <Typography
              id="filters-subtitle"
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                fontSize: { xs: '0.7rem', sm: '0.75rem' }
              }}
            >
              סינון פרוייקטים לפי קריטריונים
            </Typography>
          </Box>
        </Box>
        {hasActiveFilters && (
          <Chip
            id="filters-active-count"
            label={`${getActiveFilterCount()} פעיל`}
            size="small"
            color="primary"
            variant="filled"
            sx={{
              fontWeight: 600,
              '& .MuiChip-label': { px: 1.5 },
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          />
        )}
      </Box>

      <Box id="filters-form-container" sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: isSmallScreen ? '1fr' : 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        },
        gap: { xs: 1.5, sm: 2, md: 2.5 }
      }}>
        <FormControl id="filters-city-control" fullWidth size="small">
          <InputLabel id="filters-city-label" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>עיר</InputLabel>
          <Select
            id="filters-city-select"
            value={filters.selectedCity || ''}
            label="עיר"
            onChange={(e) => onFilterChange({ selectedCity: e.target.value })}
            dir="rtl"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300',
                borderWidth: 1.5
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2
              }
            }}
          >
            <MenuItem value="">כל הערים</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="filters-max-price-input"
          label="מחיר מקסימלי למ״ר"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
          fullWidth
          size="small"
          dir="rtl"
          InputProps={{
            startAdornment: (
              <Box id="filters-price-symbol" sx={{
                color: 'text.secondary',
                mr: 1,
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                ₪
              </Box>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey.300',
              borderWidth: 1.5
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 2
            }
          }}
        />

        <FormControl id="filters-status-control" fullWidth size="small">
          <InputLabel id="filters-status-label" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>סטטוס</InputLabel>
          <Select
            id="filters-status-select"
            value={filters.selectedStatus[0] || ''}
            label="סטטוס"
            onChange={(e) => onFilterChange({ selectedStatus: [e.target.value] })}
            dir="rtl"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300',
                borderWidth: 1.5
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2
              }
            }}
          >
            <MenuItem value="">כל הסטטוסים</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl id="filters-construction-permit-control" fullWidth size="small">
          <InputLabel id="filters-construction-permit-label" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>היתר בנייה</InputLabel>
          <Select
            id="filters-construction-permit-select"
            value={filters.selectedConstructionPermits[0] || ''}
            label="היתר בנייה"
            onChange={(e) => onFilterChange({ selectedConstructionPermits: [e.target.value] })}
            dir="rtl"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300',
                borderWidth: 1.5
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2
              }
            }}
          >
            <MenuItem value="">כל ההיתרים</MenuItem>
            {constructionPermits.map((permit) => (
              <MenuItem key={permit} value={permit}>{permit}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl id="filters-eligibility-control" fullWidth size="small">
          <InputLabel id="filters-eligibility-label" sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>זכאות</InputLabel>
          <Select
            id="filters-eligibility-select"
            value={filters.selectedEligibilityTypes[0] || ''}
            label="זכאות"
            onChange={(e) => onFilterChange({ selectedEligibilityTypes: [e.target.value] })}
            dir="rtl"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'grey.300',
                borderWidth: 1.5
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2
              }
            }}
          >
            <MenuItem value="">כל הזכאויות</MenuItem>
            {eligibilityTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <Box id="filters-clear-section" sx={{
            gridColumn: { xs: '1', sm: '1 / -1', md: '1 / -1', lg: '1 / -1' },
            mt: 1
          }}>
            <Divider id="filters-clear-divider" sx={{ my: 2, borderColor: 'grey.200' }} />
            <Stack id="filters-clear-button-container" direction="row" spacing={2} justifyContent="center">
              <Button
                id="filters-clear-button"
                variant="outlined"
                color="secondary"
                startIcon={<Clear />}
                onClick={onClearFilters}
                size="medium"
                sx={{
                  borderRadius: 2,
                  minWidth: { xs: 120, sm: 140 },
                  px: { xs: 2, sm: 3 },
                  py: 1,
                  fontWeight: 600,
                  borderWidth: 1.5,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-1px)',
                    boxShadow: 2
                  }
                }}
              >
                נקה מסננים
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default FiltersPanel;
