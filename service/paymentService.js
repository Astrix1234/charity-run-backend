import axios from "axios";
import crypto from "crypto";

const generateRegisterSign = ({ sessionId, merchantId, amount, currency }) => {
  const checkSum = `{"sessionId":"${sessionId}","merchantId":${merchantId},"amount":${amount},"currency":"${currency}","crc":"${process.env.P24_CRC}"}`;
  return crypto.createHash("sha384").update(checkSum).digest("hex");
};
const generateVerifySign = ({ sessionId, orderId, amount, currency }) => {
  const checkSum = `{"sessionId":"${sessionId}","orderId":${orderId},"amount":${amount},"currency":"${currency}","crc":"${process.env.P24_CRC}"}`;
  return crypto.createHash("sha384").update(checkSum).digest("hex");
};

const getPaymentToken = async (payment) => {
  try {
    axios.defaults.baseURL = process.env.P24_URL;
    const response = await axios.post("/transaction/register", payment, {
      auth: {
        username: process.env.P24_USER,
        password: process.env.P24_PASS,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error registering payment:", err);
    console.error("Error response:", err.response);
    throw err;
  }
};

export const confirmPayment = async ({
  merchantId,
  posId,
  amount,
  currency,
  orderId,
  // sign,
  sessionId,
}) => {
  const payment = {
    merchantId,
    posId,
    amount,
    currency,
    orderId,
    sign: generateVerifySign({ sessionId, orderId, amount, currency }),
    sessionId,
  };
  try {
    axios.defaults.baseURL = process.env.P24_URL;
    const response = await axios.put("/transaction/verify", payment, {
      auth: {
        username: process.env.P24_USER,
        password: process.env.P24_PASS,
      },
    });
    //returns true if payment is confirmed by p24
    return response.data.data.status == "success";
  } catch (err) {
    console.error(
      "Error(.response.data) while confirming payment:",
      err.response.data
    );
    throw err;
  }
};

const registerPayment = async ({
  amount,
  currency,
  description,
  country,
  language,
  email,
  sessionId,
  urlReturn,
  urlStatus,
  urlNotify,
  cart,
}) => {
  const merchantId = Number(process.env.P24_ID);

  const tokenReq = {
    merchantId,
    posId: merchantId,
    amount,
    currency,
    language,
    country,
    description,
    urlReturn,
    urlStatus,
    // urlNotify,
    cart,
    email,
    sessionId,
    sign: generateRegisterSign({ sessionId, merchantId, amount, currency }),
  };

  try {
    const paymentToken = await getPaymentToken(tokenReq);
    // const transactionLink = `https://sandbox.przelewy24.pl/trnRequest/${paymentToken.data.token}`;
    // below is link for real transfers, above link for sandbox !!!!!!!!!!
    const transactionLink = `https://secure.przelewy24.pl/trnRequest/${paymentToken.data.token}`;

    const participantData =
      cart && cart[0]
        ? JSON.parse(
            String(cart[0].description)
              .replaceAll("/", "")
              .replaceAll("[", "")
              .replaceAll("]", "")
          )
        : false;
    return {
      data: transactionLink,
      participant: participantData,
    };
  } catch (error) {
    console.error("Error while registering payment:", error);
    throw error;
  }
};

export default {
  registerPayment,
  confirmPayment,
};
