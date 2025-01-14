import React, { useState, useEffect } from "react";
import axios from "axios";

function Wallet() {
  const [wallets, setWallets] = useState({ hot: null, cold: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const responseHot = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/wallet?user_id=1&type=hot`
        );
        const responseCold = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/wallet?user_id=1&type=cold`
        );
        setWallets({ hot: responseHot.data, cold: responseCold.data });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching wallet data:", err);
        setError("Failed to load wallet data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const handleDeposit = async () => {
    if (!depositAmount || depositAmount <= 0) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/wallet/deposit`,
        {
          user_id: 1, // Replace with dynamic user ID
          amount: parseFloat(depositAmount),
        }
      );
      setMessage(response.data.message);
      setDepositAmount(""); // Clear the input field

      // Refresh wallet data
      const updatedHot = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/wallet?user_id=1&type=hot`
      );
      setWallets((prev) => ({ ...prev, hot: updatedHot.data }));
    } catch (err) {
      console.error("Error processing deposit:", err);
      setMessage("Failed to process deposit. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Wallet Management</h1>
      {loading ? (
        <p>Loading wallet data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Hot Wallet</h2>
            <p>Balance: ${wallets.hot?.balance.toFixed(2)}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Cold Wallet</h2>
            <p>Balance: ${wallets.cold?.balance.toFixed(2)}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Deposit Funds</h2>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="border rounded px-4 py-2 w-full mb-4"
              placeholder="Enter amount to deposit"
            />
            <button
              onClick={handleDeposit}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Deposit
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
