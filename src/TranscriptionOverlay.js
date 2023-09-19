import React from "react";

export default function TranscriptionOverlay({ transcription }) {
  if (!transcription) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div>
        <h1>Transcription: {transcription}</h1>
      </div>
    </div>
  );
}
