import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to dynamically update map view based on selected location
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { animate: true });
    }
  }, [center, map]);
  return null;
};

// Component to fix grey tile issue
const MapInvalidator = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const DynamicMap = ({ locations, selectedLocation }) => {
  // Center defaults to Da Nang
  const defaultCenter = [16.0544, 108.2022];
  const center = selectedLocation || (locations.length > 0 ? locations[0].coordinates : defaultCenter);
  const [mapRendered, setMapRendered] = useState(false);

  useEffect(() => {
    setMapRendered(true);
  }, []);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-white/20 relative z-0">
      {mapRendered && (
        <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc, idx) => (
            <Marker key={idx} position={loc.coordinates}>
              <Popup>
                <div className="font-semibold text-gray-800">{loc.name}</div>
                <div className="text-sm text-gray-600">{loc.category}</div>
              </Popup>
            </Marker>
          ))}
          {selectedLocation && <MapUpdater center={selectedLocation} />}
          <MapInvalidator />
        </MapContainer>
      )}
    </div>
  );
};

export default DynamicMap;
