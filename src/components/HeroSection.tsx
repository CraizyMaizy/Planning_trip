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
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', color: '#fff' }}>
          {/* Заголовок */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(45deg, #fff, #ddd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Journey Starts Here
          </Typography>

          {/* Подзаголовок */}
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
            }}
          >
            Plan trips, explore destinations and create unforgettable memories
          </Typography>

          {/* Кнопки */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
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
                '&:hover': {
                  transform: 'scale(1.05)',
                },
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
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
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
