import userService from "#service/userService.js";
import { sendResetPasswordEmail } from "#config/config-nodemailer.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const resetUserPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPassword = crypto.randomBytes(4).toString("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userService.resetPassword(email, hashedPassword);
    await sendResetPasswordEmail(user, newPassword);

    res.status(200).json({ message: "Password reset" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
