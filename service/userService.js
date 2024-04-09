import User from "./schemas/user.js";
import { sendVerificationEmail } from "#config/config-nodemailer.js";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const registerUser = async (userData) => {
  const verificationToken = nanoid();
  const newUser = new User({
    ...userData,
    avatarURL: null,
    verificationToken,
    verified: false,
  });

  try {
    await newUser.save();
    await sendVerificationEmail(newUser);
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }

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

const updateUserDetails = async (userId, language, name, surname, password) => {
  return User.findByIdAndUpdate(
    userId,
    { language, name, surname, password },
    { new: true }
  );
};

const getCurrent = async (userId) => {
  return User.findById(userId);
};

const updateAvatar = async (userId, imagePath) => {
  return User.findByIdAndUpdate(
    userId,
    { avatarURL: imagePath },
    { new: true }
  );
};

const resetPassword = async (email, password) => {
  return await User.findOneAndUpdate(email, { password }, { new: true });
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
  resetPassword,
};
