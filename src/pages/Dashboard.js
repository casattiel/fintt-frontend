import React, { useEffect, useState } from "react";
import { fetchMarketData } from "../api";

function Dashboard() {
    const [wallets, setWallets] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDashboardData() {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
                if (!token) {
                    throw new Error("Unauthorized: Please log in to view your dashboard.");
                }

                // Fetch wallet data
                const walletResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wallet`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!walletResponse.ok) {
                    const walletError = await walletResponse.json();
                    throw new Error(walletError.detail || "Failed to fetch wallet data.");
                }
                const walletData = await walletResponse.json();
                setWallets(walletData.wallets || []);

                // Fetch market data
                const marketData = await fetchMarketData();
                setMarketData(marketData.slice(0, 5)); // Show top 5 cryptos
            } catch (err) {
                setError(err.message || "An error occurred while loading your dashboard.");
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div>Loading your dashboard...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard-page">
            <h1>Welcome to Your Dashboard</h1>
            <div className="dashboard-section">
                <h2>Your Wallets</h2>
                <table className="wallet-table">
                    <thead>
                        <tr>
                            <th>Wallet Type</th>
                            <th>Balance (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((wallet, index) => (
                            <tr key={index}>
                                <td>{wallet.type}</td>
                                <td>{parseFloat(wallet.balance).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="dashboard-section">
                <h2>Market Highlights</h2>
                <table className="market-table">
                    <thead>
                        <tr>
                            <th>Cryptocurrency</th>
                            <th>Last Price (USD)</th>
                            <th>Bid (USD)</th>
                            <th>Ask (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marketData.map((crypto, index) => (
                            <tr key={index}>
                                <td>{crypto.crypto}</td>
                                <td>{parseFloat(crypto.last_price).toFixed(2)}</td>
                                <td>{parseFloat(crypto.bid).toFixed(2)}</td>
                                <td>{parseFloat(crypto.ask).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
