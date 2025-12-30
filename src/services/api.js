import axios from 'axios';

const API_BASE_URL =  'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout for processing
});

// Request interceptor for adding loading indicators
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    console.log(`Making ${config.method} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }
    
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
    } else {
      // Request setup error
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const articleAPI = {
  // Get all articles
  getAllArticles: () => api.get('/articles'),
  
  // Get single article
  getArticle: (id) => api.get(`/articles/${id}`),
  
  // Process article update
  processArticle: (id) => api.post(`/articles/${id}/process`),
  
  // Scrape initial articles
 scrapeArticles: () => api.post('/articles/scrape/init'),

  
  // Update article
  updateArticle: (id, data) => api.put(`/articles/${id}`, data),
  
  // Delete article
  deleteArticle: (id) => api.delete(`/articles/${id}`),
};

export default api;