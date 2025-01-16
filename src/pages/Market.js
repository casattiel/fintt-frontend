import React, { useEffect, useState } from "react";
import { fetchMarketData } from "../api";

function Market() {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getMarketData() {
            try {
                const data = await fetchMarketData();
                setMarketData(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch market data. Please try again.");
                setLoading(false);
            }
        }

        getMarketData();
    }, []);

    if (loading) {
        return <div>Loading market data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="market-page">
            <h1>Market Prices</h1>
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
    );
}

export default Market;
