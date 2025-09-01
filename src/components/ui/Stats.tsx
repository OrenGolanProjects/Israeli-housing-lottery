import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card,
  CardContent,
  Avatar
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
  const safeStats = useMemo(() => ({
    totalProjects: stats?.totalProjects || 0,
    totalUnits: stats?.totalUnits || 0,
    totalSubscribers: stats?.totalSubscribers || 0,
    totalWinners: stats?.totalWinners || 0,
    averagePrice: stats?.averagePrice || 0,
    averageCompetitionRatio: stats?.averageCompetitionRatio || 0
  }), [stats]);

  const statItems = useMemo(() => [
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
  ], [safeStats]);

  const displayItems = variant === 'compact' 
    ? statItems.slice(0, 4) 
    : statItems;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: variant === 'compact' ? 2 : 3,
        bgcolor: 'background.paper',
        height: '100%'
      }}
    >
      {variant !== 'compact' && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2, 
          mb: 3,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2
        }}>
          <Box sx={{
            p: 1,
            bgcolor: 'primary.main',
            borderRadius: 1.5,
            color: 'white'
          }}>
            <BarChart sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              סטטיסטיקות כלליות
            </Typography>
            <Typography variant="body2" color="text.secondary">
              תמונת מצב כללית של הפרוייקטים
            </Typography>
          </Box>
        </Box>
      )}
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: variant === 'compact' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
          lg: variant === 'compact' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)'
        },
        gap: 2
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
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}
          >
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: item.color,
                  color: 'white',
                  mx: 'auto',
                  mb: 1
                }}
              >
                <item.icon />
              </Avatar>
              
              <Typography
                variant="body2"
                sx={{
                  color: item.color,
                  fontWeight: 600,
                  mb: 1,
                  fontSize: '0.875rem'
                }}
              >
                {item.label}
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: item.color,
                  fontWeight: 700,
                  fontSize: '1.25rem'
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
