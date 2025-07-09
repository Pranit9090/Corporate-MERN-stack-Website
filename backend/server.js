import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Routes
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", jobRoutes);
app.use("/api", resumeRoutes);
app.use("/api/subscription", subscriptionRoutes);

// ✅ ADD THIS:
app.get("/", (req, res) => {
  res.send("✅ Corporate MERN backend is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
