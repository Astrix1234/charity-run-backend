import userService from "#service/userService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    // Ustawianie tokena JWT jako pliku cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // MaxAge ustawia czas życia cookie w milisekundach

    await userService.updateToken(user._id, token);

    res.json({
      token,
      user: { email: user.email, language: user.language },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
