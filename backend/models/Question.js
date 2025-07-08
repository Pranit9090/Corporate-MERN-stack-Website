import mongoose from "mongoose";

function arrayLimit(val) {
  return val.length === 4;
}

const questionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  subtopic: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, "{PATH} must have exactly 4 options"],
  },
  answer: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
});

// ✅ THIS LINE IS IMPORTANT
const Question = mongoose.model("Question", questionSchema);
export default Question;
