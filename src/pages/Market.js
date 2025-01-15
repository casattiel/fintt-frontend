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
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading market data...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Market</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Crypto</th>
            <th className="px-4 py-2 text-left text-gray-600">Last Price</th>
            <th className="px-4 py-2 text-left text-gray-600">Bid</th>
            <th className="px-4 py-2 text-left text-gray-600">Ask</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(marketData).map(([crypto, info], index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-t">{crypto}</td>
              <td className="px-4 py-2 border-t">${info.last_trade}</td>
              <td className="px-4 py-2 border-t">${info.bid}</td>
              <td className="px-4 py-2 border-t">${info.ask}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
