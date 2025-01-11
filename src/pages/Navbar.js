import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-lg">
          FINTT
        </Link>
        <div>
          <Link to="/login" className="px-4">
            Login
          </Link>
          <Link to="/register" className="px-4">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
