import React, { useEffect, useState } from "react";

function Wallet() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWalletData() {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
                if (!token) {
                    throw new Error("Unauthorized: Please log in to view wallet data.");
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wallet`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Failed to fetch wallet data.");
                }

                const data = await response.json();
                setWallets(data.wallets || []);
            } catch (err) {
                setError(err.message || "An error occurred while fetching wallet data.");
            } finally {
                setLoading(false);
            }
        }

        fetchWalletData();
    }, []);

    if (loading) {
        return <div>Loading wallet data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="wallet-page">
            <h1>Your Wallets</h1>
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
    );
}

export default Wallet;
