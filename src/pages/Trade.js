import React, { useState } from "react";
import { buyCrypto, sellCrypto } from "../api";

function Trade() {
    const [crypto, setCrypto] = useState("");
    const [amount, setAmount] = useState("");
    const [tradeType, setTradeType] = useState(""); // "buy" or "sell"
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleTrade = async (type) => {
        setTradeType(type);
        setMessage(null);
        setError(null);

        if (!crypto || !amount) {
            setError("Please fill in all fields");
            return;
        }

        if (amount <= 0) {
            setError("Amount must be greater than zero");
            return;
        }

        try {
            if (type === "buy") {
                const response = await buyCrypto(crypto, parseFloat(amount));
                setMessage(`Successfully bought ${amount} ${crypto}.`);
            } else if (type === "sell") {
                const response = await sellCrypto(crypto, parseFloat(amount));
                setMessage(`Successfully sold ${amount} ${crypto}.`);
            }
        } catch (err) {
            setError(err.message || "An error occurred while processing the trade.");
        }
    };

    return (
        <div className="trade-page">
            <h1>Trade Cryptocurrency</h1>
            <div className="trade-form">
                <label>
                    Cryptocurrency Symbol (e.g., BTC, ETH):
                    <input
                        type="text"
                        value={crypto}
                        onChange={(e) => setCrypto(e.target.value.toUpperCase())}
                        placeholder="Enter symbol (e.g., BTC)"
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                </label>
                <div className="trade-buttons">
                    <button
                        className="buy-button"
                        onClick={() => handleTrade("buy")}
                    >
                        Buy
                    </button>
                    <button
                        className="sell-button"
                        onClick={() => handleTrade("sell")}
                    >
                        Sell
                    </button>
                </div>
            </div>

            {message && <div className="trade-success">{message}</div>}
            {error && <div className="trade-error">{error}</div>}
        </div>
    );
}

export default Trade;
