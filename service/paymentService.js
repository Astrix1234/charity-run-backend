import axios from "axios";
import { nanoid } from "nanoid";
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

const registerPayment = async ({
  amount,
  currency,
  description,
  country,
  language,
  email,
}) => {
  const merchantId = Number(process.env.P24_ID);
  const session = nanoid();
  const checkSum = `{"sessionId":"${session}","merchantId":${merchantId},"amount":${amount},"currency":"${currency}","crc":"${process.env.P24_CRC}"}`;

  //   { "merchantId": 155512,
  //   "posId": 155512,
  //   "urlReturn": "http://www.myurl.pl",
  //         "amount": 5000,
  //         "currency": "PLN",
  //         "language": "PL",
  //         "country": "Poland",
  //         "description": "test payment 5000",
  //         "email": "Password123#@email.com",
  //         "sessionId": "ol5PYditTyLVkE8qAxwGi",
  //         "sign": "dc63458293d93bf0ade127bb2d426fd6605663706bda97c3b4d94b8467ebbdba9e995803f91199a1cab8361311f149cc"
  // }

  const tokenReq = {
    merchantId,
    posId: merchantId,
    amount,
    currency,
    language,
    country,
    description,
    urlReturn: "http://www.myurl.pl",
    email,
    sessionId: session,
    sign: crypto.createHash("sha384").update(checkSum).digest("hex"),
  };

  try {
    // !!!!!!!!!!!!!!
    const paymentToken = await getPaymentToken(tokenReq);
    // i have token, now i need to get p24 link
    const transactionLink = `https://secure.przelewy24.pl/trnRequest/${paymentToken.data.token}`;
    return transactionLink;
  } catch (error) {
    console.error("Error while registering payment:", error);
    throw error;
  }
};

export default {
  registerPayment,
};
