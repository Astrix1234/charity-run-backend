import userService from "#service/userService.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Weryfikacja refreshToken
    const checkRefreshToken = jwt.verify(refreshToken, process.env.SECRET);

    // Sprawdź, czy refreshToken jest ważny
    if (!checkRefreshToken) {
      // Jeśli refreshToken jest nieprawidłowy, zwróć błąd 401
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Pobierz użytkownika na podstawie refreshToken
    const user = await userService.getUserByRefreshToken(refreshToken);

    // Sprawdź, czy użytkownik istnieje
    if (!user) {
      // Jeśli użytkownik nie istnieje, zwróć błąd 404
      return res.status(404).json({ message: "User not found" });
    }

    // Generuj nowy accessToken
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "15m", // Nowy accessToken wygasa po 15 minutach
    });

    // Zaktualizuj plik cookie z nowym accessToken
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minut w milisekundach
      secure: true,
      sameSite: "strict",
    });

    // Kontynuuj przetwarzanie żądania
    next();
  } catch (error) {
    // Obsługa błędów
    console.error("Error refreshing token:", error);
    // Zwróć błąd 500 w przypadku wystąpienia błędu
    return res.status(500).json({ message: "Internal server error" });
  }
};
