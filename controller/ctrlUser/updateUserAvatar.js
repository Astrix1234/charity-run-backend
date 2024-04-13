// import userService from "#service/userService.js";
// import { saveFileToGridFS } from "#config/config-multer.js";

// export const updateUserAvatar = async (req, res, next) => {
//   if (!req.user || !req.user._id) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   const userId = req.user._id;

//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const fileId = await saveFileToGridFS(file, req.user.avatarURL);

//     const user = await userService.updateAvatar(userId, fileId);

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

import userService from "#service/userService.js";
import path from "path";
import fs from "fs";
import crypto from "crypto";

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

    // Fetch the user's current avatar path
    const oldAvatarPath = path.join(req.user.avatarURL);
    // Delete the old avatar file
    if (oldAvatarPath && fs.existsSync(oldAvatarPath)) {
      fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.error("Error deleting old avatar:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      });
    }

    const avatarPath = path.join(
      process.cwd(),
      "public",
      "avatars",
      `${crypto.randomBytes(2).toString("hex")}_${file.filename}`
    );
    fs.renameSync(file.path, avatarPath);
    const user = await userService.updateAvatar(userId, avatarPath);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
