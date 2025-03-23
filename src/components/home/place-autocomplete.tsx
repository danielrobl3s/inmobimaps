import { useState, useRef, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

// Place Autocomplete Component
interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const PlaceAutocomplete = ({
  onPlaceSelect,
}: PlaceAutocompleteProps) => {
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
      onPlaceSelect(placeAutocomplete.getPlace());
    });

    return () => {
      if (placeAutocomplete) {
        google.maps.event.clearInstanceListeners(placeAutocomplete);
      }
    };
  }, [onPlaceSelect, placeAutocomplete]);

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
