import { Request, Response } from "express";
import {
  CustomError,
  GenerateTokenAuthCase,
  RegisterUserCase,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../data";


export class AuthController {
  constructor(
    private readonly registerUserCase: RegisterUserCase,
    private readonly generateTokenAuth: GenerateTokenAuthCase
  ) {}

  public handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  };

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
        return this.handlerError(error, res);
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
        return this.handlerError(error, res);
      });
  };

  logout = (req: Request, res: Response) => {
    res.json("Session closed");
  };

  passwordReset = (req: Request, res: Response) => {
    res.json("Password reseted");
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => {
        res.json(users);
      })
      .catch((e) => {
        res.status(500).json({ error: "Internal server error" });
      });
  };
}
