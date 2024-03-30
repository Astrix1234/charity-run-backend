import participationService from "#service/participationService.js";

export const getParticipantsList = async (req, res, next) => {
  const { raceID } = req.body;
  try {
    const participations = await participationService.getAllParticipants(
      raceID
    );
    if (!raceID) {
      return res.status(401).json({ message: "Wrong race" });
    }
    res.status(200).json({
      data: participations,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
