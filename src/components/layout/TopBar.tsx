import { Box, AppBar, Toolbar, Typography, TextField, InputAdornment, Button, useMediaQuery, useTheme } from '@mui/material';
import { Search, Home, Clear } from '@mui/icons-material';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  isLoading?: boolean;
  filteredCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  onClearFilters: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  isLoading = false,
  filteredCount,
  totalCount,
  hasActiveFilters,
  activeFilterCount,
  onClearFilters
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar id="topbar-main" position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'grey.200' }}>
      <Toolbar id="topbar-toolbar" sx={{ px: isMobile ? 2 : 3, py: isMobile ? 1 : 2 }}>
        <Box id="topbar-content" sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          {/* Logo and Title */}
          <Box id="topbar-logo-title" sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Home id="topbar-home-icon" sx={{ color: 'primary.main', fontSize: isMobile ? 24 : 28 }} />
            <Box id="topbar-title-container" sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                id="topbar-main-title"
                variant={isMobile ? 'h5' : 'h4'}
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                  lineHeight: 1.2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  letterSpacing: '-0.02em',
                  textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                דירה להשכרה
              </Typography>
              <Typography
                id="topbar-subtitle"
                variant={isMobile ? 'body2' : 'body1'}
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.3,
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  fontWeight: 500
                }}
              >
                Israeli Housing Lottery
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box id="topbar-search-container" sx={{ flex: 1, maxWidth: isMobile ? 200 : 300, mx: 'auto' }}>
            <TextField
              id="topbar-search-input"
              fullWidth
              size={isMobile ? 'medium' : 'medium'}
              placeholder="חפש פרוייקט או עיר..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearchSubmit(searchQuery);
                }
              }}
              aria-label="חיפוש פרוייקטים וערים"
              inputProps={{
                'aria-describedby': 'search-description'
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment id="topbar-search-icon" position="start">
                    {isLoading ? (
                      <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{
                          width: 16,
                          height: 16,
                          border: '2px solid #e5e7eb',
                          borderTop: '2px solid #3b82f6',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                      </Box>
                    ) : (
                      <Search sx={{ color: 'text.secondary' }} />
                    )}
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 500
                  }
                }
              }}
            />
            <Typography 
              id="search-description" 
              variant="caption" 
              sx={{ display: 'none' }}
            >
              חיפוש פרוייקטים וערים במערכת ההגרלות
            </Typography>
          </Box>

          {/* Active Filters Section */}
          {hasActiveFilters && (
            <Box id="topbar-active-filters" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              flexShrink: 0,
              p: 1.5,
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: 3,
              border: '2px solid #f59e0b',
              minWidth: 0
            }}>
              <Box id="topbar-filters-info" sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, minWidth: 0 }}>
                <Typography 
                  id="topbar-filters-title"
                  variant="body2" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#92400e',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    whiteSpace: 'nowrap',
                    lineHeight: 1.3
                  }}
                >
                  מסננים פעילים
                </Typography>
                <Typography 
                  id="topbar-filters-count"
                  variant="body2" 
                  sx={{ 
                    color: '#92400e', 
                    opacity: 0.8,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    whiteSpace: 'nowrap',
                    lineHeight: 1.3
                  }}
                >
                  {activeFilterCount} מסננים מופעלים כרגע
                </Typography>
              </Box>
              <Button
                id="topbar-clear-filters-button"
                variant="outlined"
                color="warning"
                startIcon={<Clear />}
                onClick={onClearFilters}
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  fontWeight: 600,
                  borderWidth: 2,
                  borderColor: '#f59e0b',
                  color: '#92400e',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: '#fef3c7',
                    borderColor: '#d97706',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                נקה
              </Button>
            </Box>
          )}



          {/* Project Count Button */}
          <Button
            id="topbar-project-count"
            variant="contained"
            size={isMobile ? 'medium' : 'medium'}
            sx={{
              borderRadius: 2,
              px: isMobile ? 2 : 3,
              py: isMobile ? 1 : 1.5,
              minWidth: 'auto',
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 600
            }}
          >
            {isSmallMobile ? `${filteredCount}/${totalCount}` : `מתוך ${totalCount} פרוייקטים ${filteredCount}`}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
