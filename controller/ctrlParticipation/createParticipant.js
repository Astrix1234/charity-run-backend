import { sendParticipantDetailsEmail } from "#config/config-nodemailer.js";
import participationService from "#service/participationService.js";

export const createParticipant = async (req, res, next) => {
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
    const user = req.user;
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userMail = req.user.email;
    if (!userMail) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const createdParticipation = await participationService.createParticipation(
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

    if (!createdParticipation) {
      return res.status(404).json({ message: "Participation not found" });
    }
    sendParticipantDetailsEmail(user, createdParticipation);
    res.status(201).json({
      participation: {
        userId,
        raceID: createdParticipation.raceID,
        km: createdParticipation.km,
        time: createdParticipation.time,
        status: createdParticipation.status,
        paid: createdParticipation.paid,
        payment: createdParticipation.payment,
        shirt: createdParticipation.shirt,
        shirtGender: createdParticipation.shirtGender,
        name: createdParticipation.name,
        email: createdParticipation.email,
        surname: createdParticipation.surname,
        phone: createdParticipation.phone,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
