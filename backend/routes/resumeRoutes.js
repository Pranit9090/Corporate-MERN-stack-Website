// backend/routes/resumeRoutes.js
import express from "express";
import mongoose from "mongoose";
import Resume from "../models/resumeModel.js";

const router = express.Router();

// Save or Update Resume
router.post("/save-resume", async (req, res) => {
  try {
    const { userId, ...data } = req.body;
    const resume = await Resume.findOneAndUpdate(
      { userId },
      { $set: data },
      { upsert: true, new: true }
    );
    res.status(200).json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Resume by User ID
router.get("/resume/:id", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); // 🛠️ Fix here
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      // Send default blank structure
      return res.status(200).json({
        resumeName: "",
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary: "",
        skills: [],
        education: [],
        experience: [],
        projects: [],
      });
    }

    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
