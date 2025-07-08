import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Navigate to homepage or dashboard
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
          Login
        </h2>

        {/* Social Icons (non-functional) */}
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

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
