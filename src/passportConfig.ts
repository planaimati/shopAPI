import { User } from "./models/User";
import bcrypt from "bcrypt";
const localStrategy = require("passport-local").Strategy;
import { PassportStatic } from "passport";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      admin: boolean;
    }
  }
}

const passportInitilize = (passport: PassportStatic) => {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      (email: string, password: string, done: Function) => {
        User.findOne({ email: email }, (err: Error, user: any) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id as string);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err: Error, user: any) => {
      cb(err, user);
    });
  });
};

export default passportInitilize;
