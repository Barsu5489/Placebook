import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../../components/shared/Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Home({ locations, current_user }) {
  if (typeof window === 'undefined') return null;

  return (
    <>
      <Head title="All Locations" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Navbar />
          {/* {current_user && (
            <Link href="/locations" className="text-blue-500 mb-4 inline-block">
              My Locations
            </Link>
          )} */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <MapContainer
                center={[-0.0917, 34.768]} // Kisumu
                zoom={13}
                style={{ height: '500px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
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
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}