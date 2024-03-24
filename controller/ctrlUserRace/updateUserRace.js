import userRaceService from "#service/userRaceService.js";

export const updateUserRace = async (req, res, next) => {
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
    const updatedUserRace = await userRaceService.updateUserRace({
      userId,
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
    });

    if (!updatedUserRace) {
      return res.status(404).json({ message: "User/UserRace not found" });
    }

    res.status(201).json({
      user: {
        userId,
        raceID: updatedUserRace.raceID,
        userRaceID: updatedUserRace.userRaceID,
        familyNr: updatedUserRace.familyNr,
        km: updatedUserRace.km,
        time: updatedUserRace.time,
        status: updatedUserRace.status,
        paid: updatedUserRace.paid,
        payment: updatedUserRace.payment,
        shirt: updatedUserRace.shirt,
        shirtGender: updatedUserRace.shirtGender,
        shoe: updatedUserRace.shoe,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
