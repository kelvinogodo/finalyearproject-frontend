import React, { useState } from "react";
import { sendTimeControl } from "../utils/api";

export default function TimeControlForm() {
  const [times, setTimes] = useState({
    startHour: 22,
    startMinute: 0,
    endHour: 6,
    endMinute: 0,
  });

  const handleChange = (e) => {
    setTimes({ ...times, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendTimeControl(times)
      .then(() => alert("⏱️ Monitoring schedule updated!"))
      .catch((err) => console.error("Failed to update schedule:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <label className="control-label">Active Monitoring Window</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          <div>
            <label style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>START</label>
            <input type="number" name="startHour" value={times.startHour} onChange={handleChange} min="0" max="23" placeholder="HH" />
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>END</label>
            <input type="number" name="endHour" value={times.endHour} onChange={handleChange} min="0" max="23" placeholder="HH" />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary" style={{ width: "100%" }}>
        SYNC TO CAMERA
      </button>
    </form>
  );
}
