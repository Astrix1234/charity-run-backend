import paymentService from "#service/paymentService.js";
import { nanoid } from "nanoid";

export const registerPayment = async (req, res, next) => {
  const { amount, currency, description, country, language } = req.body;
  try {
    // !!!!!!!!!!!!!!!! zły format wózka na zakupy
    const cart = [
      {
        sellerId: "Hematobieg",
        sellerCategory: "bieg",
        name: "bieg",
        description: "bieg",
        quantity: 1,
        price: 50,
        number: "bieg",
      },
    ];
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!amount || typeof amount != "number" || Number(amount) < 1) {
      return res
        .status(401)
        .json({ message: `Amount must be a positive number` });
    }
    //will use main email of user account
    const { user } = req;
    const sessionId = nanoid();
    // const params = `amount=${amount}&sessionId=${sessionId}`;
    const data = await paymentService.registerPayment({
      amount,
      sessionId,
      cart,
      currency: currency || "PLN",
      description: `Hematobieg registration ${description || ""}`,
      email: user.email,
      country: country || "PL",
      language: language || "pl",
      // waitForResult: true,
      urlReturn: process.env.FRONTEND_URL, //p24 redirects there regardless of result
      // urlReturn: `${process.env.BACKEND_URL}/payment/finalize`, //testing
      urlStatus: `${process.env.BACKEND_URL}/payment/finalize?id=${sessionId}`, //p24 sends info only if paid
      urlNotify: `${process.env.BACKEND_URL}/payment/finalize?id=${sessionId}`, //p24 sends info only if paid
      // urlStatus: `${process.env.BACKEND_URL}/payment/finalize?${params}`, //p24 sends info only if paid
    });
    res.status(201).json({
      ...data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
