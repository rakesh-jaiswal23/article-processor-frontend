import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArticleList from "./components/ArticleList";
import ProcessArticle from "./components/ProcessArticle";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatsDashboard from "./components/StatsDashboard";
import { articleAPI } from "./services/api";
import "./App.css";

// Custom theme with slate colors (500-800 range)
const theme = createTheme({
  palette: {
    primary: {
      main: "#64748b", // slate-500
      light: "#94a3b8", // slate-400
      dark: "#475569", // slate-600
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#334155", // slate-700
      light: "#475569", // slate-600
      dark: "#1e293b", // slate-800
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc", // slate-50
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b", // slate-800
      secondary: "#64748b", // slate-500
    },
    success: {
      main: "#10b981", // emerald-500
    },
    warning: {
      main: "#f59e0b", // amber-500
    },
    error: {
      main: "#ef4444", // red-500
    },
    info: {
      main: "#3b82f6", // blue-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #475569 0%, #334155 100%)",
          },
        },
      },
    },
  },
});

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    original: 0,
    updated: 0,
    processing: 0,
    failed: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articleAPI.getAllArticles();
      setArticles(response.data.data || []);

      // Calculate statistics
      const statsData = {
        total: response.data.data.length,
        original: response.data.data.filter((a) => a.status === "original")
          .length,
        updated: response.data.data.filter((a) => a.status === "updated")
          .length,
        processing: response.data.data.filter((a) => a.status === "processing")
          .length,
        failed: response.data.data.filter((a) => a.status === "failed").length,
      };
      setStats(statsData);

      setError(null);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [refreshTrigger]);

  const handleProcessArticle = async (id) => {
    try {
      await articleAPI.processArticle(id);
      // Trigger refresh after successful processing
      setRefreshTrigger((prev) => prev + 1);
      return { success: true, message: "Article processed successfully!" };
    } catch (err) {
      return {
        success: false,
        message: "Processing failed. Please try again.",
      };
    }
  };

  const handleScrapeArticles = async () => {
    try {
      setLoading(true);
      await articleAPI.scrapeArticles();
      setRefreshTrigger((prev) => prev + 1);
      return { success: true, message: "5 articles scraped successfully!" };
    } catch (err) {
      return {
        success: false,
        message: "Scraping failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles?.filter((article) => {
    if (activeView === "all") return true;
    if (activeView === "original") return article.status === "original";
    if (activeView === "updated") return article.status === "updated";
    if (activeView === "processing") return article.status === "processing";
    return true;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <Header
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <Container maxWidth="xl" className="main-content">
          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              onClose={() => setError(null)}
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}

          {/* Stats Dashboard */}
          <Box sx={{ mb: 4 }}>
            <StatsDashboard stats={stats} loading={loading} />
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={3}>
            {/* Left Column - Process Controls */}
            <Grid item xs={12} md={4}>
              <ProcessArticle
                onScrape={handleScrapeArticles}
                loading={loading}
              />

              {/* Info Card */}
              <Paper elevation={2} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "secondary.main" }}
                >
                  How It Works
                </Typography>
                <Box component="ul" sx={{ pl: 2, color: "text.secondary" }}>
                  <li>Scrape 5 oldest articles from BeyondChats</li>
                  <li>Process articles to find similar content on Google</li>
                  <li>AI enhances articles using top-ranking content</li>
                  <li>View original and enhanced versions side by side</li>
                </Box>
              </Paper>
            </Grid>

            {/* Right Column - Article List */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ color: "secondary.main" }}>
                    Articles ({filteredArticles.length})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View:{" "}
                    {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
                  </Typography>
                </Box>

                <ArticleList
                  articles={filteredArticles}
                  onProcessArticle={handleProcessArticle}
                  loading={loading}
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box component="footer" sx={{ mt: 6, py: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Article Processing System • Built with React & Node.js •{" "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
