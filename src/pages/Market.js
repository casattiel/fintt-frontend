import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Market = () => {
  const [marketData, setMarketData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/market`);
        setMarketData(response.data);
      } catch (err) {
        setError('Failed to fetch market data. Please try again later.');
      }
    };
    fetchMarketData();
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Market</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Ask</th>
            <th>Bid</th>
            <th>Last Trade</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(marketData).map((pair) => (
            <tr key={pair}>
              <td>{pair}</td>
              <td>{marketData[pair].ask}</td>
              <td>{marketData[pair].bid}</td>
              <td>{marketData[pair].last_trade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
