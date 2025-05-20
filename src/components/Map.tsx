"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapView({
  midpoint,
  coords,
  suggestions,
}: {
  midpoint: { lat: number; lng: number };
  coords: { lat: number; lng: number }[];
  suggestions: { lat: number; lng: number; name: string }[];  // Ubah dari lon ke lng
}) {
  return (
    <MapContainer center={[midpoint.lat, midpoint.lng]} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      {coords.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]}>
          <Popup>Lokasi {i + 1}</Popup>
        </Marker>
      ))}
      <Marker position={[midpoint.lat, midpoint.lng]}>
        <Popup>Titik Tengah</Popup>
      </Marker>
      {suggestions.map((s, i) => (
        <Marker key={i} position={[s.lat, s.lng]}>  {/* gunakan s.lng bukan s.lon */}
          <Popup>{s.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
