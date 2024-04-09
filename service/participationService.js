import Participation from "./schemas/participation.js";
import raceService from "#service/raceService.js";

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
const getAllParticipants = async (raceID) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  return Participation.find({ raceID: validRaceID });
};

const updateParticipation = async ({
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
  surname,
  email,
  phone,
}) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  const participant = {
    userId,
    raceID: validRaceID,
    km,
    time,
    status,
    paid,
    payment,
    shirt,
    shirtGender,
    name,
    surname,
    email,
    phone,
  };
  return await Participation.findOneAndUpdate(
    { userId, raceID: validRaceID },
    participant,
    {
      new: true,
      upsert: true,
    }
  );
};

const createParticipation = async ({
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
  surname,
  email,
  phone,
}) => {
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  const participant = {
    userId,
    raceID: validRaceID,
    km,
    time,
    status,
    paid,
    payment,
    shirt,
    shirtGender,
    name,
    surname,
    email,
    phone,
  };
  return await Participation.create(participant);
};

const findParticipantById = async (participantId) => {
  return Participation.findById(participantId);
};

export default {
  findLatestParticipation,
  updateParticipation,
  getParticipationsOfCurrentUser,
  getAllPaidParticipants,
  getAllParticipants,
  createParticipation,
  findParticipantById,
};
