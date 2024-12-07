import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              href="mailto:sma.oussama@univ-adrar.edu.dz"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              href="https://t.me/Smail_Oussama"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main' }}
            >
              <TelegramIcon />
            </IconButton>
            <IconButton
              href="tel:+213673575552"
              sx={{ color: 'primary.main' }}
            >
              <PhoneIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CopyrightIcon sx={{ fontSize: '1rem' }} />
            <Typography variant="body2" color="text.secondary">
              All Rights Reserved {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
