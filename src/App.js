// App.js
import React, { useState } from "react";
import MapComponent from "./MapComponent";
import VideoCanvas from "./VideoCanvas";
import PinchZoomHandler from "./PinchZoomHandler";
// eslint-disable-next-line no-unused-vars
import VoiceRecognition from "./VoiceRecognition"; // <-- Import the new component

function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [landmarks, setLandmarks] = useState([]);
  console.log("in APP:", landmarks);

  const handleZoom = (pinchDelta) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(Math.max(prevViewport.zoom - pinchDelta * 50, 0), 22),
    }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleLocationUpdate = (newLocation) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
    }));
  };

  return (
    <div style={{ height: "80vh", width: "100%", position: "absolute" }}>
      <MapComponent viewport={viewport} onViewportChange={setViewport} />
      <VideoCanvas onLandmarks={setLandmarks} />
      <PinchZoomHandler onZoom={handleZoom} landmarks={landmarks} />
      {/* <VoiceRecognition onLocationUpdate={handleLocationUpdate} /> */}
    </div>
  );
}

export default App;
