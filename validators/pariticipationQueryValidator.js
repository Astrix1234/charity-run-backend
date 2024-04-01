import Joi from "joi";

export const validateParticipationQuery = (req, res, next) => {
  const schema = Joi.object({
    // date: Joi.date().required(), //day of the race
    // location: Joi.string().required(), //city
    raceID: Joi.string().required(), //id of race - for filtering how many participants in specific race we have
    userId: Joi.string().required(),

    km: Joi.string().required(), //distance of user choice
    shirt: Joi.string()
      .valid(
        "rozmiar 36 (S)",
        "rozmiar 38 (M)",
        "rozmiar 40 (L)",
        "rozmiar 42 (XL)",
        "rozmiar S",
        "rozmiar M",
        "rozmiar L",
        "rozmiar XL",
        "rozmiar XXL",
        Joi.number().integer().min(90).max(200)
      )
      .required(),
    shirtGender: Joi.string().valid("Damska", "Męska", "Dziecięca").required(), //for shirt sizes only, not user gender

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
