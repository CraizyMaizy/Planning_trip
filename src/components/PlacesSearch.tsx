import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { geocodeCity } from '../api/nominatim';
import { fetchAttractionsByCity, fetchAttractionsByName } from '../api/overpass';
import { useDebounce } from '../hooks/useDebounce';
import type { ApiPlace } from '../types/types.ts';
import { getCache, setCache } from '../utilis/cache.ts';

type OverpassItem = {
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

const toApiPlace = (item: OverpassItem): ApiPlace | null => {
  const lat = item.lat ?? item.center?.lat;
  const lon = item.lon ?? item.center?.lon;
  const name =
    item.tags?.name || item.tags?.['name:en'] || item.tags?.tourism || item.tags?.historic;

  if (lat == null || lon == null || !name) return null;

  return { display_name: name, lat: String(lat), lon: String(lon) };
};

const toPlaces = (items: OverpassItem[]): ApiPlace[] =>
  items.map(toApiPlace).filter((p): p is ApiPlace => p !== null);

export default function PlacesSearch({ onSelect }: { onSelect: (place: ApiPlace) => void }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState<ApiPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = debouncedQuery.trim();

    if (value.length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      const cacheKey = value.toLowerCase();

      const cached = getCache(cacheKey);
      if (cached) {
        setResults(cached);
        setOpen(true);
        return;
      }

      setLoading(true);

      try {
        // 1. поиск POI по названию
        let places = toPlaces(await fetchAttractionsByName(value));

        // 2. если не нашли, считаем запрос городом
        if (places.length === 0) {
          const city = await geocodeCity(value);
          places = toPlaces(await fetchAttractionsByCity(city.lat, city.lon));
        }

        places = places.slice(0, 10);
        setCache(cacheKey, places);

        if (cancelled) return;
        setResults(places);
        setOpen(true);
      } catch {
        if (cancelled) return;
        setResults([]);
        setOpen(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const close = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={close}>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          label="Search places or city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && close()}
          autoComplete="off"
          slotProps={{
            input: {
              endAdornment: loading ? (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ) : undefined,
            },
          }}
        />

        {open && (
          <Paper
            elevation={4}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 0.5,
              zIndex: 10,
              maxHeight: 300,
              overflowY: 'auto',
            }}
          >
            {results.length === 0 ? (
              <Typography color="text.secondary" sx={{ p: 2 }}>
                Nothing found
              </Typography>
            ) : (
              <List disablePadding>
                {results.map((place) => (
                  <ListItem key={`${place.lat},${place.lon},${place.display_name}`} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        onSelect(place);
                        setQuery('');
                        setResults([]);
                        setOpen(false);
                      }}
                    >
                      <ListItemText
                        primary={place.display_name}
                        slotProps={{ primary: { noWrap: true } }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
