import Question from '../models/Question.js';

export const getQuestionsBySubtopic = async (req, res) => {
  try {
    const { subtopic } = req.params;
    const questions = await Question.find({ subtopic });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
