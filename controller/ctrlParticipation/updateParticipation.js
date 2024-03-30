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
    name,
    surname,
    avatarURL,
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
        shoe,
        name,
        mail: userMail,
        surname,
        avatarURL,
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
        name: updatedParticipation.name,
        mail: updatedParticipation.mail,
        surname: updatedParticipation.surname,
        avatarURL: updatedParticipation.avatarURL,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
