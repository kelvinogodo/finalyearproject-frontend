import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getStream } from "./utils/api";
import StreamViewer from "./components/StreamViewer";
import MotionAlert from "./components/MotionAlert";
import TimeControlForm from "./components/TimeControlForm";
import { requestForToken, onMessageListener } from "./firebase-config";

const socket = io("https://finalyearproject-backend-8yev.onrender.com");

export default function App() {
  const [streamIP, setStreamIP] = useState(null);
  const [motion, setMotion] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    // 🔔 Request notification permission and get token
    requestForToken();

    // 📩 Listen for notifications in foreground
    onMessageListener()
      .then((payload) => {
        console.log("🔥 Notification Received:", payload);
        // You could handle custom UI alerts here if needed
      })
      .catch((err) => console.log("failed: ", err));

    // Fetch initial status
    getStream()
      .then((data) => {
        if (data.stream_ip) {
          setStreamIP(data.stream_ip);
          setIsOnline(true);
        }
      })
      .catch(() => setIsOnline(false));

    socket.on("motion_detected", (data) => {
      setMotion(data.message);

      // Update snapshots gallery (keep last 3)
      if (data.snapshotUrl) {
        setSnapshots(prev => {
          const newSnaps = [{
            url: data.snapshotUrl,
            time: new Date(data.timestamp).toLocaleTimeString()
          }, ...prev];
          return newSnaps.slice(0, 3);
        });
      }

      // Auto-clear motion alert after 10 seconds
      setTimeout(() => setMotion(null), 10000);
    });

    socket.on("stream_update", (data) => {
      setStreamIP(data.ip);
      setIsOnline(true);
    });

    return () => {
      socket.off("motion_detected");
      socket.off("stream_update");
    };
  }, []);

  return (
    <div className="dashboard-container">
      <div className="main-view">
        <header style={{ marginBottom: "32px" }}>
          <h1 className="neon-text" style={{ fontSize: "2.5rem", margin: "0 0 8px 0" }}>
            ELITE SURVEILLANCE
          </h1>
          <div className="status-badge" style={{ borderColor: isOnline ? "#00f2ff" : "#ff4b5c", color: isOnline ? "#00f2ff" : "#ff4b5c" }}>
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isOnline ? "#00f2ff" : "#ff4b5c",
              display: "inline-block",
              marginRight: "8px",
              boxShadow: isOnline ? "0 0 8px #00f2ff" : "none"
            }}></span>
            {isOnline ? "SYSTEM ACTIVE" : "SYSTEM OFFLINE"}
          </div>
        </header>

        <section className="glass-panel" style={{ padding: "0", position: "relative" }}>
          <div className="cctv-monitor">
            <div className="cctv-overlay"></div>
            <StreamViewer ip={streamIP} isOnline={isOnline} />
            {motion && (
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 10
              }}>
                <MotionAlert message={motion} />
              </div>
            )}
          </div>
        </section>
      </div>

      <aside className="sidebar">
        <div className="glass-panel" style={{ padding: "24px", marginBottom: "24px" }}>
          <h3 className="neon-text" style={{ marginTop: "0", fontSize: "1rem" }}>EVIDENCE LOG</h3>
          <div style={{ display: "grid", gap: "12px" }}>
            {snapshots.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                No snapshots captured yet.
              </p>
            ) : (
              snapshots.map((snap, idx) => (
                <div key={idx} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--glass-border)" }}>
                  <img src={snap.url} alt={`Evidence ${idx}`} style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    background: "rgba(0,0,0,0.7)",
                    padding: "4px 8px",
                    fontSize: "0.7rem",
                    color: "var(--accent-cyan)",
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <span>MOTION DETECTED</span>
                    <span>{snap.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "24px", marginBottom: "24px" }}>
          <h3 className="neon-text" style={{ marginTop: "0", fontSize: "1rem" }}>UNIT SETTINGS</h3>
          <TimeControlForm />
        </div>

        <div className="glass-panel" style={{ padding: "24px" }}>
          <h3 className="neon-text" style={{ marginTop: "0", fontSize: "1rem" }}>SYSTEM LOGS</h3>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxHeight: "150px", overflowY: "auto" }}>
            <p style={{ borderLeft: "2px solid var(--accent-cyan)", paddingLeft: "10px", margin: "8px 0" }}>
              [{new Date().toLocaleTimeString()}] Secure link established...
            </p>
            {streamIP && (
              <p style={{ borderLeft: "2px solid var(--accent-cyan)", paddingLeft: "10px", margin: "8px 0" }}>
                [{new Date().toLocaleTimeString()}] IP detected: {streamIP}
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
