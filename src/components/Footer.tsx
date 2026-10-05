import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Create Journey', to: '/create' },
  { label: 'My Trips', to: '/trips' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              ✈️ Travel Planner
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>
              Plan your journeys, discover destinations and create unforgettable memories.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Navigation</Typography>

            {links.map((link) => (
              <Link
                key={link.to}
                component={RouterLink}
                to={link.to}
                underline="none"
                color="inherit"
                sx={{
                  display: 'block',
                  mb: 1,
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease',
                  '&:hover': { opacity: 1 },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography sx={{ fontWeight: 600, mb: 2 }}>Contact</Typography>
            <Typography sx={{ opacity: 0.8 }}>Email: support@travelplanner.com</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        <Typography sx={{ opacity: 0.7, textAlign: 'center', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} Travel Planner
        </Typography>
      </Container>
    </Box>
  );
}
