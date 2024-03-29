import paymentService from "#service/paymentService.js";

export const register = async (req, res, next) => {
  const { amount, currency, description, country, language } = req.body;
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    //will use main email of user account
    const payment = await paymentService.registerPayment({
      amount,
      currency: currency || "PLN",
      description: description || "Hematobieg registration",
      email: user.email,
      country: country || "PL",
      language: language || "pl",
    });
    res.status(201).json({
      payment: {
        email: payment.email,
        language: payment.language,
        avatarURL: payment.avatarURL,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
