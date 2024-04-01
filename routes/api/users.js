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
import { uploadAvatar, updateUserAvatar } from "#ctrlUser/updateUserAvatar.js";
import { validateFullUserQuery } from "#validators/userFullValidator.js";
import { validateLoginUserQuery } from "#validators/userLoginValidator.js";
import refreshTokenMiddleware from "#middleware/refreshTokenMiddleware.js";
import { createParticipant } from "#ctrlParticipation/createParticipant.js";

const routerUsers = express.Router();

routerUsers.post("/users/signup", validateFullUserQuery, register);

routerUsers.get("/users/verify/:verificationToken", verifyUser);

routerUsers.post("/users/verify", resendVerificationEmail);

routerUsers.post("/users/login", validateLoginUserQuery, login);

routerUsers.get(
  "/users/current",
  refreshTokenMiddleware,
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

routerUsers.patch(
  "/users",
  refreshTokenMiddleware,
  passport.authenticate("jwt", { session: false }),
  updateUserDetails
);

routerUsers.post(
  "/users/participate",
  refreshTokenMiddleware,
  passport.authenticate("jwt", { session: false }),
  createParticipant
);

routerUsers.patch(
  "/users/participate",
  refreshTokenMiddleware,
  passport.authenticate("jwt", { session: false }),
  updateParticipation
);

//--------------------

routerUsers.get(
  "/users/logout",
  refreshTokenMiddleware,
  passport.authenticate("jwt", { session: false }),
  logout
);

routerUsers.patch(
  "/users/avatars",
  refreshTokenMiddleware,
  passport.authenticate("jwt", { session: false }),
  uploadAvatar,
  updateUserAvatar
);

export default routerUsers;
