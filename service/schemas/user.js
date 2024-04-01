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
    enum: ["PL", "EN"],
    default: "PL",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  avatarURL: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [
      function () {
        return this.verified === false;
      },
      "Verification token is required",
    ],
  },
});

const User = mongoose.model("user", user);

export default User;
