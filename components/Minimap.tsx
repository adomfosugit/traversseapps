import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Input } from "./ui/input";


//@ts-ignore

const Map = ({ onChange }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const autocompleteRef = useRef(null);

  // Load script for Google Map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TOKEN!,
    libraries: ["places"],
  });

  // Static lat and lng
  const center = { lat: 5.6, lng: -0.18 };

  // Handle place change on search
  const handlePlaceChanged = () => {
    //@ts-ignore
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedPlace(place);
      //@ts-ignore
      setSearchLngLat(location);
      setCurrentLocation(null);
      onChange(location); // Notify parent of the new location
    }
  };

  // Get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setSelectedPlace(null);
          setSearchLngLat(null);
          //@ts-ignore
          setCurrentLocation(location);
          onChange(location); // Notify parent of the new location
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  //@ts-ignore
  const onMapLoad = (map) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");
    controlUI.innerHTML = "Get Location";
    controlUI.style.backgroundColor = "white";
    controlUI.style.color = "black";
    controlUI.style.border = "2px solid #ccc";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.style.width = "100%";
    controlUI.style.padding = "8px 0";
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
  };

  if (!isLoaded) return <div>Loading....</div>;

  return (
    <div className="flex flex-col gap-2">
      {/* Search component */}
      <Autocomplete
        onLoad={(autocomplete) => {
          console.log("Autocomplete loaded:", autocomplete);
          //@ts-ignore
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ["address_components", "geometry", "name"] }}
      >
        <Input type="text" placeholder="Search for a location" className="w-full mx-auto" />
      </Autocomplete>

      {/* Map component */}
      <GoogleMap
        zoom={selectedPlace || currentLocation ? 18 : 12}
        center={currentLocation ?? searchLngLat ?? center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "100%", height: "300px", margin: "auto" }}
        onLoad={onMapLoad}
      >
        {/* @ts-ignore */}
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </div>
  );
};

export default Map;