import userService from "#service/userService.js";
import { gfs } from "#config/config-multer.js";

export const updateUserAvatar = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const userId = req.user._id;

  try {
    const file = req.file;

    console.log("file", file);

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const writestream = gfs.createWriteStream({
      filename: req.file.filename,
    });

    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(writestream);

    writestream.on("close", () => {
      fs.unlink(req.file.path, () => {
        res.json({ message: "Image uploaded successfully" });
      });
    });

    const updateAvatar = await userService.updateAvatar(userId, file.path);
    console.log("updateAvatar", updateAvatar);
    res.json({ avatarURL: updateAvatar.avatarURL });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
