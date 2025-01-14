import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold mb-6">Welcome to FINTT Broker</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Trade with zero commissions. Manage your portfolio, trade cryptocurrencies, and track your investments with the most advanced tools available.
      </p>

      {/* Call-to-Actions */}
      <div className="flex space-x-4 mb-10">
        <Link
          to="/register"
          className="bg-green-500 px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-blue-700 px-6 py-3 rounded-lg text-lg hover:bg-blue-800 transition duration-300"
        >
          Login
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-white text-blue-500 p-8 rounded-lg shadow-lg w-11/12 max-w-4xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Why Choose FINTT Broker?</h2>
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span>
            Trade cryptocurrencies with zero commissions.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span>
            Access real-time market data and analytics.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span>
            Manage your portfolio and track performance easily.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span>
            Secure wallets for hot and cold storage.
          </li>
          <li className="flex items-center">
            <span className="text-green-500 font-bold mr-2">✔</span>
            Advanced trading tools powered by the Kraken API.
          </li>
        </ul>
      </div>

      {/* Footer or Additional Links */}
      <div className="mt-10">
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-blue-300">
            Login
          </Link>{" "}
          to start trading now.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
