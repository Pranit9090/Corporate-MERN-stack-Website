// backend/models/resumeModel.js
import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  resumeName: String,
  name: String,
  email: String,
  phone: String,
  linkedin: String,
  github: String,
  portfolio: String,
  summary: String,
  skills: [String],
  education: [{ degree: String, institute: String, year: String }],
  experience: [{ company: String, role: String, duration: String, description: String }],
  projects: [{ name: String, link: String, description: String }],
}, { timestamps: true });

export default mongoose.model("Resume", ResumeSchema);
