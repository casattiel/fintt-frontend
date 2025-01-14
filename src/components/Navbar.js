import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">FINTT</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/market" className="hover:underline">
            Market
          </Link>
          <Link to="/trade" className="hover:underline">
            Trade
          </Link>
          <Link to="/portfolio" className="hover:underline">
            Portfolio
          </Link>
          <Link to="/orderbook" className="hover:underline">
            Order Book
          </Link>
          <Link to="/transactions" className="hover:underline">
            Transactions
          </Link>
          <Link to="/subscription" className="hover:underline">
            Subscription
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
