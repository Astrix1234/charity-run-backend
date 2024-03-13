import userService from "#service/userService.js";

export const verifyUser = async (req, res) => {
  const verifiedUser = await userService.verifyUser(
    req.params.verificationToken
  );
  if (!verifiedUser) {
    return res.status(404).send({ message: "User not found" });
  }
  res.status(200).send({ message: "Verification successful" });
};
