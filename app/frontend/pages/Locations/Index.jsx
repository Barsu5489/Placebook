import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { router } from '@inertiajs/react';
import Navbar from '../../components/shared/Navbar';

function MapEvents({ onClick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log('Map clicked at:', lat, lng);
      onClick({ latitude: lat, longitude: lng });
    },
  });
  console.log('MapEvents component rendered');
  return null;
}

export default function Index({ locations, current_user }) {
  const [newLocation, setNewLocation] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Index component mounted');
  }, []);

  const handleMapClick = (coords) => {
    console.log('handleMapClick called with:', coords);
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

  if (typeof window === 'undefined') return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Head title="My Locations" />
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <div className="mb-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h2 className="text-xl font-bold text-blue-800 mb-3">How to Add a Location</h2>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</div>
                      <p className="text-blue-700">Click anywhere on the map to place a pin</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</div>
                      <p className="text-blue-700">Click on the pin to open a popup</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</div>
                      <p className="text-blue-700">Enter a name for your location and click "Add Location"</p>
                    </div>
                  </div>
                </div>
                <MapContainer
                  center={[-0.0917, 34.768]}
                  zoom={10}
                  style={{ height: '500px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
      </div>
    </div>
  );
}