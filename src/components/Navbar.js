import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Market", path: "/market" },
    { name: "Trade", path: "/trade" },
    { name: "Wallet", path: "/wallet" },
    { name: "Subscription", path: "/subscription" },
  ];

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">FINTT</h1>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-white px-3 py-2 rounded-md ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
