import userService from "#service/userService.js";
import participationService from "#service/participationService.js";

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
      raceParticipants: participations.map((participant) => participant._id),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
