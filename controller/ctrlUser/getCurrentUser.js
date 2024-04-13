import userService from "#service/userService.js";
import participationService from "#service/participationService.js";
// import { streamFileFromGridFS } from "#config/config-multer.js";

export const getCurrentUser = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const userId = req.user._id;
    const { raceID } = req.body;
    const user = await userService.getCurrent(userId);
    const participations =
      await participationService.getParticipationsOfCurrentUser({
        userId,
        raceID,
      });

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      language: user.language,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      avatarURL: user.avatarURL,
      raceParticipants: participations.map((participant) => participant._id),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const getUserAvatar = async (req, res) => {
//   if (!req.user || !req.user._id) {
//     return res.status(401).json({ message: "Not authorized" });
//   }
//   const { avatarId } = req.params;
//   try {
//     await streamFileFromGridFS(avatarId, res);
//   } catch (error) {
//     res.status(404).json({ err: "Not an image" });
//   }
// };

import fs from "fs";
import path from "path";
import mime from "mime-types";

export const getUserAvatar = async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getCurrent(userId);
  if (!user) {
    return res.status(404).json({ err: "User not found" });
  }

  try {
    const filePath = path.join(user.avatarURL);
    if (fs.existsSync(filePath)) {
      const mimeType = mime.lookup(filePath);
      if (mimeType) {
        res.setHeader("Content-Type", mimeType);
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.status(404).json({ err: "Not an image" });
      }
    } else {
      res.status(404).json({ err: "Not an image" });
    }
  } catch (error) {
    res.status(500).json({ err: "Server error" });
  }
};
