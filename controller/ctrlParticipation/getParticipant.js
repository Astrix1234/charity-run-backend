import participationService from "#service/participationService.js";

export const getParticipant = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const participantID = req.body;
  try {
    const participant = await participationService.findParticipantById(
      participantID
    );
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json({
      data: participant,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
