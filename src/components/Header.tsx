import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  const menuItems = [
    { text: 'Create Journey', path: '/create' },
    { text: 'My Trips', path: '/trips' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* LOGO */}
          <Typography
            onClick={() => navigate('/')}
            sx={{
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer',
              letterSpacing: '.1rem',
            }}
          >
            Travel Planner
          </Typography>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/create')}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
                }}
              >
                ✈️ Create Journey
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate('/trips')}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.6)',
                }}
              >
                🌍 My Trips
              </Button>
            </Box>
          )}

          {/* MOBILE MENU BUTTON */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* DRAWER (mobile) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
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
