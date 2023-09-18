import Map from "react-map-gl";

export default function MapComponent({ viewport, onViewportChange }) {
  return (
    <Map
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={onViewportChange}
      dragPan={true}
      mapboxAccessToken={
        "pk.eyJ1IjoiaGd1em1hbnNvdG8iLCJhIjoiY2xtMWlxd2VuMGI0cDNlbGZxanAwNG9uNiJ9.AGPt6Wgr7NXiLgu69gCt5A"
      }
    />
  );
}
