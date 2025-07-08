// ✅ JobsPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const companies = [
  {
    name: "Accenture",
    logo: "/assets/logos/accenture.svg",
    role: "Software Engineer",
    location: "Bangalore",
    type: "Full-time",
    experience: "0-2 yrs",
    skills: ["JavaScript", "React"],
  },
  {
    name: "Google",
    logo: "/assets/logos/google.svg",
    role: "Frontend Intern",
    location: "Hyderabad",
    type: "Internship",
    experience: "0 yrs",
    skills: ["HTML", "CSS", "JS"],
  },
  {
    name: "TCS",
    logo: "/assets/logos/tcs.svg",
    role: "System Engineer",
    location: "Mumbai",
    type: "Full-time",
    experience: "1-3 yrs",
    skills: ["Java", "Spring"],
  },
  {
    name: "Wipro",
    logo: "/assets/logos/leetcode.svg",
    role: "Backend Developer",
    location: "Pune",
    type: "Full-time",
    experience: "2-4 yrs",
    skills: ["Node.js", "MongoDB"],
  },
  {
    name: "KPIT",
    logo: "/assets/logos/kpit.svg",
    role: "Embedded Developer",
    location: "Pune",
    type: "Full-time",
    experience: "0-2 yrs",
    skills: ["C", "Microcontrollers"],
  },
  {
    name: "Netflix",
    logo: "/assets/logos/netflix.svg",
    role: "UI Engineer",
    location: "Remote",
    type: "Full-time",
    experience: "3+ yrs",
    skills: ["React", "Tailwind"],
  },
  {
    name: "Meta",
    logo: "/assets/logos/meta.svg",
    role: "Product Designer",
    location: "Remote",
    type: "Contract",
    experience: "2-5 yrs",
    skills: ["Figma", "UX"],
  },
  {
    name: "Rockstar Games",
    logo: "/assets/logos/rockstar.svg",
    role: "Game Developer",
    location: "Bangalore",
    type: "Full-time",
    experience: "2-6 yrs",
    skills: ["C++", "Unity"],
  },
];

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/api/applied-jobs/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => setAppliedJobs(data.map((j) => j.jobId)));
  }, [user, location.pathname]); // refetch on route change

  const filteredJobs = companies.filter((job) =>
    selectedType === "All" ? true : job.type === selectedType
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          Explore Jobs at Top Companies
        </h1>
        <p className="text-gray-600 mt-2">
          Apply confidently to curated tech roles!
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["All", "Full-time", "Internship", "Contract"].map((type) => (
          <Button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`text-sm font-medium rounded-full px-4 py-2 transition-all shadow hover:scale-105 ${
              selectedType === type
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-200 border border-blue-300 hover:bg-blue-700"
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => {
          const jobId = job.name.replaceAll(" ", "-");
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="transition-all"
            >
              <Card className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={job.logo}
                      alt={job.name}
                      className="w-12 h-12 rounded-full object-contain shadow"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {job.role}
                      </h2>
                      <p className="text-sm text-gray-500">{job.name}</p>
                    </div>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 mb-4">
                    <li>
                      <CheckCircle className="inline w-4 h-4 text-green-500 mr-1" />
                      Location: {job.location}
                    </li>
                    <li>
                      <CheckCircle className="inline w-4 h-4 text-green-500 mr-1" />
                      Type: {job.type}
                    </li>
                    <li>
                      <CheckCircle className="inline w-4 h-4 text-green-500 mr-1" />
                      Experience: {job.experience}
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {appliedJobs.includes(jobId) ? (
                    <Button
                      disabled
                      className="w-full bg-green-100 text-green-600 cursor-default"
                    >
                      ✅ Applied
                    </Button>
                  ) : (
                    <Button
                      className="w-full hover:bg-blue-700 transition"
                      onClick={() => {
                        const user = localStorage.getItem("user");
                        if (!user) return navigate("/login");
                        navigate(`/apply/${jobId}`);
                      }}
                    >
                      Apply Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <footer className="text-center mt-16 text-gray-500 text-sm">
        © 2025 Corporate — All rights reserved.
      </footer>
    </div>
  );
}
