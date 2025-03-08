import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { CustomError, UserEntity } from "../../domain";

 export const passportLocalMiddleware = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
          "local",
          function (error: Error, user: UserEntity,) {
            if (error) {
              if (error instanceof CustomError) {
                return res
                  .status(error.statusCode)
                  .json({ error: error.message });
              }
              return res.status(500).json({ error: "Internal Server Error" });
            }
            req.user = user;
            return next();
          }
        )(req, res, next);
      };