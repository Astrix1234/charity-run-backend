import Joi from "joi";

export const validateParticipationQuery = (req, res, next) => {
  const schema = Joi.object({
    // date: Joi.date().required(), //day of the race
    // location: Joi.string().required(), //city
    raceID: Joi.string().required(), //id of race - for filtering how many participants in specific race we have
    userId: Joi.string().required(),

    km: Joi.string().required(), //distance of user choice
    shirt: Joi.string().required(),
    shirtGender: Joi.string().required(), //for shirt sizes only, not user gender

    time: Joi.time(), //how long user took to finish the race //updated after race
    status: Joi.string()
      .valid("signed up", "participated")
      .default("signed up"), //updated after race
    paid: Joi.bool().default(false),
    payment: Joi.object(), //all data needed to track the payment ?
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
