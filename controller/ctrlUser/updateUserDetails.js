import userService from "#service/userService.js";

export const updateUserDetails = async (req, res, next) => {
  const { language, name, surname, phone } = req.body;
  try {
    const userId = req.user._id;
    const updatedUser = await userService.updateUserDetails(
      userId,
      language,
      name,
      surname,
      phone
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      user: {
        language: updatedUser.language,
        name: updatedUser.name,
        surname: updatedUser.surname,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
