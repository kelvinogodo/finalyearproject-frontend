import React, { useState } from "react";
import { sendTimeControl } from "../utils/api";

export default function TimeControlForm() {
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendTimeControl({ duration, start_time: startTime });
    alert("⏰ Time control command sent!");
    setDuration("");
    setStartTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <h3>Time Control</h3>
      <input
        type="number"
        placeholder="Duration (sec)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
        style={{ marginRight: "10px" }}
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Send Command</button>
    </form>
  );
}
