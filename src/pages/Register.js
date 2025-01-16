import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            await register(email, password);
            setSuccess("Registration successful! You can now log in.");
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create an Account</h1>
                <form onSubmit={handleRegister}>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <button type="submit" className="auth-button">
                        Register
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        Already have an account?{" "}
                        <span
                            className="auth-link"
                            onClick={() => navigate("/login")}
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
