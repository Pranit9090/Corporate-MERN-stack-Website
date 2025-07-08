import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const topics = [
  "Problems on Trains",
  "Time and Distance",
  "Height and Distance",
  "Time and Work",
  "Simple Interest",
  "Compound Interest",
  "Profit and Loss",
  "Partnership",
  "Percentage",
  "Problems on Ages",
  "Calendar",
  "Clock",
  "Average",
  "Area",
  "Volume and Surface Area",
  "Permutation and Combination",
  "Numbers",
  "Problems on Numbers",
  "Problems on H.C.F and L.C.M",
  "Decimal Fraction",
  "Simplification",
  "Square Root and Cube Root",
  "Surds and Indices",
  "Ratio and Proportion",
  "Chain Rule",
  "Pipes and Cistern",
  "Boats and Streams",
  "Alligation or Mixture",
  "Logarithm",
  "Races and Games",
  "Stocks and Shares",
  "Probability",
  "True Discount",
  "Banker's Discount",
  "Odd Man Out and Series",
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Convert spaces to hyphen
    .replace(/[^a-z0-9-]/g, "") // Remove special characters except hyphen
    .replace(/-+/g, "-"); // Collapse multiple hyphens
}

export default function Arithmetic() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = topics.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Arithmetic Topics
      </h1>

      {/* Filter Bar */}
      <div className="flex items-center bg-white shadow-md rounded-lg px-4 py-2 mb-6 w-full max-w-md">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search topics..."
          className="ml-2 w-full focus:outline-none text-gray-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((topic) => (
            <div
              key={topic}
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm font-medium cursor-pointer transition-all duration-200 hover:translate-x-1"
              onClick={() => navigate(`/arithmetic/${slugify(topic)}`)}
            >
              {topic}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">
            No matching topics found.
          </p>
        )}
      </div>
    </div>
  );
}
