// import React from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { LatLngTuple } from 'leaflet';
// import HeatmapLayer from 'react-leaflet-heatmap-layer';

// const HeatMap: React.FC = () => {
//   const center: LatLngTuple = [51.505, -0.09];
//   const heatmapData = [
//     { lat: 51.505, lng: -0.09, count: 10 },
//     { lat: 51.51, lng: -0.1, count: 8 },
//     { lat: 51.51, lng: -0.12, count: 15 },
//     // Agrega más datos aquí
//   ];

//   return (
//     <MapContainer center={center} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <HeatmapLayer
//         fitBoundsOnLoad
//         fitBoundsOnUpdate
//         points={heatmapData}
//         longitudeExtractor={(m) => m.lng}
//         latitudeExtractor={(m) => m.lat}
//         intensityExtractor={(m) => m.count}
//       />
//     </MapContainer>
//   );
// };

// export default HeatMap;
