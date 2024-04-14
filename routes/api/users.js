import express from "express";
import passport from "passport";

import { register } from "#ctrlUser/registerUser.js";
import { verifyUser } from "#ctrlUser/verifyUser.js";
import { resendVerificationEmail } from "#ctrlUser/resendVerificationEmail.js";
import { login } from "#ctrlUser/loginUser.js";
import { updateUserDetails } from "#ctrlUser/updateUserDetails.js";
import { updateParticipation } from "#ctrlParticipation/updateParticipation.js";
import { logout } from "#ctrlUser/logoutUser.js";
import { getCurrentUser } from "#ctrlUser/getCurrentUser.js";
import { updateUserAvatar } from "#ctrlUser/updateUserAvatar.js";
import { validateFullUserQuery } from "#validators/userFullValidator.js";
import { validateLoginUserQuery } from "#validators/userLoginValidator.js";
import { createParticipant } from "#ctrlParticipation/createParticipant.js";
import { getParticipant } from "#ctrlParticipation/getParticipant.js";
import { resetUserPassword } from "#ctrlUser/resetUserPassword.js";
import { upload } from "#config/config-multer.js";
import { getUserAvatar } from "#ctrlUser/getCurrentUser.js";

const routerUsers = express.Router();

routerUsers.post("/users/signup", validateFullUserQuery, register);

routerUsers.get("/users/verify/:verificationToken", verifyUser);

routerUsers.post("/users/verify", resendVerificationEmail);

routerUsers.post("/users/login", validateLoginUserQuery, login);

routerUsers.patch("/users/reset-password", resetUserPassword);

routerUsers.get(
  "/users/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

// GET USER AVATAR

routerUsers.get("/users/avatar/:avatarURL", getUserAvatar);

routerUsers.patch(
  "/users",
  passport.authenticate("jwt", { session: false }),
  updateUserDetails
);

routerUsers.post(
  "/users/participate",
  passport.authenticate("jwt", { session: false }),
  createParticipant
);

// routerUsers.patch(
//   "/users/participate",
//   refreshTokenMiddleware,
//   passport.authenticate("jwt", { session: false }),
//   updateParticipation
// );

routerUsers.get(
  "/users/participant",
  passport.authenticate("jwt", { session: false }),
  getParticipant
);

//--------------------

routerUsers.get(
  "/users/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

routerUsers.patch(
  "/users/avatars",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  updateUserAvatar
);

export default routerUsers;
