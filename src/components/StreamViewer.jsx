import React from "react";

export default function StreamViewer({ ip }) {
  if (!ip) return <p>❌ No stream available yet.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Live Stream</h3>
      <img
        src={ip}
        alt="ESP32-CAM Stream"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          border: "2px solid #ddd",
        }}
      />
    </div>
  );
}
