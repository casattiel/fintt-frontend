import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Market from "./pages/Market";
import Trade from "./pages/Trade";
import Subscription from "./pages/Subscription";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import { checkSubscription } from "./api";

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("user"); // Replace with actual auth logic
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    React.useEffect(() => {
        async function verifySubscription() {
            try {
                const active = await checkSubscription();
                setIsSubscribed(active);
            } catch {
                setIsSubscribed(false);
            }
        }
        verifySubscription();
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!isSubscribed) {
        return <Navigate to="/subscription" />;
    }

    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
                <Route path="/trade" element={<ProtectedRoute><Trade /></ProtectedRoute>} />
                <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h1>404 - Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
