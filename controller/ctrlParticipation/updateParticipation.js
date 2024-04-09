import participationService from "#service/participationService.js";

export const updateParticipation = async (req, res, next) => {
  const {
    raceID,
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
    const updatedParticipation = await participationService.updateParticipation(
      {
        userId,
        raceID,
        km,
        time,
        status,
        paid,
        payment,
        shirt,
        shirtGender,
        name,
        email: userMail,
        surname,
        phone,
      }
    );

    if (!updatedParticipation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    res.status(201).json({
      participation: {
        userId,
        raceID: updatedParticipation.raceID,
        km: updatedParticipation.km,
        time: updatedParticipation.time,
        status: updatedParticipation.status,
        paid: updatedParticipation.paid,
        payment: updatedParticipation.payment,
        shirt: updatedParticipation.shirt,
        shirtGender: updatedParticipation.shirtGender,
        name: updatedParticipation.name,
        email: updatedParticipation.email,
        surname: updatedParticipation.surname,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
