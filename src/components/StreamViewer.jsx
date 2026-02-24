import React from "react";

export default function StreamViewer({ ip, isOnline }) {
  // Use the backend relay URL instead of direct IP
  const relayUrl = "https://finalyearproject-backend-8yev.onrender.com/api/motion/live";

  if (!isOnline) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "var(--text-secondary)"
      }}>
        <p style={{ fontSize: "2rem" }}>📡</p>
        <p>WAITING FOR SIGNAL...</p>
      </div>
    );
  }

  return (
    <img
      src={relayUrl}
      alt="CCTV Live Feed"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
      onError={(e) => {
        console.error("Stream relay failed.");
        // Optional: fallback or retry logic
      }}
    />
  );
}
