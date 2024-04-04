import userService from "#service/userService.js";
import { saveFileToGridFS } from "#config/config-multer.js";

export const updateUserAvatar = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const userId = req.user._id;

  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileId = await saveFileToGridFS(file, req.user.avatarURL);

    const user = await userService.updateAvatar(userId, fileId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
