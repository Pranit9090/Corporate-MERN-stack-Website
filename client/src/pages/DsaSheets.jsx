// src/pages/DSASheets.jsx
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const dsaSheets = [
  {
    name: "Striver SDE Sheet",
    topics: 180,
    level: "Intermediate to Advanced",
    suitedFor: "SDE Roles & Internships",
    link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Love Babbar Sheet",
    topics: 450,
    level: "Beginner to Intermediate",
    suitedFor: "Placement Preparation",
    link: "https://450dsa.com",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Fraz Sheet (Top 75)",
    topics: 75,
    level: "Focused Revision",
    suitedFor: "Last-minute Interviews",
    link: "https://leetcode.com/list/xi4ci4ig/",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    name: "LearnYard Sheet",
    topics: 300,
    level: "Beginner Friendly",
    suitedFor: "Daily DSA Practice",
    link: "https://www.learnyard.com/dsa-sheet",
    color: "from-green-500 to-emerald-500",
  },
];

export default function DSASheets() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
          Curated DSA Sheets
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dsaSheets.map((sheet, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              className={`bg-white rounded-2xl p-6 shadow-lg border-t-4 border-blue-500 transition duration-300`}
            >
              <div
                className={`rounded-xl p-4 mb-4 bg-gradient-to-r ${sheet.color} text-white font-semibold text-lg shadow-md`}
              >
                {sheet.name}
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Topics:</strong> {sheet.topics}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Level:</strong> {sheet.level}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Best for:</strong> {sheet.suitedFor}
              </p>
              <button
                onClick={() => window.open(sheet.link, "_blank")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
              >
                View Sheet <FaArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
