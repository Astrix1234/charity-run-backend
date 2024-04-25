import Joi from "joi";
import raceService from "#service/raceService.js";

export const validateParticipant = async ({
  raceID,
  userId,
  km,
  shirt,
  shirtGender,
  time,
  status,
  paid,
  payment,
  agreementStatements,
  name,
  surname,
  phone,
  email,
}) => {
  const schema = Joi.object({
    // date: Joi.date().required(), //day of the race
    // location: Joi.string().required(), //city
    raceID: Joi.string().required(), //id of race - for filtering how many participants in specific race we have
    userId: Joi.string().required(),

    km: Joi.string().required(), //distance of user choice
    shirt: Joi.string().required(),
    shirtGender: Joi.string().required(), //for shirt sizes only, not user gender

    time: Joi.number().allow(null), //how long user took to finish the race //updated after race
    status: Joi.string()
      .valid("signed up", "participated")
      .default("signed up"), //updated after race
    paid: Joi.bool().default(false),
    payment: Joi.object().allow(null), //all data needed to track the payment ?
    agreementStatements: Joi.boolean().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  const validRaceID = raceID
    ? raceID
    : (await raceService.findLatestRace()).raceID;
  const verifiedParticipant = {
    raceID: validRaceID,
    userId,
    km,
    shirt,
    shirtGender,
    time,
    status,
    paid,
    payment,
    agreementStatements,
    name,
    surname,
    phone,
    email,
  };
  const { error } = schema.validate(verifiedParticipant);
  if (error) {
    console.error(
      `------------validatePArticipant - error ----------------`,
      error
    );
    return false;
  }
  return verifiedParticipant;
};
