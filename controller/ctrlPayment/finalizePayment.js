import paymentService from "#service/paymentService.js";
import participationService from "#service/participationService.js";
import {
  sendParticipantDetailsEmail,
  thankYouEmail,
} from "#config/config-nodemailer.js";

export const finalizePayment = async (req, res, next) => {
  const { amount, currency, orderId, sign, cart } = req.body;
  // const { email, language } = req.user;
  try {
    const currentURL = req.protocol + "://" + req.get("host") + req.originalUrl;
    const url = new URL(currentURL);
    const searchParams = url.searchParams;
    const sessionId = searchParams.get("id");
    const email = searchParams.get("e");
    const language = searchParams.get("l");
    console.log("---------finalizePayment------req from p24", req.body);
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
    const participantData = await participationService.findParticipant(
      sessionId
    );
    const updatedParticipation = await participationService.updateParticipation(
      { ...participantData, payment: orderId, paid: true }
    );
    console.log(
      cart
        ? (`Purchased race participation:`,
          {
            userId: updatedParticipation.userId,
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
    console.log(
      "payment finalized successfully.",
      "email",
      email,
      "language",
      language,
      "participantData",
      participantData
    );
    if (participantData) {
      console.log("Sending participant details email.", participantData);
      await sendParticipantDetailsEmail({ email, language }, participantData);
    } else {
      console.log(
        "Sending participant email.",
        participantData,
        "user",
        req.user,
        email,
        language
      );
      await thankYouEmail({
        email: email || process.env.P24_ALT_EMAIL,
        language: language || "PL",
      });
    }
  } catch (error) {
    console.error("Error while finalizing transaction", error);
    next(error);
  }
};
