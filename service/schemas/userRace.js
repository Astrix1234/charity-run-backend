import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  raceID: {
    type: SchemaTypes.ObjectId,
    ref: "race",
    required: [true, "RaceID not defined"],
  },
  userRaceID: {
    type: String,
    unique: true,
  },
  km: {
    type: Number,
    required: [true, "Km amount is required"],
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    default: "signed up",
  },
  paid: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Object,
    default: null,
  },
});

const User = mongoose.model("user", user);

export default User;
