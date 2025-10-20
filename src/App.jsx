import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getStream } from "./utils/api";
import StreamViewer from "./components/StreamViewer";
import MotionAlert from "./components/MotionAlert";
import TimeControlForm from "./components/TimeControlForm";

const socket = io("https://finalyearproject-backend-8yev.onrender.com"); // connect to backend

export default function App() {
  const [streamIP, setStreamIP] = useState(null);
  const [motion, setMotion] = useState(null);

  useEffect(() => {
    // Fetch initial stream IP
    getStream()
      .then((data) => {
        if (data.stream_ip) setStreamIP(data.stream_ip);
      })
      .catch(() => console.log("No stream available yet."));

    // Listen for motion events
    socket.on("motion_detected", (data) => {
      console.log("⚠️ Motion detected:", data);
      setMotion(data.message);
    });

    // Listen for stream updates
    socket.on("stream_update", (data) => {
      console.log("📡 Stream update:", data);
      setStreamIP(data.ip);
    });

    return () => {
      socket.off("motion_detected");
      socket.off("stream_update");
    };
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>📷 ESP32-CAM Dashboard</h1>
      <p>Status: {streamIP ? "Streaming Active" : "Waiting for stream..."}</p>

      {motion && <MotionAlert message={motion} />}
      <StreamViewer ip={streamIP} />
      <TimeControlForm />
    </div>
  );
}
