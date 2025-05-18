import { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import { PlaceAutocomplete } from "./place-autocomplete";
<<<<<<< HEAD
import { Card } from "../ui/card";
import { apikey, useMapContext } from "../../App";
import { useMap } from "@vis.gl/react-google-maps";
import {MarkerWithInfowindow} from "../../components/pinState";
import { NavMain } from '../nav-main';
import { useSidebar } from "../ui/sidebar";





=======
>>>>>>> 410333eb12c55584518cf9ff29ec7a9efaee5d3b

export const MapWaypoints = () => {
  const map = useMap();
  const { setMap } = useMapContext();
  const { open, setOpen } = useSidebar();

  const [mapPin, setMapPin] = useState<
    {
      id: string;
      coords: google.maps.LatLngLiteral;
      name?: string;
    }[]
  >([]);

<<<<<<< HEAD
  const [selectedPin, setSelectedPin] = useState<{
    id: string;
    coords: google.maps.LatLngLiteral;
    name?: string;
    pixelPosition?: { x: number; y: number };
  } | null>(null);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (!place || !place.geometry?.location) return;

    console.log(place)

    const coords = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setMapPin((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        coords,
        name: place.formatted_address,
      },
    ]);

    setMap({id: crypto.randomUUID(), coords, name: place.formatted_address});
    if (!open) {
      setOpen(true);
    }

  };

=======
>>>>>>> 410333eb12c55584518cf9ff29ec7a9efaee5d3b
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-full">
        <Map
          defaultCenter={{ lat: 23.6345, lng: -102.5528 }}
          defaultZoom={6}
          mapId="DEMO_MAP_ID"
          style={{ width: "100%", height: "100%" }}
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

            setMap({id: crypto.randomUUID(), coords, name: ""});
            if (!open) {
              setOpen(true);
            }
          }}
        >
          <MapControl position={ControlPosition.TOP_CENTER}>
            <PlaceAutocomplete setMapPin={setMapPin} />
          </MapControl>
          {mapPin?.map((pin, index) => (
            <MarkerWithInfowindow
            lat={pin.coords.lat}
            lng={pin.coords.lng}
            address ={pin.name}
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
