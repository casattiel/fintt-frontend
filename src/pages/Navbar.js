import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">FINTT</Link>
      </div>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/register" className="hover:text-gray-300">
          Register
        </Link>
        <Link to="/login" className="hover:text-gray-300">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
