import paymentService from "#service/paymentService.js";

export const confirmPayment = async (req, res, next) => {
  // const { amount, currency, orderId, sign } = req.body;
  try {
    // const currentURL = req.protocol + "://" + req.get("host") + req.originalUrl;
    // const url = new URL(currentURL);
    // const searchParams = url.searchParams;
    // const sessionId = searchParams.get("sessionId");
    // // console.log("---------confirmPayment------amount", amount);
    // console.log("---------confirmPayment------req", req.body);
    // if (!orderId || !sign || amount < 1) {
    //   console.log("Received invalid transaction notification.");
    //   return;
    //   // return res.status(401).json({ message: "Not authorized" });
    // }
    // !!!!!!!!!!!!!!!!!!! send verify
    //   const data = await paymentService.confirmPayment({
    //     amount,
    //     currency: currency || "PLN",
    //     description: `Hematobieg registration ${description || ""}`,
    //     email: user.email,
    //     country: country || "PL",
    //     language: language || "pl",
    //     urlReturn: process.env.FRONTEND_URL,
    //   });
    res.status(201).json({
      payment: amount,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
