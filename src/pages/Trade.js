import React, { useState, useEffect } from "react";
import { getMarketData, buyCrypto, sellCrypto } from "../api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Trade = () => {
  const [marketData, setMarketData] = useState([]);
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const [action, setAction] = useState("buy");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMarketData = async () => {
      const data = await getMarketData();
      setMarketData(data);
    };
    fetchMarketData();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleTrade = async () => {
    if (!user) {
      setMessage("Please log in to trade.");
      return;
    }

    const token = await user.getIdToken();
    const data = { crypto, amount: parseFloat(amount), user_id: user.uid };

    try {
      const response = action === "buy" ? await buyCrypto(data, token) : await sellCrypto(data, token);
      setMessage(response.message);
    } catch (error) {
      setMessage("Failed to process trade. Please try again.");
    }
  };

  return (
    <div>
      <h1>Trade Cryptocurrency</h1>
      <select onChange={(e) => setAction(e.target.value)}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <select onChange={(e) => setCrypto(e.target.value)}>
        <option value="">Select a cryptocurrency</option>
        {Object.entries(marketData).map(([name, info]) => (
          <option key={info.pair} value={info.pair}>
            {name}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleTrade}>{action === "buy" ? "Buy" : "Sell"}</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Trade;
