// backend/controllers/authController.js

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    // ✅ Respond with essential info
    res.status(201).json({
      message: "User created",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name || "",
        college: user.college || "",
        course: user.course || "",
        skills: user.skills || "",
        nss_ncc: user.nss_ncc || "",
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name || "",
        college: user.college || "",
        course: user.course || "",
        skills: user.skills || "",
        nss_ncc: user.nss_ncc || "",
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

