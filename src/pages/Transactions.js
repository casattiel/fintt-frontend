import React, { useEffect, useState } from "react";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/transactions?user_id=1`
        );
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch transactions.");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Transaction History</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <ul>
            {transactions.map((txn, index) => (
              <li key={index} className="mb-2">
                {txn.action.toUpperCase()} {txn.amount} {txn.crypto} at ${txn.price} ({txn.timestamp})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Transactions;
