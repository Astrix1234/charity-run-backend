import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const participation = new Schema({
  raceID: {
    type: String,
    required: [true, "raceID not defined"],
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: [true, "User not defined"],
  },
  email: {
    type: String,
  },
  km: {
    type: String,
  },
  time: {
    type: Number,
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
    type: String,
    default: null,
  },
  shirt: {
    type: String,
  },
  shirtGender: {
    type: String,
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
});

const Participation = mongoose.model("participation", participation);

export default Participation;
