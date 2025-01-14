import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [wallet, setWallet] = useState({ type: "", balance: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/wallets/hot?user_id=1`
        );
        setWallet(response.data);
      } catch (error) {
        setError("Failed to fetch wallet details.");
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold">Wallet Details</h2>
          <p>Wallet Type: {wallet.type}</p>
          <p>Balance: ${wallet.balance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
