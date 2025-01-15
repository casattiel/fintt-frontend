import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trade = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [action, setAction] = useState('Buy');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/market`);
        setCryptos(Object.keys(response.data));
      } catch (err) {
        setMessage('Failed to load cryptos. Please try again later.');
      }
    };
    fetchCryptos();
  }, []);

  const handleTrade = async () => {
    try {
      const endpoint = action === 'Buy' ? '/trade/buy' : '/trade/sell';
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
        user_id: 1, // Replace with dynamic user ID
        crypto: selectedCrypto,
        amount: parseFloat(amount),
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('Failed to process the trade. Please try again.');
    }
  };

  useEffect(() => {
    if (selectedCrypto) {
      const fetchPrice = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/market`);
          setPrice(parseFloat(response.data[selectedCrypto]?.ask || 0));
        } catch (err) {
          setPrice(0);
        }
      };
      fetchPrice();
    }
  }, [selectedCrypto]);

  useEffect(() => {
    setTotal((price * amount).toFixed(2));
  }, [price, amount]);

  return (
    <div>
      <h1>Trade Cryptocurrency</h1>
      <label>
        Action:
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
      </label>
      <br />
      <label>
        Cryptocurrency:
        <select value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
          <option value="">Select a cryptocurrency</option>
          {cryptos.map((crypto) => (
            <option key={crypto} value={crypto}>
              {crypto}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
      </label>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Total: ${total}</p>
      <button onClick={handleTrade}>{action}</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Trade;
