import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to FINTT
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your gateway to commission-free cryptocurrency trading.
      </p>
      <button
        onClick={() => navigate("/market")}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-lg shadow hover:bg-blue-600"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
