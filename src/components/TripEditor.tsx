import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import TripHeader from '../components/TripHeader';
import PlacesList from './PlaceList.tsx';
import Checklist from './CheckList.tsx';
import TripDetails from './TripDeatails.tsx';
import MapView from './MapView.tsx';
import type { ChecklistItem, Place, Trip } from '../types/types.ts';

import Img1 from '../assets/photo1.jpeg';
import Img2 from '../assets/photo2.jpeg';
import Img3 from '../assets/photo3.jpeg';
import Img4 from '../assets/photo4.jpeg';

const STORAGE_KEY = 'trips';
const TRIP_IMAGES = [Img1, Img2, Img3, Img4];
const DATE_FORMAT = 'YYYY-MM-DD';

const loadTrips = (): Trip[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export default function TripEditor() {
  const { id } = useParams();

  if (!id) return <TripForm key="new" />;

  const trip = loadTrips().find((t) => t.id === Number(id));
  if (!trip) return <Navigate to="/trips" replace />;

  return <TripForm key={trip.id} trip={trip} />;
}

function TripForm({ trip }: { trip?: Trip }) {
  const [title, setTitle] = useState(trip?.title ?? '');
  const [startDate, setStartDate] = useState<Dayjs | null>(() =>
    trip ? dayjs(trip.startDate) : dayjs().startOf('day'),
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(() =>
    trip ? dayjs(trip.endDate) : dayjs().startOf('day'),
  );
  const [places, setPlaces] = useState<Place[]>(trip?.places ?? []);
  const [flight, setFlight] = useState(trip?.flight ?? '');
  const [hotel, setHotel] = useState(trip?.hotelName ?? '');
  const [address, setAddress] = useState(trip?.hotelAddress ?? '');
  const [items, setItems] = useState<ChecklistItem[]>(trip?.items ?? []);
  const [coverImage] = useState(
    () => trip?.coverImage ?? TRIP_IMAGES[Math.floor(Math.random() * TRIP_IMAGES.length)],
  );

  const navigate = useNavigate();
  const isEditMode = Boolean(trip);

  const isValid =
    title.trim().length > 0 &&
    startDate?.isValid() === true &&
    endDate?.isValid() === true &&
    !endDate.isBefore(startDate);

  const handleSave = () => {
    if (!isValid || !startDate || !endDate) return;

    const newTrip: Trip = {
      id: trip ? trip.id : Date.now(),
      title: title.trim(),
      startDate: startDate.format(DATE_FORMAT),
      endDate: endDate.format(DATE_FORMAT),
      places,
      items,
      flight,
      hotelName: hotel,
      hotelAddress: address,
      coverImage,
    };

    const savedTrips = loadTrips();
    const updatedTrips = isEditMode
      ? savedTrips.map((t) => (t.id === newTrip.id ? newTrip : t))
      : [...savedTrips, newTrip];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    navigate('/trips');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '100vh',
          background: '#f1f5f9',
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            width: { xs: '100%', md: 380 },
            flexShrink: 0,
            p: { xs: 2, md: 4 },
            background: '#fff',
            borderRight: { md: '1px solid #eee' },
            position: { md: 'sticky' },
            top: 0,
            height: { md: '100vh' },
            overflowY: { md: 'auto' },
          }}
        >
          <TripHeader
            title={title}
            setTitle={setTitle}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          <PlacesList places={places} setPlaces={setPlaces} />
          <Checklist items={items} setItems={setItems} />
          <TripDetails
            flight={flight}
            setFlight={setFlight}
            hotel={hotel}
            setHotel={setHotel}
            address={address}
            setAddress={setAddress}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              gap: 2,
            }}
          >
            <Button variant="contained" onClick={handleSave} disabled={!isValid}>
              {isEditMode ? 'Update Trip' : 'Save Trip'}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate(isEditMode ? '/trips' : '/')}
              sx={{
                backgroundColor: '#fff',
                color: '#0f172a',
                borderColor: '#e2e8f0',
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  borderColor: '#cbd5e1',
                },
              }}
            >
              Back
            </Button>
          </Box>
        </Box>

        {/* MAP */}
        <Box sx={{ flex: 1, height: { xs: 360, md: '100vh' } }}>
          <MapView places={places} />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
