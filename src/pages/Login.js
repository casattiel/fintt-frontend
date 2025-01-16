import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await login(email, password);
            console.log("Login successful:", response);

            // Save user info to local storage (if needed)
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            // Redirect to dashboard
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1>Login to FINTT</h1>
            <div className="login-form">
                <label>
                    Email Address:
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    className="login-button"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <div className="error">{error}</div>}
            </div>
            <p>
                Don't have an account?{" "}
                <a href="/register" className="link">
                    Register here
                </a>
            </p>
        </div>
    );
}

export default Login;
