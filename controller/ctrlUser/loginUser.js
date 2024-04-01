import userService from "#service/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, {
    expiresIn: "15m", // Token dostępu wygasa po 15 minutach
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET);
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
    const refreshToken = generateRefreshToken(user._id);

    // Ustawianie tokena JWT jako pliku cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minut
      secure: true,
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000, // 30 dni
      secure: true,
      sameSite: "strict",
    });

    res.json({
      token,
      user: { email: user.email, language: user.language },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
