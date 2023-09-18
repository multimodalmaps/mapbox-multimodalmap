// App.js
import React, { useState } from 'react';
import MapComponent from './MapComponent';
import VideoCanvas from './VideoCanvas';
import PinchZoomHandler from './PinchZoomHandler';
import VoiceRecognition from './VoiceRecognition'; // <-- Import the new component

function App() {
  const pointerMoveSensitivity = 10;

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [landmarks, setLandmarks] = useState([]);
  console.log('in APP:', landmarks);

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
<<<<<<< HEAD
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapComponent viewport={viewport} onViewportChange={setViewport} />
      <VideoCanvas onLandmarks={setLandmarks} />
      <LandmarkOverlay landmarks={landmarks} />
      {/* <PinchZoomHandler onZoom={handleZoom} landmarks={landmarks} /> */}
      <FingerPointHandler onPointMove={onPointMove} landmarks={landmarks} />

      <VoiceRecognition onLocationUpdate={handleLocationUpdate} />
=======
    <div style={{ height: '100vh', width: '100%' }}>
      {/* <MapComponent viewport={viewport} onViewportChange={setViewport} />
      <VideoCanvas onLandmarks={setLandmarks} /> */}
      {/* <PinchZoomHandler onZoom={handleZoom} landmarks={landmarks} /> */}
      <VoiceRecognition onLocationUpdate={handleLocationUpdate} />{' '}
>>>>>>> 292f391 (Add voice recording to voice recognition)
    </div>
  );
}

export default App;
