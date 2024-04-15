import paymentService from "#service/paymentService.js";
import participationService from "#service/participationService.js";
import {
  sendParticipantDetailsEmail,
  thankYouEmail,
} from "#config/config-nodemailer.js";

export const finalizePayment = async (req, res, next) => {
  const { amount, currency, orderId, sign, cart } = req.body;
  try {
    const currentURL = req.protocol + "://" + req.get("host") + req.originalUrl;
    const url = new URL(currentURL);
    const searchParams = url.searchParams;
    const sessionId = searchParams.get("sessionId");
    console.log("---------finalizePayment------req", req.body);
    if (!orderId || !sign || amount < 1) {
      console.log("Received invalid transaction notification.");
      return;
      // return res.status(401).json({ message: "Not authorized" });
    }
    const merchantId = Number(process.env.P24_ID);
    const confirmed = await paymentService.confirmPayment({
      merchantId,
      posId: merchantId,
      amount,
      currency,
      orderId,
      sign,
      sessionId,
    });
    if (!confirmed) {
      console.error("Transaction not confirmed.");
      return;
    }
    console.log("Transaction confirmed.");
    const participantData =
      cart && cart[0]
        ? JSON.parse(
            String(cart[0].description)
              .replaceAll("/", "")
              .replaceAll("[", "")
              .replaceAll("]", "")
          )
        : false;
    const updatedParticipation = await participationService.updateParticipation(
      { ...participantData, payment: orderId, paid: true }
    );
    console.log(
      cart
        ? (`Purchased race participation:`,
          {
            userId,
            raceID: updatedParticipation.raceID,
            km: updatedParticipation.km,
            time: updatedParticipation.time,
            status: updatedParticipation.status,
            paid: updatedParticipation.paid,
            payment: updatedParticipation.payment,
            shirt: updatedParticipation.shirt,
            shirtGender: updatedParticipation.shirtGender,
            name: updatedParticipation.name,
            email: updatedParticipation.email,
            surname: updatedParticipation.surname,
          })
        : `Donation of [${amount}] received`
    );
    console.log("payment finalized successfully.");
    if (participantData) {
      sendParticipantDetailsEmail({ email, language }, participantData);
    } else {
      thankYouEmail();
    }
  } catch (error) {
    console.error("Error while finalizing transaction", error);
    next(error);
  }
};
