import userService from "#service/userService.js";

// export const verifyUser = async (req, res) => {
//   const verifiedUser = await userService.verifyUser(
//     req.params.verificationToken
//   );
//   if (!verifiedUser) {
//     return res.status(404).send({ message: "User not found" });
//   }
//   res.status(200).send({ message: "Verification successful" });
// };

export const verifyUser = async (req, res) => {
  try {
    const verifiedUser = await userService.verifyUser(
      req.params.verificationToken
    );
    if (verifiedUser) {
      res.redirect(`${process.env.FRONTEND_URL}/login?verified=true`);
    } else {
      return res.redirect(`${process.env.FRONTEND_URL}/login?verified=false`);
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.redirect(`${process.env.FRONTEND_URL}/login?verified=false`);
  }
};
