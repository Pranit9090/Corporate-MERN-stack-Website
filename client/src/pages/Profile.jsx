// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Save } from "lucide-react";
import logo from "../assets/logo.png";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    course: "",
    skills: "",
    interests: "",
    achievements: "",
    github: "",
    linkedin: "",
    portfolio: "",
    volunteering: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 🔐 Redirect to login if no user
    if (!storedUser || !storedUser._id) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/api/profile/${storedUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData({
          name: data.name || data.email,
          college: data.college || "",
          course: data.course || "",
          skills: data.skills || "",
          interests: data.interests || "",
          achievements: data.achievements || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          portfolio: data.portfolio || "",
          volunteering: data.volunteering || "",
        });
      });
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const updated = await fetch(
      `http://localhost:5000/api/profile/${user._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const newUser = await updated.json();
    setUser(newUser);
    setEditMode(false);
  };

  if (!user) return <p className="text-center py-10">Loading...</p>;

  const profileFields = [
    "college",
    "course",
    "skills",
    "interests",
    "achievements",
    "github",
    "linkedin",
    "portfolio",
    "volunteering",
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">My Profile</h1>

      <div className="flex items-center gap-6 bg-white rounded-xl shadow-md p-6 mb-10">
        <img
          src={logo}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow"
        />
        <div>
          <input
            disabled={!editMode}
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`text-2xl font-semibold ${
              editMode
                ? "border border-gray-300 px-2 py-1 rounded-md"
                : "text-gray-800"
            }`}
          />
          <p className="text-gray-500 mt-1">Email: {user.email}</p>
        </div>
        <div className="ml-auto">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center gap-1"
            >
              <Save size={16} /> Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-3 py-2 rounded-md flex items-center gap-1"
            >
              <Pencil size={16} /> Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {profileFields.map((field) => (
          <div key={field} className="bg-white rounded-lg p-5 shadow space-y-1">
            <label className="text-sm font-medium text-blue-700 capitalize">
              {field.replace("_", " ")}
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full mt-1 border px-3 py-2 rounded-md ${
                editMode
                  ? "border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  : "border-transparent bg-transparent"
              }`}
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
