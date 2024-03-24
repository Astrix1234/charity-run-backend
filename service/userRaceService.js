import UserRace from "./schemas/userRace.js";
import raceService from "#service/raceService.js";

const findUserRaceByID = async (userRaceID) => {
  return UserRace.findOne({ userRaceID });
};
const findLatestUserRace = async (userId) => {
  return UserRace.findOne({ userId }, { sort: { $natural: -1 } });
};

const getUserRacesOfCurrentUser = async ({ userId, raceID }) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  return UserRace.find({ userId, raceID: validRaceID });
};
const getAllPaidParticipants = async (raceID) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  return UserRace.find({ paid: true, raceID: validRaceID });
};

const updateUserRace = async ({
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
}) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  const { userRaceID } = (await UserRace.findOne({
    userId,
    raceID: validRaceID,
    familyNr,
  })) || {
    userRaceID: false,
  };
  const nextParticipantNumber = async () => {
    const found = await UserRace.find({ raceID: validRaceID }).lean();
    return [...found].length + 1;
  };
  const validURID = userRaceID
    ? userRaceID
    : `${validRaceID}|${await nextParticipantNumber()}`;
  const userRace = {
    userId,
    raceID: validRaceID,
    userRaceID: validURID,
    familyNr,
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
    { userId, raceID: validRaceID, familyNr },
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
  getUserRacesOfCurrentUser,
  getAllPaidParticipants,
};
