import paymentService from "#service/paymentService.js";

export const registerPayment = async (req, res, next) => {
  const { amount, currency, description, country, language } = req.body;
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    //will use main email of user account
    const { user } = req;
    const data = await paymentService.registerPayment({
      amount,
      currency: currency || "PLN",
      description: `Hematobieg registration ${description || ""}`,
      email: user.email,
      country: country || "PL",
      language: language || "pl",
      urlReturn: process.env.FRONTEND_URL,
    });
    res.status(201).json({
      data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
