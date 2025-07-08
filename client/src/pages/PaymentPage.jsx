import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState("Credit Card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const subscription = localStorage.getItem("selectedPlan");
    if (!user || !subscription) return;

    try {
      const res = await fetch("http://localhost:5000/api/subscription/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          plan: subscription,
          date: new Date(),
        }),
      });

      const result = await res.json();
      if (result?.plan) {
        // ✅ Store to localStorage for Navbar
        localStorage.setItem("subscription", result.plan);
      }

      // ✅ Redirect after small delay
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Try again.");
    }
  };

  const price =
    localStorage.getItem("selectedPlan") === "Pro"
      ? 999
      : localStorage.getItem("selectedPlan") === "Premium"
      ? 499
      : 0;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Secure Payment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Payment Inputs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Choose Payment Method</h3>
          {["Credit Card", "UPI", "Net Banking"].map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={selectedOption === method}
                onChange={() => setSelectedOption(method)}
              />
              <span>{method}</span>
            </label>
          ))}

          {selectedOption === "Credit Card" && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full border p-2 rounded"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, number: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Expiry (MM/YY)"
                className="w-full border p-2 rounded"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="CVV"
                className="w-full border p-2 rounded"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="bg-gray-50 border p-6 rounded-xl space-y-4">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <p>
            Plan: <strong>{localStorage.getItem("selectedPlan")}</strong>
          </p>
          <p>Price: ₹{price}</p>
          <p>GST: ₹0</p>
          <p className="font-bold text-lg">Total: ₹{price}</p>

          <button
            onClick={handlePayment}
            className={`w-full py-3 mt-4 rounded-lg font-semibold text-white ${
              processing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={processing}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>

          {success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-green-700 font-medium text-center animate-pulse">
              ✅ Payment Successful! Redirecting...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
