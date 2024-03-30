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
    name,
    surname,
  } = req.body;
  try {
    const userId = req.user._id;
    const userMail = req.user.email;
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
        name,
        mail: userMail,
        surname,
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
        name: updatedParticipation.name,
        mail: updatedParticipation.mail,
        surname: updatedParticipation.surname,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
