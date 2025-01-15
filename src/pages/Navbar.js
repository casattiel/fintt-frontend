import React from "react";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <nav>
      <h1>FINTT</h1>
      {auth.currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;
