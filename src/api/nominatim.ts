export type GeoPoint = {
  lat: number;
  lon: number;
  display_name: string;
};

export type NominatimPlace = {
  display_name: string;
  lat: string;
  lon: string;
  category?: string;
  type?: string;
};

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

export const searchPlaces = async (
  query: string,
  signal?: AbortSignal,
): Promise<NominatimPlace[]> => {
  const params = new URLSearchParams({
    format: 'jsonv2',
    q: query,
    limit: '10',
    'accept-language': 'en',
  });

  const res = await fetch(`${NOMINATIM_URL}?${params}`, { signal });

  if (!res.ok) {
    throw new Error(`Nominatim request failed: ${res.status}`);
  }

  const data = await res.json();

  return data.map((item: any) => ({
    display_name: item.display_name,
    lat: item.lat,
    lon: item.lon,
    category: item.category,
    type: item.type,
  }));
};

export const geocodeCity = async (query: string, signal?: AbortSignal): Promise<GeoPoint> => {
  const [first] = await searchPlaces(query, signal);

  if (!first) {
    throw new Error('City not found');
  }

  return {
    lat: Number(first.lat),
    lon: Number(first.lon),
    display_name: first.display_name,
  };
};
