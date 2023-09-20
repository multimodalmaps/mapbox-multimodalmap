import io from "socket.io-client";
import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export default function VoiceRecognition({
  onTranscription,
  onLocationUpdate,
}) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      echoCancellation: true,
    });

  async function convertBlobUrlToBlob(blobUrl) {
    try {
      const blob = await fetch(blobUrl).then((response) => response.blob());
      return blob;
    } catch (error) {
      console.error("Error converting blob URL to blob:", error);
    }
  }

  useEffect(() => {
    if (status === "stopped" && mediaBlobUrl) {
      let url =
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_BACKEND_URL_PRODUCTION
          : process.env.REACT_APP_BACKEND_URL_PRODUCTION;

      url =
        "http://multimodalmap-voicerecognition-dev.us-west-2.elasticbeanstalk.com/";
      console.log(url);
      const socket = io(url);

      socket.on("connect", async () => {
        console.log("Connected to the server");
        const blob = await convertBlobUrlToBlob(mediaBlobUrl);
        if (blob) {
          socket.emit("audio_chunk", blob);
        }
      });

      socket.on("transcription", (transcription) => {
        onTranscription(transcription);
        socket.disconnect();
      });

      socket.on("connect_error", (error) => {
        console.error("Connection Error:", error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, mediaBlobUrl]);

  const toggleRecording = () => {
    if (status !== "recording") {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        padding: "10px",
      }}
    >
      <button onClick={toggleRecording}>
        {status === "recording" ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
