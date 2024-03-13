import userService from "#service/userService.js";
import uploadMiddleware, {
  processAndValidateImage,
} from "#config/config-multer.js";

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

    const newFilePath = await processAndValidateImage(file.path);
    if (!newFilePath) {
      return res.status(500).json({ message: "Error processing file" });
    }

    const avatarURL = newFilePath.replace(/\\/g, "/").split("/public/").pop();

    const updatedUser = await userService.updateAvatar(
      userId,
      `/avatars/${avatarURL}`
    );

    res.json({
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const uploadAvatar = uploadMiddleware.single("avatar");
