import userService from "#service/userService.js";
import participationService from "#service/participationService.js";
import { streamFileFromGridFS } from "#config/config-multer.js";

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

export const getUserAvatar = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { avatarId } = req.params;
  try {
    await streamFileFromGridFS(avatarId, res);
  } catch (error) {
    res.status(404).json({ err: "Not an image" });
  }
};
