import React, { useState } from "react";
import { buyCrypto, sellCrypto } from "../api";

const Trade = () => {
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState(0);
  const [action, setAction] = useState("buy");

  const handleTrade = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Retrieve user ID
    if (!userId) {
      alert("You must be logged in to trade.");
      return;
    }

    try {
      let response;
      if (action === "buy") {
        response = await buyCrypto(userId, crypto, amount);
      } else if (action === "sell") {
        response = await sellCrypto(userId, crypto, amount);
      }
      console.log(`${action} successful:`, response);
      alert(`${action.toUpperCase()} ${crypto} successful!`);
    } catch (error) {
      console.error("Trade failed:", error);
      alert("Trade failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Trade</h1>
      <form onSubmit={handleTrade}>
        <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
          <option value="">Select Crypto</option>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
          <option value="DOGE">Dogecoin</option>
          <option value="USDT">Tether</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button type="submit">Submit Trade</button>
      </form>
    </div>
  );
};

export default Trade;
