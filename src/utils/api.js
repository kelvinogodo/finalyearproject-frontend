import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getStream = async () => {
  const res = await axios.get(`${API_BASE_URL}/stream`);
  return res.data;
};

export const sendTimeControl = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/time-control`, payload);
  return res.data;
};
