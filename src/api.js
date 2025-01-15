import axios from "axios";

// Create an Axios instance with the base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Set in your environment variables
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
  try {
    const response = await API.post("/login", { email, password });
    return response.data; // Expected response includes { token: <JWT>, user: <user_details> }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (name, email, password, country) => {
  try {
    const response = await API.post("/register", { name, email, password, country });
    return response.data; // Expected response includes a success message
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Market Data
export const getMarketData = async () => {
  try {
    const response = await API.get("/market");
    return response.data; // Expected response includes crypto data like ask, bid, last_trade
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Trade Crypto
export const buyCrypto = async (userId, crypto, amount) => {
  try {
    const response = await API.post("/trade/buy", { user_id: userId, crypto, amount });
    return response.data; // Expected response includes confirmation of purchase
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const sellCrypto = async (userId, crypto, amount) => {
  try {
    const response = await API.post("/trade/sell", { user_id: userId, crypto, amount });
    return response.data; // Expected response includes confirmation of sale
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Portfolio
export const getPortfolio = async (userId) => {
  try {
    const response = await API.get(`/portfolio?user_id=${userId}`);
    return response.data; // Expected response includes user portfolio details
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Wallet Management
export const getWallet = async (userId, type) => {
  try {
    const response = await API.get(`/wallet?user_id=${userId}&type=${type}`);
    return response.data; // Expected response includes wallet details
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const addFundsToWallet = async (userId, amount, type) => {
  try {
    const response = await API.post("/wallet/add", { user_id: userId, amount, type });
    return response.data; // Expected response includes confirmation of funds addition
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Subscription
export const subscribePlan = async (email, plan) => {
  try {
    const response = await API.post("/subscription", { email, plan });
    return response.data; // Expected response includes subscription confirmation
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Order Book
export const getOrderBook = async (crypto) => {
  try {
    const response = await API.get(`/orderbook?crypto=${crypto}`);
    return response.data; // Expected response includes order book details for the crypto
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Transactions
export const getTransactions = async (userId) => {
  try {
    const response = await API.get(`/transactions?user_id=${userId}`);
    return response.data; // Expected response includes transaction history
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
