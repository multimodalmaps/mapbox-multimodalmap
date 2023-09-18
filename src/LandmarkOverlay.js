import React from "react";

export default function LandmarkOverlay({ landmarks }) {
  if (!landmarks || landmarks.length === 0) return null;

  const widthMultiplier = 500;
  const heightMultiplier = 500;

  const currentLandmarks = landmarks[0];

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg style={{ overflow: "visible", position: "relative" }}>
        {HAND_CONNECTIONS.map((connection, index) => {
          const start = currentLandmarks[connection[0]];
          const end = currentLandmarks[connection[1]];
          return (
            <line
              key={index}
              x1={start.x * widthMultiplier}
              y1={start.y * heightMultiplier}
              x2={end.x * widthMultiplier}
              y2={end.y * heightMultiplier}
              stroke="green"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {currentLandmarks.map((landmark, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `calc(50% + ${landmark.y * heightMultiplier}px)`,
            left: `calc(50% + ${landmark.x * widthMultiplier}px)`,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

// HAND_CONNECTIONS taken from MediaPipe's documentation.
// They describe how landmarks are connected to each other to form a hand's shape.
const HAND_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
];
