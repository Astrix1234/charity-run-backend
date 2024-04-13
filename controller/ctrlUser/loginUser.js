import userService from "#service/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: "30d", // Token dostępu wygasa po 30 dniach
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.validateUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Generowanie tokenów dostępu i odświeżania
    const token = generateAccessToken(user._id);

    res.json({
      token,
      user: { email: user.email, language: user.language },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
