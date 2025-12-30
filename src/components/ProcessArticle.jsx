import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Alert,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const ProcessArticle = ({ onScrape, loading }) => {
  const [scraping, setScraping] = useState(false);
  const [message, setMessage] = useState(null);

  const handleScrape = async () => {
    setScraping(true);
    setMessage(null);
    
    const result = await onScrape();
    
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });
    
    setScraping(false);
    
    // Clear message after 5 seconds
    if (result.success) {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AutoAwesomeIcon sx={{ mr: 1.5, color: 'secondary.main', fontSize: 28 }} />
          <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 600 }}>
            Quick Actions
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
          Start by scraping the 5 oldest articles from BeyondChats. These will be stored in the database and ready for AI enhancement.
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            icon={<InfoIcon />}
            label="Phase 1: Initial Scraping" 
            size="small" 
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 500,
            }} 
          />
        </Box>
        
        {/* Feature List */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'white',
          borderRadius: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'secondary.main' }}>
            What happens next:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0, color: 'text.secondary' }}>
            <li>Scrape 5 articles from BeyondChats</li>
            <li>Store in MongoDB database</li>
            <li>Search Google for similar content</li>
            <li>AI-enhanced formatting and structure</li>
            <li>Automatic reference citation</li>
          </Box>
        </Box>
        
        {/* Status Message */}
        {message && (
          <Alert 
            severity={message.type}
            icon={message.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              alignItems: 'center'
            }}
            onClose={() => setMessage(null)}
          >
            <Typography variant="body2">
              {message.text}
            </Typography>
          </Alert>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          startIcon={<CloudDownloadIcon />}
          onClick={handleScrape}
          disabled={scraping || loading}
          size="large"
          fullWidth
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {scraping ? 'Scraping Articles...' : 'Scrape 5 Oldest Articles'}
        </Button>
        
        <Tooltip title="This will fetch the 5 oldest articles from BeyondChats blogs section">
          <IconButton sx={{ ml: 1 }}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      
      {scraping && (
        <Box sx={{ px: 3, pb: 2 }}>
          <LinearProgress 
            sx={{ 
              height: 6,
              borderRadius: 3,
            }} 
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            Fetching articles from BeyondChats...
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ProcessArticle;