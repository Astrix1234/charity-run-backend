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

const updateParticipation = async (sessionID, participant) => {
  try {
    const validRaceID = participant.raceID
      ? participant.raceID
      : (await raceService.findLatestRace()).raceID;
    participant.raceID = validRaceID;

    return Participation.findOneAndUpdate({ sessionID }, participant, {
      new: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createParticipation = async (participant, sessionID) => {
  const validRaceID = participant.raceID
    ? participant.raceID
    : (await raceService.findLatestRace()).participant.raceID;
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
