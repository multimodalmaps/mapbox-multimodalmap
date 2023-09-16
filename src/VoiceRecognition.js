import io from "socket.io-client";
import { useEffect } from "react";

export default function VoiceRecognition({ onLocationUpdate }) {
  useEffect(() => {
    const socket = io("http://localhost:5001"); // Different port for the voice service
    let mediaRecorder;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        console.log("audio chunk", event.data);
        // Send this data to your server
        socket.emit("audio_chunk", event.data);
      };
      mediaRecorder.start();
    });

    socket.on("location_pinpoint", (data) => {
      onLocationUpdate(data);
    });

    return () => {
      mediaRecorder && mediaRecorder.stop();
    };
  }, [onLocationUpdate]);

  return null; // This component doesn't render anything
}
