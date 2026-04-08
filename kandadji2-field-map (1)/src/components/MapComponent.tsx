import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { booleanPointInPolygon } from '@turf/turf';
import data from '../data/kandadji2_app_data.json';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RecenterButton = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  return (
    <button
      className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow-md font-bold"
      onClick={() => map.flyTo(center, 15)}
    >
      Recentrer
    </button>
  );
};

const UserLocation = ({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) => {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    map.locate({ setView: false, watch: true });
    map.on('locationfound', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationFound(e.latlng.lat, e.latlng.lng);
    });
  }, [map, onLocationFound]);

  return position ? <Marker position={position} /> : null;
};

export default function MapComponent({ showBoundary, onUserLocationChange }: any) {
  const center: [number, number] = [data.summary.center.latitude, data.summary.center.longitude];

  return (
    <MapContainer center={center} zoom={15} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showBoundary && <GeoJSON data={data.boundary_polygon_geojson as any} />}
      <RecenterButton center={center} />
      <UserLocation onLocationFound={onUserLocationChange} />
    </MapContainer>
  );
}
