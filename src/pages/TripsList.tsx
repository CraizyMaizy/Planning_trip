import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

import type { Trip } from '../types/types';
import Header from '../components/Header.tsx';

const STORAGE_KEY = 'trips';

const loadTrips = (): Trip[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function TripsList() {
  const [trips, setTrips] = useState<Trip[]>(loadTrips);
  const navigate = useNavigate();
  const getShortName = (name: string) => name.split(',')[0].trim();
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);

  const handleConfirmDelete = () => {
    if (!tripToDelete) return;

    const updated = trips.filter((t) => t.id !== tripToDelete.id);
    setTrips(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTripToDelete(null);
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 64px)', background: '#f1f5f9', py: 4 }}>
        <Container maxWidth="lg">
          {/* TITLE */}
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              fontWeight: 800,
              color: '#0f172a',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            My Trips
          </Typography>

          {/* EMPTY STATE */}
          {trips.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                No trips saved yet
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/create')}
                sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}
              >
                ✈️ Plan your first trip
              </Button>
            </Box>
          )}

          {/* TRIPS GRID */}
          <Grid container spacing={3}>
            {trips.map((trip) => {
              const places = trip.places ?? [];

              return (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={trip.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    {/* IMAGE HEADER */}
                    <Box
                      sx={{
                        height: 180,
                        flexShrink: 0,
                        position: 'relative',
                        backgroundColor: '#cbd5e1',
                        backgroundImage: trip.coverImage ? `url(${trip.coverImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.1))',
                        }}
                      />

                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          right: 16,
                          color: '#fff',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                          }}
                        >
                          {trip.title}
                        </Typography>

                        <Chip
                          size="small"
                          icon={<CalendarMonthIcon sx={{ color: '#fff !important' }} />}
                          label={`${formatDate(trip.startDate)} → ${formatDate(trip.endDate)}`}
                          sx={{
                            mt: 1,
                            maxWidth: '100%',
                            background: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            backdropFilter: 'blur(10px)',
                          }}
                        />
                      </Box>
                    </Box>

                    {/* CONTENT */}
                    <CardContent
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          flexGrow: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <FlightIcon color="primary" />
                          <Typography>
                            <strong>Flight:</strong> {trip.flight || 'Not specified'}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <HotelIcon color="primary" />
                          <Typography>
                            <strong>Hotel:</strong> {trip.hotelName || 'Not specified'}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1,
                          }}
                        >
                          <PlaceIcon color="primary" />
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>Places to visit</Typography>

                            {places.length === 0 && (
                              <Typography variant="body2" color="text.secondary">
                                No places added
                              </Typography>
                            )}

                            {places.slice(0, 3).map((place) => (
                              <Typography
                                key={place.id}
                                variant="body2"
                                color="text.secondary"
                                noWrap
                                title={place.name}
                              >
                                • {getShortName(place.name)}
                              </Typography>
                            ))}

                            {places.length > 3 && (
                              <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                                +{places.length - 3} more places
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        {/* ACTIONS */}
                        <Box sx={{ display: 'flex', gap: 2, mt: 'auto', pt: 2 }}>
                          <Button
                            variant="contained"
                            onClick={() => navigate(`/trip/${trip.id}`)}
                            sx={{
                              borderRadius: 3,
                              textTransform: 'none',
                              fontWeight: 700,
                            }}
                          >
                            Details
                          </Button>

                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => setTripToDelete(trip)}
                            sx={{
                              borderRadius: 3,
                              textTransform: 'none',
                              fontWeight: 700,
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <Dialog
          open={Boolean(tripToDelete)}
          onClose={() => setTripToDelete(null)}
          slotProps={{ paper: { sx: { borderRadius: 4, p: 1 } } }}
        >
          <DialogTitle sx={{ fontWeight: 800 }}>Delete trip?</DialogTitle>

          <DialogContent>
            <DialogContentText>
              «{tripToDelete?.title}» will be deleted permanently. This action can't be undone.
            </DialogContentText>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              onClick={() => setTripToDelete(null)}
              sx={{ textTransform: 'none', fontWeight: 700 }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
