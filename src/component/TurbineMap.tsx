import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-control-geocoder';

// Fix default marker icons for Leaflet
import greenLeafIcon from '../assets/leaf-green.png';
import greenLeafShadow from '../assets/leaf-shadow.png';

// Define a custom icon
const customIcon = L.icon({
  iconUrl: greenLeafIcon,
  shadowUrl: greenLeafShadow,
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

// Override the default marker icon
L.Marker.prototype.options.icon = customIcon;

interface TurbineMapProps {
  lat: number;
  lon: number;
}

/*
 * This component updates the map view based on the coordinates
 * @param param0 - lat, lon
 * @returns null - This component doesn't render anything on the map
 * @see Ex: https://react-leaflet.js.org/docs/api-map
 */

const MapUpdater: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);

  return null;
};

/**
 * Reverse geocode the coordinates to get the location name
 * @param param0
 * @returns null - This component doesn't render anything on the map
 */

const ReverseGeocode: React.FC<{
  lat: number;
  lon: number;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
}> = ({ lat, lon, setLocationName }) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse(L.latLng(lat, lon), map.getZoom(), (results: any) => {
      if (results && results.length > 0) {
        setLocationName(results[0].name || 'Unknown Location');
      } else {
        setLocationName('Location not found');
      }
    });
  }, [lat, lon, map, setLocationName]);

  return null;
};

/*
 * This component renders a map with a marker at the given coordinates
 * @param param0 - lat, lon
 * @returns JSX.Element - A map with a marker at the given coordinates
 * @see Ex: https://react-leaflet.js.org/docs/api-map
 */
export const TurbineMap: React.FC<TurbineMapProps> = ({ lat, lon }) => {
  const [zoomLevel, setZoomLevel] = useState(13); // Default zoom level
  const [locationName, setLocationName] = useState<string>('Fetching...');

  const UpdateZoomLevel: React.FC = () => {
    useMapEvents({
      zoomend: (event) => {
        setZoomLevel(event.target.getZoom());
      },
    });
    return null;
  };

  return (
    <div className="map-section" data-testid="map" aria-labelledby="map">
      <div className="map-overview">
        <h2 className="map-heading">Location: {locationName}</h2>
        <p className="map-description">
          This map shows the location based on the coordinates you've entered.
          Use this to identify or verify the exact spot for your reference.
        </p>
      </div>

      <div className="map-container" style={{ position: 'relative' }}>
        <MapContainer
          center={[lat, lon]}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          fullscreenControl={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapUpdater lat={lat} lon={lon} />
          <ReverseGeocode
            lat={lat}
            lon={lon}
            setLocationName={setLocationName}
          />
          <UpdateZoomLevel />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lon]}>
            <Popup>
              <strong>Location Details:</strong>
              <ul style={{ margin: 0, padding: '5px 0', listStyle: 'none' }}>
                <li>📍 Latitude: {lat.toFixed(4)}</li>
                <li>📍 Longitude: {lon.toFixed(4)}</li>
                <li>🌍 Zoom Level: {zoomLevel}</li>
                <li>📌 Location Name: {locationName}</li>
                <li>🔎 Map Powered by OpenStreetMap</li>
              </ul>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
