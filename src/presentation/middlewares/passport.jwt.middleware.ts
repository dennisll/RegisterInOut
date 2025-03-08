import { Request, Response, NextFunction } from "express";
import { CustomError, UserEntity } from "../../domain";
import passport from "passport";

export const passportJwtMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

   const authorization = req.headers["authorization"];
  if (!authorization) {
    res.status(400).json({ error: "Not token provided" });
    return;
  }
  if (!authorization.startsWith("Bearer ")) {
    res.status(401).json({ error: "Invalid token"});
    return;
  }

  passport.authenticate("jwt", function (error: Error, user: UserEntity) {
    if (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if(!user){
      res.status(401).json({ error: "Invalid token"});
      return;
    }

    req.user = user;
    return next();
  })(req, res, next);
};
