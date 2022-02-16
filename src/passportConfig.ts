import { User } from "./models/User";
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from "passport";

const passportInitilize = (passport: PassportStatic)=>{
  passport.use(

    new LocalStrategy(()=>{
      username, password, done
    })








  )
}