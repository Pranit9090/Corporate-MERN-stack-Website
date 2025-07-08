// Navbar.jsx
import { Search, Briefcase, Mic, FileText, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState("Free");

  // 🔁 Check login & subscription on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("user");
      const parsedUser = userInfo ? JSON.parse(userInfo) : null;

      setIsLoggedIn(!!token);
      setUser(parsedUser);

      if (parsedUser) {
        const res = await fetch(
          `http://localhost:5000/api/subscription/${parsedUser._id}`
        );
        const sub = await res.json();
        localStorage.setItem("subscription", sub.plan || "Free");
        setPlan(sub.plan || "Free");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // 🔄 Refresh subscription every time dropdown opens
  useEffect(() => {
    const fetchSubscription = async () => {
      if (user && dropdownOpen) {
        const res = await fetch(
          `http://localhost:5000/api/subscription/${user._id}`
        );
        const sub = await res.json();
        localStorage.setItem("subscription", sub.plan || "Free");
        setPlan(sub.plan || "Free");
      }
    };
    fetchSubscription();
  }, [dropdownOpen, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("subscription");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gray-50 rounded-b-xl shadow-md flex items-center px-6 h-16 relative z-50">
      {/* 🔍 Search */}
      <div className="flex items-center bg-white rounded-lg px-3 py-1 w-1/3 shadow-sm">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions..."
          className="ml-2 bg-transparent focus:outline-none w-full text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* 🔗 Quick Nav Buttons */}
      <Link to="/jobs">
        <button className="ml-6 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow hover:from-blue-500 hover:to-blue-700 transition font-medium">
          <Briefcase size={18} className="inline mr-2" /> Jobs
        </button>
      </Link>

      <Link to="/mock-interview">
        <button className="ml-4 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition font-medium flex items-center">
          <Mic size={18} className="inline mr-2" /> Mock Interview
        </button>
      </Link>

      <Link to="/resume-builder">
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition font-medium flex items-center">
          <FileText size={18} className="inline mr-2" /> Resume Builder
        </button>
      </Link>

      <div className="flex-1" />

      {/* 👤 Profile + Subscription Dropdown */}
      {isLoggedIn && user ? (
        <div className="relative">
          <img
            src={`https://i.pravatar.cc/150?u=${user._id}`}
            alt="Profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:ring-2 hover:ring-blue-300 transition"
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md py-2 border border-gray-200 z-50">
              <div className="px-4 py-1 text-xs text-gray-500">
                {user?.email || "User"}
                <br />
                <span className="text-green-600 font-semibold">
                  {plan || "Free Plan"}
                </span>
              </div>

              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                <User size={16} /> Profile
              </Link>
              <Link
                to="/my-jobs"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                <Briefcase size={16} /> My Jobs
              </Link>
              <Link
                to="/my-resume"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                <FileText size={16} /> My Resume
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow hover:from-blue-500 hover:to-blue-700 transition font-medium">
            Login
          </button>
        </Link>
      )}
    </header>
  );
}
