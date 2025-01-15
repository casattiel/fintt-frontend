import axios from "axios";

// Base URL for backend API
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Auth API
export const login = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post("/register", { email, password });
  return response.data;
};

// Market API
export const getMarketData = async () => {
  const response = await api.get("/market");
  return response.data;
};

// Trade API
export const buyCrypto = async (token, crypto, amount) => {
  const response = await api.post(
    "/trade/buy",
    { crypto, amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const sellCrypto = async (token, crypto, amount) => {
  const response = await api.post(
    "/trade/sell",
    { crypto, amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Wallet API
export const getWalletBalance = async (token) => {
  const response = await api.get("/wallet/balance", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
