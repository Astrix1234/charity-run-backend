import participationService from "#service/participationService.js";

export const getParticipant = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const userId = req.user._id;
    const raceID = req.query.raceID;

    const participations =
      await participationService.getParticipationsOfCurrentUser({
        userId,
        raceID,
      });

    res.status(200).json(participations || []);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
