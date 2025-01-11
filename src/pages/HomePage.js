import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to FINTT Broker</h1>
      <p className="text-lg mb-4">Trade with zero commissions. The future is now!</p>
      <div>
        <Link to="/register" className="px-6 py-2 bg-green-500 rounded-lg mr-4">
          Register
        </Link>
        <Link to="/login" className="px-6 py-2 bg-blue-500 rounded-lg">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
