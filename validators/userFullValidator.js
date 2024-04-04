import Joi from "joi";

export const validateFullUserQuery = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pl", "eu"] },
      })
      .required(),
    password: Joi.string().min(6).required(),
    language: Joi.string().valid("EN", "PL").default("PL"),
    name: Joi.string().min(2).required(),
    surname: Joi.string().min(2).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
