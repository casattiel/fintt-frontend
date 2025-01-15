import React, { useEffect, useState } from "react";
import { getMarketData } from "../api";

const Market = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarketData();
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching market data:", err);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading market data...</p>;

  return (
    <div className="market-container">
      <h2>Market Data</h2>
      <ul>
        {Object.entries(marketData).map(([crypto, info], index) => (
          <li key={index}>
            <strong>{crypto}</strong>: ${info.last_trade} (Bid: ${info.bid}, Ask: ${info.ask})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Market;
