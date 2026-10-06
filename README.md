# ✈️ Travel Planner

A web app for planning trips: pick dates, search for places and see them on a
map, keep a packing checklist, and store flight and hotel details in one place.

<!-- Add a screenshot or GIF here -->
<!-- ![Travel Planner](./docs/screenshot.png) -->

## Features

- **Trip creation and editing** with a title and a date range (the end date
  can't be earlier than the start date)
- **Place search** powered by OpenStreetMap (Nominatim). Searching for a city
  also suggests nearby attractions (Overpass API)
- **Interactive map** (Leaflet) with markers for every place in the trip
- **Places list** with "visited" marks and duplicate protection
- **Packing checklist** for anything you need to take with you
- **Trip details**: flight number, hotel name and address
- **My Trips page** with a card grid, cover images and a confirmation dialog
  before deleting
- **Responsive layout** for desktop and mobile
- **Local storage**: trips are saved in the browser, no account or backend
  needed
- **Search cache** (1 hour) and request cancellation to keep search fast and
  polite to public APIs

## Tech stack

| Area      | Tools                                                                          |
|-----------|--------------------------------------------------------------------------------|
| Framework | React, TypeScript, Vite                                                        |
| UI        | MUI v7 (`@mui/material`, `@mui/icons-material`), `@mui/x-date-pickers`         |
| Routing   | React Router                                                                   |
| Dates     | Day.js                                                                         |
| Maps      | Leaflet, OpenStreetMap tiles                                                   |
| Data      | Nominatim (geocoding and place search), Overpass API (attractions near a city) |
| Storage   | `localStorage`                                                                 |

## Getting started

### Requirements

- Node.js 18 or newer
- npm (or yarn / pnpm)

### Installation

```bash
git clone https://github.com/CraizyMaizy/Planning_trip
cd <project-folder>
npm install
```

### Run in development

```bash
npm run dev
```

Open the address shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Routes

| Path        | Page                                               |
|-------------|----------------------------------------------------|
| `/`         | Landing page: hero, features, popular destinations |
| `/create`   | Create a new trip                                  |
| `/trips`    | List of saved trips                                |
| `/trip/:id` | Edit an existing trip                              |

## Project structure

```
src/
├── api/            # Nominatim and Overpass requests
├── assets/         # Images used for covers and hero section
├── components/     # UI components (Header, Footer, MapView, PlacesSearch, Checklist, ...)
├── data/           # Static data for the landing page (features, destinations)
├── hooks/          # Custom hooks (useDebounce)
├── pages/          # Route pages (TripsList, TripEditor, ...)
├── types/          # Shared TypeScript types (Trip, Place, ChecklistItem, ...)
├── utilis/         # Helpers (search cache)
└── main.tsx        # App entry point
```

## How data is stored

Trips are saved in `localStorage` under the `trips` key as JSON. Each trip has
this shape:

```ts
type Trip = {
  id: number;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  places: Place[];
  items: ChecklistItem[];
  flight: string;
  hotelName: string;
  hotelAddress: string;
  coverImage: string;
};
```

Search results are cached under keys starting with `places_v2_` and expire after
one hour. Expired entries are removed on app start.

## Search tips

The search field works best with **"what + where"**:

| Query             | Result                                               |
|-------------------|------------------------------------------------------|
| `Kazan`           | The city, plus attractions within 3 km of its center |
| `Kazan Kremlin`   | A specific landmark                                  |
| `museum in Kazan` | Places of a given type in a city                     |

Very short queries (under 3 characters) are ignored, and queries without a city
can return results from anywhere in the world.

## External services and usage limits

The app uses free public services, so please keep their usage policies in mind:

- **Nominatim** has a strict rate limit (about one request per second on the
  public server). The app uses a debounce, caching and request cancellation to
  stay within it. For heavy use, consider hosting your own instance or switching
  to a provider built for autocomplete.
- **Overpass API** public servers can be slow or return errors under load.
- **OpenStreetMap tiles** require visible attribution, which is shown on the
  map.

## Acknowledgements

- [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- [Leaflet](https://leafletjs.com/)
- [MUI](https://mui.com/)