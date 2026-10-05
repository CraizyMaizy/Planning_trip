import { Box, Container, Grid, Typography } from '@mui/material';
import { destinations } from '../data/destinations.ts';

export default function Destinations() {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
          Popular Destinations
        </Typography>

        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
          Explore the most loved places around the world
        </Typography>

        <Grid container spacing={4} sx={{ justifyContent: 'center', maxWidth: 1200, mx: 'auto' }}>
          {destinations.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item.id}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.1)' },
                  '&:hover .overlay': { opacity: 1 },
                }}
              >
                {/* Картинка */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    // position: 'absolute',
                    // inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />

                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15) 60%)',
                    opacity: 0.85,
                    transition: 'opacity 0.3s ease',
                  }}
                />

                {/* Текст */}
                <Typography
                  variant="h5"
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    color: '#fff',
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
