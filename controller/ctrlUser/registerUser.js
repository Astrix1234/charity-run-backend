import userService from "#service/userService.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  console.log("Register endpoint hit");
  const { email, password, language, name, surname, phone } = req.body;
  try {
    console.log("Attempting to find existing user");
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.registerUser({
      email,
      language,
      password: hashedPassword,
      name,
      surname,
      phone,
    });
    res.status(201).json({
      user: {
        email: user.email,
        language: user.language,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    console.error(error);
    next(error);
  }
};
