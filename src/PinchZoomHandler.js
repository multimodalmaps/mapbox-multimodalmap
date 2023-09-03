// PinchZoomHandler.js
import { useEffect, useState } from "react";

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

      const pinchDistance = Math.sqrt(
        Math.pow(thumbTip.x - indexTip.x, 2) +
          Math.pow(thumbTip.y - indexTip.y, 2) +
          Math.pow(thumbTip.z - indexTip.z, 2)
      );

      if (lastPinchDistance !== null) {
        const pinchDelta = pinchDistance - lastPinchDistance;

        // Update zoom based on pinch
        if (Math.abs(pinchDelta) > 0.001) {
          onZoom(pinchDelta);
        }
      }

      setLastPinchDistance(pinchDistance);
    }
  };

  return null; // This component doesn't render anything
}
