import participationService from "#service/participationService.js";

export const createParticipant = async (req, res, next) => {
  const {
    raceID,
    // familyNr,
    km,
    time,
    status,
    paid,
    payment,
    shirt,
    shirtGender,
    name,
    surname,
    phone,
  } = req.body;
  try {
    const userId = req.user._id;
    const userMail = req.user.email;
    const createdParticipation = await participationService.createParticipation(
      {
        userId,
        raceID,
        // familyNr: familyNr ? familyNr : 0,
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
        phone,
      }
    );

    if (!createdParticipation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    res.status(201).json({
      participation: {
        userId,
        raceID: createdParticipation.raceID,
        // participationID: createdParticipation.participationID,
        // familyNr: createdParticipation.familyNr,
        km: createdParticipation.km,
        time: createdParticipation.time,
        status: createdParticipation.status,
        paid: createdParticipation.paid,
        payment: createdParticipation.payment,
        shirt: createdParticipation.shirt,
        shirtGender: createdParticipation.shirtGender,
        name: createdParticipation.name,
        mail: createdParticipation.mail,
        surname: createdParticipation.surname,
        phone: createdParticipation.phone,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
