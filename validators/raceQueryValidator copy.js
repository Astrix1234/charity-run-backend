import Joi from "joi";

export const validateRaceQuery = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date().required(), //day of the race
    kms: Joi.array().items(Joi.string().required()).required(), //distances to choose from
    location: Joi.string().required(), //city
    raceID: Joi.string(), //id of race - for filtering how many participants in specific race we have
    badgeUrl: Joi.string(), //race badge icon - for later?
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
