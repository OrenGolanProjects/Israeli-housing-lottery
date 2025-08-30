import { Box, AppBar, Toolbar, Typography, TextField, InputAdornment, Button, useMediaQuery, useTheme } from '@mui/material';
import { Search, Home } from '@mui/icons-material';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount: number;
  totalCount: number;
}

const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount
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
                variant={isMobile ? 'h6' : 'h5'}
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  lineHeight: 1.2
                }}
              >
                דירה להשכרה
              </Typography>
              <Typography
                id="topbar-subtitle"
                variant={isMobile ? 'caption' : 'body2'}
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.2
                }}
              >
                מערכת הגרלות דיור ממשלתיות
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box id="topbar-search-container" sx={{ flex: 1, maxWidth: isMobile ? 200 : 300, mx: 'auto' }}>
            <TextField
              id="topbar-search-input"
              fullWidth
              size={isMobile ? 'small' : 'medium'}
              placeholder="חפש פרוייקט או עיר..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment id="topbar-search-icon" position="start">
                    <Search sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'grey.300',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
          </Box>

          {/* Project Count Button */}
          <Button
            id="topbar-project-count"
            variant="contained"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              borderRadius: 2,
              px: isMobile ? 2 : 3,
              py: isMobile ? 1 : 1.5,
              minWidth: 'auto',
              whiteSpace: 'nowrap'
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
