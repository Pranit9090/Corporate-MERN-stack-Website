// backend/models/subscriptionModel.js
import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  plan: { type: String, enum: ["Free", "Premium", "Pro"], required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Subscription", SubscriptionSchema);
