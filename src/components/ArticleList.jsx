import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Collapse,
  LinearProgress,
  Alert,
  Grid,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArticleIcon from '@mui/icons-material/Article';

const ArticleList = ({ articles, onProcessArticle, loading }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [detailDialog, setDetailDialog] = useState({ open: false, article: null });

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleProcess = async (id) => {
    setProcessingId(id);
    const result = await onProcessArticle(id);
    setProcessingId(null);
    
    if (result.success) {
      // Success handled by parent refresh
    } else {
      alert(result.message);
    }
  };

  const openDetailDialog = (article) => {
    setDetailDialog({ open: true, article });
  };

  const closeDetailDialog = () => {
    setDetailDialog({ open: false, article: null });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'original':
        return { color: 'default', label: 'Original', bgcolor: '#64748b' };
      case 'updated':
        return { color: 'success', label: 'Updated', bgcolor: '#10b981' };
      case 'processing':
        return { color: 'warning', label: 'Processing', bgcolor: '#f59e0b' };
      case 'failed':
        return { color: 'error', label: 'Failed', bgcolor: '#ef4444' };
      default:
        return { color: 'default', label: status, bgcolor: '#64748b' };
    }
  };

  if (loading && articles.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <LinearProgress sx={{ mb: 2 }} />
        <Typography color="text.secondary">Loading articles...</Typography>
      </Box>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <ArticleIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No articles found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click "Scrape Articles" to get started
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {articles.map((article) => {
          const statusConfig = getStatusConfig(article.status);
          const isProcessing = processingId === article._id;
          
          return (
            <Grid item xs={12} key={article._id}>
              <Card 
                elevation={1} 
                sx={{ 
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {/* Status Indicator Bar */}
                <Box sx={{ 
                  height: 4,
                  bgcolor: statusConfig.bgcolor,
                  width: '100%'
                }} />
                
                <CardContent sx={{ p: 3 }}>
                  {/* Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2
                  }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'secondary.main',
                          mb: 0.5
                        }}
                      >
                        {article.originalTitle}
                      </Typography>
                      
                      {article.updatedTitle && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <CompareArrowsIcon sx={{ fontSize: 16, mr: 1, color: 'success.main' }} />
                          <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                            {article.updatedTitle}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <Chip
                      label={statusConfig.label}
                      size="small"
                      sx={{
                        bgcolor: `${statusConfig.bgcolor}15`,
                        color: statusConfig.bgcolor,
                        fontWeight: 600,
                        border: `1px solid ${statusConfig.bgcolor}30`,
                      }}
                    />
                  </Box>
                  
                  {/* Metadata */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    mb: 2,
                    flexWrap: 'wrap'
                  }}>
                    <Typography variant="body2" color="text.secondary">
                      📅 {new Date(article.scrapedDate).toLocaleDateString()}
                    </Typography>
                    {article.lastUpdated && (
                      <Typography variant="body2" color="success.main">
                        🔄 {new Date(article.lastUpdated).toLocaleDateString()}
                      </Typography>
                    )}
                    {article.googleSearchResults?.length > 0 && (
                      <Typography variant="body2" color="info.main">
                        🔍 {article.googleSearchResults.length} sources found
                      </Typography>
                    )}
                  </Box>
                  
                  {/* Content Preview */}
                  <Collapse in={expandedId === article._id} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2, mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ color: 'secondary.main' }}>
                        Original Content:
                      </Typography>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        mb: 2,
                        maxHeight: 200,
                        overflow: 'auto'
                      }}>
                        <Typography variant="body2" color="text.secondary">
                          {article.originalContent.substring(0, 500)}...
                        </Typography>
                      </Box>
                      
                      {article.updatedContent && (
                        <>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: 'success.main' }}>
                            Enhanced Content:
                          </Typography>
                          <Box sx={{ 
                            p: 2, 
                            bgcolor: 'rgba(16, 185, 129, 0.05)',
                            border: '1px solid rgba(16, 185, 129, 0.1)',
                            borderRadius: 2,
                            maxHeight: 200,
                            overflow: 'auto'
                          }}>
                            <Typography variant="body2" color="text.secondary">
                              {article.updatedContent.substring(0, 500)}...
                            </Typography>
                          </Box>
                        </>
                      )}
                      
                      {/* References */}
                      {article.referenceLinks && article.referenceLinks.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom sx={{ color: 'secondary.main' }}>
                            Reference Sources:
                          </Typography>
                          <Grid container spacing={1}>
                            {article.referenceLinks.map((ref, index) => (
                              <Grid item xs={12} sm={6} key={index}>
                                <Card variant="outlined" sx={{ borderRadius: 2, p: 1.5 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LinkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Link 
                                      href={ref.url} 
                                      target="_blank" 
                                      rel="noopener"
                                      sx={{ 
                                        fontSize: '0.875rem',
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': { textDecoration: 'underline' }
                                      }}
                                    >
                                      {ref.title || 'Reference Source'}
                                    </Link>
                                    <OpenInNewIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                  </Box>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                  
                  {/* Actions */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Box>
                      {article.status === 'original' && (
                        <Button
                          variant="contained"
                          startIcon={isProcessing ? null : <AutoAwesomeIcon />}
                          onClick={() => handleProcess(article._id)}
                          disabled={isProcessing}
                          sx={{ mr: 1 }}
                        >
                          {isProcessing ? 'Processing...' : 'Enhance with AI'}
                        </Button>
                      )}
                      
                      <Button
                        variant="outlined"
                        onClick={() => openDetailDialog(article)}
                        sx={{ mr: 1 }}
                      >
                        View Details
                      </Button>
                    </Box>
                    
                    <IconButton
                      onClick={() => handleExpand(article._id)}
                      sx={{
                        transform: expandedId === article._id ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s',
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Detail Dialog */}
      <Dialog 
        open={detailDialog.open} 
        onClose={closeDetailDialog}
        maxWidth="md"
        fullWidth
      >
        {detailDialog.article && (
          <>
            <DialogTitle sx={{ 
              bgcolor: 'secondary.main',
              color: 'white',
              fontWeight: 600
            }}>
              {detailDialog.article.originalTitle}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              {/* Status Info */}
              <Box sx={{ mb: 3 }}>
                <Chip 
                  label={getStatusConfig(detailDialog.article.status).label}
                  sx={{ 
                    bgcolor: `${getStatusConfig(detailDialog.article.status).bgcolor}15`,
                    color: getStatusConfig(detailDialog.article.status).bgcolor,
                    fontWeight: 600
                  }}
                />
              </Box>
              
              {/* Content Comparison */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    Original Content
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {detailDialog.article.originalContent}
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                    Enhanced Content
                  </Typography>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(16, 185, 129, 0.05)', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {detailDialog.article.updatedContent || 'Not processed yet'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {/* References */}
              {detailDialog.article.referenceLinks && detailDialog.article.referenceLinks.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    Reference Sources
                  </Typography>
                  <Grid container spacing={2}>
                    {detailDialog.article.referenceLinks.map((ref, index) => (
                      <Grid item xs={12} key={index}>
                        <Card variant="outlined" sx={{ borderRadius: 2 }}>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              {ref.title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Link 
                                href={ref.url} 
                                target="_blank" 
                                rel="noopener"
                                sx={{ 
                                  fontSize: '0.875rem',
                                  color: 'primary.main',
                                  textDecoration: 'none',
                                  '&:hover': { textDecoration: 'underline' }
                                }}
                              >
                                {ref.url}
                              </Link>
                              <IconButton size="small">
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDetailDialog}>Close</Button>
              {detailDialog.article.status === 'original' && (
                <Button 
                  variant="contained" 
                  onClick={() => {
                    handleProcess(detailDialog.article._id);
                    closeDetailDialog();
                  }}
                >
                  Enhance This Article
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ArticleList;