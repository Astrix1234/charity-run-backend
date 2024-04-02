import express from "express";
import passport from "passport";
import { registerPayment } from "#ctrlPayment/registerPayment.js";

const routerPayment = express.Router();

routerPayment.post(
  "/payment/register",
  passport.authenticate("jwt", { session: false }),
  registerPayment
);

export default routerPayment;
