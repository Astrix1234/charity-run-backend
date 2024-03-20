import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  language: {
    type: String,
    required: [true, "Language is required"],
    enum: ["PL", "EN"],
    default: "PL",
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: "",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [
      function () {
        return this.verify === false;
      },
      "Verify token is required",
    ],
  },
});

const User = mongoose.model("user", user);

export default User;
