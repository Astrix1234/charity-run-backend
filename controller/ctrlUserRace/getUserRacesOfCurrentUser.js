import userService from "#service/userService.js";

export const getUserRacesOfCurrentUser = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { raceID } = req.body;
  try {
    const userId = req.user._id;
    const userRaces = await userRaceService.getUserRacesOfCurrentUser(
      userId,
      raceID
    );
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: userRaces,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
