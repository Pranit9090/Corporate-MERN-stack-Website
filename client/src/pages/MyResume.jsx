import { useEffect, useState } from "react";

export default function MyResume() {
  const [resume, setResume] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/api/resume/${user._id}`)
      .then((res) => res.json())
      .then(setResume)
      .catch((err) => console.error("❌ Failed to fetch resume:", err));
  }, []);

  if (!user) return <p className="p-6 text-red-500">Login required to view resume</p>;
  if (!resume) return <p className="p-6 text-gray-500">Loading resume...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-blue-600">{resume.name}</h2>
      <p>{resume.email} | {resume.phone}</p>
      <p>{resume.linkedin} | {resume.github}</p>
      <hr />

      <section>
        <h3 className="font-semibold text-lg">Summary</h3>
        <p>{resume.summary || "No summary provided"}</p>
      </section>

      <section>
        <h3 className="font-semibold text-lg">Skills</h3>
        <ul className="list-disc list-inside">
          {Array.isArray(resume.skills) && resume.skills.length > 0 ? (
            resume.skills.map((skill, i) => <li key={i}>{skill}</li>)
          ) : (
            <li className="text-gray-400 italic">No skills listed</li>
          )}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-lg">Education</h3>
        {Array.isArray(resume.education) && resume.education.length > 0 ? (
          resume.education.map((edu, i) => (
            <div key={i}>
              <p className="font-semibold">{edu.degree}</p>
              <p>{edu.institute} | {edu.year}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No education details</p>
        )}
      </section>

      <section>
        <h3 className="font-semibold text-lg">Experience</h3>
        {Array.isArray(resume.experience) && resume.experience.length > 0 ? (
          resume.experience.map((exp, i) => (
            <div key={i}>
              <p className="font-semibold">{exp.role} at {exp.company}</p>
              <p>{exp.duration}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No experience added</p>
        )}
      </section>

      <section>
        <h3 className="font-semibold text-lg">Projects</h3>
        {Array.isArray(resume.projects) && resume.projects.length > 0 ? (
          resume.projects.map((proj, i) => (
            <div key={i}>
              <p className="font-semibold">{proj.name}</p>
              <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                {proj.link}
              </a>
              <p className="text-sm text-gray-700">{proj.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No projects added</p>
        )}
      </section>
    </div>
  );
}
