import UserRace from "./schemas/userRace.js";
import raceService from "#service/raceService.js";

const findUserRaceByID = async (userRaceID) => {
  return UserRace.findOne({ userRaceID });
};
const findLatestUserRace = async (userId) => {
  return UserRace.findOne({ userId }, { sort: { $natural: -1 } });
};

const updateUserRace = async ({
  userId,
  raceID,
  km,
  time,
  status,
  paid,
  payment,
  shirt,
  shirtGender,
  shoe,
}) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  const { userRaceID } = UserRace.findOne({ userId, raceID: validRaceID });
  const validURID = userRaceID
    ? userRaceID
    : `${validRaceID}|${[UserRace.find({ raceID: validRaceID }).lean].length}`;
  const userRace = {
    userId,
    raceID: validRaceID,
    userRaceID: validURID,
    km,
    time,
    status,
    paid,
    payment,
    shirt,
    shirtGender,
    shoe,
  };
  return await UserRace.findOneAndUpdate(
    { userId, raceID: validRaceID },
    userRace,
    {
      new: true,
      upsert: true,
    }
  );
};

export default {
  findUserRaceByID,
  findLatestUserRace,
  updateUserRace,
};
