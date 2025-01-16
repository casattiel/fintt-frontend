import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await login(email, password);
            navigate("/dashboard"); // Redirect to dashboard after login
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login to FINTT</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        Don't have an account?{" "}
                        <span
                            className="auth-link"
                            onClick={() => navigate("/register")}
                        >
                            Register here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
