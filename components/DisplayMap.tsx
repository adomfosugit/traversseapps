import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

interface MapProps {
  latitude: number | null;
  longitude: number | null;
}

const Map = ({ latitude, longitude }: MapProps) => {
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Load script for Google Map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TOKEN!,
    libraries: ["places"],
  });

  // Static center coordinates
  const center = { lat: 5.6, lng: -0.18 };

  // Update marker position when latitude or longitude changes
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setMarkerPosition({ lat: latitude, lng: longitude });
    } else {
      setMarkerPosition(null);
    }
  }, [latitude, longitude]);

  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="flex flex-col gap-2">
      {/* Map component */}
      <GoogleMap
        zoom={latitude && longitude ? 18 : 12}
        center={markerPosition ?? center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "100%", height: "300px", margin: "auto" }}
      >
        {/* Marker */}
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={false} // Disable dragging since we're only displaying the location
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;