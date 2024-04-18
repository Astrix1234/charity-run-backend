import axios from "axios";
import crypto from "crypto";

export const getPaymentToken = async (payment) => {
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
  sign,
  sessionId,
}) => {
  const payment = {
    merchantId,
    posId,
    amount,
    currency,
    orderId,
    sign,
    sessionId,
  };
  try {
    console.log(`=========================================================`);
    console.log("Confirming transaction. Req.body:", {
      ...payment,
      sign: "censored",
    });
    axios.defaults.baseURL = process.env.P24_URL;
    const response = await axios.put("/transaction/verify", payment, {
      auth: {
        username: process.env.P24_USER,
        password: process.env.P24_PASS,
      },
    });
    //returns true if payment is confirmed by p24
    console.log("Transaction confirmed", { ...payment, sign: "censored" });
    return response.data.status === "success";
  } catch (err) {
    console.log(`=========================================================`);
    console.log("FAILED while confirming transaction. Req.body:", {
      ...payment,
      sign: "censored",
    });
    console.log(`=========================================================`);
    console.error("Error(.response) while confirming payment:", err.response);
    console.log(`=========================================================`);
    // console.error("Error while confirming payment:", err);
    // console.log(`=========================================================`);
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
  const checkSum = `{"sessionId":"${sessionId}","merchantId":${merchantId},"amount":${amount},"currency":"${currency}","crc":"${process.env.P24_CRC}"}`;

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
    sign: crypto.createHash("sha384").update(checkSum).digest("hex"),
  };

  try {
    const paymentToken = await getPaymentToken(tokenReq);
    const transactionLink = `https://sandbox.przelewy24.pl/trnRequest/${paymentToken.data.token}`;
    // below is link for real transfers, above link for sandbox !!!!!!!!!!
    // const transactionLink = `https://secure.przelewy24.pl/trnRequest/${paymentToken.data.token}`;

    const participantData =
      cart && cart[0]
        ? JSON.parse(
            String(cart[0].description)
              .replaceAll("/", "")
              .replaceAll("[", "")
              .replaceAll("]", "")
          )
        : false;

    console.log(
      `=================Registering payment LINK: ${transactionLink}=========`,
      "------------participant-----------",
      participantData,
      { ...tokenReq, sign: "(censored)" }
    );

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
