import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Place } from '../types/types.ts';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView({ places }: { places: Place[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current).setView([55.7558, 37.6173], 5);

    map.attributionControl.setPrefix(false);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    places.forEach((place) => {
      const popup = document.createElement('span');
      popup.textContent = place.name;

      L.marker([place.lat, place.lng], { icon: defaultIcon }).bindPopup(popup).addTo(layer);
    });

    if (places.length > prevCountRef.current) {
      if (places.length === 1) {
        const [only] = places;
        map.setView([only.lat, only.lng], 13);
      } else {
        const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng] as [number, number]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      }
    }

    prevCountRef.current = places.length;
  }, [places]);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
}
