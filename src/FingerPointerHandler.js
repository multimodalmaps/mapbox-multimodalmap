// FingerPointHandler.js
import { useEffect, useState } from "react";

export default function FingerPointHandler({ onPointMove, landmarks }) {
  const [initialPoint, setInitialPoint] = useState(null);

  useEffect(() => {
    handleLandmarks(landmarks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landmarks]);

  const handleLandmarks = (landmarks) => {
    if (landmarks && landmarks.length > 0) {
      const hand = landmarks[0];
      const indexMcp = hand[5];
      const indexPip = hand[6];
      const indexDip = hand[7];
      const indexTip = hand[8];
      const thumbTip = hand[4];

      // Check if index finger is relatively straight
      const fingerStraight =
        indexTip.y < indexMcp.y &&
        indexPip.y < indexMcp.y &&
        indexDip.y < indexMcp.y;

      // Check thumb position as an added heuristic
      const thumbTucked = thumbTip.y > indexMcp.y;

      if (fingerStraight && thumbTucked) {
        if (!initialPoint) {
          setInitialPoint(indexTip);
        } else {
          const movement = {
            dx: indexTip.x - initialPoint.x,
            dy: indexTip.y - initialPoint.y,
          };
          onPointMove(movement);
          setInitialPoint(indexTip);
        }
      } else {
        setInitialPoint(null);
      }
    }
  };

  return null;
}
