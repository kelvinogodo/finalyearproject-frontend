import React from "react";

export default function MotionAlert({ message }) {
  return (
    <div className="glass-panel" style={{
      padding: "12px 20px",
      borderLeft: "4px solid var(--accent-red)",
      background: "rgba(255, 75, 92, 0.1)",
      animation: "pulse 2s infinite"
    }}>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 75, 92, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 75, 92, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 75, 92, 0); }
        }
      `}</style>
      <h4 style={{ margin: "0 0 4px 0", color: "var(--accent-red)", fontSize: "0.9rem" }}>🚨 SECURITY ALERT</h4>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "white" }}>{message}</p>
    </div>
  );
}
