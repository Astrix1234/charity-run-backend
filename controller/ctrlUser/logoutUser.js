export const logout = async (req, res, next) => {
  try {
    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
