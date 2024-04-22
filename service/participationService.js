import Participation from "./schemas/participation.js";
import raceService from "#service/raceService.js";

const findLatestParticipation = async (userId) => {
  return Participation.findOne({ userId }, { sort: { $natural: -1 } });
};

const findParticipant = async (sessionID) => {
  return Participation.findOne({ sessionID: sessionID });
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
  agreementStatements,
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
    agreementStatements,
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

const createParticipation = async (participant, sessionID) => {
  console.log("raceID", participant.raceID);
  const validRaceID = participant.raceID
    ? participant.raceID
    : (await raceService.findLatestRace()).participant.raceID;
  console.log("validRaceID", validRaceID);
  participant = {
    userId: participant.userId,
    raceID: validRaceID,
    km: participant.km,
    time: participant.time,
    status: participant.status,
    paid: participant.paid,
    payment: participant.payment,
    shirt: participant.shirt,
    shirtGender: participant.shirtGender,
    name: participant.name,
    surname: participant.surname,
    email: participant.email,
    phone: participant.phone,
    agreementStatements: participant.agreementStatements,
    sessionID: sessionID,
  };
  return await Participation.create(participant);
};

const findParticipantById = async (participantId) => {
  return Participation.findById(participantId);
};

export default {
  findLatestParticipation,
  updateParticipation,
  findParticipant,
  getParticipationsOfCurrentUser,
  getAllPaidParticipants,
  getAllParticipants,
  createParticipation,
  findParticipantById,
};
