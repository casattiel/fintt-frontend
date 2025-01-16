import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Trade from "./pages/Trade";
import Subscription from "./pages/Subscription";
import Wallet from "./pages/Wallet";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Portfolio from "./pages/Portfolio";
import { checkSubscription } from "./api";

function App() {
    const isAuthenticated = !!localStorage.getItem("token"); // Check if user is authenticated
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            checkSubscription()
                .then((response) => {
                    setIsSubscribed(response.isActive); // Backend should return `isActive` as part of subscription status
                })
                .catch((err) => {
                    console.error("Error checking subscription:", err.message);
                    setIsSubscribed(false);
                });
        }
    }, [isAuthenticated]);

    // Protected Route Wrapper
    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        return children;
    };

    // Subscription Protected Route Wrapper
    const SubscriptionProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        if (!isSubscribed) {
            return <Navigate to="/subscription" replace />;
        }

        return children;
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/market"
                    element={
                        <ProtectedRoute>
                            <Market />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/trade"
                    element={
                        <SubscriptionProtectedRoute>
                            <Trade />
                        </SubscriptionProtectedRoute>
                    }
                />
                <Route
                    path="/wallet"
                    element={
                        <ProtectedRoute>
                            <Wallet />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/portfolio"
                    element={
                        <SubscriptionProtectedRoute>
                            <Portfolio />
                        </SubscriptionProtectedRoute>
                    }
                />
                <Route
                    path="/subscription"
                    element={
                        <ProtectedRoute>
                            <Subscription />
                        </ProtectedRoute>
                    }
                />

                {/* Catch-All Route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
