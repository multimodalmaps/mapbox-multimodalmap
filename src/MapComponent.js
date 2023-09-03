import Map from "react-map-gl";

export default function MapComponent({ viewport, onViewportChange }) {
  return (
    <Map
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={onViewportChange}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    />
  );
}
