import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Trade from "./pages/Trade";
import Wallet from "./pages/Wallet";
import Notifications from "./pages/Notifications";
import Market from "./pages/Market";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/market" element={<Market />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
