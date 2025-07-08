// scripts/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js"; // Your model
import questions from "./questionsData.js"; // The data

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Question.deleteMany(); // Optional: clears existing data
    await Question.insertMany(questions);

    console.log("✅ Questions inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();
