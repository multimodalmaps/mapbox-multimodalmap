import React, { useEffect, useRef } from "react";
import MediaPipeManager from "./MediaPipeManager";

export default function VideoCanvas({ onLandmarks }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      new MediaPipeManager(videoRef.current, onLandmarks);
    }
  }, [onLandmarks]);

  return (
    <div style={{ position: "absolute", top: 40, left: 1000, zIndex: 10 }}>
      <video
        className="input_video"
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          display: "none",
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 11,
          width: "240px",
          height: "135px",
          border: "2px solid white",
          borderRadius: "5px",
        }}
      ></video>
    </div>
  );
}
