import React, { useState } from "react";
import { subscribe } from "../api";

function Subscription() {
    const [selectedPlan, setSelectedPlan] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubscription = async () => {
        setMessage(null);
        setError(null);

        if (!selectedPlan) {
            setError("Please select a subscription plan.");
            return;
        }

        try {
            const response = await subscribe(selectedPlan);
            setMessage(`Successfully subscribed to the ${selectedPlan} plan.`);
        } catch (err) {
            setError(err.message || "An error occurred while subscribing.");
        }
    };

    return (
        <div className="subscription-page">
            <h1>Choose Your Plan</h1>
            <div className="subscription-options">
                <div
                    className={`subscription-card ${
                        selectedPlan === "Basic" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedPlan("Basic")}
                >
                    <h2>Basic Plan</h2>
                    <p>$30/month</p>
                </div>
                <div
                    className={`subscription-card ${
                        selectedPlan === "Premium" ? "selected" : ""
                    }`}
                    onClick={() => setSelectedPlan("Premium")}
                >
                    <h2>Premium Plan</h2>
                    <p>$70/month</p>
                </div>
            </div>
            <button className="subscribe-button" onClick={handleSubscription}>
                Subscribe
            </button>
            {message && <div className="subscription-success">{message}</div>}
            {error && <div className="subscription-error">{error}</div>}
        </div>
    );
}

export default Subscription;
