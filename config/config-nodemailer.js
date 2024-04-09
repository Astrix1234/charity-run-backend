import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config();

export const sendVerificationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const link = `${process.env.BACKEND_URL}/users/verify/${user.verificationToken}`;

  const contentTextEN = `Thank you for joining Hematobieg!
  Please verify your email by clicking on this link:
  ${link}`;

  const contentHtmlEN = `
  <div style="display: flex; flex-direction: column; align-items: center;" >
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">Thank you for joining:</h2>
  <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATORUN!</h3>
  <p style="font-size: 16px;
    text-align: center;">Please verify your registration by clicking on the link below:
  </p>
  <a style="font-size: 16px;
    text-align: center;
    color: hsl(25, 98%, 54%);" href="${link}" rel="noopener noreferrer"><strong>Hematorun Email Verification</strong></a>
  </div>`;

  const contentTextPL = `Dziękujemy że dołączasz do Hematobiegu!
  Potwierdź rejestrację klikając w poniższy link:
  ${link}`;

  const contentHtmlPL = `
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">Dziękujemy że dołączasz do:</h2>
  <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATOBIEGU!</h3>
  <p style="font-size: 16px;
    text-align: center;">Potwierdź rejestrację klikając w poniższy link:
  </p>
  <a style="font-size: 16px;
    text-align: center;
    color: hsl(25, 98%, 54%);" href="${link}" rel="noopener noreferrer"><strong>Hematorun Email Verification</strong></a>
  </div>`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject:
      user.language == "EN"
        ? "Hematobieg: Verify Your Email"
        : "Hematobieg: Zweryfikuj Email",
    text: user.language == "EN" ? contentTextEN : contentTextPL,
    html: user.language == "EN" ? contentHtmlEN : contentHtmlPL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendResetPasswordEmail = async (user, password) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const contentTextEN = `You have requested to reset your password.`;
  const contentHtmlEN = `
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATORUN!</h2>
  <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;">You have requested to reset your password.</h3>
  <p style="font-size: 16px;
    text-align: center;">Your new password is: <strong>${password}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">Please change your password after logging in.</p>
  </div>`;
  const contentTextPL = `Zgłosiłeś prośbę o zresetowanie hasła.`;
  const contentHtmlPL = `
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATOBIEG!</h2>
  <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;">Zgłosiłeś prośbę o zresetowanie hasła.</h3>
  <p style="font-size: 16px;
    text-align: center;">Twoje nowe hasło to: <strong>${password}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">Prosimy o zmianę hasła po zalogowaniu.</p>
  </div>`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject:
      user.language == "EN"
        ? "Hematobieg: Reset Your Password"
        : "Hematobieg:  Zresetuj Hasło",
    text: user.language == "EN" ? contentTextEN : contentTextPL,
    html: user.language == "EN" ? contentHtmlEN : contentHtmlPL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendParticipantDetailsEmail = async (user, participant) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { name, surname, shirtGender, shirtSize, phone } = participant;

  const contentTextEN = `Thank you for joining Hematobieg!`;
  const contentHtmlEN = `
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;" >Thank you for joining:</h2>
  <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATORUN!</h3>
  <p style="font-size: 16px;
    text-align: center;">Your details are: </p>
  <p style="font-size: 16px;
    text-align: center;">Name: <strong>${name}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">Surname: <strong>${surname}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">Phone number: <strong>${phone}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">Shirt: <strong>${shirtGender}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">Size: <strong>${shirtSize}</strong></p>
  <p style="font-size: 16px;
    text-align: center;">We whish You Good luck!</p>
  </div>`;
  const contentTextPL = `Bardzo dziękujemy za zapisanie się na Hematobieg!`;
  const contentHtmlPL = `
  <div style="display: flex; flex-direction: column; align-items: center;" >
<h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;">Bardzo dziękujemy za zapisanie się na:</h2>
<h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%);">HEMATOBIEG!</h3>
<p style="font-size: 16px;
    text-align: center;">Twoje dane:</p>
<p style="font-size: 16px;
    text-align: center;">Imię: <strong>${name}</strong></p>
<p style="font-size: 16px;
    text-align: center;">Nazwisko: <strong>${surname}</strong></p>
<p style="font-size: 16px;
    text-align: center;">Numer telefonu: <strong>${phone}</strong></p>
<p style="font-size: 16px;
    text-align: center;">Koszulka: <strong>${shirtGender}</strong></p>
<p style="font-size: 16px;
    text-align: center;">Rozmiar: <strong>${shirtSize}</strong></p>
<p style="font-size: 16px;
    text-align: center;">Życzymy powodzenia!</p>
</div>`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject:
      user.language == "EN"
        ? "Hematobieg: Your Participation Details"
        : "Hematobieg: Szczegóły Twojego Udziału",
    text: user.language == "EN" ? contentTextEN : contentTextPL,
    html: user.language == "EN" ? contentHtmlEN : contentHtmlPL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const thankYouEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const contentTextEN = `Thank you for your donation!`;
  const contentHtmlEN = `
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATORUN!</h2>
    <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;">Thank you for your donation!</h3>
    <p style="font-size: 16px;
    text-align: center;">Thanks to your donation our Foundation can grow and do more for people suffering from leukemia.</p>
    <p style="font-size: 16px; text-align: center;">We wish you all the best!</p>
    </div>`;
  const contentTextPL = ` Dziękujemy za Twoją dotację!`;
  const contentHtmlPL = `
  <div style="display: flex; flex-direction: column; align-items: center;">
  <h2 style="font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: hsl(25, 98%, 54%)">HEMATOBIEG!</h2>
  <h3 style="font-size: 20px;
    font-weight: bold;
    text-align: center;">Bardzo dziękujemy za Twoje wsparcie!!</h3>
  <p style="font-size: 16px;
    text-align: center;">Dzięki Twojej darowiznie nasza Fundacja może się rozwijać i czynić więcej dla osób chorych na białaczki.</p>
  <p style="font-size: 16px; text-align: center;">Życzymy wszystkiego dobrego!</p>
  </div>`;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject:
      user.language == "EN"
        ? "Hematobieg: Thank You for Your Donation"
        : "Hematobieg: Dziękujemy za Twoją Dotację",
    text: user.language == "EN" ? contentTextEN : contentTextPL,
    html: user.language == "EN" ? contentHtmlEN : contentHtmlPL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
