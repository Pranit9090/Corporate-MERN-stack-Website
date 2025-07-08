import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ resumeLink: "", coverLetter: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    await fetch("http://localhost:5000/api/applied-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId,
        userId: user._id,
        resumeLink: form.resumeLink,
        coverLetter: form.coverLetter,
      }),
    });

    setSuccess(true);
    setTimeout(() => navigate("/my-jobs"), 2000); // ✅ delay so user sees success
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-10 px-6"
    >
      {success ? (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-center text-green-600 text-xl font-bold"
          >
            ✅ Application Submitted Successfully!
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            Apply for {jobId.replaceAll("-", " ")}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-xl shadow"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Resume Link</label>
              <input
                type="url"
                required
                value={form.resumeLink}
                onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://your-resume-link"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cover Letter</label>
              <textarea
                rows="4"
                required
                value={form.coverLetter}
                onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Write a short message..."
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Submit Application
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
}
