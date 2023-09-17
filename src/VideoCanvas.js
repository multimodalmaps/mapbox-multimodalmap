import React, { useEffect, useRef } from "react";
import MediaPipeManager from "./MediaPipeManager";

export default function VideoCanvas({ onLandmarks }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      new MediaPipeManager(videoRef.current, canvasRef.current, onLandmarks);
    }
  }, [onLandmarks]);

  return (
    <div style={{ position: "relative", width: "300px", height: "5000px" }}>
      <video
        className="input_video"
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 0,
          width: "240px",
          height: "135px",
          border: "2px solid white",
          borderRadius: "5px",
        }}
      ></video>
      <canvas
        className="output_canvas"
        ref={canvasRef}
        width="240"
        height="135"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1,
        }}
      ></canvas>
    </div>
  );
}
