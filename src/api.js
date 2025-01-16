import axios from "axios";

// Base API URL (backend URL from Netlify environment variables)
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Add Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// User Login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response.data;
  }
};

// Fetch Market Data
export const getMarketData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/market`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    throw error.response.data;
  }
};

// Fetch Wallet Data
export const getWalletData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wallet`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch wallet data:", error);
    throw error.response.data;
  }
};

// Buy Crypto
export const buyCrypto = async (crypto, amount) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/trade/buy`,
      { crypto, amount },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to buy crypto:", error);
    throw error.response.data;
  }
};

// Sell Crypto
export const sellCrypto = async (crypto, amount) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/trade/sell`,
      { crypto, amount },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to sell crypto:", error);
    throw error.response.data;
  }
};

// Subscribe to a Plan
export const subscribe = async (plan) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/subscription`,
      { plan },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to subscribe:", error);
    throw error.response.data;
  }
};

// Fetch Notifications
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw error.response.data;
  }
};

// Fetch Portfolio Data
export const getPortfolio = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolio`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    throw error.response.data;
  }
};
