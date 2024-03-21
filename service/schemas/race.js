import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  raceID: {
    type: String,
    // required: [true, "Race ID is required"],
    unique: true,
  },
  date: {
    type: Date,
    required: [true, "Date of race is required"],
    // unique: true,
  },
  kms: {
    type: Array,
    required: [true, "List of km routes is required"],
  },
  location: {
    type: String,
    required: [true, "Race location is required"],
  },
  badgeUrl: {
    type: String,
  },
});

const User = mongoose.model("user", user);

export default User;
