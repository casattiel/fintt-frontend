import axios from "axios";

// Base API URL (from your environment variable)
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Axios instance with default settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token to requests if available
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API Methods

// Login API
export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/login", { email, password });
        return response.data; // Returns token and user info
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Login failed.");
    }
};

// Register API
export const register = async (email, password) => {
    try {
        const response = await apiClient.post("/register", { email, password });
        return response.data; // Returns success message
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Registration failed.");
    }
};

// Check Subscription
export const checkSubscription = async () => {
    try {
        const response = await apiClient.get("/subscription");
        return response.data; // Returns subscription status
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Unable to check subscription.");
    }
};

// Subscribe to a plan
export const subscribe = async (plan) => {
    try {
        const response = await apiClient.post("/subscription", { plan });
        return response.data; // Returns subscription confirmation
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Subscription failed.");
    }
};

// Fetch Market Data
export const fetchMarketData = async () => {
    try {
        const response = await apiClient.get("/market");
        return response.data; // Returns market data
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Failed to fetch market data.");
    }
};

// Buy Cryptocurrency
export const buyCrypto = async (crypto, amount) => {
    try {
        const response = await apiClient.post("/trade/buy", { crypto, amount });
        return response.data; // Returns trade confirmation
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Buy trade failed.");
    }
};

// Sell Cryptocurrency
export const sellCrypto = async (crypto, amount) => {
    try {
        const response = await apiClient.post("/trade/sell", { crypto, amount });
        return response.data; // Returns trade confirmation
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Sell trade failed.");
    }
};

// Fetch Wallet Data
export const fetchWallet = async () => {
    try {
        const response = await apiClient.get("/wallet");
        return response.data; // Returns wallet data
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Failed to fetch wallet data.");
    }
};

// Fetch Portfolio Data
export const fetchPortfolio = async () => {
    try {
        const response = await apiClient.get("/portfolio");
        return response.data; // Returns portfolio data
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Failed to fetch portfolio data.");
    }
};

// Fetch Notifications
export const fetchNotifications = async () => {
    try {
        const response = await apiClient.get("/notifications");
        return response.data; // Returns notifications
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Failed to fetch notifications.");
    }
};

// Logout (clears local storage and token)
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export default apiClient;
