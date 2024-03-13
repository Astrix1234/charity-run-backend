import userService from "#service/userService.js";
import Joi from "joi";

export const updateUserSubscription = async (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const userId = req.user._id;
    const { subscription } = req.body;
    const updatedUser = await userService.updateSubscription(
      userId,
      subscription
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
