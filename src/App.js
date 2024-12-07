import React from 'react';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ImageGenerator from './components/ImageGenerator';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff95',
      light: '#33ff8c',
      dark: '#00cc76',
    },
    secondary: {
      main: '#ff00ff',
      light: '#ff33ff',
      dark: '#cc00cc',
    },
    background: {
      default: '#0a0a1f',
      paper: 'rgba(20, 20, 50, 0.5)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00ff95 30%, #ff00ff 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00ff95 20%, #ff00ff 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0, 255, 149, 0.1)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #141432 0%, #0a0a1f 100%)',
      }}>
        <Box sx={{ flex: 1 }}>
          <ImageGenerator />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
