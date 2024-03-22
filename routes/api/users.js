import express from "express";
import passport from "passport";

import { register } from "#ctrlUser/registerUser.js";
import { verifyUser } from "#ctrlUser/verifyUser.js";
import { resendVerificationEmail } from "#ctrlUser/resendVerificationEmail.js";
import { login } from "#ctrlUser/loginUser.js";
import { updateUserDetails } from "#ctrlUser/updateUserDetails.js";
import { updateUserRace } from "#ctrlUserRace/updateUserRace.js";
import { logout } from "#ctrlUser/logoutUser.js";
import { getCurrentUser } from "#ctrlUser/getCurrentUser.js";
import { uploadAvatar, updateUserAvatar } from "#ctrlUser/updateUserAvatar.js";
import { validateFullUserQuery } from "#validators/userFullValidator.js";
import { validateLoginUserQuery } from "#validators/userLoginValidator.js";

const routerUsers = express.Router();

routerUsers.post("/users/signup", validateFullUserQuery, register);

routerUsers.get("/users/verify/:verificationToken", verifyUser);

routerUsers.post("/users/verify", resendVerificationEmail);

routerUsers.post("/users/login", validateLoginUserQuery, login);

routerUsers.get(
  "/users/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

routerUsers.patch(
  "/users",
  passport.authenticate("jwt", { session: false }),
  updateUserDetails
);

routerUsers.patch(
  //to sign up for a specific race and pay for it
  "/users/participate",
  passport.authenticate("jwt", { session: false }),
  updateUserRace
);

//--------------------

//to add: get current user latest race data

routerUsers.get(
  "/users/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

routerUsers.patch(
  "/users/avatars",
  passport.authenticate("jwt", { session: false }),
  uploadAvatar,
  updateUserAvatar
);

export default routerUsers;
