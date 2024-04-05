import paymentService from "#service/paymentService.js";

export const finalizePayment = async (req, res, next) => {
  const { amount, currency, orderId, sign } = req.body;
  try {
    const currentURL = req.protocol + "://" + req.get("host") + req.originalUrl;
    const url = new URL(currentURL);
    const searchParams = url.searchParams;
    const sessionId = searchParams.get("sessionId");
    // console.log("---------finalizePayment------amount", amount);
    console.log("---------finalizePayment------req", req.body);
    if (!orderId || !sign || amount < 1) {
      console.log("Received invalid transaction notification.");
      return;
      // return res.status(401).json({ message: "Not authorized" });
    }
    const merchantId = Number(process.env.P24_ID);
    const confirmed = await paymentService.finalizePayment({
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
    console.error("Transaction confirmed.");
    // !!!!!!!!!! save new runner
    res.status(201).json({
      payment: amount,
    });
  } catch (error) {
    console.error("Error while finalizing transaction", error);
    next(error);
  }
};
