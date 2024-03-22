import raceService from "#service/raceService.js";
export const findLatestRace = async (req, res, next) => {
  // if (!req.user || !req.user._id) {
  //   return res.status(401).json({ message: "Not authorized" });
  // }

  try {
    const race = await raceService.findLatestRace();
    if (!race) {
      return res.status(401).json({ message: "Error, no race in database" });
    }
    res.status(200).json({
      raceID: race.raceID,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
