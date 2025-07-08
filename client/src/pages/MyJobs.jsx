import { useEffect, useState } from "react";
import { Briefcase, MapPin, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/api/applied-jobs/user/${user._id}`)
      .then((res) => res.json())
      .then(setJobs);
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
          Your Job Applications
        </h1>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            You haven’t applied to any jobs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((j, i) => {
              const jobTitle = j.jobId.replaceAll("-", " ");
              const company = jobTitle.split(" ")[0];
              const logoPath = `/assets/logos/${company.toLowerCase()}.svg`;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={logoPath}
                      onError={(e) => (e.target.style.display = "none")}
                      alt={company}
                      className="w-12 h-12 object-contain rounded-full border border-gray-200"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 capitalize">
                        {jobTitle}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {company}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 space-y-2 mb-4">
                    <p>
                      <MapPin className="inline w-4 h-4 text-blue-500 mr-1" />
                      <span>Location: </span>
                      <span className="font-medium text-gray-800">
                        {j.location || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Resume:</span>{" "}
                      <a
                        href={j.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Cover Letter:</span>{" "}
                      <span className="text-gray-600">
                        {j.coverLetter.length > 100
                          ? j.coverLetter.slice(0, 100) + "..."
                          : j.coverLetter}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-green-600 text-sm font-medium bg-green-100 px-3 py-1 rounded-full">
                      ✅ Submitted
                    </span>
                    <span className="text-xs text-gray-400">
                      Applied on {new Date(j.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
