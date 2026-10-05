import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { featuresData } from '../data/features.ts';
import JourneyCard from './JourneyCard.tsx';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 10,
        background: 'linear-gradient(to bottom, #f8fafc, #eef2f7)',
      }}
    >
      <Container maxWidth="lg">
        {/* Заголовок */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 2,
          }}
        >
          Everything you need for your journey
        </Typography>

        {/* Подзаголовок */}
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Plan smarter, organize your trips, and keep everything in one place
        </Typography>

        {/* Карточки */}
        <Grid container spacing={4}>
          {featuresData.map((feature) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.id}>
              <Box
                sx={{
                  transition: 'all 0.3s ease',
                  borderRadius: 4,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <JourneyCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create')}
            sx={{
              background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
              borderRadius: '30px',
              px: 5,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              },
            }}
          >
            ✈️ Start Planning Your Trip
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
