// src/api.js
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Utility function to get the Firebase token
async function getToken() {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored in localStorage
    if (user && user.token) {
        return user.token;
    }
    throw new Error("Unauthorized: No valid user token found");
}

// Fetch Market Data
export async function fetchMarketData() {
    try {
        const response = await fetch(`${BACKEND_URL}/market`);
        if (!response.ok) {
            throw new Error("Failed to fetch market data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching market data:", error);
        throw error;
    }
}

// Buy Cryptocurrency
export async function buyCrypto(crypto, amount) {
    const token = await getToken();
    try {
        const response = await fetch(`${BACKEND_URL}/trade/buy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ crypto, amount }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error buying crypto");
        }
        return await response.json();
    } catch (error) {
        console.error("Error buying crypto:", error);
        throw error;
    }
}

// Sell Cryptocurrency
export async function sellCrypto(crypto, amount) {
    const token = await getToken();
    try {
        const response = await fetch(`${BACKEND_URL}/trade/sell`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ crypto, amount }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error selling crypto");
        }
        return await response.json();
    } catch (error) {
        console.error("Error selling crypto:", error);
        throw error;
    }
}

// Subscribe to a Plan
export async function subscribe(plan) {
    const token = await getToken();
    try {
        const response = await fetch(`${BACKEND_URL}/subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ plan }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error subscribing to plan");
        }
        return await response.json();
    } catch (error) {
        console.error("Error subscribing to plan:", error);
        throw error;
    }
}

// Check Active Subscription
export async function checkSubscription() {
    const token = await getToken();
    try {
        const response = await fetch(`${BACKEND_URL}/subscription/check`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.ok; // Returns true if subscription is active
    } catch (error) {
        console.error("Error checking subscription:", error);
        throw error;
    }
}
