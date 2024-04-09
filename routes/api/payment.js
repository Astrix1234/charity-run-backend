import express from "express";
import passport from "passport";
import { registerPayment } from "#ctrlPayment/registerPayment.js";
import { finalizePayment } from "#ctrlPayment/finalizePayment.js";

const routerPayment = express.Router();

routerPayment.post(
  "/payment/register",
  passport.authenticate("jwt", { session: false }),
  registerPayment
);
routerPayment.get(
  "/payment/finalize",
  // passport.authenticate("jwt", { session: false }),
  finalizePayment
);

routerPayment.get("*", (req, res) => {
  const notificationData = req.body;
  console.log(
    "Received notification (get*) from Przelewy24:",
    notificationData
  );
  res.status(200).send("Notification received successfully.");
});

routerPayment.post("*", (req, res) => {
  const notificationData = req.body;
  console.log(
    "Received notification (post*) from Przelewy24:",
    notificationData
  );
  res.status(200).send("Notification received successfully.");
});

export default routerPayment;
