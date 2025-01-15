import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/portfolio`, {
          params: { user_id: 1 }, // Replace with dynamic user ID
        });
        setPortfolio(response.data.portfolio);
        setTotalValue(response.data.total_value);
      } catch (err) {
        setError('Failed to fetch portfolio data. Please try again later.');
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div>
      <h1>Your Portfolio</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Total Value: ${totalValue.toFixed(2)}</p>
      <table>
        <thead>
          <tr>
            <th>Crypto</th>
            <th>Amount</th>
            <th>Value (USD)</th>
            <th>Allocation (%)</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item) => (
            <tr key={item.crypto}>
              <td>{item.crypto}</td>
              <td>{item.amount}</td>
              <td>${item.value.toFixed(2)}</td>
              <td>{item.allocation.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
