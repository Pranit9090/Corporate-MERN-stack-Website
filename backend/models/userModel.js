import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  college: String,
  course: String,
  skills: String,
  interests: String,
  achievements: String,
  github: String,
  linkedin: String,
  portfolio: String,
  volunteering: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
