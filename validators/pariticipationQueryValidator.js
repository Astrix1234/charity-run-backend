import Joi from "joi";

export const validateParticipationQuery = (req, res, next) => {
  const schema = Joi.object({
    // date: Joi.date().required(), //day of the race
    // location: Joi.string().required(), //city
    raceID: Joi.string().required(), //id of race - for filtering how many participants in specific race we have
    userId: Joi.string().required(),
    familyNr: Joi.number().min(0).default(0), //ppl joining race on one acc, first person is nr 0

    km: Joi.string().required(), //distance of user choice
    shirt: Joi.string().valid("S", "M", "L", "XL", "XXL").required(),
    shirtGender: Joi.string().valid("male", "female").required(), //for shirt sizes only, not user gender

    participationID: Joi.string(), //number to identify person at the race and give them shirt etc (safe for rodo?)
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
