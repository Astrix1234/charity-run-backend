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
    if (!orderId || !sign || amount < 1) {
      console.error("Received invalid transaction notification.");
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
    const participantData = await participationService.findParticipant(
      sessionId
    );
    const updatedParticipation = await participationService.updateParticipation(
      sessionId,
      { paid: true, payment: orderId }
    );
    if (participantData) {
      await sendParticipantDetailsEmail({ email, language }, participantData);
    } else {
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
