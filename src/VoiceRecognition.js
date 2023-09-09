import io from 'socket.io-client';
import { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export default function VoiceRecognition({ onLocationUpdate }) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      echoCancellation: true,
    });

  async function convertBlobUrlToBlob(blobUrl) {
    try {
      const blob = await fetch(blobUrl).then((response) => response.blob());
      // return new File([blob], 'audio.wav', { type: 'audio/wav' });
      return blob;
    } catch (error) {
      console.error('Error converting blob URL to blob:', error);
    }
  }

  useEffect(() => {
    if (status === 'stopped' && mediaBlobUrl) {
      // Connect to the socket only when the recording is stopped and there's data to send
      const socket = io('http://localhost:5001');

      socket.on('connect', async () => {
        console.log('Connected to the server');
        const blob = await convertBlobUrlToBlob(mediaBlobUrl);
        if (blob) {
          console.log('audio sent from frontend');
          socket.emit('audio_chunk', blob); // Send blobURL to backend
        }
      });

      socket.on('location_pinpoint', (data) => {
        onLocationUpdate(data);
        socket.disconnect(); // Disconnect after receiving data
      });

      socket.on('connect_error', (error) => {
        console.error('Connection Error:', error);
      });
    }
  }, [status, mediaBlobUrl]);

  return (
    <>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {status === 'stopped' && <audio src={mediaBlobUrl} controls autoPlay />}
    </>
  );
}
