import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderBook = () => {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/orderbook?pair=BTC/USD`
        );
        const { bids, asks } = response.data;
        setBids(bids);
        setAsks(asks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order book data:", error);
        setLoading(false);
      }
    };

    // Fetch the order book every 5 seconds for real-time updates
    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Order Book (BTC/USD)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-green-500 text-xl font-bold mb-4">Bids</h2>
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-green-500">
                      ${bid.price.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{bid.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-red-500 text-xl font-bold mb-4">Asks</h2>
            <table className="min-w-full bg-white border rounded shadow">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {asks.map((ask, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-red-500">
                      ${ask.price.toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{ask.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderBook;
