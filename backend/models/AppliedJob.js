const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: String, required: true },
  resumeLink: { type: String, required: true },
  coverLetter: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AppliedJob", appliedJobSchema);
