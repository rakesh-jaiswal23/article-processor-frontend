import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import UpdateIcon from '@mui/icons-material/Update';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StatCard = ({ title, value, icon, color, loading }) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: `${color}15`,
          color: color,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      
      {loading ? (
        <Skeleton variant="text" width={60} height={40} />
      ) : (
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'secondary.main' }}>
          {value}
        </Typography>
      )}
      
      <Box sx={{ mt: 2 }}>
        <LinearProgress 
          variant="determinate" 
          value={100} 
          sx={{ 
            height: 4, 
            borderRadius: 2,
            bgcolor: `${color}20`,
            '& .MuiLinearProgress-bar': {
              bgcolor: color,
            }
          }} 
        />
      </Box>
    </Paper>
  );
};

const StatsDashboard = ({ stats, loading }) => {
  const statCards = [
    {
      title: 'Total Articles',
      value: stats.total,
      icon: <ArticleIcon />,
      color: '#64748b', // slate-500
    },
    {
      title: 'Original',
      value: stats.original,
      icon: <ArticleIcon />,
      color: '#64748b', // slate-500
    },
    {
      title: 'Updated',
      value: stats.updated,
      icon: <UpdateIcon />,
      color: '#10b981', // emerald-500
    },
    {
      title: 'Processing',
      value: stats.processing,
      icon: <RefreshIcon />,
      color: '#f59e0b', // amber-500
    },
    {
      title: 'Failed',
      value: stats.failed,
      icon: <ErrorIcon />,
      color: '#ef4444', // red-500
    },
    {
      title: 'Success Rate',
      value: `${stats.total > 0 ? Math.round((stats.updated / stats.total) * 100) : 0}%`,
      icon: <TrendingUpIcon />,
      color: '#3b82f6', // blue-500
    },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: 'secondary.main', fontWeight: 600 }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <StatCard {...stat} loading={loading} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsDashboard;