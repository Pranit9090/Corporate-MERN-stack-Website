import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CalendarClock, Video, UserCheck } from "lucide-react";

const interviews = [
  {
    type: "DSA",
    level: "Easy",
    duration: "30 min",
    mode: "Online",
    interviewer: "SDE @Google",
  },
  {
    type: "System Design",
    level: "Medium",
    duration: "45 min",
    mode: "Online",
    interviewer: "SDE II @Amazon",
  },
  {
    type: "HR Round",
    level: "Any",
    duration: "20 min",
    mode: "Phone",
    interviewer: "HR @TCS",
  },
];

export default function MockInterview() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? interviews : interviews.filter((i) => i.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700"> Mock Interviews</h1>
        <p className="text-gray-600 mt-2">
          Sharpen your skills with real-time interview simulations
        </p>
      </header>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "DSA", "System Design", "HR Round"].map((type) => (
          <Button
            key={type}
            className={`${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-200 border border-blue-300 hover:bg-blue-700"
            } px-4 py-2 rounded-full shadow-sm hover:scale-105`}
            onClick={() => setFilter(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      {/* Interview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="transition-transform duration-300"
          >
            <Card>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.type} Interview
                </h2>
                <p className="text-sm text-gray-500">Level: {item.level}</p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CalendarClock className="w-4 h-4" /> Duration:{" "}
                  {item.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Video className="w-4 h-4" /> Mode: {item.mode}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <UserCheck className="w-4 h-4" /> Interviewer:{" "}
                  {item.interviewer}
                </div>
                <Button className="mt-4 w-full">Book Interview</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <footer className="text-center mt-16 text-gray-500 text-sm">
        © 2025 Corporate — Mock Interview Platform
      </footer>
    </div>
  );
}
