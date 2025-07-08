import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// GET profile by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// PUT to update profile
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

export default router;
