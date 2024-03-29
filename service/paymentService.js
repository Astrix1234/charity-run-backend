import Payment from "./schemas/payment.js";
// import sendPaymentEmail from "#config/config-nodemailer.js";
import { nanoid } from "nanoid";
import md5 from "md5";

const registerPayment = async ({
  amount,
  currency,
  description,
  country,
  language,
  email,
}) => {
  const merchantId = 155512;
  const session = nanoid();
  const checkSum = md5(
    `${session}|${merchantId}|${amount}|${currency}|${process.env.P24_CRC}`
  );
  const newPayment = new Payment({
    amount,
    currency,
    description,
    country,
    language,
    email,
    merchantId,
    posId: merchantId,
    sessionId: session,
    channel: 1,
    sign: checkSum,
  });

  try {
    await newPayment.save();
  } catch (error) {
    console.error("Error while registering payment:", error);
    throw error;
  }

  // await sendPaymentEmail(newPayment);

  return newPayment;
};

export default {
  registerPayment,
};
