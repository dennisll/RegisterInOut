import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {VerifyByEmailAndPasswordCase } from "../domain";

//type CompareHashFunction = (password: string, hash: string) => boolean;

export const createLocalStrategy = (
  verifyByEmailAndPassword: VerifyByEmailAndPasswordCase,
  //comparePassword: CompareHashFunction = BcryptAdapter.compare
) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (email: string, password: string, done) => {

        const user = await verifyByEmailAndPassword.verifyByEmailAndPassword(email, password).
          
        then( (user) => {

            // user.password = "";

            return done(null, user);

            }).
          catch( (error) => {    
            return done(error);
          });

      }
    )
  );
};
