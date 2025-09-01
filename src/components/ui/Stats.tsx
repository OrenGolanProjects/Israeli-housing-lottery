import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card,
  CardContent,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Home, 
  People, 
  EmojiEvents, 
  BarChart,
  AttachMoney,
  Groups
} from '@mui/icons-material';
import type { ProjectStats } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface StatsProps {
  stats: ProjectStats;
  variant?: 'default' | 'compact';
}

const Stats: React.FC<StatsProps> = ({ stats, variant = 'default' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery('(min-width:1440px)');

  const safeStats = {
    totalProjects: stats?.totalProjects || 0,
    totalUnits: stats?.totalUnits || 0,
    totalSubscribers: stats?.totalSubscribers || 0,
    totalWinners: stats?.totalWinners || 0,
    averagePrice: stats?.averagePrice || 0,
    averageCompetitionRatio: stats?.averageCompetitionRatio || 0
  };

  const statItems = [
    {
      icon: Home,
      label: 'פרוייקטים',
      value: safeStats.totalProjects.toLocaleString('he-IL'),
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      icon: People,
      label: 'יחידות דיור',
      value: safeStats.totalUnits.toLocaleString('he-IL'),
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      icon: EmojiEvents,
      label: 'זוכים',
      value: safeStats.totalWinners.toLocaleString('he-IL'),
      color: '#ef4444',
      bgColor: '#fef2f2'
    },
    {
      icon: AttachMoney,
      label: 'מחיר ממוצע למ״ר',
      value: `₪${formatPrice(safeStats.averagePrice)}`,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      icon: BarChart,
      label: 'יחס תחרות ממוצע',
      value: `${safeStats.averageCompetitionRatio.toFixed(1)}:1`,
      color: '#8b5cf6',
      bgColor: '#f3f4f6'
    },
    {
      icon: Groups,
      label: 'נרשמים',
      value: safeStats.totalSubscribers?.toLocaleString('he-IL') || '0',
      color: '#06b6d4',
      bgColor: '#ecfeff'
    }
  ];

  const getGridConfig = () => {
    if (isMobile) return { cols: 2, gap: 1.5, padding: 2, avatarSize: 40 };
    if (isTablet) return { cols: 3, gap: 2, padding: 2.5, avatarSize: 44 };
    if (isLargeScreen) return { cols: 2, gap: 4, padding: 4, avatarSize: 56 };
    return { cols: 3, gap: 3, padding: 3, avatarSize: 48 };
  };

  const gridConfig = getGridConfig();
  const displayItems = variant === 'compact' ? statItems.slice(0, 4) : statItems;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {variant !== 'compact' && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: isMobile ? 1.5 : 2, 
          p: gridConfig.padding,
          pb: 2,
          bgcolor: 'grey.50',
          borderRadius: 2,
          m: gridConfig.padding,
          mb: 2,
          flexShrink: 0
        }}>
          <Box sx={{
            p: isMobile ? 0.75 : 1,
            bgcolor: 'primary.main',
            borderRadius: 1.5,
            color: 'white'
          }}>
            <BarChart sx={{ fontSize: isMobile ? 16 : 20 }} />
          </Box>
          <Box>
            <Typography 
              variant={isMobile ? 'subtitle2' : 'h6'} 
              sx={{ fontWeight: 600, mb: 0.5 }}
            >
              סטטיסטיקות כלליות
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
            >
              תמונת מצב כללית של הפרוייקטים
            </Typography>
          </Box>
        </Box>
      )}
      
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        px: gridConfig.padding,
        pb: gridConfig.padding,
        minHeight: 0
      }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gap: gridConfig.gap,
          height: 'fit-content'
        }}>
          {displayItems.map((item, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                bgcolor: item.bgColor,
                border: `2px solid ${item.color}`,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: isMobile ? 'none' : 'translateY(-2px)',
                  boxShadow: isMobile ? 1 : 3
                }
              }}
            >
              <CardContent sx={{ 
                p: isMobile ? 1.5 : 2, 
                textAlign: 'center' 
              }}>
                <Avatar
                  sx={{
                    width: gridConfig.avatarSize,
                    height: gridConfig.avatarSize,
                    bgcolor: item.color,
                    color: 'white',
                    mx: 'auto',
                    mb: 1
                  }}
                >
                  <item.icon sx={{ fontSize: isMobile ? 20 : 24 }} />
                </Avatar>
                
                <Typography
                  variant={isMobile ? 'caption' : 'body2'}
                  sx={{
                    color: item.color,
                    fontWeight: 600,
                    mb: 1,
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    lineHeight: 1.3
                  }}
                >
                  {item.label}
                </Typography>
                
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    color: item.color,
                    fontWeight: 700,
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    lineHeight: 1.2
                  }}
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default Stats;
