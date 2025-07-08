// backend/routes/subscriptionRoutes.js
import express from "express";
import Subscription from "../models/subscriptionModel.js";

const router = express.Router();

// Save or Update Subscription
router.post("/buy", async (req, res) => {
  try {
    const { userId, plan, date } = req.body;

    const subscription = await Subscription.findOneAndUpdate(
      { userId },
      { $set: { plan, date } },
      { new: true, upsert: true }
    );

    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Subscription by userId
router.get("/:userId", async (req, res) => {
  try {
    const sub = await Subscription.findOne({ userId: req.params.userId });
    if (!sub) return res.status(200).json({ plan: "Free" });
    res.status(200).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
