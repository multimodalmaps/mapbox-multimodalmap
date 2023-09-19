// App.js
import React, { useState } from "react";
import MapComponent from "./MapComponent";
import VideoCanvas from "./VideoCanvas";
// import PinchZoomHandler from "./PinchZoomHandler";
// eslint-disable-next-line no-unused-vars
import VoiceRecognition from "./VoiceRecognition";
import TranscriptionOverlay from "./TranscriptionOverlay";
import LandmarkOverlay from "./LandmarkOverlay";
import FingerPointHandler from "./FingerPointerHandler";

function App() {
  const pointerMoveSensitivity = 10;

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [landmarks, setLandmarks] = useState([]);
  const [transcription, setTranscription] = useState("");

  // eslint-disable-next-line no-unused-vars
  const handleZoom = (pinchDelta) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom: Math.min(Math.max(prevViewport.zoom - pinchDelta * 50, 0), 22),
    }));
  };

  const onPointMove = (movement) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: prevViewport.latitude - movement.dy * pointerMoveSensitivity,
      longitude: prevViewport.longitude - movement.dx * pointerMoveSensitivity,
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
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapComponent viewport={viewport} onViewportChange={setViewport} />
      <VoiceRecognition
        onTranscription={setTranscription}
        onLocationUpdate={handleLocationUpdate}
      />
      <VideoCanvas onLandmarks={setLandmarks} />

      <LandmarkOverlay landmarks={landmarks} />
      <TranscriptionOverlay transcription={transcription} />
      {/* <PinchZoomHandler onZoom={handleZoom} landmarks={landmarks} /> */}
      <FingerPointHandler onPointMove={onPointMove} landmarks={landmarks} />
    </div>
  );
}

export default App;
