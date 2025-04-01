import { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./place-autocomplete";
import { Card } from "../ui/card";
import { apikey } from "../../App";
import { useMap } from "@vis.gl/react-google-maps";
import {MarkerWithInfowindow} from "../../components/pinState";



export const MapWaypoints = () => {
  const map = useMap();
  const [mapPin, setMapPin] = useState<
    {
      id: string;
      coords: google.maps.LatLngLiteral;
    }[]
  >([]);

  const [selectedPin, setSelectedPin] = useState<{
    id: string;
    coords: google.maps.LatLngLiteral;
    name?: string;
    pixelPosition?: { x: number; y: number };
  } | null>(null);

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
    <APIProvider apiKey={apikey}>
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
            <MarkerWithInfowindow
            lat={pin.coords.lat}
            lng={pin.coords.lng}
            />
          ))}
        </Map>
      </div>
      {/* 👇 Render the card when a pin is selected */}
      {selectedPin && (
          <div
            className="absolute top-4 right-4 z-10 w-64"
            onClick={() => setSelectedPin(null)} // Close card on click
          >
            <Card>
              <div className="p-4">
                <h3 className="font-bold">{selectedPin.name || "Unnamed Pin"}</h3>
                <p>Lat: {selectedPin.coords.lat.toFixed(4)}</p>
                <p>Lng: {selectedPin.coords.lng.toFixed(4)}</p>

                console.log("It is now selected")
              </div>
            </Card>
          </div>
        )}
    </APIProvider>
  );
};
