import passport from "passport";
import passportJWT from "passport-jwt";
import User from "../service/schemas/user.js";

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies.jwt;
      }
      return token;
    },
  ]),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Not authorized" });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
