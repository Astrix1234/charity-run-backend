export const logout = async (req, res, next) => {
  try {
    // Czyszczenie pliku cookie "jwt"
    res.clearCookie("jwt");
    res.clearCookie("refreshToken");

    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
