import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Chip,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import UpdateIcon from '@mui/icons-material/Update';
import RefreshIcon from '@mui/icons-material/Refresh';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ErrorIcon from '@mui/icons-material/Error';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Sidebar = ({ open, onClose, activeView, onViewChange }) => {
  const menuItems = [
    { id: 'all', label: 'All Articles', icon: <AllInboxIcon />, count: null },
    { id: 'original', label: 'Original', icon: <ArticleIcon />, color: '#64748b' },
    { id: 'updated', label: 'Updated', icon: <UpdateIcon />, color: '#10b981' },
    { id: 'processing', label: 'Processing', icon: <RefreshIcon />, color: '#f59e0b' },
    { id: 'failed', label: 'Failed', icon: <ErrorIcon />, color: '#ef4444' },
  ];

  const drawerWidth = 280;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AutoAwesomeIcon sx={{ mr: 1, color: 'secondary.main', fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 600 }}>
            Navigation
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                selected={activeView === item.id}
                onClick={() => onViewChange(item.id)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    borderLeft: '4px solid #64748b',
                    '&:hover': {
                      backgroundColor: 'rgba(100, 116, 139, 0.15)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(100, 116, 139, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: activeView === item.id ? 'secondary.main' : 'text.secondary',
                  minWidth: 40 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography sx={{ 
                      fontWeight: activeView === item.id ? 600 : 400,
                      color: activeView === item.id ? 'secondary.main' : 'text.primary'
                    }}>
                      {item.label}
                    </Typography>
                  } 
                />
                {item.color && (
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: '50%',
                      backgroundColor: item.color,
                    }} 
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ p: 2, bgcolor: 'rgba(100, 116, 139, 0.05)', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            System Status
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="API Online" 
              size="small" 
              color="success"
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip 
              label="Database Connected" 
              size="small" 
              color="success"
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip 
              label="AI Active" 
              size="small" 
              sx={{ 
                fontSize: '0.7rem',
                bgcolor: 'info.main',
                color: 'white'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;