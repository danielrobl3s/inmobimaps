import React, {useState} from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { Card } from './ui/card';
import { MyForm } from './my-form';

export const MarkerWithInfowindow = ( {lat, lng}: {lat: number, lng: number} ) => {
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{lat, lng}}
        title={'AdvancedMarker that opens an Infowindow when clicked.'}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={400}
          onCloseClick={() => setInfowindowOpen(false)}>
          <>
            <Card>
              <MyForm />
            </Card>
          </>
        </InfoWindow>
      )}
    </>
  );
};