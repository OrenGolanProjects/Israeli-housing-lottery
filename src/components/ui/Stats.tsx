import { 
  Box, 
  Typography, 
  Paper, 
  useMediaQuery, 
  useTheme,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { 
  Home, 
  People, 
  EmojiEvents, 
  TrendingUp, 
  BarChart
} from '@mui/icons-material';
import type { ProjectStats } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface StatsProps {
  stats: ProjectStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const statItems = [
    {
      icon: Home,
      label: 'פרוייקטים',
      value: stats.totalProjects.toLocaleString('he-IL'),
      color: 'primary.main',
      bgColor: 'primary.50',
      borderColor: 'primary.200',
      iconBg: 'primary.100',
      description: 'סה״כ פרוייקטים פעילים'
    },
    {
      icon: People,
      label: 'יחידות דיור',
      value: stats.totalUnits.toLocaleString('he-IL'),
      color: 'success.main',
      bgColor: 'success.50',
      borderColor: 'success.200',
      iconBg: 'success.100',
      description: 'יחידות זמינות להרשמה'
    },
    {
      icon: EmojiEvents,
      label: 'זוכים',
      value: stats.totalWinners.toLocaleString('he-IL'),
      color: 'secondary.main',
      bgColor: 'secondary.50',
      borderColor: 'secondary.200',
      iconBg: 'secondary.100',
      description: 'משתתפים שזכו בהגרלה'
    },
    {
      icon: TrendingUp,
      label: 'מחיר ממוצע למ״ר',
      value: `₪${formatPrice(stats.averagePrice)}`,
      color: 'warning.main',
      bgColor: 'warning.50',
      borderColor: 'warning.200',
      iconBg: 'warning.100',
      description: 'מחיר ממוצע למ״ר בפרוייקטים'
    }
  ];

  return (
    <Paper 
      id="stats-main-panel"
      elevation={0} 
      sx={{ 
        p: { xs: 1.5, sm: 2, md: 2 }, 
        borderBottom: 1, 
        borderColor: 'grey.100',
        bgcolor: 'background.paper',
        borderRadius: 0,
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box id="stats-header" sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'row', md: isSmallScreen ? 'row' : 'column' },
        alignItems: { xs: 'center', md: isSmallScreen ? 'center' : 'flex-start' },
        gap: 1, 
        mb: { xs: 1.5, sm: 2, md: 2 } 
      }}>
        <Box id="stats-icon-container" sx={{
          p: 0.75,
          bgcolor: 'info.50',
          borderRadius: 1.5,
          color: 'info.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BarChart id="stats-bar-chart-icon" sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
        </Box>
        <Box id="stats-title-container" sx={{
          textAlign: { xs: 'left', md: isSmallScreen ? 'left' : 'center' }
        }}>
          <Typography 
            id="stats-main-title"
            variant={isMobile ? 'subtitle1' : 'h6'} 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              mb: 0.5,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
            }}
          >
            סטטיסטיקות כלליות
          </Typography>
          <Typography 
            id="stats-subtitle"
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              display: 'block',
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          >
            תמונת מצב כללית של הפרוייקטים
          </Typography>
        </Box>
      </Box>
      
      <Box id="stats-grid" sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: isSmallScreen ? 'repeat(2, 1fr)' : '1fr',
          lg: '1fr'
        },
        gap: { xs: 1, sm: 1.5, md: 2 },
        flex: 1,
        minHeight: 0
      }}>
        {statItems.map((item, index) => (
          <Card
            key={index}
            id={`stats-card-${index}`}
            elevation={0}
            sx={{
              bgcolor: item.bgColor,
              border: 2,
              borderColor: item.borderColor,
              borderRadius: 3,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'visible',
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-8px)',
                borderColor: item.color,
                '& .stat-icon': {
                  transform: 'scale(1.1) rotate(5deg)',
                  bgcolor: item.color,
                  color: 'white'
                }
              }
            }}
          >
            <CardContent id={`stats-card-content-${index}`} sx={{ 
              p: { xs: 1.5, sm: 2, md: 2 }, 
              textAlign: { xs: 'center', md: isSmallScreen ? 'center' : 'left' },
              display: 'flex',
              flexDirection: { xs: 'column', md: isSmallScreen ? 'column' : 'row' },
              alignItems: { xs: 'center', md: isSmallScreen ? 'center' : 'flex-start' },
              gap: { xs: 0, md: isSmallScreen ? 0 : 1.5 }
            }}>
              <Box id={`stats-card-left-${index}`} sx={{ 
                mb: { xs: 2, sm: 2.5, md: isSmallScreen ? 2.5 : 0 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: isSmallScreen ? 'center' : 'flex-start' }
              }}>
                <Avatar
                  id={`stats-card-avatar-${index}`}
                  className="stat-icon"
                  sx={{
                    width: { xs: 40, sm: 48, md: 56 },
                    height: { xs: 40, sm: 48, md: 56 },
                    bgcolor: item.iconBg,
                    color: item.color,
                    mx: { xs: 'auto', md: isSmallScreen ? 'auto' : 0 },
                    mb: 1.5,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '& .MuiAvatar-fallback': {
                      fontSize: { xs: 14, sm: 18, md: 22 }
                    }
                  }}
                >
                  <item.icon id={`stats-card-icon-${index}`} sx={{ fontSize: { xs: 14, sm: 18, md: 22 } }} />
                </Avatar>
                <Typography
                  id={`stats-card-label-${index}`}
                  variant="caption"
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.5, sm: 0.75 },
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    color: item.color,
                    fontWeight: 600,
                    opacity: 0.9,
                    fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' },
                    display: 'block',
                    border: 1,
                    borderColor: item.borderColor
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
              
              <Box id={`stats-card-right-${index}`} sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: isSmallScreen ? 'center' : 'flex-start' },
                flex: 1
              }}>
                <Typography
                  id={`stats-card-value-${index}`}
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    color: item.color,
                    fontWeight: 800,
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem' },
                    lineHeight: 1.2,
                    mb: 0.75,
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {item.value}
                </Typography>
                
                <Typography
                  id={`stats-card-description-${index}`}
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
                    lineHeight: 1.4,
                    opacity: 0.8,
                    display: 'block'
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default Stats;
