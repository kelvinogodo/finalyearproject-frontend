import React from "react";

export default function MotionAlert({ message }) {
  return (
    <div
      style={{
        backgroundColor: "#ffcccc",
        color: "#900",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "15px",
      }}
    >
      ⚠️ Motion Detected: {message}
    </div>
  );
}
