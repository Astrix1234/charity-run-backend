import participationService from "#service/participationService";

export const getParticipationsOfCurrentUser = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { raceID } = req.body;
  try {
    const userId = req.user._id;
    const participations =
      await participationService.getParticipationsOfCurrentUser(userId, raceID);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      data: participations,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
