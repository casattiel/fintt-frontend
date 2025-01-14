import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-subscription`, {
        email,
        paymentMethodId: paymentMethod.id,
      });

      setMessage(response.data.message || "Subscription successful!");
    } catch (err) {
      setMessage(err.response?.data?.detail || "Subscription failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <div className="mb-4">
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Card Details:</label>
        <CardElement className="p-2 border rounded" />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200"
      >
        Subscribe
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
}

export default CheckoutForm;
