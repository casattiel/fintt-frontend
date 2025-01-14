import React, { useState, useEffect } from "react";
import axios from "axios";

const Trade = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

  // Fetch supported cryptocurrencies
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/market");
        if (Array.isArray(response.data)) {
          setCryptos(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Failed to fetch cryptos:", error);
        setCryptos([]); // Handle error gracefully
      }
    };
    fetchCryptos();
  }, []);

  const handleCryptoChange = async (crypto) => {
    setSelectedCrypto(crypto);
    if (crypto) {
      try {
        const response = await axios.get(
          `http://localhost:8000/market?crypto=${crypto}`
        );
        setPrice(response.data.price || 0); // Fetch real-time price
      } catch (error) {
        console.error("Failed to fetch crypto price:", error);
        setPrice(0);
      }
    }
  };

  const handleBuy = async () => {
    if (!selectedCrypto || amount <= 0) {
      setMessage("Please select a crypto and enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/trade/buy", {
        crypto: selectedCrypto,
        amount,
        user_id: 1, // Replace with dynamic user ID
      });

      setMessage(`Successfully purchased ${amount} ${selectedCrypto}.`);
      setAmount(0);
      setTotal(0);
    } catch (error) {
      console.error("Failed to execute trade:", error);
      setMessage("Failed to complete the purchase. Please try again.");
    }
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    setTotal((value * price).toFixed(2));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trade Cryptocurrency</h2>
      <div>
        <label>Action:</label>
        <select>
          <option value="Buy">Buy</option>
          {/* Add "Sell" if needed */}
        </select>
      </div>
      <div>
        <label>Cryptocurrency:</label>
        <select
          value={selectedCrypto}
          onChange={(e) => handleCryptoChange(e.target.value)}
        >
          <option value="">Select a cryptocurrency</option>
          {cryptos.length > 0 ? (
            cryptos.map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))
          ) : (
            <option value="">No cryptocurrencies available</option>
          )}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
      </div>
      <div>
        <p>Price: ${price}</p>
        <p>Total: ${total}</p>
      </div>
      <button onClick={handleBuy}>Buy</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Trade;
