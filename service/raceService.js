import { now } from "mongoose";
import Race from "./schemas/race.js";

const findRaceByID = async (raceID) => {
  const found = Race.findOne({ raceID: raceID });
  console.log(`services findRaceByID found(${!!found})`, found);
  return found ? found : await findLatestRace();
};
const findLatestRace = async () => {
  const found = await Race.findOne({}).sort({ $natural: -1 });
  if (found && found.raceID) return found;

  const firstRace = new Race({
    raceID: "2024|Łódź",
    kms: ["1km", "5km"],
    date: new Date(now()),
    location: "Łódź",
    badgeUrl:
      "https://fundacja.hematologiczna.org/assets/images/logo-circle.png",
  });

  try {
    await firstRace.save();
    return firstRace;
  } catch (error) {
    console.error("Error generating Race data:", error);
    throw error;
  }
};

export default {
  findRaceByID,
  findLatestRace,
};
