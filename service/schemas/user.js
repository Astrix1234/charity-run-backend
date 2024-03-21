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
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  shoe: {
    type: Number,
    required: [true, "Shoe size is required"],
  },
  shirt: {
    type: String,
    required: [true, "Shirt size is required"],
  },
  shirtGender: {
    type: String,
    required: [true, "Shirt type is required"],
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
