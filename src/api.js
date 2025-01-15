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

// Authentication
export const login = async (email, password) => {
  const response = await API.post("/login", { email, password });
  return response.data;
};

export const register = async (name, email, password, country) => {
  const response = await API.post("/register", { name, email, password, country });
  return response.data;
};

// Market Data
export const getMarketData = async () => {
  const response = await API.get("/market");
  return response.data;
};

// Trade Crypto
export const buyCrypto = async (userId, crypto, amount) => {
  const response = await API.post("/trade/buy", { user_id: userId, crypto, amount });
  return response.data;
};

export const sellCrypto = async (userId, crypto, amount) => {
  const response = await API.post("/trade/sell", { user_id: userId, crypto, amount });
  return response.data;
};

// Portfolio
export const getPortfolio = async (userId) => {
  const response = await API.get(`/portfolio?user_id=${userId}`);
  return response.data;
};

// Wallet Management
export const getWallet = async (userId, type) => {
  const response = await API.get(`/wallet?user_id=${userId}&type=${type}`);
  return response.data;
};

export const addFundsToWallet = async (userId, amount, type) => {
  const response = await API.post("/wallet/add", { user_id: userId, amount, type });
  return response.data;
};

// Subscription
export const subscribePlan = async (email, plan) => {
  const response = await API.post("/subscription", { email, plan });
  return response.data;
};

// Order Book
export const getOrderBook = async (crypto) => {
  const response = await API.get(`/orderbook?crypto=${crypto}`);
  return response.data;
};

// Transactions
export const getTransactions = async (userId) => {
  const response = await API.get(`/transactions?user_id=${userId}`);
  return response.data;
};
