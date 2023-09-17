// PinchZoomHandler.js
import { useEffect, useState } from "react";

const PINCH_THRESHOLD = 0.008;
const PINCH_ZOOM_TIMEOUT_MILISECONDS = 200;

export default function PinchZoomHandler({ onZoom, landmarks }) {
  const [lastPinchDistance, setLastPinchDistance] = useState(null);

  useEffect(() => {
    handleLandmarks(landmarks);
  }, [landmarks]);

  console.log("in PinchZoomHandler:", landmarks);

  const handleLandmarks = (landmarks) => {
    console.log("in PinchZoomHandler:", landmarks);

    if (landmarks && landmarks.length > 0) {
      const hand = landmarks[0]; // Assuming we're tracking one hand
      const thumbTip = hand[4];
      const indexTip = hand[8];
      const debouncedOnZoom = debounce(onZoom, PINCH_ZOOM_TIMEOUT_MILISECONDS);

      const pinchDistance = Math.abs(thumbTip.y - indexTip.y);
      console.log("pinchDistance:", pinchDistance);
      if (lastPinchDistance !== null) {
        const pinchDelta = pinchDistance - lastPinchDistance;

        // Update zoom based on pinch
        if (Math.abs(pinchDelta) > PINCH_THRESHOLD) {
          debouncedOnZoom(pinchDelta);
        }
      }

      setLastPinchDistance(pinchDistance);
    }
  };

  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return null; // This component doesn't render anything
}
