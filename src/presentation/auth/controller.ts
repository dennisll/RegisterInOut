import { Request, Response } from "express";
import {
  CustomError,
  GenerateTokenAuthCase,
  RegisterUserCase,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../data";
import { handleError } from "../shared/handleError";


export class AuthController {
  constructor(
    private readonly registerUserCase: RegisterUserCase,
    private readonly generateTokenAuth: GenerateTokenAuthCase
  ) {}

  registerUser = (req: Request, res: Response) => {
    const [err, registerUserDto] = RegisterUserDto.create(req.body);

    if (err) {
      res.status(400).json({ err });
      return;
    }

    this.registerUserCase
      .register(registerUserDto!)
      .then(async (user) => {

        res.json({
          user,
        });
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  generateToken = (req: Request, res: Response) => {
    
    this.generateTokenAuth.generateTokenAuthCase(req.user as UserEntity)
      .then(async (token) => {
        res.json({
          token: token,
        });
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  logout = (req: Request, res: Response) => {
    res.json("Session closed");
  };

  passwordReset = (req: Request, res: Response) => {
    res.json("Password reseted");
  };
}
