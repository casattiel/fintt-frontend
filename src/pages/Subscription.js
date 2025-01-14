import React from "react";
import axios from "axios";

const Subscription = () => {
  const handleSubscription = async (priceId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/stripe/create-checkout-session`, {
        priceId,
      });
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      alert("Failed to initiate subscription. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Plan */}
        <div className="border rounded-lg p-4 shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Basic Plan</h2>
          <p className="mt-2 text-gray-600">$30/month</p>
          <button
            onClick={() => handleSubscription("price_1QfOCFuzFSWK4L_BASIC")} // Replace with your actual Basic plan price ID
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Subscribe to Basic
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border rounded-lg p-4 shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold">Premium Plan</h2>
          <p className="mt-2 text-gray-600">$70/month</p>
          <button
            onClick={() => handleSubscription("price_1QfOCFuzFSWK4L_PREMIUM")} // Replace with your actual Premium plan price ID
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Subscribe to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
