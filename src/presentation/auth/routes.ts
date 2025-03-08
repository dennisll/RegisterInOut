import { Request, Response, NextFunction, Router } from "express";
import { AuthController } from "./controller";
import {
  AuthRepositoryImpl,
  MongoDbAuthDatasourceImpl,
  UserDatasourceImpl,
} from "../../infraestructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import {
  CustomError,
  GenerateTokenAuthCase,
  RegisterUserCase,
  UserEntity,
  VerifyByEmailAndPasswordCase,
} from "../../domain";
import { createLocalStrategy } from "../../config";
import { passportLocalMiddleware } from "../middlewares/passport.local.middleware";


export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new MongoDbAuthDatasourceImpl();
    const authRepositoryImpl = new AuthRepositoryImpl(dataSource);
    const registerUserCase = new RegisterUserCase(authRepositoryImpl);
    const generateTokenAuth = new GenerateTokenAuthCase(authRepositoryImpl);
    const verifyByEmailAndPassword= new VerifyByEmailAndPasswordCase(authRepositoryImpl);

    createLocalStrategy(verifyByEmailAndPassword);

    const controller = new AuthController(registerUserCase, generateTokenAuth);

    router.post(
      "/login",
      [AuthMiddleware.validateEmailAndPassword, 
        passportLocalMiddleware],
      controller.generateToken
    ); //

    router.post("/register", controller.registerUser); //

    router.post("/logout", controller.logout);

    router.post("/passreset", controller.passwordReset);

    router.get("/", AuthMiddleware.validateJwt, controller.getUsers);

    return router;
  }
}
