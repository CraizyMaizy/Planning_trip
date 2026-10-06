const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const ATTRACTION_TYPES = 'attraction|museum|gallery|viewpoint|zoo|theme_park';

export const fetchAttractionsByCity = async (lat: number, lon: number, signal?: AbortSignal) => {
  const query = `
    [out:json][timeout:15];
    nwr(around:3000,${lat},${lon})["tourism"~"^(${ATTRACTION_TYPES})$"]["name"];
    out center 10;
  `;

  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    body: new URLSearchParams({ data: query }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Overpass request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.elements ?? [];
};
