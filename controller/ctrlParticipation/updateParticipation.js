import participationService from "#service/participationService.js";

export const updateParticipation = async (req, res, next) => {
  const {
    raceID,
    familyNr,
    km,
    time,
    status,
    paid,
    payment,
    shirt,
    shirtGender,
    shoe,
  } = req.body;
  try {
    const userId = req.user._id;
    const updatedParticipation = await participationService.updateParticipation(
      {
        userId,
        raceID,
        familyNr: familyNr ? familyNr : 0,
        km,
        time,
        status,
        paid,
        payment,
        shirt,
        shirtGender,
        shoe,
      }
    );

    if (!updatedParticipation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    res.status(201).json({
      participation: {
        userId,
        raceID: updatedParticipation.raceID,
        participationID: updatedParticipation.participationID,
        familyNr: updatedParticipation.familyNr,
        km: updatedParticipation.km,
        time: updatedParticipation.time,
        status: updatedParticipation.status,
        paid: updatedParticipation.paid,
        payment: updatedParticipation.payment,
        shirt: updatedParticipation.shirt,
        shirtGender: updatedParticipation.shirtGender,
        shoe: updatedParticipation.shoe,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
