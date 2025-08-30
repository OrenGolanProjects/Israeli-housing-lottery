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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const statItems = [
    {
      icon: Home,
      label: 'פרוייקטים',
      value: stats.totalProjects.toLocaleString('he-IL'),
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#3b82f6',
      iconBg: '#3b82f6',
      description: 'סה״כ פרוייקטים פעילים'
    },
    {
      icon: People,
      label: 'יחידות דיור',
      value: stats.totalUnits.toLocaleString('he-IL'),
      color: '#059669',
      bgColor: '#ecfdf5',
      borderColor: '#059669',
      iconBg: '#059669',
      description: 'יחידות זמינות להרשמה'
    },
    {
      icon: EmojiEvents,
      label: 'זוכים',
      value: stats.totalWinners.toLocaleString('he-IL'),
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#dc2626',
      iconBg: '#dc2626',
      description: 'משתתפים שזכו בהגרלה'
    },
    {
      icon: TrendingUp,
      label: 'מחיר ממוצע למ״ר',
      value: `₪${formatPrice(stats.averagePrice)}`,
      color: '#ea580c',
      bgColor: '#fff7ed',
      borderColor: '#ea580c',
      iconBg: '#ea580c',
      description: 'מחיר ממוצע למ״ר בפרוייקטים'
    }
  ];

  return (
    <Paper 
      id="stats-main-panel"
      elevation={0} 
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
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
        alignItems: 'center',
        gap: 2, 
        mb: { xs: 2, sm: 3, md: 4 },
        p: 3,
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200'
      }}>
        <Box id="stats-icon-container" sx={{
          p: 1.5,
          bgcolor: 'primary.main',
          borderRadius: 2,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BarChart id="stats-bar-chart-icon" sx={{ fontSize: 20 }} />
        </Box>
        <Box id="stats-title-container">
          <Typography 
            id="stats-main-title"
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              mb: 0.5,
              fontSize: '1.25rem'
            }}
          >
            סטטיסטיקות כלליות
          </Typography>
          <Typography 
            id="stats-subtitle"
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.875rem'
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
        gap: 2,
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
              border: '2px solid',
              borderColor: item.borderColor,
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-4px)'
              }
            }}
          >
            <CardContent id={`stats-card-content-${index}`} sx={{ 
              p: 2, 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              textAlign: 'left'
            }}>
              <Avatar
                id={`stats-card-avatar-${index}`}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: item.iconBg,
                  color: 'white',
                  flexShrink: 0
                }}
              >
                <item.icon id={`stats-card-icon-${index}`} sx={{ fontSize: 16 }} />
              </Avatar>
              
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  id={`stats-card-description-${index}`}
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.7rem',
                    lineHeight: 1.3,
                    display: 'block',
                    mb: 0.5
                  }}
                >
                  {item.description}
                </Typography>
                
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    bgcolor: 'white',
                    borderRadius: 1.5,
                    border: '1px solid',
                    borderColor: item.borderColor,
                    color: item.color,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    whiteSpace: 'nowrap',
                    display: 'inline-block'
                  }}
                >
                  {item.label}
                </Box>
              </Box>
              
              <Typography
                id={`stats-card-value-${index}`}
                variant="h6"
                sx={{
                  color: item.color,
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  lineHeight: 1.2,
                  flexShrink: 0,
                  textAlign: 'right'
                }}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default Stats;
