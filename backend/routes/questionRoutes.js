import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// GET: /api/questions/:topic/:subtopic
router.get("/:topic/:subtopic", async (req, res) => {
  const { topic, subtopic } = req.params;

  try {
    const questions = await Question.find({ topic, subtopic });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
