import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import photoMain from '../assets/photo3.jpeg';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${photoMain})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', color: '#fff' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
              backgroundImage: 'linear-gradient(45deg, #fff, #ddd)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Journey Starts Here
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.5rem' },
            }}
          >
            Plan trips, explore destinations and create unforgettable memories
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/create')}
              sx={{
                background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                borderRadius: '30px',
                px: 4,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              ✈️ Start Planning
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/trips')}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.7)',
                borderRadius: '30px',
                px: 4,
                textTransform: 'none',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              🌍 View Trips
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
