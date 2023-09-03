import { useEffect, useRef } from "react";
import io from "socket.io-client";

export default function VideoCanvas({ onLandmarks }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = canvas.toDataURL("image/jpeg");
        socket.emit("new_frame", frameData);
      }
    }, 1000 / 30); // 30 frames per second

    socket.on("landmarks", onLandmarks);

    return () => {
      clearInterval(interval);
    };
  }, [onLandmarks]);

  return (
    <>
      <video
        ref={videoRef}
        width="640"
        height="480"
        autoPlay
        style={{ display: "none" }}
      ></video>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
    </>
  );
}
