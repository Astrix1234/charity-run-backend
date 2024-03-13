import userService from "#service/userService.js";

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: "missing required field email" });
  }

  const user = await userService.resendVerificationEmail(email);
  if (!user) {
    return res.status(400).send({
      message: "Verification has already been passed or user not found",
    });
  }

  res.status(200).send({ message: "Verification email sent" });
};
