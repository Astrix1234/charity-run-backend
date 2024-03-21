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
    name: Joi.string().min(3).required(), //full name or username?
    phone: Joi.string().min(9).required(),
    shoe: Joi.number().min(34).max(49).required(),
    shirt: Joi.string().valid("S", "M", "L", "XL", "XXL").required(),
    shirtGender: Joi.string().valid("male", "female").required(), //for shirt sizes only, not user gender
  });
  console.log("userQueryValidator, req.body:", req.body);
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
