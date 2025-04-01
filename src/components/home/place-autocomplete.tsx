import {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

// Place Autocomplete Component
interface PlaceAutocompleteProps {
  setMapPin: Dispatch<
    SetStateAction<
      {
        id: string;
        coords: google.maps.LatLngLiteral;
      }[]
    >
  >;
}

export const PlaceAutocomplete = ({ setMapPin }: PlaceAutocompleteProps) => {
  const map = useMap();

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;
    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
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

      if (map) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(coords);
        map.fitBounds(bounds);
      }
    });

    return () => {
      if (placeAutocomplete) {
        google.maps.event.clearInstanceListeners(placeAutocomplete);
      }
    };
  }, [placeAutocomplete, setMapPin, map]);

  return (
    <div className="p-4 z-10 relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a location"
        className="w-72 px-2 border border-gray-300 rounded shadow-sm h-9"
      />
    </div>
  );
};
