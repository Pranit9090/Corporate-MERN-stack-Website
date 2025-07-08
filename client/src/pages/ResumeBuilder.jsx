import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    resumeName: "",
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    skills: [], // ✅ Default to empty array
    education: [], // ✅ Default to array of objects later
    experience: [],
    projects: [],
  });

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      fetch(`http://localhost:5000/api/resume/resume/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) setForm(data);
        });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (index, value) => {
    const updated = [...form.skills];
    updated[index] = value;
    setForm({ ...form, skills: updated });
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...form.education];
    updated[index][field] = value;
    setForm({ ...form, education: updated });
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...form.experience];
    updated[index][field] = value;
    setForm({ ...form, experience: updated });
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

  const addSkill = () => setForm({ ...form, skills: [...form.skills, ""] });
  const addEducation = () =>
    setForm({
      ...form,
      education: [...form.education, { degree: "", institute: "", year: "" }],
    });
  const addExperience = () =>
    setForm({
      ...form,
      experience: [
        ...form.experience,
        { company: "", role: "", duration: "", description: "" },
      ],
    });
  const addProject = () =>
    setForm({
      ...form,
      projects: [...form.projects, { name: "", link: "", description: "" }],
    });

  const handleSave = async () => {
    await fetch("http://localhost:5000/api/save-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId: user._id }),
    });
    alert("✅ Resume saved successfully!");
  };

  const generatePDF = () => {
    const input = document.getElementById("resume-preview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${form.resumeName || "resume"}.pdf`);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-white"
    >
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Resume Builder
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="shadow-xl border p-6 rounded-xl">
          <CardContent className="space-y-4 overflow-y-auto max-h-[80vh]">
            <Input
              name="resumeName"
              placeholder="Resume Name (e.g., Frontend Dev Resume)"
              value={form.resumeName}
              onChange={handleChange}
            />
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <Input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn"
            />
            <Input
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="GitHub"
            />
            <Input
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              placeholder="Portfolio (optional)"
            />
            <textarea
              name="summary"
              rows={3}
              className="w-full border rounded-md p-2"
              placeholder="Professional Summary"
              value={form.summary}
              onChange={handleChange}
            />
            <section>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Skills</h2>
                <button onClick={addSkill} className="text-blue-500 text-sm">
                  + Add
                </button>
              </div>
              {form.skills.map((skill, idx) => (
                <Input
                  key={idx}
                  value={skill}
                  placeholder="e.g., JavaScript"
                  onChange={(e) => handleSkillChange(idx, e.target.value)}
                />
              ))}
            </section>

            <section>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Education</h2>
                <button
                  onClick={addEducation}
                  className="text-blue-500 text-sm"
                >
                  + Add
                </button>
              </div>
              {form.education.map((edu, i) => (
                <div key={i} className="space-y-2 border p-2 rounded-md">
                  <Input
                    value={edu.degree}
                    placeholder="Degree"
                    onChange={(e) =>
                      handleEducationChange(i, "degree", e.target.value)
                    }
                  />
                  <Input
                    value={edu.institute}
                    placeholder="Institute"
                    onChange={(e) =>
                      handleEducationChange(i, "institute", e.target.value)
                    }
                  />
                  <Input
                    value={edu.year}
                    placeholder="Year"
                    onChange={(e) =>
                      handleEducationChange(i, "year", e.target.value)
                    }
                  />
                </div>
              ))}
            </section>

            <section>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Experience</h2>
                <button
                  onClick={addExperience}
                  className="text-blue-500 text-sm"
                >
                  + Add
                </button>
              </div>
              {form.experience.map((exp, i) => (
                <div key={i} className="space-y-2 border p-2 rounded-md">
                  <Input
                    value={exp.company}
                    placeholder="Company"
                    onChange={(e) =>
                      handleExperienceChange(i, "company", e.target.value)
                    }
                  />
                  <Input
                    value={exp.role}
                    placeholder="Role"
                    onChange={(e) =>
                      handleExperienceChange(i, "role", e.target.value)
                    }
                  />
                  <Input
                    value={exp.duration}
                    placeholder="Duration"
                    onChange={(e) =>
                      handleExperienceChange(i, "duration", e.target.value)
                    }
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(i, "description", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                    placeholder="Description"
                  />
                </div>
              ))}
            </section>

            <section>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Projects</h2>
                <button onClick={addProject} className="text-blue-500 text-sm">
                  + Add
                </button>
              </div>
              {form.projects.map((proj, i) => (
                <div key={i} className="space-y-2 border p-2 rounded-md">
                  <Input
                    value={proj.name}
                    placeholder="Project Name"
                    onChange={(e) =>
                      handleProjectChange(i, "name", e.target.value)
                    }
                  />
                  <Input
                    value={proj.link}
                    placeholder="Link"
                    onChange={(e) =>
                      handleProjectChange(i, "link", e.target.value)
                    }
                  />
                  <textarea
                    value={proj.description}
                    onChange={(e) =>
                      handleProjectChange(i, "description", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                    placeholder="Description"
                  />
                </div>
              ))}
            </section>

            <div className="flex gap-4 mt-4">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleSave}
              >
                Save to Profile
              </Button>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={generatePDF}
              >
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resume Preview */}
        <div
          id="resume-preview"
          className="bg-white shadow-lg rounded-xl p-6 border text-sm leading-relaxed max-h-[80vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-blue-700">{form.name}</h2>
          <p>
            {form.email} | {form.phone}
          </p>
          <p>
            {form.linkedin} | {form.github} | {form.portfolio}
          </p>
          <hr className="my-2" />
          <h3 className="font-semibold text-lg">Summary</h3>
          <p>{form.summary}</p>

          <h3 className="font-semibold text-lg mt-4">Skills</h3>
          <ul className="list-disc pl-5">
            {form.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-lg mt-4">Education</h3>
          {form.education.map((edu, i) => (
            <div key={i}>
              <p className="font-medium">
                {edu.degree}, {edu.institute}
              </p>
              <p className="text-gray-600">{edu.year}</p>
            </div>
          ))}

          <h3 className="font-semibold text-lg mt-4">Experience</h3>
          {form.experience.map((exp, i) => (
            <div key={i}>
              <p className="font-medium">
                {exp.role} at {exp.company}
              </p>
              <p className="text-gray-600">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}

          <h3 className="font-semibold text-lg mt-4">Projects</h3>
          {form.projects.map((proj, i) => (
            <div key={i}>
              <p className="font-medium">{proj.name}</p>
              <a
                href={proj.link}
                target="_blank"
                className="text-blue-500 underline"
              >
                {proj.link}
              </a>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
