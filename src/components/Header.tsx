import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { text: '✈️ Create Journey', path: '/create' },
  { text: '🌍 My Trips', path: '/trips' },
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* LOGO */}
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '.1rem',
            }}
          >
            Travel Planner
          </Typography>

          {/* DESKTOP MENU */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/create')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
              }}
            >
              {menuItems[0].text}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/trips')}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.6)',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {menuItems[1].text}
            </Button>
          </Box>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            color="inherit"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* DRAWER (mobile) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
