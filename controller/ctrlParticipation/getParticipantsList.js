import participationService from "#service/participationService";

export const getParticipantsList = async (req, res, next) => {
  const { raceID } = req.body;
  try {
    const participations = await participationService.getAllPaidParticipants(
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
