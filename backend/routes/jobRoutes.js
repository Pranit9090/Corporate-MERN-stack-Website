import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// MongoDB model
const appliedJobSchema = new mongoose.Schema({
  userId: String,
  jobId: String,
  resumeLink: String,
  coverLetter: String,
});

const AppliedJob = mongoose.model("AppliedJob", appliedJobSchema);

// POST - Apply to a job
router.post("/applied-jobs", async (req, res) => {
  const { userId, jobId, resumeLink, coverLetter } = req.body;
  if (!userId || !jobId) return res.status(400).json({ message: "Missing fields" });

  try {
    const exists = await AppliedJob.findOne({ userId, jobId });
    if (exists) return res.status(409).json({ message: "Already applied" });

    const newJob = new AppliedJob({ userId, jobId, resumeLink, coverLetter });
    await newJob.save();
    res.status(201).json({ message: "Application saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET - Jobs applied by user
router.get("/applied-jobs/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const jobs = await AppliedJob.find({ userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
