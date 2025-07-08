// src/components/McqTopic.jsx
import { useState } from "react";
import { CheckCircle, AlertCircle, MessageCircle, FileText } from "lucide-react";

export default function McqTopic({ topicName, questions }) {
  const [selected, setSelected] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const optionLabels = ["A", "B", "C", "D"];

  const indexOfLast = currentPage * questionsPerPage;
  const indexOfFirst = indexOfLast - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 capitalize mb-6">
        {topicName} Questions
      </h1>

      {currentQuestions.map((q, idx) => {
        const globalIdx = indexOfFirst + idx;
        return (
          <div key={globalIdx} className="mb-8 p-6 bg-white rounded-xl shadow-md">
            <p className="font-semibold mb-4 text-lg">{globalIdx + 1}. {q.question}</p>
            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = selected[globalIdx] === opt;
                const isCorrect = opt === q.answer;
                const isAnswered = selected[globalIdx];

                return (
                  <button
                    key={i}
                    onClick={() => setSelected((prev) => ({ ...prev, [globalIdx]: opt }))}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg border transition-all duration-200 
                      ${isAnswered
                        ? isCorrect
                          ? "bg-green-50 border-green-500 text-green-700"
                          : isSelected
                          ? "bg-red-50 border-red-500 text-red-700 opacity-70"
                          : "opacity-50"
                        : "hover:bg-blue-50 border-gray-300 text-gray-700"}`}
                    disabled={isAnswered}
                  >
                    <span className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full font-medium">
                      {optionLabels[i]}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isCorrect && isSelected && (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center gap-4 mt-5 text-sm text-gray-600">
              <button className="flex items-center gap-1 hover:text-blue-600 transition">
                <MessageCircle size={16} /> Comment
              </button>
              <button className="flex items-center gap-1 hover:text-red-500 transition">
                <AlertCircle size={16} /> Raise Alert
              </button>
              <button
                onClick={() =>
                  setShowSolution((prev) => ({ ...prev, [globalIdx]: !prev[globalIdx] }))
                }
                className="flex items-center gap-1 hover:text-blue-700 transition"
              >
                <FileText size={16} />
                {showSolution[globalIdx] ? "Hide Solution" : "See Solution"}
              </button>
            </div>

            {showSolution[globalIdx] && (
              <p className="mt-3 text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">
                {q.solution}
              </p>
            )}
          </div>
        );
      })}

      {/* Pagination */}
      {questions.length > questionsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="px-3 py-1 border rounded hover:bg-blue-50 disabled:opacity-30"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded hover:bg-blue-50 disabled:opacity-30"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
