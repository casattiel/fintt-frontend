import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to FINTT Broker</h1>
      <p className="text-lg mb-6">Trade with zero commissions. The future is now!</p>
      <div className="space-x-4">
        <Link to="/market" className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
          View Market
        </Link>
        <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
