import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await register(email, password);
            console.log("Registration successful:", response);

            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
        } catch (err) {
            setError(err.message || "An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <h1>Register for FINTT</h1>
            <div className="register-form">
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
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button
                    className="register-button"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
            </div>
            <p>
                Already have an account?{" "}
                <a href="/login" className="link">
                    Login here
                </a>
            </p>
        </div>
    );
}

export default Register;
