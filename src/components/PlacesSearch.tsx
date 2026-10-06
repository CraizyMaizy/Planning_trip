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

import { searchPlaces } from '../api/nominatim';
import { fetchAttractionsByCity } from '../api/overpass';
import { useDebounce } from '../hooks/useDebounce';
import type { ApiPlace } from '../types/types.ts';
import { getCache, setCache } from '../utils/cache.ts';

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
  const debouncedQuery = useDebounce(query);

  const [results, setResults] = useState<ApiPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = debouncedQuery.trim();

    if (value.length < 3) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const run = async () => {
      const cacheKey = value.toLowerCase();

      const cached = getCache<ApiPlace[]>(cacheKey);
      if (cached) {
        setResults(cached);
        setOpen(true);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const found = await searchPlaces(value, signal);
        let places: ApiPlace[] = found;

        if (found[0]?.category === 'place') {
          const attractions = toPlaces(
            await fetchAttractionsByCity(Number(found[0].lat), Number(found[0].lon), signal),
          );
          if (attractions.length > 0) places = attractions;
        }

        places = places.slice(0, 10);
        setCache(cacheKey, places);
        setResults(places);
        setOpen(true);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setResults([]);
        setOpen(false);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    run();

    return () => controller.abort();
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
