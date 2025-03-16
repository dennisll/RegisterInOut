import { Request, Response } from "express";
import {
  DeleteRegisterDataCase,
  GetAllRegisterCase,
  GetOneRegisterCase,
  RegisterDataCase,
  RegisterDto,
  UpdateRegisterDataCase,
  UpdateRegisterDto,
  UserEntity,
} from "../../domain";
import { handleError } from "../shared/handleError";

export class RegisterController {
  constructor(
    private readonly getAllRegisterCase: GetAllRegisterCase,
    private readonly getOneRegisterCase: GetOneRegisterCase,
    private readonly registerDataCase: RegisterDataCase,
    private readonly updateRegisterDataCase: UpdateRegisterDataCase,
    private readonly deleteRegisterDataCase: DeleteRegisterDataCase
  ) {}

  public getAllRegisters = (req: Request, res: Response) => {
    this.getAllRegisterCase
      .getAllRegisterData()
      .then((registers) => {
        res.json(registers);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public getOneRegister = (req: Request, res: Response) => {
    const id = req.params.id;

    this.getOneRegisterCase
      .getOneRegisterData(id)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public registerData = (req: Request, res: Response) => {
    const {
      data,
      lat,
      long,
      registerType,
    } = req.body;

    const user: UserEntity = req.user as UserEntity;

    const [err, registerDto] = RegisterDto.create({
      data: data,
      lat: lat,
      long: long,
      registerType: registerType,
    });

    if (err) {
      res.status(400).json({ err });
      return;
    }

    this.registerDataCase
      .registerData(user.id, registerDto!)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public updateRegisterData = (req: Request, res: Response) => {
    const id = req.params.id;
    const { data, registerType } = req.body;

    const [err, updateRegisterDto] = UpdateRegisterDto.create({
      data: data,
      registerType: registerType,
    });

    if (err) {
      res.status(400).json({ err });
      return;
    }

    this.updateRegisterDataCase
      .updateRegisterData(id, updateRegisterDto!)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };

  public deleteRegisterData = (req: Request, res: Response) => {
    const id = req.params.id;

    this.deleteRegisterDataCase
      .deleteRegisterData(id)
      .then((register) => {
        res.json(register);
      })
      .catch((error) => {
        return handleError(error, res);
      });
  };
}
