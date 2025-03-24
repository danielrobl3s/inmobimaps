import { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./place-autocomplete";
import { apikey } from "../../App";

export const MapWaypoints = () => {
  const [mapPin, setMapPin] = useState<
    {
      id: string;
      coords: google.maps.LatLngLiteral;
    }[]
  >([]);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (!place || !place.geometry?.location) return;

    const coords = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setMapPin((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        coords,
        name: place.name,
      },
    ]);
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-full">
        <Map
          defaultCenter={{ lat: 23.6345, lng: -102.5528 }}
          defaultZoom={6}
          mapId="DEMO_MAP_ID"
          onClick={(e) => {
            const coords = e.detail.latLng;
            if (!coords) {
              return;
            }
            setMapPin((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                coords,
              },
            ]);
          }}
        >
          <MapControl position={ControlPosition.TOP_CENTER}>
            <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
          </MapControl>
          {mapPin?.map((pin, index) => (
            <AdvancedMarker
              key={index}
              position={pin.coords}
              onClick={() => {
                const newPins = mapPin.filter(
                  (waypoint) => waypoint.id !== pin.id,
                );
                setMapPin(newPins);
              }}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};
