import Participation from "./schemas/participation.js";
import raceService from "#service/raceService.js";

const findParticipationByID = async (participationID) => {
  return Participation.findOne({ participationID });
};
const findLatestParticipation = async (userId) => {
  return Participation.findOne({ userId }, { sort: { $natural: -1 } });
};

const getParticipationsOfCurrentUser = async ({ userId, raceID }) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  return Participation.find({ userId, raceID: validRaceID });
};
const getAllPaidParticipants = async (raceID) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  return Participation.find({ paid: true, raceID: validRaceID });
};

const updateParticipation = async ({
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
  name,
  surname,
  mail,
  avatarURL,
  phone,
}) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  const { participationID } = (await Participation.findOne({
    userId,
    raceID: validRaceID,
    familyNr,
  })) || {
    participationID: false,
  };
  const nextParticipantNumber = async () => {
    const found = await Participation.find({ raceID: validRaceID }).lean();
    return [...found].length + 1;
  };
  const validURID = participationID
    ? participationID
    : `${validRaceID}|${await nextParticipantNumber()}`;
  const participation = {
    userId,
    raceID: validRaceID,
    participationID: validURID,
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
    mail,
    avatarURL,
    phone,
  };
  return await Participation.findOneAndUpdate(
    { userId, raceID: validRaceID, familyNr },
    participation,
    {
      new: true,
      upsert: true,
    }
  );
};

export default {
  findParticipationByID,
  findLatestParticipation,
  updateParticipation,
  getParticipationsOfCurrentUser,
  getAllPaidParticipants,
};
