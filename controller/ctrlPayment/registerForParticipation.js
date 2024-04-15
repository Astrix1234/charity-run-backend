import paymentService from "#service/paymentService.js";
import { nanoid } from "nanoid";

export const registerForParticipation = async (req, res, next) => {
  const {
    amount,
    participant,
    currency = "PLN",
    description = "Hematobieg registration",
    country = "PL",
    language = "pl",
  } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!participant) {
      return res.status(400).json({ message: `Participant is required` });
    }
    if (!amount || typeof amount !== "number" || Number(amount) < 1) {
      return res
        .status(400)
        .json({ message: `Amount must be a positive number` });
    }

    const userId = req.user._id;
    const validEmail = req.user.email;
    const sessionId = nanoid();
    const cart = [
      {
        sellerId: "Hematobieg",
        sellerCategory: "Hematobieg",
        name: "Participant",
        description: JSON.stringify([participant]),
        quantity: 1,
        price: amount,
        number: description,
      },
    ];

    const data = await paymentService.registerPayment({
      amount,
      sessionId,
      cart,
      currency,
      description,
      email: validEmail,
      country,
      language,
      urlReturn: process.env.FRONTEND_URL,
      urlStatus: `${process.env.BACKEND_URL}/payment/finalize?id=${sessionId}`,
      urlNotify: `${process.env.BACKEND_URL}/payment/finalize?id=${sessionId}`,
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
