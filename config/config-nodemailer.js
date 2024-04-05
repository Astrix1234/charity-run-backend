import dotenv from "dotenv";

import nodemailer from "nodemailer";

dotenv.config();

export const sendVerificationEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: false,
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
  const contentHtmlEN = `<p><h2>Thank you for joining Hematobieg!</h2>
  Please verify your email by clicking on this link:<br> 
  <a href="${link}">${link}</a></p>`;
  const contentTextPL = `Dziękujemy że dołączasz do Hematobiegu!
  
  Potwierdź rejestrację klikając w poniższy link:
  
  ${link}`;
  const contentHtmlPL = `<p><h2>Dziękujemy że dołączasz do Hematobiegu!</h2>
  Potwierdź rejestrację klikając w poniższy link:<br> 
  <a href="${link}">${link}</a></p>`;

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
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendResetPasswordEmail = async (user, password) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: true,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const contentTextEN = `You have requested to reset your password.`;
  const contentHtmlEN = `<p>You have requested to reset your password.</p>
  <p>Your new password is: <strong>${password}</strong></p>
  <p>Please change your password after logging in.</p>`;
  const contentTextPL = `Zgłosiłeś prośbę o zresetowanie hasła.`;
  const contentHtmlPL = `<p>Zgłosiłeś prośbę o zresetowanie hasła.</p>
  <p>Twoje nowe hasło to: <strong>${password}</strong></p>
  <p>Prosimy o zmianę hasła po zalogowaniu.</p>`;

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
