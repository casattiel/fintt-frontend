import React, { useEffect, useState } from "react";

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(1); // Example user ID; replace with actual user authentication logic
  const [walletType, setWalletType] = useState("hot");

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/wallet?user_id=${userId}&type=${walletType}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wallet data");
        }
        const data = await response.json();
        setWallet(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchWallet();
  }, [userId, walletType]);

  return (
    <div className="container">
      <h2>Your Wallet</h2>
      <div>
        <label htmlFor="walletType">Select Wallet Type:</label>
        <select
          id="walletType"
          value={walletType}
          onChange={(e) => setWalletType(e.target.value)}
        >
          <option value="hot">Hot Wallet</option>
          <option value="cold">Cold Wallet</option>
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {wallet ? (
        <div className="wallet-details">
          <h3>Wallet Details</h3>
          <p>
            <strong>Balance:</strong> ${wallet.balance || 0}
          </p>
          <p>
            <strong>Last Updated:</strong> {wallet.last_updated || "N/A"}
          </p>
        </div>
      ) : (
        <p>Loading wallet data...</p>
      )}
    </div>
  );
};

export default Wallet;
