import mongoose, { SchemaTypes } from "mongoose";

const Schema = mongoose.Schema;

const userRace = new Schema({
  raceID: {
    type: String,
    required: [true, "raceID not defined"],
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: [true, "User not defined"],
  },
  familyNr: {
    type: Number,
    required: [true, "FamilyNr is required"],
    default: 0,
  },

  userRaceID: {
    type: String,
    unique: true,
  },
  km: {
    type: String,
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
  shoe: {
    type: Number,
  },
  shirt: {
    type: String,
  },
  shirtGender: {
    type: String,
  },
});

const UserRace = mongoose.model("userRace", userRace);

export default UserRace;
