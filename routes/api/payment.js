import express from "express";
import passport from "passport";
import { registerForParticipation } from "#ctrlPayment/registerForParticipation.js";
import { registerForDonation } from "#ctrlPayment/registerForDonation.js";
import { finalizePayment } from "#ctrlPayment/finalizePayment.js";

const routerPayment = express.Router();

routerPayment.post("/payment/donation", registerForDonation);
routerPayment.post(
  "/payment/participate",
  passport.authenticate("jwt", { session: false }),
  registerForParticipation
);
routerPayment.post("/payment/finaliz*", finalizePayment);

// routerPayment.post("/payment/finalize?id=*", (req, res) => {
//   const notificationData = req.body;
//   console.log(
//     "Received notification (post*) from Przelewy24:",
//     notificationData
//   );
//   res.status(200).send("Notification received successfully.");
// });

export default routerPayment;
