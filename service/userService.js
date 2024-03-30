import User from "./schemas/user.js";
import sendVerificationEmail from "#config/config-nodemailer.js";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import { nanoid } from "nanoid";

const registerUser = async (userData) => {
  const gravatarHash = crypto
    .createHash("md5")
    .update(userData.email.toLowerCase())
    .digest("hex");
  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`;

  const verificationToken = nanoid();
  console.log("Generated verification token:", verificationToken);
  const newUser = new User({
    ...userData,
    avatarURL: gravatarUrl,
    verificationToken,
    verified: false,
  });

  try {
    await newUser.save();
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }

  await sendVerificationEmail(newUser);

  return newUser;
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return null;
  }
  user.verificationToken = null;
  user.verified = true;
  await user.save();
  return user;
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email, verified: false });
  if (!user) {
    return null;
  }

  await sendVerificationEmail(user);
  return user;
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const validateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  return user;
};

const updateUserDetails = async (userId, language, name, surname, phone) => {
  return User.findByIdAndUpdate(
    userId,
    { language, name, surname, phone },
    { new: true }
  );
};

const getCurrent = async (userId) => {
  return User.findById(userId, "-password -token");
};

const updateAvatar = async (userId, avatarURL) => {
  return User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
};

export default {
  registerUser,
  verifyUser,
  resendVerificationEmail,
  findUserByEmail,
  validateUser,
  updateUserDetails,
  getCurrent,
  updateAvatar,
};
