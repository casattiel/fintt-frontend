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
    } catch (error) {
      setMessage("Error processing the trade. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Trade Cryptocurrency</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Crypto (e.g., BTC)"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => handleTrade("buy")}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Buy
          </button>
          <button
            onClick={() => handleTrade("sell")}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sell
          </button>
        </div>
        {message && <p className="text-center text-lg mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Trade;
