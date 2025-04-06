import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { router } from '@inertiajs/react';

// Component to handle map events
function MapEvents({ onClick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log('Map clicked at:', lat, lng); // Debug log
      onClick({ latitude: lat, longitude: lng });
    },
  });
  console.log('MapEvents component rendered'); // Confirm component mounts
  return null;
}

export default function Index({ locations }) {
  const [newLocation, setNewLocation] = useState(null);
  const [name, setName] = useState('');

  const handleMapClick = (coords) => {
    console.log('handleMapClick called with:', coords); // Debug log
    setNewLocation(coords);
  };

  const handleAddLocation = () => {
    if (name && newLocation) {
      router.post('/locations', {
        name: name,
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      });
      setNewLocation(null);
      setName('');
    } else {
      alert('Please enter a name for the location');
    }
  };

  if (typeof window === 'undefined') {
    return null; // Avoid SSR issues
  }

  console.log('Index component rendered'); // Confirm rendering

  return (
    <>
      <Head title="Locations" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <MapContainer
                center={[-0.0917, 34.768]} // Kisumu, Kenya
                zoom={13} // Closer zoom for local visibility// Closer zoom to see tiles
                style={{ height: '500px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEvents onClick={handleMapClick} />
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{location.name}</h3>
                        <p>Added by: {location.user.name}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                {newLocation && (
                  <Marker position={[newLocation.latitude, newLocation.longitude]}>
                    <Popup>
                      <div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter location name"
                          className="border p-1 mb-2 w-full"
                        />
                        <button
                          onClick={handleAddLocation}
                          className="bg-blue-500 text-white p-1 rounded"
                        >
                          Add Location
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
              {newLocation && (
                <div className="mt-4">
                  <p>
                    Clicked Coordinates: {newLocation.latitude.toFixed(6)},{' '}
                    {newLocation.longitude.toFixed(6)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}