import { useParams } from "react-router-dom";
import McqTopic from "./McqTopic";
import { useState, useEffect } from "react";

export default function SubtopicPage() {
  const { topic, slug } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/questions/${topic}/${slug}`
        );
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setQuestions(data);
      } catch {
        setError("❌ Error loading questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topic, slug]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error || questions.length === 0)
    return <p className="p-6 text-red-500">{error || "No questions found"}</p>;

  return <McqTopic topicName={slug.replace(/-/g, " ")} questions={questions} />;
}
