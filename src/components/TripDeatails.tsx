import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import PlaceIcon from '@mui/icons-material/Place';
import type { TripDetailsProps } from '../types/types.ts';

export default function TripDetails({
  flight,
  setFlight,
  hotel,
  setHotel,
  address,
  setAddress,
}: TripDetailsProps) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Trip Details
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Flight info"
          placeholder="e.g. LH1234"
          value={flight}
          onChange={(e) => setFlight(e.target.value.toUpperCase())}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FlightIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Hotel name"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
          autoComplete="off"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <HotelIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="street-address"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
