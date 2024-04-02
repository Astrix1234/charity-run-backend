import userService from "#service/userService.js";
import bcrypt from "bcryptjs";

export const updateUserDetails = async (req, res, next) => {
  const { language, name, surname, password, oldPassword } = req.body;
  try {
    const userId = req.user._id;
    let newPassword;

    if (password && oldPassword) {
      const userPassword = req.user.password;
      const isMatch = await bcrypt.compare(oldPassword, userPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      newPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await userService.updateUserDetails(
      userId,
      language,
      name,
      surname,
      newPassword
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json({
      user: {
        language: updatedUser.language,
        name: updatedUser.name,
        surname: updatedUser.surname,
        password: updatedUser.password,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
