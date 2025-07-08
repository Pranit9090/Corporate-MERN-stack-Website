import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Redirect to homepage or dashboard
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h2>

        {/* Social Signup (UI only) */}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
            <FcGoogle size={24} />
          </button>
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700">
            <FaGithub size={22} />
          </button>
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-blue-600">
            <FaFacebookF size={22} />
          </button>
          <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 text-blue-400">
            <FaTwitter size={22} />
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
