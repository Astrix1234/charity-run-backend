import paymentService from "#service/paymentService.js";
import { validateParticipant } from "#validators/validateParticipant.js";
import { nanoid } from "nanoid";

export const registerForParticipation = async (req, res, next) => {
  const { amount, currency, description, country, language, participant } =
    req.body;
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!participant) {
      return res.status(400).json({ message: `Participant is required` });
    }
    if (!amount || typeof amount != "number" || Number(amount) < 1) {
      return res
        .status(400)
        .json({ message: `Amount must be a positive number` });
    }
    const userId = req.user._id;
    const validEmail = req.user.email;
    const validParticipant = participant
      ? await validateParticipant({ ...participant, userId, email: validEmail })
      : null;
    if (!validParticipant) {
      return res.status(400).json({ message: `Invalid participant data` });
    }
    console.log(`registerPayment ------------------ participant:`, {
      ...participant,
      userId,
      email: validEmail,
    });
    console.log(
      `registerPayment ------------------ validParticipant:`,
      validParticipant
    );
    const cart = participant
      ? [
          {
            sellerId: "Hematobieg",
            sellerCategory: "Hematobieg",
            name: "Participant",
            description: JSON.stringify([validParticipant]),
            quantity: 1,
            price: amount,
            number: `${description}`,
          },
        ]
      : undefined;
    const sessionId = nanoid();
    const data = await paymentService.registerPayment({
      amount,
      sessionId,
      cart,
      currency: currency || "PLN",
      description: `Hematobieg registration ${description || ""}`,
      email: validEmail,
      country: country || "PL",
      language: language || "pl",
      // waitForResult: true, //p24 will wait for transaction to finish before redirecting back
      urlReturn: process.env.FRONTEND_URL, //p24 redirects there regardless of result
      urlStatus: `${process.env.BACKEND_URL}/payment/finalize?id=${sessionId}`, //p24 sends info only if paid
      urlNotify: `${process.env.BACKEND_URL}/payment/finalize?id=${sessionId}`, //p24 sends info only if paid
    });
    res.status(201).json({
      ...data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
