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
  mail: {
    type: String,
  },
  familyNr: {
    type: Number,
    required: [true, "FamilyNr is required"],
    default: 0,
  },

  participationID: {
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
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  avatarURL: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
});

const Participation = mongoose.model("participation", participation);

export default Participation;
