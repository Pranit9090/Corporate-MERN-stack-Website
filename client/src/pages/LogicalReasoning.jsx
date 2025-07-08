import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const topics = [
  "Number Series",
  "Letter Series",
  "Analogies",
  "Blood Relations",
  "Coding and Decoding",
  "Seating Arrangement",
  "Direction Sense Test",
  "Puzzle Test",
  "Logical Venn Diagrams",
  "Syllogism",
  "Statement and Conclusion",
  "Decision Making",
  "Mathematical Operations",
  "Cause and Effect"
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function LogicalReasoning() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = topics.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">
        Logical Reasoning Topics
      </h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((topic) => (
            <div
              key={topic}
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-4 py-3 rounded-lg shadow-sm font-medium cursor-pointer transition-all duration-200 hover:translate-x-1"
              onClick={() => navigate(`/logical-reasoning/${slugify(topic)}`)}
            >
              {topic}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No matching topics found.</p>
        )}
      </div>
    </div>
  );
}
