import mongoose from "mongoose";
//!!!!!!!!!!!!!!! to edit
const Schema = mongoose.Schema;

const payment = new Schema({
  paymentID: {
    type: String,
    // required: [true, "Payment ID is required"],
    unique: true,
  },
  date: {
    type: Date,
    required: [true, "Date of payment is required"],
    // unique: true,
  },
  kms: {
    type: Array,
    required: [true, "List of km routes is required"],
  },
  location: {
    type: String,
    required: [true, "Payment location is required"],
  },
  badgeUrl: {
    type: String,
  },
});

const Payment = mongoose.model("payment", payment);

export default Payment;
