import userService from "#service/userService.js";
import jwt from "jsonwebtoken";

const refreshTokenMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    jwt.verify(refreshToken, process.env.SECRET);

    const user = await userService.getUserByRefreshToken(refreshToken);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "15m",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Refresh token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    console.error("Error refreshing token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default refreshTokenMiddleware;
