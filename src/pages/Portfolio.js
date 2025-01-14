import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/portfolio?user_id=1`);
        const portfolioData = response.data.portfolio;
        let total = 0;

        const chartValues = {
          labels: [],
          datasets: [
            {
              label: "Portfolio Allocation",
              data: [],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        };

        portfolioData.forEach((asset) => {
          total += asset.value;
          chartValues.labels.push(asset.crypto.toUpperCase());
          chartValues.datasets[0].data.push(asset.value);
        });

        setPortfolio(portfolioData);
        setTotalValue(total);
        setChartData(chartValues);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Failed to load portfolio data. Please try again later.");
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
      {loading ? (
        <p>Loading portfolio data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Total Value: ${totalValue.toFixed(2)}</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <table className="min-w-full bg-white border rounded">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Crypto</th>
                    <th className="border px-4 py-2">Amount</th>
                    <th className="border px-4 py-2">Value (USD)</th>
                    <th className="border px-4 py-2">Allocation (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((asset) => (
                    <tr key={asset.crypto}>
                      <td className="border px-4 py-2">{asset.crypto.toUpperCase()}</td>
                      <td className="border px-4 py-2">{asset.amount}</td>
                      <td className="border px-4 py-2">${asset.value.toFixed(2)}</td>
                      <td className="border px-4 py-2">
                        {((asset.value / totalValue) * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <Pie data={chartData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Portfolio;
