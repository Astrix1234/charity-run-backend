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
  // Process the notification data
  const notificationData = req.body;

  // Handle the notification data as per your requirement
  console.log(
    "Received notification (get*) from Przelewy24:",
    notificationData
  );

  // Send a response to acknowledge receipt of the notification
  res.status(200).send("Notification received successfully.");
});
routerPayment.post("*", (req, res) => {
  // Process the notification data
  const notificationData = req.body;

  // Handle the notification data as per your requirement
  console.log(
    "Received notification (post*) from Przelewy24:",
    notificationData
  );

  // Send a response to acknowledge receipt of the notification
  res.status(200).send("Notification received successfully.");
});

export default routerPayment;
