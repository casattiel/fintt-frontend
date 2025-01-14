import axios from "axios";

// Create an Axios instance with the base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Calls
export const login = async (email, password) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await API.post("/register", { name, email, password });
  return response.data;
};

export const getDashboardData = async (userId) => {
  const response = await API.get(`/dashboard?user_id=${userId}`);
  return response.data;
};
