import React, { useState } from "react";
import { buyCrypto, sellCrypto } from "../api";

const Trade = () => {
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTrade = async (type) => {
    const token = localStorage.getItem("token");
    try {
      const response =
        type === "buy"
          ? await buyCrypto(token, crypto, amount)
          : await sellCrypto(token, crypto, amount);
      setMessage(response.message);
    } catch (err) {
      setMessage("Error processing the trade. Please try again.");
    }
  };

  return (
    <div className="trade-container">
      <h2>Trade Cryptocurrency</h2>
      <input
        type="text"
        placeholder="Crypto (e.g., BTC)"
        value={crypto}
        onChange={(e) => setCrypto(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={() => handleTrade("buy")}>Buy</button>
      <button onClick={() => handleTrade("sell")}>Sell</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Trade;
