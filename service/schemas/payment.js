import mongoose from "mongoose";
const Schema = mongoose.Schema;

const payment = new Schema({
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
  },
  currency: {
    type: String,
    enum: ["PLN"],
    default: "PLN",
  },
  language: {
    type: String,
    enum: ["PL", "EN"],
    default: "PL",
  },
  country: {
    type: String,
    enum: ["PL", "EN"],
    default: "PL",
  },
  description: {
    type: String,
    default: "Hematobieg registration",
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  sessionId: {
    type: String,
    required: [true, "SessionId is required"],
  },
  merchantId: {
    type: Number,
    required: [true, "MerchantId is required"],
  },
  posId: {
    type: Number,
    required: [true, "PosId is required"],
  },
  channel: {
    type: Number,
    default: 1,
  },
  sessionId: {
    type: String,
    required: [true, "SessionId is required"],
  },
  sign: {
    type: String,
    required: [true, "Sign location is required"],
  },
  // date: {
  //   type: Date,
  //   required: [true, "Date of payment is required"],
  //   // unique: true,
  // },
});

const Payment = mongoose.model("payment", payment);

export default Payment;
