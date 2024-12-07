import React, { useState, useCallback, useEffect, memo } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Tooltip,
  Zoom,
  Skeleton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SkoniFoxLogo from './SkoniFoxLogo';

// Debounce function to prevent too many API calls
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const ImageDisplay = memo(({ image, loading }) => {
  if (loading) {
    return (
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={250}
        animation="wave"
        sx={{ borderRadius: 2 }}
      />
    );
  }
  
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            overflow: 'hidden',
            backgroundColor: 'rgba(20, 20, 50, 0.3)',
            height: { xs: '250px', sm: '200px' },
            borderRadius: 2,
            border: '1px solid rgba(0, 255, 149, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 255, 149, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={image}
            alt="Generated"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
});

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cleanup function for image URLs
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const generateImage = useCallback(async () => {
    if (!prompt) return;

    setLoading(true);
    setError(null);
    
    // Cleanup previous image URL if it exists
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
    }

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [prompt, image]);

  // Debounced generate function
  const debouncedGenerate = useCallback(
    debounce(() => generateImage(), 500),
    [generateImage]
  );

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      debouncedGenerate();
    }
  }, [debouncedGenerate]);

  return (
    <Container maxWidth="md" sx={{ 
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 2, sm: 3 }
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            mb: 3 
          }}>
            <SkoniFoxLogo 
              sx={{ 
                fontSize: '2.5rem',
                filter: 'drop-shadow(0 0 10px rgba(0, 255, 149, 0.5))',
              }} 
            />
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #00ff95 30%, #ff00ff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(0, 255, 149, 0.3)',
              }}
            >
              Skoni AI Image Generator
            </Typography>
          </Box>
        </motion.div>

        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: 'rgba(20, 20, 50, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={8}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  label="Enter your creative prompt..."
                  variant="outlined"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  multiline
                  rows={{ xs: 3, sm: 2 }}
                  disabled={loading}
                  sx={{
                    mb: { xs: 2, sm: 3 },
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '& fieldset': {
                        borderColor: 'rgba(0, 255, 149, 0.2)',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0, 255, 149, 0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00ff95',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                />
                <Tooltip 
                  title={!prompt ? "Please enter a prompt" : "Generate image"}
                  TransitionComponent={Zoom}
                  arrow
                >
                  <span>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={debouncedGenerate}
                      disabled={loading || !prompt}
                      sx={{
                        py: { xs: 1.5, sm: 1.8 },
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        background: 'linear-gradient(45deg, #00ff95 30%, #ff00ff 90%)',
                        boxShadow: '0 3px 15px rgba(0, 255, 149, 0.3)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00ff95 20%, #ff00ff 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 5px 20px rgba(0, 255, 149, 0.5)',
                        },
                        '&:disabled': {
                          background: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                      startIcon={loading ? null : <AutoFixHighIcon />}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Generate Magic'}
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <ImageDisplay image={image} loading={loading} />
            </Grid>
          </Grid>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography 
                color="error" 
                align="center" 
                sx={{ 
                  mt: 2,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                }}
              >
                {error}
              </Typography>
            </motion.div>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ImageGenerator;
