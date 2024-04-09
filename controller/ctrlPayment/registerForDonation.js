import paymentService from "#service/paymentService.js";
import { nanoid } from "nanoid";

export const registerForDonation = async (req, res, next) => {
  const {
    amount,
    currency,
    description,
    country,
    language,
    email,
  } = req.body;
  try {
    if (!amount || typeof amount != "number" || Number(amount) < 1) {
      return res
        .status(401)
        .json({ message: `Amount must be a positive number` });
    }
    const validEmail = email
      ? email
      : process.env.P24_ALT_EMAIL;
    const cart = undefined;
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
