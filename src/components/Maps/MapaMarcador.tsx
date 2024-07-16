import React, {  useRef, useEffect } from 'react';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 21.1619,
  lng: -86.8515
};

const markerData = [
  { lat: 21.1619, lng: -86.8515, title: "Cancún" }
];

const MapComponent: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const markerElement = document.createElement('div');
      markerElement.innerHTML = markerData[0].title;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: markerData[0].lat, lng: markerData[0].lng },
        map,
        title: markerData[0].title,
        content: markerElement
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(marker.position as google.maps.LatLng);
      map.fitBounds(bounds);
    }
  }, [mapRef.current]);

  const onLoad = (map: google.maps.Map) => {
    console.log("Map loaded");
    mapRef.current = map;
  };

  return (
    <LoadScriptNext googleMapsApiKey="AIzaSyClLf7NM-Xw2xNzUkS0MQCsP2wdbbPBfFQ" libraries={['marker']}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
      >
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapComponent;
