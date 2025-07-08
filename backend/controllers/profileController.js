// backend/controllers/profileController.js
import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
