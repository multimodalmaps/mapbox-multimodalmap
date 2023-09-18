// LandmarkOverlay.js
import React from "react";

export default function LandmarkOverlay({ landmarks }) {
  const widthMultiplier = 500; // Adjust these multipliers as needed to spread out landmarks
  const heightMultiplier = 500;

  if (!landmarks || landmarks.length === 0) return null;
  landmarks = landmarks[0]; //Only get the first hand

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {landmarks.map((landmark, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `calc(50% + ${landmark.y * heightMultiplier}px)`, // Adjusted top and left calculations
            left: `calc(50% + ${landmark.x * widthMultiplier}px)`,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            transform: "translate(-50%, -50%)", // Ensures the div is centered on its coordinates
          }}
        />
      ))}
    </div>
  );
}
