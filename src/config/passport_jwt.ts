import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithRequest,
} from "passport-jwt";
import { GetUserCase } from "../domain";
import { envs } from ".";


let opts: StrategyOptionsWithRequest = {
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envs.JWT_SECRET,
};

export const createJwtStrategy = (getUserCase: GetUserCase) => {
  passport.use(
    new JwtStrategy(
      {
        passReqToCallback: true,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: envs.JWT_SECRET,
      },
      async (req: Request, jwt_payload: { [key: string]: any},  done ) => {
        try {
          let id = jwt_payload.id;
          const user = await getUserCase.getUser(id).then( (user) =>{
            return done(null, user);
          });
          
        } catch (error) {
            return done(error);
        }
      }
    )
  );
};
