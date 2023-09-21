import React, { useState, useEffect } from "react";

export default function TranscriptionOverlay({ transcription }) {
  const [visibleTranscription, setVisibileTranscription] = useState("");

  useEffect(() => {
    let index = 0;

    if (transcription) {
      const intervalId = setInterval(() => {
        setVisibileTranscription((prev) => prev + transcription[index]);

        index += 1;
        if (index >= transcription.length) {
          clearInterval(intervalId);
        }
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [transcription]);

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
        <h1>Transcription: {visibleTranscription}</h1>
      </div>
    </div>
  );
}
