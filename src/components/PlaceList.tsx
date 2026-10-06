import type { Dispatch, SetStateAction } from 'react';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';

import PlacesSearch from './PlacesSearch';
import type { Place } from '../types/types.ts';

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
};

type PlacesListProps = {
  places: Place[];
  setPlaces: Dispatch<SetStateAction<Place[]>>;
};

export default function PlacesList({ places, setPlaces }: PlacesListProps) {
  const deletePlace = (id: number) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  const addPlaceFromSearch = (place: SearchResult) => {
    const lat = Number(place.lat);
    const lng = Number(place.lon);

    setPlaces((prev) => {
      // не добавляем одно и то же место дважды
      if (prev.some((p) => p.lat === lat && p.lng === lng)) return prev;

      return [
        ...prev,
        {
          id: Date.now() + Math.random(),
          name: place.display_name,
          lat,
          lng,
          visited: false,
        },
      ];
    });
  };

  const toggleVisited = (id: number) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              visited: !p.visited,
            }
          : p,
      ),
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Places to visit
      </Typography>

      <PlacesSearch onSelect={addPlaceFromSearch} />

      {places.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          No places added yet
        </Typography>
      )}

      <List>
        {places.map((p) => {
          const [mainName, ...rest] = p.name.split(',');

          return (
            <ListItem
              key={p.id}
              sx={{
                mb: 1,
                px: 2,
                py: 1.2,
                gap: 1,
                borderRadius: 2,
                backgroundColor: p.visited ? '#f1f5f9' : '#ffffff',
                border: '1px solid',
                borderColor: p.visited ? '#e2e8f0' : '#e5e7eb',
              }}
            >
              <ListItemText
                title={p.name}
                primary={mainName}
                secondary={rest.join(',').trim() || undefined}
                sx={{ minWidth: 0, m: 0 }}
                slotProps={{
                  primary: {
                    noWrap: true,
                    sx: {
                      fontWeight: 500,
                      textDecoration: p.visited ? 'line-through' : 'none',
                      color: p.visited ? '#64748b' : '#0f172a',
                    },
                  },
                  secondary: { noWrap: true },
                }}
              />

              <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                <IconButton
                  onClick={() => toggleVisited(p.id)}
                  size="small"
                  aria-label={p.visited ? 'Mark as not visited' : 'Mark as visited'}
                  title={p.visited ? 'Mark as not visited' : 'Mark as visited'}
                  sx={{ color: p.visited ? '#22c55e' : '#94a3b8' }}
                >
                  {p.visited ? <UndoIcon /> : <CheckIcon />}
                </IconButton>

                <IconButton
                  onClick={() => deletePlace(p.id)}
                  size="small"
                  aria-label="Delete place"
                  title="Delete place"
                  sx={{ color: '#ef4444' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
